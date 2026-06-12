/**
 * @file shpParser.ts
 * @description 核心地理資訊圖資（Shapefile & DBF）解析服務
 * 已翻新為 TypeScript 並使用現代 TextDecoder 解決中文字碼（Big5/UTF-8）問題
 */
//【引入】=====================================================================
import proj4 from 'proj4';

//【註冊】=====================================================================
// 註冊台灣常用的 TWD97 坐標系統
proj4.defs([
  ['EPSG:3826', '+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'],
  ['EPSG:3821', '+proj=tmerc +ellps=GRS67 +towgs84=-752,-358,-179,-.0000011698,.0000018398,.0000009822,.00002329 +lat_0=0 +lon_0=121 +x_0=250000 +y_0=0 +k=0.9999 +units=m +no_defs'],
  // TWD97 經緯度標準定義
  ['EPSG:3824', '+proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs']
]);

//【定義】=====================================================================
// 定義支援的 Shapefile 幾何型別列舉
export enum ShapeType {
  NULL = 0,
  POINT = 1,
  POLYLINE = 3,
  POLYGON = 5,
  POINTZ = 11,
  POLYLINEZ = 13,
  POLYGONZ = 15,
  MULTIPOINT = 8
}

export interface ShpRecord {
  number: number;
  length: number;
  shape: {
    type: ShapeType;
    content: ShapeContent;
  };
}

export interface DbfField {
  name: string;
  type: string;
  fieldLength: number;
}

// 在 DbfField 介面後添加
export interface DbfRecord {
  [key: string]: string | number;
}


export class ShpParserService {
  /**
   * 解析 .shp 二進位檔案
   */
  public parseShp(arrayBuffer: ArrayBuffer): { shapeType: ShapeType; records: ShpRecord[]; bbox: number[] } {
    const dv = new DataView(arrayBuffer);
    const fileCode = dv.getInt32(0, false);

    if (fileCode !== 0x0000270a) {
      throw new Error(`未知的 Shapefile 檔案格式碼: ${fileCode}`);
    }

    const wordLength = dv.getInt32(24, false);
    const byteLength = wordLength * 2;
    const shapeType = dv.getInt32(32, true) as ShapeType;

    // 讀取邊界包圍盒 (Bounding Box)
    const minX = dv.getFloat64(36, true);
    const minY = dv.getFloat64(44, true);
    const maxX = dv.getFloat64(52, true);
    const maxY = dv.getFloat64(60, true);

    const records: ShpRecord[] = [];
    let idx = 100; // SHP 標頭固定 100 位元組

    while (idx < byteLength) {
      const recordNumber = dv.getInt32(idx, false);
      const recordLength = dv.getInt32(idx + 4, false);
      idx += 8;

      try {
        const shape = this.parseShapeGeometry(dv, idx);
        records.push({ number: recordNumber, length: recordLength, shape });
      } catch (e) {
        console.error(`解析第 ${recordNumber} 筆幾何紀錄失敗:`, e);
      }
      idx += recordLength * 2;
    }

    return { shapeType, records, bbox: [minX, minY, maxX, maxY] };
  }

  /**
   * 解析個別幾何圖徵
   */
  private parseShapeGeometry(dv: DataView, startIdx: number) {
    let idx = startIdx;
    const type = dv.getInt32(idx, true) as ShapeType;
    idx += 4;

    let content: ShapeContent;

    switch (type) {
      case ShapeType.POINT:
        content = {
          x: dv.getFloat64(idx, true),
          y: dv.getFloat64(idx + 8, true)
        };
        break;

      case ShapeType.POLYLINE:
      case ShapeType.POLYGON:
      case ShapeType.POLYLINEZ:
      case ShapeType.POLYGONZ:
        const minX = dv.getFloat64(idx, true);
        const minY = dv.getFloat64(idx + 8, true);
        const maxX = dv.getFloat64(idx + 16, true);
        const maxY = dv.getFloat64(idx + 24, true);

        const numParts = dv.getInt32(idx + 32, true);
        const numPoints = dv.getInt32(idx + 36, true);
        idx += 40;

        const parts = new Int32Array(numParts);
        for (let i = 0; i < numParts; i++) {
          parts[i] = dv.getInt32(idx, true);
          idx += 4;
        }

        const points = new Float64Array(numPoints * 2);
        for (let i = 0; i < numPoints * 2; i++) {
          points[i] = dv.getFloat64(idx, true);
          idx += 8;
        }

        content = { minX, minY, maxX, maxY, parts, points };
        break;

      default:
        // NULL 或其他未支援的型別 - 理論上不應該執行到此
        throw new Error(`不支援的 ShapeType: ${type}`);
    }

    return { type, content };
  }

  /**
   * 解析 .dbf 屬性資料檔 (徹底現代化重構)
   * @param arrayBuffer DBF二進位資料
   * @param encoding 使用者選擇的編碼，如 'big5' 或 'utf-8'
   */
  public parseDbf(arrayBuffer: ArrayBuffer, encoding: string): DbfRecord[] {
    const dv = new DataView(arrayBuffer);
    const numberOfRecords = dv.getInt32(4, true);
    const bytesInHeader = dv.getInt16(8, true);
    const bytesInRecord = dv.getInt16(10, true);

    const decoder = new TextDecoder(encoding);

    // 1. 解析欄位定義清單 (Fields Descriptor)
    const fields: DbfField[] = [];
    let fieldIdx = 32; // 欄位描述從第 32 位元組開始

    while (fieldIdx < bytesInHeader - 1) {
      if (dv.getUint8(fieldIdx) === 0x0d) break; // 遇見結束訊號則跳出

      // 讀取欄位名稱 (固定 11 位元組長度)
      const nameBuffer = arrayBuffer.slice(fieldIdx, fieldIdx + 11);
      // 去除結尾的空字元 \0
      const nameEnd = new Uint8Array(nameBuffer).indexOf(0);
      const name = decoder.decode(nameBuffer.slice(0, nameEnd !== -1 ? nameEnd : 11)).trim();

      const type = String.fromCharCode(dv.getUint8(fieldIdx + 11));
      const fieldLength = dv.getUint8(fieldIdx + 16);

      fields.push({ name, type, fieldLength });
      fieldIdx += 32;
    }

    // 2. 解析每筆屬性紀錄資料
    const records: DbfRecord[] = [];
    let recordIdx = bytesInHeader;

    for (let i = 0; i < numberOfRecords; i++) {
      // 每一筆紀錄的第一個位元組為刪除標記 (0x20 為正常, 0x2a 為已刪除)
      const isDeleted = dv.getUint8(recordIdx) === 0x2a;
      let currentOffset = recordIdx + 1;

      const record: DbfRecord = {};

      for (const field of fields) {
        const rawValueBuffer = arrayBuffer.slice(currentOffset, currentOffset + field.fieldLength);
        const valueStr = decoder.decode(rawValueBuffer).trim();

        // 依欄位型別做基礎轉換
        if (field.type === 'N' || field.type === 'F') {
          record[field.name] = valueStr.includes('.') ? parseFloat(valueStr) : parseInt(valueStr, 10);
        } else {
          record[field.name] = valueStr;
        }
        currentOffset += field.fieldLength;
      }

      if (!isDeleted) {
        records.push(record);
      }
      recordIdx += bytesInRecord;
    }

    return records;
  }
}

// 定義各種幾何型別的內容結構
export interface PointContent {
  x: number;
  y: number;
}

export interface PolylineContent {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  parts: Int32Array;
  points: Float64Array;
}

export interface PointZContent extends PointContent {
  z?: number;
  m?: number;
}

export interface PolylineZContent extends PolylineContent {
  zRange?: [number, number];
  zArray?: Float64Array;
  mRange?: [number, number];
  mArray?: Float64Array;
}

export interface MultiPointContent {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  points: Float64Array;
}

// 聯合型別：包含所有可能的內容型別
export type ShapeContent =
  | PointContent
  | PolylineContent
  | PointZContent
  | PolylineZContent
  | MultiPointContent
  | never;

export interface ShpRecord {
  number: number;
  length: number;
  shape: {
    type: ShapeType;
    content: ShapeContent;
  };
}
