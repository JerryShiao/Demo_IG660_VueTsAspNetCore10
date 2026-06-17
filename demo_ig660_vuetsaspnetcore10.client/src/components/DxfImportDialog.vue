<!-- 圖層控制 / 加入圖層 / DXF 跳窗-->
<template>
  <Dialog v-model:visible="isDialogVisible"
          :header="dialogTitle"
          :modal="true"
          :draggable="false"
          :resizable="false"
          :maximizable="true"
          :style="{ width: dialogWidth, position: 'absolute' }"
          :breakpoints="{ '960px': '95vw' }"
          :contentStyle="{ height: '600px', padding: '0' }"
          class="dxf-resizable-dialog">

    <div class="p-4 bg-[#f9f8f6] rounded-b-xl flex flex-col gap-4">
      <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">

        <!--檔案上傳-->
        <div class="flex flex-col items-start w-full">
          <!--檔案上傳 input (隱藏)-->
          <input ref="fileInput"
                 type="file"
                 accept=".dxf"
                 style="display: none"
                 @change="onFileSelect" />
          <!--檔案上傳 Button-->
          <Button @click="openFilePicker"
                  :pt="{ root: { class: 'w-full bg-[#00bfa5] hover:bg-[#00a68f] border-none rounded-lg text-white font-bold py-3 justify-center text-lg' } }">
            <div class="flex items-center justify-center gap-2">
              <i class="pi pi-folder-open font-bold"></i>
              <span>選擇檔案 (.dxf)</span>
            </div>
          </Button>

          <!--檔案名稱 顯示-->
          <div style="display: flex; justify-content: flex-start;">
            檔案：
            <div v-if="selectedFile" class="mt-3  text-gray-700 text-sm leading-relaxed px-2 break-all">
              {{ selectedFile.name }}
            </div>
            <div v-if="!selectedFile" class="mt-3 text-gray-700 text-sm leading-relaxed px-2 break-all">
              未上傳
            </div>
          </div>
          <!--檔案大小 顯示-->
          <div style="display: flex; justify-content: flex-start;">
            大小：
            <div v-if="selectedFile" class="mt-3 text-gray-700 text-sm leading-relaxed px-2 break-all">
              {{ (selectedFile.size / 1024).toFixed(0) }} kb
            </div>
            <div v-if="!selectedFile" class="mt-3 text-gray-700 text-sm leading-relaxed px-2 break-all">
              ---
            </div>
          </div>
        </div>

        <!--坐標系統-->
        <div class="flex items-stretch border border-gray-300 rounded-lg overflow-hidden h-11">
          <div class="flex items-center justify-center font-bold px-6" style="background-color: #eceae6; color: #222; min-width:95px; height:44px; display: flex; align-items: center; justify-content: center;">
            坐標系統
          </div>
          <Select id="epsg"
                  v-model="selectedEpsg"
                  :options="epsgOptions"
                  optionLabel="label"
                  optionValue="value"
                  class="flex-1 border-none focus:ring-0"
                  :pt="{
                    root: { class: 'border-none shadow-none h-full items-center' },
                    label: { class: 'text-sm text-gray-800 font-medium pl-3' }
                  }" />
        </div>

        <!--編碼方式-->
        <div class="flex items-stretch border border-gray-300 rounded-lg overflow-hidden h-11">
          <div class="flex items-center justify-center font-bold px-6" style="background-color: #eceae6; color: #222; min-width:95px; height:44px; display: flex; align-items: center; justify-content: center;">
            編碼方式
          </div>
          <Select id="encoding"
                  v-model="selectedEncoding"
                  :options="encodingOptions"
                  optionLabel="label"
                  optionValue="value"
                  class="flex-1 border-none focus:ring-0"
                  :pt="{
                    root: { class: 'border-none shadow-none h-full items-center' },
                    label: { class: 'text-sm text-gray-800 font-medium pl-3' }
                  }" />
        </div>


        <div class="flex items-center gap-2 mt-2 mb-2">
          <button @click="showNotes = !showNotes"
                  class="hover:opacity-80 font-bold text-sm flex items-center gap-1"
                  style="color: #dc5e5e;">
            <i :class="showNotes ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"></i>
            注意事項
          </button>
        </div>

        <div v-if="showNotes" class="text-xs leading-relaxed space-y-1 p-3 rounded-lg"
             style="color: #dc5e5e; background-color: #fdf0f0;">
          <p>
            ※本線上系統藉由瀏覽器執行，<br>
            效能無法與一般單機程式相同，<br>
            過多的圖徵可能會讀取失敗或不穩。
          </p>
          <br>
          <p>
            ※讀取後，屬性若出現亂碼，可能是編碼錯誤，<br>
            請切換編碼後，重新載入看看。
          </p>
        </div>

        <div class="flex flex-col gap-3 mt-2">
          <Button :disabled="!selectedFile || loading"
                  :loading="loading"
                  @click="processDXF"
                  class="w-full bg-[#00bfa5] hover:bg-[#00a68f] border-none text-white font-bold py-3 rounded-lg text-lg flex justify-center items-center gap-2 shadow-sm">
            <i class="pi pi-upload font-bold"></i>
            <span>開始匯入</span>
          </Button>
        </div>

      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
  //【引入】=====================================================================
  import {
    ref,        // Vue 3 的響應式引用
    watch,      // 監聽響應式數據變化
    nextTick    // 在 DOM 更新後執行回調
  } from 'vue'; // Vue 3 Composition API
  import interact from 'interactjs';    // 用於實現拖放和調整大小的庫
  import Select from 'primevue/select'; // PrimeVue 的選擇組件
  import Swal from 'sweetalert2';       // 用於顯示美觀的彈窗提示
  // 引入 dxf-parser 與地理轉換工具
  import DxfParser from 'dxf-parser'; // 用於解析 DXF 文件的庫
  import { transformDxfToGeoJson } from '../utils/geoUtils'; // 工具函數：用來轉換 DXF 為 GeoJSON

  //【宣告】=====================================================================
  const emit = defineEmits(['onImportComplete', 'onError']); // 定義組件事件

  // 控制視窗顯示狀態
  const isDialogVisible = ref(false);              // 控制 Dialog 顯示
  const dialogTitle = ref("DXF 匯入");             // Dialog 標題
  const dialogWidth = ref("464px");                // Dialog 預設寬度
  const loading = ref(false);                      // 加載狀態
  const selectedFile = ref<File | null>(null);     // 使用者選擇的檔案
  const showNotes = ref(true); // 控制注意事項顯示/隱藏

  // 預設坐標系與編碼
  const selectedEpsg = ref('3826');
  const selectedEncoding = ref('utf-8');

  // 坐標系統選項
  const epsgOptions = [
    { label: '3826 (TWD97 / TM2_121)', value: '3826' },
    { label: '4326 (WGS84 經緯度)', value: '4326' },
    { label: '3857 (Web Mercator)', value: '3857' }
  ];

  // 編碼選項
  const encodingOptions = [
    { label: 'UTF-8 (萬國碼)', value: 'utf-8' },
    { label: 'BIG5 (正體中文傳統編碼)', value: 'big5' }
  ];

  //【生命週期】===================================================================
  // 監聽器：當視窗打開時，重新綁定 interactjs 縮放與拖拽
  watch(
    isDialogVisible,
    (newVal) => {
      if (newVal) {
        // 使用 nextTick 確保 Vue 已將 Dialog 渲染至 DOM，
        nextTick(() => {
          setTimeout(() => {
            initInteractDialog();
          }, 50); // 延遲 50 毫秒，確保 PrimeVue Dialog 完全開起並掛載完畢
        });
      } else {
        // Dialog 關閉時，清除上傳的檔案
        selectedFile.value = null;
      }
    },
    { immediate: true } // 👈 加上 immediate: true，讓網頁一打開 (初次建立) 就立刻執行一次這個監聽器
  );

  // 處理檔案選取事件
  const onFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      selectedFile.value = target.files[0] ?? null;
    }
  };

  const fileInput = ref<HTMLInputElement>(); // 用於觸發檔案選取的隱藏 input 元素
  const openFilePicker = () => { fileInput.value?.click(); }; // 觸發檔案選取對話框

  //【方法】===================================================================

  //#region ◆初始化 interactjs [initInteractDialog]
  /**
   * 初始化 interactjs
   */
  const initInteractDialog = () => {
    nextTick(() => {
      const dialogElem = document.querySelector('.dxf-resizable-dialog') as HTMLElement;
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

  //#region ◆解析 DXF 並轉為 GeoJSON [processDXF]
  /**
   * 解析 DXF 並轉為 GeoJSON
   */
  const processDXF = async () => {
    if (!selectedFile.value) return;
    loading.value = true;

    try {
      // 1. 將檔案讀取為 ArrayBuffer，並用對應的編碼解碼成字串
      const arrayBuffer = await selectedFile.value.arrayBuffer();
      const decoder = new TextDecoder(selectedEncoding.value);
      let dxfText = decoder.decode(arrayBuffer);

      // 防呆清洗：移除常見於一些 CAD 軟體匯出時在檔案頭尾產生的特殊 NULL 或不完整換行控制字元
      dxfText = dxfText.replace(/\0/g, '').trim();

      // 2. 初始化 dxf-parser 並解析文字
      const parser = new DxfParser();
      let parsedDxf: any = null;

      try {
        parsedDxf = parser.parseSync(dxfText);
      } catch (parseError) {
        console.warn("parseSync 發生預期外中斷，嘗試強制截取 ENTITIES 區段...", parseError);
      }

      // 3. 檢查如果 parsedDxf 為空，或者 entities 不存在，做一個備用安全機制
      if (!parsedDxf || !parsedDxf.entities || parsedDxf.entities.length === 0) {
        throw new Error('DXF 檔案內未偵測到任何有效的圖元實體(Entities)！請檢查該 DXF 檔是否包含 R12/R14 的標準線段，或改存成其他版本的 DXF 再行試試。');
      }

      // 4. 呼叫工具函式做投影轉換與 GeoJSON 包裝
      const finalGeoJson = transformDxfToGeoJson(parsedDxf, selectedEpsg.value);

      if (!finalGeoJson || finalGeoJson.features.length === 0) {
        throw new Error('轉換過程中無法提取出任何 POINT、LINE 或 POLYLINE。');
      }

      // 5. 定義 shapeType
      const hasPolygon = finalGeoJson.features.some((f: any) => f.geometry.type === 'Polygon');
      const shapeType = hasPolygon ? 'polygon' : 'polyline';

      // 6. 發送成功事件給父元件 (MapView.vue)
      emit('onImportComplete', {
        geoJson: finalGeoJson,
        fileName: selectedFile.value.name,
        shapeType: shapeType
      });

      Swal.fire({
        icon: 'success',
        title: '匯入成功',
        text: 'DXF 圖資已成功轉換並匯入！'
      });

      isDialogVisible.value = false;
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        icon: 'warning',
        title: '匯入失敗',
        text: error.message || '讀取 DXF 圖資失敗，請檢查檔案是否損壞或編碼是否正確。'
      });
      emit('onError', error.message || '讀取 DXF 失敗。');
    } finally {
      selectedFile.value = null;
      loading.value = false;
    }
  };
  //#endregion

  // 開放方法給外部 View 元件控制開啟
  defineExpose({
    openDialog: () => { isDialogVisible.value = true; }
  });</script>

<style>
  /* 確保關閉 PrimeVue 內建溢出限制，讓外層可以觸發 interact 邊緣 */
  .dxf-resizable-dialog {
    touch-action: none; /* 防止手機板瀏覽器預設拖動行為 */
    box-sizing: border-box;
    position: absolute !important;
    right: auto !important; /* 解除右邊錨點定死問題 */
  }

    /* 移除 PrimeVue 原本右下角的單一縮放控制點圖示 */
    .dxf-resizable-dialog .p-dialog-resizable-handle {
      display: none !important;
    }

    /* 當 Dialog 處於最大化狀態時的強制覆寫 */
    .dxf-resizable-dialog.p-dialog-maximized {
      /* 強制將原本覆蓋在行內的寬高與位移移除，還原給 PrimeVue 的 100% 滿版設定 */
      width: 100vw !important;
      height: 100vh !important;
      top: 0 !important;
      left: 0 !important;
      transform: none !important; /* 👈 清除 translate 偏移動作 */
    }

      /* 最大化時，隱藏四周縮放的鼠標指針，避免干擾 */
      .dxf-resizable-dialog.p-dialog-maximized .p-dialog-header {
        cursor: default !important; /* 標題列不可拖拽，滑鼠改回普通指標 */
      }
</style>
