/**
 * @file geoUtils.ts
 * @description 處理坐標投影轉換與標準 GeoJSON 格式生成工具
 */

import proj4 from 'proj4';
import type { ShpRecord } from '../services/shpParser';
import { ShapeType } from '../services/shpParser';
import type { PointContent, PolylineContent } from '../services/shpParser';

const EPSG4326 = 'EPSG:4326';

/**
 * 坐標系統投影轉換
 * @param x 原始 X 坐標
 * @param y 原始 Y 坐標
 * @param sourceEpsg 來源坐標系統 (例如: 'EPSG:3826')
 */
export function transformCoordinate(x: number, y: number, sourceEpsg: string): { x: number; y: number } {
  try {
    const p = proj4(sourceEpsg, EPSG4326, [sourceEpsg === 'EPSG:4326' ? x : parseFloat(x.toString()), parseFloat(y.toString())]);
    return { x: p[0] ?? 0, y: p[1] ?? 0 };
  } catch (error) {
    console.error('投影轉換失敗:', error);
    return { x: 0, y: 0 };
  }
}

interface DbfRecord {
  [key: string]: string | number | boolean | null;
}

interface GeoJsonFeature {
  type: 'Feature';
  geometry: {
    type: string;
    coordinates: number[] | number[][] | number[][][];
  };
  properties: DbfRecord;
}

interface GeoJsonFeatureCollection {
  type: 'FeatureCollection';
  features: GeoJsonFeature[];
  bbox: number[];
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
  const sourceProj = `EPSG:${sourceEpsg}`;

  const minCoord = transformCoordinate(shpData.bbox[0] ?? 0, shpData.bbox[1] ?? 0, sourceProj);
  const maxCoord = transformCoordinate(shpData.bbox[2] ?? 0, shpData.bbox[3] ?? 0, sourceProj);

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

      case ShapeType.POLYLINE: {
        const polylineContent = content as PolylineContent;
        feature.geometry = { type: 'LineString', coordinates: [] as number[][] };
        for (let j = 0; j < polylineContent.points.length; j += 2) {
          const pt = transformCoordinate(polylineContent.points[j] ?? 0, polylineContent.points[j + 1] ?? 0, sourceProj);
          (feature.geometry.coordinates as number[][]).push([pt.x, pt.y]);
        }
        break;
      }

      case ShapeType.POLYGON:
      case ShapeType.POLYGONZ: {
        const polyContent = content as PolylineContent;
        feature.geometry = { type: 'Polygon', coordinates: [] };
        // 依據 parts 索引切割多邊形邊界環 (Rings)
        for (let pts = 0; pts < polyContent.parts.length; pts++) {
          const start = polyContent.parts[pts] ?? 0 * 2;
          const end = polyContent.parts[pts + 1] ? polyContent.parts[pts + 1] ?? 0 * 2 : polyContent.points.length;
          const partCoordinates = [] as number[][];

          for (let j = start; j < end; j += 2) {
            const pt = transformCoordinate(polyContent.points[j] ?? 0, polyContent.points[j + 1] ?? 0, sourceProj);
            partCoordinates.push([pt.x, pt.y]);
          }
          (feature.geometry.coordinates as number[][][]).push(partCoordinates);
        }
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
