<!--圖層控制 跳窗-->
<template>
  <Dialog v-model:visible="isLayerPanelVisible"
          header="圖層管理選單"
          :modal="false"
          :draggable="false"
          :resizable="false"
          :maximizable="true"
          position="topright"
          :style="{
            position: 'absolute',
            width: '450px',
            height: '500px',
            top: '72px',
            left: 'calc(100vw - 470px)'
          }"
          class="layer-resizable-dialog"
          @hide="isLayerPanelVisible = false">

    <!--標題-->
    <template #header>
      <div class="dialog-header-custom">
        <span class="panel-title">圖層控制</span>
      </div>
    </template>

    <!--內容-->
    <Tabs v-model:value="activeTab">
      <!--功能頁籤-->
      <TabList>
        <Tab value="system">系統圖資</Tab>
        <Tab value="history">操作歷程管理</Tab>
        <Tab value="import">加入圖層</Tab>
      </TabList>

      <TabPanels>
        <!--頁籤：系統圖資 ======================================================================================== -->
        <TabPanel value="system">
          <Accordion :value="activeAccordion">
            <AccordionPanel value="3d-models">
              <AccordionHeader>
                <span>三維模型與建物圖層</span>
                <i class="pi pi-info-circle info-icon"></i>
              </AccordionHeader>
              <AccordionContent>
                <div id="layer-3d-models" class="layer-content-box"></div>
              </AccordionContent>
            </AccordionPanel>

            <AccordionPanel value="regions">
              <AccordionHeader>
                <span>區域範圍與圖面標註</span>
                <i class="pi pi-info-circle info-icon"></i>
              </AccordionHeader>
              <AccordionContent>
                <div id="layer-regions" class="layer-content-box"></div>
              </AccordionContent>
            </AccordionPanel>

            <AccordionPanel value="cadastral">
              <AccordionHeader>
                <span>地段與地籍相關圖資</span>
                <i class="pi pi-info-circle info-icon"></i>
              </AccordionHeader>
              <AccordionContent>
                <div id="layer-cadastral" class="layer-content-box"></div>
              </AccordionContent>
            </AccordionPanel>

            <AccordionPanel value="environment">
              <AccordionHeader>
                <span>自然環境與管制資訊</span>
                <i class="pi pi-info-circle info-icon"></i>
              </AccordionHeader>
              <AccordionContent>
                <div id="layer-environment" class="layer-content-box"></div>
              </AccordionContent>
            </AccordionPanel>

            <AccordionPanel value="urban-planning">
              <AccordionHeader>
                <span>都計與非都土地使用</span>
                <i class="pi pi-info-circle info-icon"></i>
              </AccordionHeader>
              <AccordionContent>
                <div id="layer-urban-planning" class="layer-content-box"></div>
              </AccordionContent>
            </AccordionPanel>

            <AccordionPanel value="satellite">
              <AccordionHeader>
                <span>航拍與衛星影像圖資</span>
                <i class="pi pi-info-circle info-icon"></i>
              </AccordionHeader>
              <AccordionContent>
                <div id="layer-satellite" class="layer-content-box"></div>
              </AccordionContent>
            </AccordionPanel>

        *      <AccordionPanel value="electronic-maps">
              <AccordionHeader>
                <span>電子地圖與歷史底圖</span>
                <i class="pi pi-info-circle info-icon"></i>
              </AccordionHeader>
              <AccordionContent>
                <div id="layer-electronic-maps" class="layer-content-box"></div>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>

          <div class="action-button-group">
            <Button label="更多歷史底圖" size="small" severity="info" @click="triggerNoFunctionAlert" />
            <Button label="回到預設底圖" size="small" severity="secondary" @click="triggerNoFunctionAlert" />
            <Button label="目前開啟圖層" size="small" severity="success" @click="triggerNoFunctionAlert" />
          </div>

          <div class="checkbox-container">
            <Checkbox v-model="isTaichungLayerVisible" inputId="tc-layer-checkbox" :binary="true" disabled />
            <label for="tc-layer-checkbox"> 同時顯示臺中市圖資 </label>
          </div>
        </TabPanel>

        <!--頁籤：操作歷程管理 ==================================================================================== -->
        <TabPanel value="history">
          <div v-if="layerStore.layerRecords.length === 0" class="empty-text">
            暫無歷程紀錄
          </div>
          <div v-else class="history-list">
            <div v-for="record in layerStore.layerRecords" :key="record.id" class="history-item">
              <div class="item-header">
                <div class="item-info">
                  <p class="item-name">{{ record.fileName }}</p>
                  <p class="item-meta">
                    <span class="shape-type-badge" :title="getShapeTypeTooltip(record.shapeType)">
                      <span class="shape-icon">{{ getShapeTypeIcon(record.shapeType) }}</span>
                      {{ getShapeTypeName(record.shapeType) }}
                    </span>
                    · {{ formatDate(record.createdAt) }}
                  </p>
                </div>
                <div class="item-actions">
                  <button :class="['action-btn']"
                          :title="record.visible ? '隱藏圖層' : '顯示圖層'"
                          @click="toggleLayerVisibility(record.id)"
                          aria-label="切換圖層顯示">
                    <i :class="record.visible ? 'pi pi-eye' : 'pi pi-eye-slash'"></i>
                  </button>
                  <button class="action-btn delete-btn"
                          title="刪除圖層"
                          @click="deleteLayer(record.id)"
                          aria-label="刪除圖層">
                    <i class="pi pi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        <!--頁籤：加入圖層 ======================================================================================== -->
        <TabPanel value="import">
          <div class="import-grid">
            <Button label="SHP" severity="contrast" raised @click="triggerOpenShp" />
            <Button label="KML" severity="contrast" raised @click="triggerNoFunctionAlert" />
            <Button label="DXF" severity="contrast" raised @click="triggerNoFunctionAlert" />
            <Button label="CSV 地號" severity="contrast" raised @click="triggerNoFunctionAlert" />
            <Button label="CSV 坐標" severity="contrast" raised @click="triggerNoFunctionAlert" />
            <Button label="XML(建物模型)" severity="secondary" raised @click="triggerNoFunctionAlert" />
            <Button label="ZPB(建物平面圖)" severity="secondary" raised @click="triggerNoFunctionAlert" />
            <Button label="載入地圖服務" severity="warn" raised @click="triggerNoFunctionAlert" />
            <Button label="資料說明" severity="warn" raised @click="triggerNoFunctionAlert" />
          </div>
        </TabPanel>

      </TabPanels>
    </Tabs>
  </Dialog>
</template>

<script setup lang="ts">
  //【引入】=====================================================================
  import {
    ref,        // 響應式變數
    watch,      // 監聽變數變化
    nextTick    // 在 DOM 更新後執行
  } from 'vue'; // Vue核心功能
  import interact from 'interactjs'; // 拖放與調整大小庫
  import { useLayerStore } from '../stores/layerStore'; // 圖層狀態管理 
  import Swal from 'sweetalert2'; // 美化彈窗庫

  //【宣告】=====================================================================
  // 宣告事件，用來通知父組件觸發對應功能（例如點擊 SHP 或未實作功能提示）
  const emit = defineEmits(['open-shp', 'nofunction-alert']);

  // —— PrimeVue 控制響應式變數 ——
  const isLayerPanelVisible = ref(true);           // 預設開啟
  const activeTab = ref('import');                 // 預設開啟「加入圖層」頁籤
  const activeAccordion = ref('electronic-maps');  // 預設展開「電子地圖與歷史底圖」面板
  const isTaichungLayerVisible = ref(false);       // 臺中市圖資勾選狀態
  const layerStore = useLayerStore();              // 圖層狀態管理實例

  /**
 * ShapeType 列舉對應表
 */
  const ShapeTypeMap: Record<number | string, { name: string; icon: string; tooltip: string }> = {
    0: { name: 'NULL', icon: '⚠️', tooltip: '空值類型' },
    1: { name: 'POINT', icon: '🔵', tooltip: '點狀圖形' },
    3: { name: 'POLYLINE', icon: '〰️', tooltip: '線狀圖形' },
    5: { name: 'POLYGON', icon: '⬜', tooltip: '面狀圖形' },
    8: { name: 'MULTIPOINT', icon: '⭕', tooltip: '多點圖形' },
    11: { name: 'POINTZ', icon: '🔵', tooltip: '3D 點狀圖形' },
    13: { name: 'POLYLINEZ', icon: '〰️', tooltip: '3D 線狀圖形' },
    15: { name: 'POLYGONZ', icon: '⬜', tooltip: '3D 面狀圖形' }
  };

  //【生命週期】===================================================================
  // 監聽器：當視窗打開時，重新綁定 interactjs 縮放與拖拽
  watch(
    isLayerPanelVisible,
    (newVal) => {
      if (newVal) {
        // 使用 nextTick 確保 Vue 已將 Dialog 渲染至 DOM，
        nextTick(() => {
          setTimeout(() => {
            initInteractDialog();
          }, 50); // 延遲 50 毫秒，確保 PrimeVue Dialog 完全開起並掛載完畢
        });
      }
    },
    { immediate: true } // 👈 加上 immediate: true，讓網頁一打開 (初次建立) 就立刻執行一次這個監聽器
  );

  //【方法】=======================================================================

  //#region ◆初始化 interactjs [initInteractDialog]
  /**
   * 初始化 interactjs
   */
  const initInteractDialog = () => {
    nextTick(() => {
      const dialogElem = document.querySelector('.layer-resizable-dialog') as HTMLElement;
      if (!dialogElem) return;

      interact(dialogElem).unset();

      interact(dialogElem)
        .resizable({
          edges: { left: true, right: true, bottom: true, top: true },
          listeners: {
            start(event) {
              if (event.target.classList.contains('p-dialog-maximized')) {
                return false;
              }
            },
            move(event) {
              const target = event.target;
              if (target.classList.contains('p-dialog-maximized')) return;

              let x = parseFloat(target.getAttribute('data-x') || '0');
              let y = parseFloat(target.getAttribute('data-y') || '0');

              target.style.width = event.rect.width + 'px';
              target.style.height = event.rect.height + 'px';

              x += event.deltaRect.left;
              y += event.deltaRect.top;

              target.style.transform = `translate(${x}px, ${y}px)`;

              target.setAttribute('data-x', x.toString());
              target.setAttribute('data-y', y.toString());
            }
          },
          modifiers: [
            interact.modifiers.restrictSize({
              min: { width: 350, height: 400 },
              max: { width: 800, height: 800 }
            })
          ]
        })
        .draggable({
          allowFrom: '.p-dialog-header',
          listeners: {
            move(event) {
              const target = event.target;
              let x = parseFloat(target.getAttribute('data-x') || '0');
              let y = parseFloat(target.getAttribute('data-y') || '0');

              x += event.dx;
              y += event.dy;

              target.style.transform = `translate(${x}px, ${y}px)`;

              target.setAttribute('data-x', x.toString());
              target.setAttribute('data-y', y.toString());
            }
          }
        });
    });
  };
  //#endregion

  //#region ◆點擊 [圖層控制] 按鈕，切換圖層面板顯示狀態 [toggleDialog]
  /**
   * 點擊 [圖層控制] 按鈕，切換圖層面板顯示狀態 (提供給外部元件呼叫)
   */
  const toggleDialog = () => {
    isLayerPanelVisible.value = !isLayerPanelVisible.value;
  };
  //#endregion

  //#region ◆開啟視窗 [openDialog]
  /**
   * 開啟視窗 (提供給外部元件呼叫)
   */
  const openDialog = () => {
    isLayerPanelVisible.value = true; // 打開視窗
  };
  //#endregion

  //#region ◆功能停用提示 [triggerNoFunctionAlert]
  /**
   * 功能停用提示 (轉發事件給父組件)
   */
  const triggerNoFunctionAlert = () => emit('nofunction-alert');
  //#endregion

  //#region ◆開啟SHP檔案上傳對話框 [triggerOpenShp]
  /**
   * 開啟SHP檔案上傳對話框 (轉發事件給父組件)
   */
  const triggerOpenShp = () => emit('open-shp');
  //#endregion

  //#region ◆切換圖層顯示狀態 [toggleLayerVisibility]
  /**
   * 切換圖層顯示狀態
   */
  const toggleLayerVisibility = (layerId: string) => {
    layerStore.toggleLayerVisibility(layerId);
  };
  //#endregion

  //#region ◆刪除圖層 [deleteLayer]
  /**
   * 刪除圖層 (先確認後刪除)
   */
  const deleteLayer = (layerId: string) => {
    const record = layerStore.getLayerRecord(layerId);
    if (!record) return;

    Swal.fire({
      title: '確認刪除',
      text: `確定要刪除圖層「${record.fileName}」嗎？此操作無法恢復。`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '刪除',
      cancelButtonText: '取消',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280'
    }).then((result) => {
      if (result.isConfirmed) {
        layerStore.removeLayerRecord(layerId);
        Swal.fire({
          title: '已刪除',
          text: '圖層已從地圖移除',
          icon: 'success',
          timer: 1500
        });
      }
    });
  };
  //#endregion

  //#region ◆格式化日期 [formatDate]
  /**
   * 格式化日期為本地時間字符串
   */
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  //#endregion

  /**
  * 根據 shapeType 返回對應的圖示 class
  */
  const getShapeTypeIcon = (shapeType: number | string): string => {
    const key = typeof shapeType === 'string' ? parseInt(shapeType, 10) : shapeType;
    return ShapeTypeMap[key]?.icon || 'pi-question';
  };

  /**
 * 根據 shapeType 返回對應的名稱
 */
  const getShapeTypeName = (shapeType: number | string): string => {
    const key = typeof shapeType === 'string' ? parseInt(shapeType, 10) : shapeType;
    return ShapeTypeMap[key]?.name || '未知類型';
  };

  /**
   * 根據 shapeType 返回對應的 Tooltip 說明
   */
  const getShapeTypeTooltip = (shapeType: number | string): string => {
    const key = typeof shapeType === 'string' ? parseInt(shapeType, 10) : shapeType;
    return ShapeTypeMap[key]?.tooltip || '未知圖形類型';
  };

  // 暴露方法給父組件
  defineExpose({
    toggleDialog, // 👈 讓父組件可以直接呼叫 toggleDialog 方法來切換圖層面板顯示狀態
    openDialog    // 👈 讓父組件可以直接呼叫 openDialog 方法來開啟視窗
  });
</script>

<style scoped>
  /* 這裡只保留原本專屬於圖層控制跳窗內的樣式，維持排版 */
  .panel-title {
    font-weight: bold;
    font-size: 16px;
    color: #334155;
  }

  .info-icon {
    color: #64748b;
    margin-left: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: color 0.2s;
  }

    .info-icon:hover {
      color: #3b82f6;
    }

  .layer-content-box {
    min-height: 20px;
    padding: 4px 0;
  }

  .action-button-group {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
    margin-top: 12px;
  }

  .checkbox-container {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
    padding: 4px;
  }

  .empty-text {
    color: #94a3b8;
    text-align: center;
    padding: 20px 0;
  }

  .import-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    padding: 4px 0;
  }

  /*【歷程列表】樣式 BEGIN ========================*/
  .history-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .history-item {
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 10px;
    background-color: #f8fafc;
    transition: all 0.2s;
  }

    .history-item:hover {
      background-color: #eef2f5;
      border-color: #cbd5e1;
    }

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }

  .item-info {
    flex: 1;
    min-width: 0; /* 允許文字省略 */
  }

  .item-name {
    margin: 0;
    font-weight: 600;
    font-size: 13px;
    color: #1e293b;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item-meta {
    margin: 2px 0 0 0;
    font-size: 12px;
    color: #64748b;
  }

  .item-actions {
    display: flex;
    gap: 4px;
  }

  .action-btn {
    padding: 4px 6px;
    border: 1px solid #cbd5e1;
    background-color: #ffffff;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    color: #475569;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    min-height: 28px;
    flex-shrink: 0;
    position: relative;
    z-index: 10;
  }

    .action-btn i {
      font-size: 16px;
      line-height: 1;
    }

    .action-btn:hover {
      background-color: #e2e8f0;
      border-color: #94a3b8;
    }

    .action-btn:active {
      transform: scale(0.95);
    }

    .action-btn.hidden {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: auto;
    }

      .action-btn.hidden:hover {
        background-color: #ffffff;
        border-color: #cbd5e1;
      }

  .delete-btn {
    color: #ef4444;
  }

  .shape-type-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.75rem;
    background-color: #f3f4f6;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    cursor: help;
    transition: background-color 0.2s;
  }

    .shape-type-badge:hover {
      background-color: #e5e7eb;
    }

    .shape-type-badge i {
      font-size: 1rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  /*【歷程列表】樣式 END ========================*/
</style>

<style>
  /*【跳窗】BEGIN =====================================================*/
  /* 確保關閉 PrimeVue 內建溢出限制，讓外層可以觸發 interact 邊緣 */
  .layer-resizable-dialog {
    touch-action: none; /* 防止手機板瀏覽器預設拖動行為 */
    box-sizing: border-box;
    position: absolute !important;
    right: auto !important; /* 👈 強制解除右邊錨點定死的問題 */
  }

    /* 移除 PrimeVue 原本右下角的單一縮放控制點圖示 */
    .layer-resizable-dialog .p-dialog-resizable-handle {
      display: none !important;
    }

    /* 當 Dialog 處於最大化狀態時的強制覆寫 */
    .layer-resizable-dialog.p-dialog-maximized {
      /* 強制將原本覆蓋在行內的寬高與位移移除，還原給 PrimeVue 的 100% 滿版設定 */
      width: 100vw !important;
      height: 100vh !important;
      top: 0 !important;
      left: 0 !important;
      transform: none !important; /* 👈 清除 translate 偏移動作 */
    }

      /* 最大化時，隱藏四周縮放的鼠標指針，避免干擾 */
      .layer-resizable-dialog.p-dialog-maximized .p-dialog-header {
        cursor: default !important; /* 標題列不可拖拽，滑鼠改回普通指標 */
      }
  /*【跳窗】END =======================================================*/
</style>
