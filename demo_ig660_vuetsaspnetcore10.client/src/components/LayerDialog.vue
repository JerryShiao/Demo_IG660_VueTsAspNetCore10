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
    <template #header>
      <div class="dialog-header-custom">
        <span class="panel-title">圖層控制</span>
      </div>
    </template>

    <Tabs v-model:value="activeTab">
      <TabList>
        <Tab value="system">系統圖資</Tab>
        <Tab value="history">操作歷程管理</Tab>
        <Tab value="import">加入圖層</Tab>
      </TabList>

      <TabPanels>
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

            <AccordionPanel value="electronic-maps">
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

        <TabPanel value="history">
          <p class="empty-text">暫無歷程紀錄</p>
        </TabPanel>

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
  import { ref, watch, nextTick } from 'vue';
  import interact from 'interactjs';

  // 宣告事件，用來通知父組件觸發對應功能（例如點擊 SHP 或未實作功能提示）
  const emit = defineEmits(['open-shp', 'nofunction-alert']);

  // —— PrimeVue 控制響應式變數 ——
  const isLayerPanelVisible = ref(true);           // 預設開啟
  const activeTab = ref('import');                 // 預設開啟「加入圖層」頁籤
  const activeAccordion = ref('electronic-maps');  // 預設展開「電子地圖與歷史底圖」面板
  const isTaichungLayerVisible = ref(false);       // 臺中市圖資勾選狀態

  // 封裝與 ShpDialog 相同的控制方法，供父組件調用
  const toggleDialog = () => {
    isLayerPanelVisible.value = !isLayerPanelVisible.value;
  };

  // 允許外部直接打開
  const openDialog = () => {
    isLayerPanelVisible.value = true;
  };

  // 轉發點擊事件給父組件
  const triggerNoFunctionAlert = () => emit('nofunction-alert');
  const triggerOpenShp = () => emit('open-shp');

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

  // 初始化 interactjs (從原本 MapView 移過來)
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

  // 暴露方法給父組件
  defineExpose({
    toggleDialog,
    openDialog
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
