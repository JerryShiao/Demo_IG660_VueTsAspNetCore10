/**
 * GeoJSON 相關的型別定義
 */

/**
 * GeoJSON Geometry 物件
 */
export type GeoJSONGeometry =
  | { type: 'Point'; coordinates: number[] }
  | { type: 'LineString'; coordinates: number[][] }
  | { type: 'Polygon'; coordinates: number[][][] }
  | { type: 'MultiPoint'; coordinates: number[][] }
  | { type: 'MultiLineString'; coordinates: number[][][] }
  | { type: 'MultiPolygon'; coordinates: number[][][][] }
  | { type: 'GeometryCollection'; geometries: GeoJSONGeometry[] };

/**
* GeoJSON Feature 物件
*/
export interface GeoJSONFeature {
  type: 'Feature';
  geometry: GeoJSONGeometry | null;
  properties: Record<string, unknown>;
  bbox?: number[];
}

/**
 * GeoJSON FeatureCollection 物件
 */
export interface GeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
  bbox?: number[];
}

/**
 * ArcGIS Field 型別（直接使用字符串聯合型別以符合 ArcGIS 期望）
 */
export interface FieldInfo {
  name: string;
  alias?: string;
  type?: 'big-integer' | 'blob' | 'date' | 'date-only' | 'double' | 'geometry' | 'global-id' | 'guid' | 'integer' | 'long-integer' | 'oid' | 'raster' | 'single' | 'small-integer' | 'string' | 'time-only' | 'timestamp-offset';
}

/**
 * KML 匯入資料介面
 */
export interface KmlImportData {
  geoJson: GeoJSONFeatureCollection;
  fileName: string;
  shapeType: string;
}

/**
 * 圖層記錄介面
 */
export interface LayerRecord {
  fileName: string;
  shapeType: string;
  visible: boolean;
  layer: Record<string, unknown>;
  mapInstance: Record<string, unknown>;
}
