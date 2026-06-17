/**
 * @file geoUtils.ts
 * @description 處理坐標投影轉換與標準 GeoJSON 格式生成工具
 */
  //【引入】=====================================================================
import proj4 from 'proj4';                              // 引入 proj4 庫，用於坐標投影轉換
import type { ShpRecord } from '../services/shpParser'; // 引入 ShpRecord 類型定義
import { ShapeType } from '../services/shpParser';      // 引入 ShapeType 枚舉，用於識別圖形類型
import type {
  PointContent,   // 定義點內容類型
  PolylineContent // 定義線內容類型
} from '../services/shpParser'; // 引入 PointContent 和 PolylineContent 類型定義

//【宣告】=====================================================================
const EPSG4326 = 'EPSG:4326'; // 定義 WGS 84 坐標系統的 EPSG 代碼

//【物件結構定義】=====================================================================
interface DbfRecord {
  [key: string]: string | number | boolean | null;
}
interface GeoJsonFeature {
  type: 'Feature';
  properties: DbfRecord;
  geometry: {
    type: 'Point' | 'LineString' | 'Polygon' | 'MultiLineString' | 'MultiPolygon';
    // 🎯 精準定義所有支援的幾何陣列維度，100% 擺脫 any 
    coordinates: number[] | number[][] | number[][][] | number[][][][];
  };
}
interface GeoJsonFeatureCollection {
  type: 'FeatureCollection';
  features: GeoJsonFeature[];
  bbox: number[];
}

//【函式定義】=====================================================================
/**
 * 坐標系統投影轉換
 * @param x 原始 X 坐標
 * @param y 原始 Y 坐標
 * @param sourceEpsg 來源坐標系統 (例如: 'EPSG:3826')
 */
export function transformCoordinate(x: number, y: number, sourceEpsg: string): { x: number; y: number } {
  // 🎯 1. 嚴格格式清洗：去除前後空白、轉大寫
  let cleanEpsg = sourceEpsg ? sourceEpsg.trim().toUpperCase() : 'EPSG:3826';

  // 🎯 2. 終極防呆驗證：利用正規表達式檢查格式是否為 "EPSG:四位數字"
  // 如果不是標準的 EPSG 格式 (例如變成了 EPSG:UTF-8, EPSG:BIG5 等文字編碼)
  if (!/^EPSG:\d+$/.test(cleanEpsg)) {
    // 💡 依據點位數值特徵，自動替換為正確的台灣地理坐標代碼
    // 經緯度 (縣市界線特徵)：X 軸大約在 119~123 之間 ➔ 判定為 TWD97 經緯度 (EPSG:3824)
    // 二度分帶：X 軸大約在 150000~350000 之間 ➔ 判定為 TWD97 二度分帶 (EPSG:3826)
    if (x > 119 && x < 123) {
      cleanEpsg = 'EPSG:3824';
    } else {
      cleanEpsg = 'EPSG:3826';
    }
  }

  try {
    // 執行 Proj4 坐標轉換
    const result = proj4(cleanEpsg, EPSG4326, [x, y]);
    return { x: result[0] ?? 0, y: result[1] ?? 0 };
  } catch (error) {
    console.error(error);
    // 即使投影完全失敗，也提供安全的二次防呆降級，不讓程式崩潰中斷
    console.warn(`[Proj4] 嘗試使用代碼 ${cleanEpsg} 失敗，啟動數值降級判斷`);
    try {
      const fallbackEpsg = (x > 119 && x < 123) ? 'EPSG:3824' : 'EPSG:3826';
      const result = proj4(fallbackEpsg, EPSG4326, [x, y]);
      return { x: result[0] ?? 0, y: result[1] ?? 0 };
    } catch {
      return { x: 0, y: 0 };
    }
  }
}

/**
 * 將解析後的 SHP 與 DBF 結合成標準的 GeoJSON 格式
 */
export function convertToGeoJson(
  shpData: { shapeType: ShapeType; records: ShpRecord[]; bbox: number[] },
  dbfRecords: DbfRecord[],
  sourceEpsg: string
): GeoJsonFeatureCollection {
  const features: GeoJsonFeature[] = [];

  // ✅ 確保 sourceEpsg 格式正確 (包含 'EPSG:' 前綴)
  const sourceProj = sourceEpsg.includes('EPSG:') ? sourceEpsg : `EPSG:${sourceEpsg}`;

  // ✅ 轉換 BBox 座標
  const minCoord = transformCoordinate(shpData.bbox[0] ?? 0, shpData.bbox[1] ?? 0, sourceProj);
  const maxCoord = transformCoordinate(shpData.bbox[2] ?? 0, shpData.bbox[3] ?? 0, sourceProj);

  // ✅ 添加 console 日誌用於調試
  console.log('GeoJSON 轉換參數:', {
    sourceProj,
    原始Bbox: shpData.bbox,
    轉換後Bbox: [minCoord.x, minCoord.y, maxCoord.x, maxCoord.y]
  });

  for (let i = 0; i < shpData.records.length; i++) {
    const shpRecord = shpData.records[i];
    if (!shpRecord?.shape || shpRecord.shape.type === ShapeType.NULL) continue;

    const feature: GeoJsonFeature = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: []
      },
      properties: dbfRecords[i] || {}
    };

    const content = shpRecord.shape.content;

    switch (shpRecord.shape.type) {
      case ShapeType.POINT: {
        const pointContent = content as PointContent;
        const pt = transformCoordinate(pointContent.x, pointContent.y, sourceProj);
        feature.geometry = {
          type: 'Point',
          coordinates: [pt.x, pt.y]
        };
        break;
      }

      case ShapeType.POLYLINE:
      case ShapeType.POLYLINEZ: {
        const polylineContent = content as PolylineContent;

        // 如果只有一個 part，就是 LineString；多個 part 則是 MultiLineString
        if (polylineContent.parts.length <= 1) {
          feature.geometry = { type: 'LineString', coordinates: [] as number[][] };
          for (let j = 0; j < polylineContent.points.length; j += 2) {
            const pt = transformCoordinate(polylineContent.points[j] ?? 0, polylineContent.points[j + 1] ?? 0, sourceProj);
            (feature.geometry.coordinates as number[][]).push([pt.x, pt.y]);
          }
        } else {
          feature.geometry = { type: 'MultiLineString', coordinates: [] as number[][][] };
          for (let pts = 0; pts < polylineContent.parts.length; pts++) {
            // 修正重點：必須先把 index 拿出來，整個乘以 2 
            const start = (polylineContent.parts[pts] ?? 0) * 2;
            const end = polylineContent.parts[pts + 1] !== undefined
              ? (polylineContent.parts[pts + 1] ?? 0) * 2
              : polylineContent.points.length;

            const partCoordinates = [] as number[][];
            for (let j = start; j < end; j += 2) {
              const pt = transformCoordinate(polylineContent.points[j] ?? 0, polylineContent.points[j + 1] ?? 0, sourceProj);
              partCoordinates.push([pt.x, pt.y]);
            }
            (feature.geometry.coordinates as number[][][]).push(partCoordinates);
          }
        }
        break;
      }

      case ShapeType.POLYGON:
      case ShapeType.POLYGONZ: {
        const polyContent = content as PolylineContent;

        // 🎯 1. 強型別初始化：明確宣告為支援四維陣列的標準格式，絕不噴 undefined
        const multiPolygonGeometry: {
          type: 'MultiPolygon';
          coordinates: number[][][][];
        } = {
          type: 'MultiPolygon',
          coordinates: []
        };

        // 🎯 修正重點：宣告儲存所有環的容器，不需要 any
        const allRings: number[][][] = [];

        // 第一步：切分並修正所有的 Ring 坐標
        for (let pts = 0; pts < polyContent.parts.length; pts++) {
          const start = (polyContent.parts[pts] ?? 0) * 2;
          const end = polyContent.parts[pts + 1] !== undefined
            ? (polyContent.parts[pts + 1] ?? 0) * 2
            : polyContent.points.length;

          const partCoordinates: number[][] = [];
          for (let j = start; j < end; j += 2) {
            const pt = transformCoordinate(polyContent.points[j] ?? 0, polyContent.points[j + 1] ?? 0, sourceProj);
            partCoordinates.push([pt.x, pt.y]);
          }

          if (partCoordinates.length > 0) {
            const first = partCoordinates[0];
            const last = partCoordinates[partCoordinates.length - 1];
            if (first && last && (first[0] !== last[0] || first[1] !== last[1])) {
              partCoordinates.push([first[0] ?? 0, first[1] ?? 0]);
            }

            // 🎯 移除 as any：型別完美符合 number[][][] 的元素 number[][]，直接 push 即可
            allRings.push(partCoordinates);
          }
        }

        // 🎯 2. 縣市界線優化處理邏輯 (標準 GeoJSON 內外環辨識)
        let currentPolygon: number[][][] | null = null;

        for (const ring of allRings) {
          // 計算環的走向 (Shoelace formula 面積計算法)
          let area = 0;
          for (let i = 0; i < ring.length; i++) {
            const p1 = ring[i];
            const p2 = ring[(i + 1) % ring.length];
            if (p1 && p2 && p1[0] !== undefined && p1[1] !== undefined && p2[0] !== undefined && p2[1] !== undefined) {
              area += p1[0] * p2[1] - p2[0] * p1[1];
            }
          }

          // area >= 0 代表順時針(外環/獨立島嶼)；area < 0 代表逆時針(內環/行政區中空孔洞)
          // 💡 提示：如果匯入後外島沒亮出來，請試著把 area >= 0 改成 area <= 0
          if (area >= 0 || currentPolygon === null) {
            // 建立一個新多邊形（最外層外環），其內部容納多個環
            currentPolygon = [ring];
            multiPolygonGeometry.coordinates.push(currentPolygon);
          } else {
            // 認定為內網孔洞，塞進當前這個多邊形中做 Hole 挖空
            currentPolygon.push(ring);
          }
        }

        // 3. 安全指派給主物件
        feature.geometry = multiPolygonGeometry;
        break;
      }
    }

    if (feature.geometry.coordinates) {
      features.push(feature);
    }
  }

  return {
    type: 'FeatureCollection',
    bbox: [minCoord.x, minCoord.y, maxCoord.x, maxCoord.y],
    features
  };
}

/**
 * 將 dxf-parser 解析後的 DXF 資料轉換為標準 GeoJSON 格式 (EPSG:4326)
 * @param dxfData dxf-parser 所解析出來的物件
 * @param sourceEpsg 使用者選擇的來源坐標系統 (例如: '3826')
 */
export function transformDxfToGeoJson(dxfData: any, sourceEpsg: string): any {
  const features: any[] = [];
  const epsgStr = `EPSG:${sourceEpsg}`;

  if (dxfData && dxfData.entities) {
    dxfData.entities.forEach((entity: any, index: number) => {
      let geometry: any = null;
      const properties: any = {
        layer: entity.layer || '0',
        type: entity.type,
        handle: entity.handle,
        color: entity.color,
        index: index
      };

      switch (entity.type) {
        case 'POINT': {
          if (entity.position) {
            const pt = transformCoordinate(entity.position.x, entity.position.y, epsgStr);
            geometry = {
              type: 'Point',
              coordinates: [pt.x, pt.y]
            };
          }
          break;
        }

        case 'LINE': {
          if (entity.start && entity.end) {
            const ptStart = transformCoordinate(entity.start.x, entity.start.y, epsgStr);
            const ptEnd = transformCoordinate(entity.end.x, entity.end.y, epsgStr);
            geometry = {
              type: 'LineString',
              coordinates: [
                [ptStart.x, ptStart.y],
                [ptEnd.x, ptEnd.y]
              ]
            };
          }
          break;
        }

        case 'LWPOLYLINE':
        case 'POLYLINE': case 'POLYLINE': {
          if (entity.vertices && entity.vertices.length > 0) {
            const coords = entity.vertices.map((v: any) => {
              const pt = transformCoordinate(v.x, v.y, epsgStr);
              return [pt.x, pt.y];
            });

            // 閉合則為 Polygon，否則為 LineString
            if (entity.shape || entity.closed) {
              if (coords.length > 0) {
                const first = coords[0];
                const last = coords[coords.length - 1];
                if (first[0] !== last[0] || first[1] !== last[1]) {
                  coords.push([first[0], first[1]]);
                }
              }
              geometry = {
                type: 'Polygon',
                coordinates: [coords]
              };
            } else {
              geometry = {
                type: 'LineString',
                coordinates: coords
              };
            }
          }
          break;
        }

        default:
          // 其他不支援或暫不處理的幾何類型 (例如 TEXT, ARC 圓弧等) 略過
          break;
      }

      if (geometry) {
        features.push({
          type: 'Feature',
          geometry: geometry,
          properties: properties
        });
      }
    });
  }

  return {
    type: 'FeatureCollection',
    features: features
  };
}
