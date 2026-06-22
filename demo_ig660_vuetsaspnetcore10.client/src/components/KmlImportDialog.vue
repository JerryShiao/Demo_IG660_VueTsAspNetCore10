<!-- 圖層控制 / 加入圖層 / KML 跳窗-->
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
          class="kml-resizable-dialog">

    <div class="p-4 bg-[#f9f8f6] rounded-b-xl flex flex-col gap-4">
      <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">

        <!--檔案上傳-->
        <div class="flex flex-col items-start w-full">
          <!--檔案上傳 input (隱藏)-->
          <input ref="fileInput"
                 type="file"
                 accept=".kml"
                 style="display: none"
                 @change="onFileSelect" />
          <!--檔案上傳 Button-->
          <Button @click="openFilePicker"
                  :pt="{ root: { class: 'w-full bg-[#00bfa5] hover:bg-[#00a68f] border-none rounded-lg text-white font-bold py-3 justify-center text-lg' } }">
            <div class="flex items-center justify-center gap-2">
              <i class="pi pi-folder-open font-bold"></i>
              <span>選擇檔案 (.kml)</span>
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
              {{ Math.max(1, (selectedFile.size / 1024).toFixed(0)) }} kb
            </div>
            <div v-if="!selectedFile" class="mt-3 text-gray-700 text-sm leading-relaxed px-2 break-all">
              ---
            </div>
          </div>
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
            ※標準 KML 檔案預設採用 WGS84 座標系統 (EPSG:4326)。
          </p>
        </div>

        <!--[開始匯入]按鈕-->
        <div class="flex flex-col gap-3 mt-2">
          <Button :disabled="!selectedFile || loading"
                  :loading="loading"
                  @click="processKml"
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
  import interact from 'interactjs';     // 用於實現拖放和調整大小的庫
  import Swal from 'sweetalert2';        // 用於顯示美觀的彈窗提示
  import { kml } from '@tmcw/togeojson'; // 用於將 KML 轉換為 GeoJSON 的庫

  //【宣告】=====================================================================
  const emit = defineEmits(['onImportComplete', 'onError']); // 定義組件事件

  // 控制視窗顯示狀態
  const isDialogVisible = ref(false);          // 控制 Dialog 顯示
  const dialogTitle = ref("KML 匯入");         // Dialog 標題
  const dialogWidth = ref("464px");            // Dialog 預設寬度
  const loading = ref(false);                  // 加載狀態
  const selectedFile = ref<File | null>(null); // 使用者選擇的檔案
  const showNotes = ref(true); // 控制注意事項顯示/隱藏

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

  //【方法】===================================================================

  //#region ◆初始化 interactjs [initInteractDialog]
  /**
   * 初始化 interactjs
   */
  const initInteractDialog = () => {
    nextTick(() => {
      const dialogElem = document.querySelector('.kml-resizable-dialog') as HTMLElement;
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

  //#region ◆讀取並解析 KML 核心主程式 [processKml]
  /**
   * ◆讀取並解析 KML 核心主程式
   */
  const processKml = async () => {
    if (!selectedFile.value) return;
    loading.value = true;

    try {
      // 1. 將檔案讀取為文字字串 (KML 本質上是 XML 文字)
      const kmlText = await readAsTextAsync(selectedFile.value);

      // 2. 利用瀏覽器自帶的 DOMParser 解析 XML
      const parser = new DOMParser();
      const kmlDoc = parser.parseFromString(kmlText, 'text/xml');

      // 檢查 XML 是否有解析錯誤
      const parserError = kmlDoc.querySelector('parsererror');
      if (parserError) {
        throw new Error('KML 檔案格式錯誤，無法正確解析 XML 內容。');
      }

      // 3. 轉為 GeoJSON
      let finalGeoJson;

      // 嘗試使用 togeojson 轉換
      finalGeoJson = kml(kmlDoc);

      // 4. 清理 GeoJSON 中不被支援的欄位
      finalGeoJson = cleanGeoJsonForArcGIS(finalGeoJson);

      // 5. 發送成功事件給父元件
      emit('onImportComplete', {
        geoJson: finalGeoJson,
        fileName: selectedFile.value.name,
        shapeType: 'KML' // 標記來源類型
      });

      // 5. 顯示成功訊息
      Swal.fire({
        icon: 'success',
        title: '匯入成功',
        text: 'KML 圖資已成功匯入！'
      });

      // 關閉視窗
      isDialogVisible.value = false;
    }
    catch (error: any) {
      // 顯示錯誤訊息
      console.error(error);
      Swal.fire({
        icon: 'warning',
        title: '匯入失敗',
        text: error.message || '讀取 KML 圖資失敗，請檢查檔案格式。'
      });
      emit('onError', error.message || '讀取 KML 圖資失敗，請檢查檔案格式。');
    }
    finally {
      selectedFile.value = null; // 重置狀態
      loading.value = false;     // 關閉 Loading
    }
  };
  //#endregion

  //#region ◆輔助函式：將 File 物件讀取為文字字串 [readAsTextAsync]
  /**
   * 輔助方法：利用 FileReader 將 File 物件異步轉換為文字
   */
  const readAsTextAsync = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('檔案讀取中斷或失敗。'));
      reader.readAsText(file);
    });
  };
  //#endregion

  //#region ◆輔助函式：清理 GeoJSON 以相容 ArcGIS [cleanGeoJsonForArcGIS]
  /**
   * 清理 GeoJSON 中不被 ArcGIS GeoJSONLayer 支援的欄位
   */
  const cleanGeoJsonForArcGIS = (geoJson: any) => {
    // 不被 ArcGIS 支援的欄位清單
    const unsupportedFields = [
      'title',
      'id',
      'visibility',
      'icon-offset',
      'icon-offset-units',
      '@geometry-type',
      'open',
      '_properties'
    ];

    if (geoJson.features && Array.isArray(geoJson.features)) {
      geoJson.features.forEach((feature: any) => {
        if (feature.properties) {
          unsupportedFields.forEach(field => {
            delete feature.properties[field];
          });
        }
      });
    }

    return geoJson;
  };
  //#endregion

  const fileInput = ref<HTMLInputElement>();

  const openFilePicker = () => {
    fileInput.value?.click();
  };

  // 開放方法給外部 View 元件控制開啟
  defineExpose({
    openDialog: () => { isDialogVisible.value = true; }
  });
</script>


<style>
  /* 確保關閉 PrimeVue 內建溢出限制，讓外層可以觸發 interact 邊緣 */
  .kml-resizable-dialog {
    touch-action: none; /* 防止手機板瀏覽器預設拖動行為 */
    box-sizing: border-box;
    position: absolute !important;
    right: auto !important; /* 解除右邊錨點定死問題 */
  }

    /* 移除 PrimeVue 原本右下角的單一縮放控制點圖示 */
    .kml-resizable-dialog .p-dialog-resizable-handle {
      display: none !important;
    }

    /* 當 Dialog 處於最大化狀態時的強制覆寫 */
    .kml-resizable-dialog.p-dialog-maximized {
      /* 強制將原本覆蓋在行內的寬高與位移移除，還原給 PrimeVue 的 100% 滿版設定 */
      width: 100vw !important;
      height: 100vh !important;
      top: 0 !important;
      left: 0 !important;
      transform: none !important; /* 👈 清除 translate 偏移動作 */
    }

      /* 最大化時，隱藏四周縮放的鼠標指針，避免干擾 */
      .kml-resizable-dialog.p-dialog-maximized .p-dialog-header {
        cursor: default !important; /* 標題列不可拖拽，滑鼠改回普通指標 */
      }
</style>
