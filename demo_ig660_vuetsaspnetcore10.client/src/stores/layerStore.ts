//【圖層管理 Pinia store】
import { defineStore } from 'pinia'; // 引入 Pinia 定義 store
import { shallowRef } from 'vue';    // 引入 Vue 的 shallowRef 用於管理圖層實例的響應式引用
import type Map from '@arcgis/core/Map'; // 引入 Map 類型
import type Layer from '@arcgis/core/layers/Layer'; // 引入 Layer 類型

/**
 * 圖層歷程記錄介面
 */
export interface LayerRecord {
  id: string;          // 唯一識別碼
  fileName: string;    // 檔案名稱
  shapeType: string;   // 圖形類型 (point/polyline/polygon)
  visible: boolean;    // 是否顯示
  createdAt: Date;     // 創建時間
  layer: Layer;        // ArcGIS 圖層實例
  mapInstance?: Map;   // Map 實例引用，用於移除圖層
}

/**
 * 圖層管理 Store
 */
export const useLayerStore = defineStore('layer', () => {
  // 圖層歷程紀錄列表
  // shallowRef 只會追蹤 layerRecords 陣列本身的增刪（.value = ... 或 .push）
  // 絕不會去深層代理裡面塞的 Layer 實例
  const layerRecords = shallowRef<LayerRecord[]>([]);

  /**
   * 新增圖層歷程紀錄
   */
  const addLayerRecord = (record: Omit<LayerRecord, 'id' | 'createdAt'>) => {
    const newRecord: LayerRecord = {
      ...record,
      id: `layer_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
      createdAt: new Date()
    };
    // shallowRef 的陣列操作需要觸發更新，用解構賦值重新塞入
    layerRecords.value = [...layerRecords.value, newRecord];
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
      // 移除陣列項目並觸發 shallowRef 更新
      layerRecords.value = layerRecords.value.filter(r => r.id !== id);
    }
  };

  /**
   * 更新圖層顯示狀態
   */
  const toggleLayerVisibility = (id: string) => {
    layerRecords.value = layerRecords.value.map(record => {
      if (record.id === id && record.layer) {
        record.visible = !record.visible;
        record.layer.visible = record.visible;
      }
      return record;
    });
  };

  /**
   * 設定圖層顯示狀態
   */
  const setLayerVisibility = (id: string, visible: boolean) => {
    layerRecords.value = layerRecords.value.map(record => {
      if (record.id === id && record.layer) {
        record.visible = visible;
        record.layer.visible = visible;
      }
      return record;
    });
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
