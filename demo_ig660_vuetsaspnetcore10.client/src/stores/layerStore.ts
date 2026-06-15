//【圖層管理 Pinia store】
import { defineStore } from 'pinia'; // 引入 Pinia 定義 store
import { ref } from 'vue';           // 引入 Vue 的 ref 用於響應式狀態
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer'; // 引入 ArcGIS GeoJSONLayer 類別
import type Map from '@arcgis/core/Map'; // 引入 Map 類型

/**
 * 圖層歷程記錄介面
 */
export interface LayerRecord {
  id: string;          // 唯一識別碼
  fileName: string;    // 檔案名稱
  shapeType: string;   // 圖形類型 (point/polyline/polygon)
  visible: boolean;    // 是否顯示
  createdAt: Date;     // 創建時間
  layer: GeoJSONLayer; // ArcGIS 圖層實例
  mapInstance?: Map;   // Map 實例引用，用於移除圖層
}

/**
 * 圖層管理 Store
 */
export const useLayerStore = defineStore('layer', () => {
  // 圖層歷程紀錄列表
  const layerRecords = ref<LayerRecord[]>([]);

  /**
   * 新增圖層歷程紀錄
   */
  const addLayerRecord = (record: Omit<LayerRecord, 'id' | 'createdAt'>) => {
    const newRecord: LayerRecord = {
      ...record,
      id: `layer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date()
    };
    layerRecords.value.push(newRecord);
    return newRecord;
  };

  /**
   * 移除圖層歷程紀錄
   */
  const removeLayerRecord = (id: string) => {
    const index = layerRecords.value.findIndex(r => r.id === id);
    if (index > -1) {
      const record = layerRecords.value[index];
      // 從地圖移除圖層
      if (record?.layer && record?.mapInstance) {
        // 使用 eslint-disable 註釋允許 unsafe-argument
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        record.mapInstance.remove(record.layer);
      }
      layerRecords.value.splice(index, 1);
    }
  };

  /**
   * 更新圖層顯示狀態
   */
  const toggleLayerVisibility = (id: string) => {
    const record = layerRecords.value.find(r => r.id === id);
    if (record) {
      record.visible = !record.visible;
      if (record.layer) {
        record.layer.visible = record.visible;
      }
    }
  };

  /**
   * 設定圖層顯示狀態
   */
  const setLayerVisibility = (id: string, visible: boolean) => {
    const record = layerRecords.value.find(r => r.id === id);
    if (record) {
      record.visible = visible;
      if (record.layer) {
        record.layer.visible = visible;
      }
    }
  };

  /**
   * 清除所有圖層歷程紀錄
   */
  const clearAllRecords = () => {
    layerRecords.value.forEach((record) => {
      if (record?.layer && record?.mapInstance) {
        // 使用 mapInstance 的 remove 方法移除圖層
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        record.mapInstance.remove(record.layer);
      }
    });
    layerRecords.value = [];
  };

  /**
   * 取得圖層歷程紀錄
   */
  const getLayerRecord = (id: string) => {
    return layerRecords.value.find(r => r.id === id);
  };

  return {
    layerRecords,          // 圖層歷程紀錄列表
    addLayerRecord,        // 新增圖層歷程紀錄
    removeLayerRecord,     // 移除圖層歷程紀錄
    toggleLayerVisibility, // 切換圖層顯示狀態
    setLayerVisibility,    // 設定圖層顯示狀態
    clearAllRecords,       // 清除所有圖層歷程紀錄
    getLayerRecord         // 取得圖層歷程紀錄
  };
});
