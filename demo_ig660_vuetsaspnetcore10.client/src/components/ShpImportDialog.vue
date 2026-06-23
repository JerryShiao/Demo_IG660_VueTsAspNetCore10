<!-- 圖層控制 / 加入圖層 / SHP 跳窗-->
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
          class="shp-resizable-dialog">

    <div class="p-4 bg-[#f9f8f6] rounded-b-xl flex flex-col gap-4">
      <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">

        <!--檔案上傳-->
        <div class="flex flex-col items-start w-full">

          <div style="display:flex;">
            <!--檔案上傳 input (隱藏)-->
            <input ref="fileInput"
                   type="file"
                   accept=".zip"
                   style="display: none"
                   @change="onFileSelect" />

            <!--清除檔案 Button-->
            <Button v-if="selectedFile"
                    title="清除已選擇的檔案"
                    @click="clearSelectedFile"
                    severity="danger"
                    outlined
                    :pt="{ root: { class: 'w-full border-2 rounded-lg font-bold py-3' } }">
              <div class="flex items-center justify-center gap-2">
                <i class="pi pi-trash font-bold"></i>
                <span>清除檔案</span>
              </div>
            </Button>&ensp;

            <!--選擇檔案 Button-->
            <Button @click="openFilePicker"
                    title="選擇要匯入的檔案"
                    severity="primary"
                    :pt="{ root: { class: 'w-full border-none rounded-lg text-white font-bold py-3 text-lg' } }">
              <div class="flex items-center justify-center gap-2">
                <i class="pi pi-folder-open font-bold"></i>
                <span>選擇檔案 (.zip)</span>
              </div>
            </Button>&ensp;

            <!--開始匯入 Button-->
            <Button :disabled="!selectedFile || loading"
                    :loading="loading"
                    @click="processShpZip"
                    title="開始匯入檔案"
                    severity="success"
                    :pt="{ root: { class: 'w-full border-none rounded-lg text-white font-bold py-3 text-lg' } }">
              <div class="flex items-center justify-center gap-2">
                <i class="pi pi-upload font-bold"></i>
                <span>開始匯入</span>
              </div>
            </Button>

          </div>

          <!--檔案名稱 顯示-->
          <div style="display: flex; justify-content: flex-start;">
            <div v-if="selectedFile" class="mt-3  text-gray-700 text-sm leading-relaxed px-2 break-all">
              檔案：{{ selectedFile.name }}
            </div>
            <div v-if="!selectedFile" class="mt-3 text-gray-700 text-sm leading-relaxed px-2 break-all">
              檔案：未上傳
            </div>
          </div>

          <!--檔案大小 顯示-->
          <div style="display: flex; justify-content: flex-start;">            
            <div v-if="selectedFile" class="mt-3 text-gray-700 text-sm leading-relaxed px-2 break-all">
              大小：{{ Math.max(1, Math.round(selectedFile.size / 1024)) }} kb
            </div>
            <div v-if="!selectedFile" class="mt-3 text-gray-700 text-sm leading-relaxed px-2 break-all">
              大小：---
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2">
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

          <!--推薦提示：符合推薦 = 綠色✓，不符合 = 黃色⚠️-->
          <div v-if="recommendationReason"
               class="text-xs p-3 rounded-lg flex items-start gap-2"
               :style="alertStyle">

            <!-- 符合推薦：綠色打勾 -->
            <i v-if="selectedEpsg === recommendedEpsg"
               class="pi pi-check-circle"
               style="margin-top: 2px; flex-shrink: 0;"></i>

            <!-- 不符合推薦：黃色驚嘆號 -->
            <i v-else
               class="pi pi-exclamation-circle"
               style="margin-top: 2px; flex-shrink: 0;"></i>

            <div>
              <!-- 符合推薦的標題 -->
              <p v-if="selectedEpsg === recommendedEpsg" class="font-bold mb-1">✓ 推薦選擇</p>
              <!-- 不符合推薦的標題 -->
              <p v-else class="font-bold mb-1">⚠️ 建議修改</p>

              <p>{{ recommendationReason }}</p>
              <p class="mt-1 text-xs opacity-80">
                當前選擇: <strong>{{ selectedEpsg }}</strong>
                <span v-if="selectedEpsg !== recommendedEpsg"> (推薦: {{ recommendedEpsg }})</span>
              </p>
            </div>
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

          <!--注意事項-->
          <div class="flex items-center gap-2 mt-2 mb-2">
            <button @click="showNotes = !showNotes"
                    class="hover:opacity-80 font-bold text-sm flex items-center gap-1"
                    style="color: #dc5e5e;">
              <i :class="showNotes ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"></i>
              注意事項
            </button>
          </div>

          <!--注意事項(內文)-->
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
            <br>
            <p>
              ※欄位名稱使用中文時，<br>
              BIG5 欄名最多 5 字，<br>
              UTF-8 欄名最多 3 字。
            </p>
          </div>

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
    nextTick,   // 在 DOM 更新後執行回調
    computed    // 用於創建計算屬性
  } from 'vue'; // Vue 3 Composition API
  import interact from 'interactjs';    // 用於實現拖放和調整大小的庫
  import Select from 'primevue/select'; // PrimeVue 的選擇組件
  import JSZip from 'jszip';            // 用於處理 ZIP 文件的庫
  import { ShpParserService } from '../services/shpParser'; // 自定義的 SHP 解析服務
  import { convertToGeoJson } from '../utils/geoUtils';     // 自定義的地理數據轉換工具
  import Swal from 'sweetalert2'; // 用於顯示美觀的彈窗提示

  //【宣告】=====================================================================
  const emit = defineEmits(['onImportComplete', 'onError']); // 定義組件事件

  // 接收來自父元件的座標系統信息
  const props = defineProps({
    mapSpatialRef: {
      type: Object,
      default: () => ({ wkid: 3857, name: 'Web Mercator' })
    }
  });

  // 控制視窗顯示狀態
  const isDialogVisible = ref(false);              // 控制 Dialog 顯示
  const dialogTitle = ref("SHP(Shapefile) 匯入");  // Dialog 標題
  const dialogWidth = ref("464px");                // Dialog 預設寬度
  const loading = ref(false);                      // 加載狀態
  const fileInput = ref<HTMLInputElement>();       // 用於觸發檔案選取的隱藏 input 元素
  const selectedFile = ref<File | null>(null);     // 使用者選擇的檔案
  const showNotes = ref(true);                     // 控制注意事項顯示/隱藏

  // 預設坐標系與編碼
  const selectedEpsg = ref('3826');
  const selectedEncoding = ref('utf-8');

  // 新增：推薦的座標系統
  const recommendedEpsg = ref<string>('');
  const recommendationReason = ref<string>('');

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

  // 自定義的 SHP 解析服務
  const parserService = new ShpParserService();

  // 推薦提示的樣式
  const alertStyle = computed(() =>
    selectedEpsg.value === recommendedEpsg.value
      ? { backgroundColor: '#e8f5e9', borderLeft: '4px solid #4caf50', color: '#2e7d32' }
      : { backgroundColor: '#fff3e0', borderLeft: '4px solid #ff9800', color: '#e65100' }
  );

  //【生命週期】===================================================================
  // 監聽器：當視窗打開時
  watch(
    isDialogVisible,
    (newVal) => {
      if (newVal) {
        // 根據地圖座標系統推薦最佳選項
        updateRecommendation();

        // 使用 nextTick 確保 Vue 已將 Dialog 渲染至 DOM，
        nextTick(() => {
          setTimeout(() => {
            initInteractDialog(); // 重新綁定 interactjs 縮放與拖拽
          }, 50); // 延遲 50 毫秒，確保 PrimeVue Dialog 完全開起並掛載完畢
        });
      } else {
        // Dialog 關閉時，清除上傳的檔案
        selectedFile.value = null;
        if (fileInput && fileInput.value) {
          fileInput.value.value = '';  // 重置 input 元件
        }
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
  const openFilePicker = () => { // 觸發檔案選取對話框
    fileInput.value?.click();
  };

  //【方法】===================================================================

  //#region ◆初始化 interactjs [initInteractDialog]
  /**
   * 初始化 interactjs
   */
  const initInteractDialog = () => {
    nextTick(() => {
      const dialogElem = document.querySelector('.shp-resizable-dialog') as HTMLElement;
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

  //#region ◆解壓縮並解析 SHP / DBF 整合核心主程式 [processShpZip]
  /**
   * 解壓縮並解析 SHP / DBF 整合核心主程式
   */
  const processShpZip = async () => {
    if (!selectedFile.value) return;
    loading.value = true;
    try {
      const zip = await JSZip.loadAsync(selectedFile.value);

      // 尋找對應的副檔名檔案 (不區分大小寫)
      const shpEntry = Object.values(zip.files).find(f => f.name.toLowerCase().endsWith('.shp'));
      const dbfEntry = Object.values(zip.files).find(f => f.name.toLowerCase().endsWith('.dbf'));

      if (!shpEntry || !dbfEntry) {
        throw new Error('ZIP 壓縮包內必須同時包含 .shp 與 .dbf 圖資檔案！');
      }

      // 轉為 ArrayBuffer
      const shpBuffer = await shpEntry.async('arraybuffer');
      const dbfBuffer = await dbfEntry.async('arraybuffer');

      // 呼叫現代化 TS 服務解析二進位
      const parsedShp = parserService.parseShp(shpBuffer);
      const parsedDbfRecords = parserService.parseDbf(dbfBuffer, selectedEncoding.value);

      // 判斷應該代入哪一個 EPSG 代碼
      let targetEpsg = selectedEncoding.value;

      // 💡 防呆機制：如果選了 3826 但發現檔案內座標數值很小 (小於 360)，代表其實是經緯度！
      if (targetEpsg === 'EPSG:3826' && parsedDbfRecords.length > 0) {
        const firstRecord = parsedDbfRecords[0];
        // 隨便抓一筆點位資料看數值大小
        if (firstRecord?.content && typeof firstRecord.content === 'object') {
          const firstX = (firstRecord.content as any).points?.[0] ?? 0;
          if (firstX > 119 && firstX < 123) {
            // 數值落在 120 左右，絕對是經緯度而非二度分帶，強行修正為 EPSG:3824
            targetEpsg = 'EPSG:3824';
          }
        }
      }

      // 計算投影轉換並打包成 GeoJSON
      const finalGeoJson = convertToGeoJson(parsedShp, parsedDbfRecords, targetEpsg);

      // 發送成功事件給父元件
      emit('onImportComplete', {
        geoJson: finalGeoJson,
        fileName: selectedFile.value.name,
        shapeType: parsedShp.shapeType
      });

      // 顯示成功訊息
      Swal.fire({
        icon: 'success',
        title: '匯入成功',
        text: '圖資已成功匯入！'
      });

      //關閉視窗
      isDialogVisible.value = false;
    }
    catch (error: any) {


      // 顯示錯誤訊息
      console.error(error);
      Swal.fire({
        icon: 'warning',
        title: '匯入失敗',
        text: error.message || '讀取圖資失敗，請檢查檔案格式。'
      });
      emit('onError', error.message || '讀取圖資失敗，請檢查檔案格式。');
    }
    finally {
      selectedFile.value = null; // 重置狀態
      if (fileInput && fileInput.value) {
        fileInput.value.value = '';  // 重置 input 元件
      }
      loading.value = false;     // 關閉Loading
    }
  };
  //#endregion

  //#region ◆根據地圖座標系統更新推薦 [updateRecommendation]
  /**
   * 根據地圖座標系統更新推薦
   */
  const updateRecommendation = () => {
    const mapRef = props.mapSpatialRef;

    console.log('🔍 分析地圖座標系:', mapRef);

    // 根據地圖的 WKID 判斷推薦的 EPSG
    if (mapRef?.isWGS84 || mapRef?.wkid === 4326) {
      recommendedEpsg.value = '4326';
      recommendationReason.value = '地圖使用 WGS84 座標系統，建議選擇 4326 (WGS84 經緯度)';
    } else if (mapRef?.isWebMercator || mapRef?.wkid === 3857) {
      recommendedEpsg.value = '4326';
      recommendationReason.value = '地圖使用 Web Mercator，SHP 通常需轉換為 WGS84 (4326)';
    } else {
      // 預設推薦台灣的坐標系統
      recommendedEpsg.value = '3826';
      recommendationReason.value = '根據位置自動推薦 TWD97 二度分帶 (3826)';
    }

    // 自動設置為推薦的坐標系統：不自動設置，讓使用者自己選擇，但預設值設為推薦值
    selectedEpsg.value = recommendedEpsg.value;

    console.log('✅ 推薦座標系:', {
      推薦代碼: recommendedEpsg.value,
      原因: recommendationReason.value,
      當前選擇: selectedEpsg.value
    });
  };
  //#endregion

  //#region ◆清除檔案 [clearSelectedFile]
  /**
   * 清除檔案
   */
  const clearSelectedFile = () => {
    Swal.fire({
      title: '確認清除',
      html: `確定要清除已選擇的檔案嗎？<br/>此操作無法恢復。`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '清除',
      cancelButtonText: '取消',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280'
    }).then((result) => {
      if (result.isConfirmed) {
        selectedFile.value = null;
        if (fileInput && fileInput.value) {
          fileInput.value.value = '';  // 重置 input 元件
        }
      }
    });
  };
  //#endregion

  // 開放方法給外部 View 元件控制開啟
  defineExpose({
    openDialog: () => { isDialogVisible.value = true; }
  });
</script>

<style>
  /* 確保關閉 PrimeVue 內建溢出限制，讓外層可以觸發 interact 邊緣 */
  .shp-resizable-dialog {
    touch-action: none; /* 防止手機板瀏覽器預設拖動行為 */
    box-sizing: border-box;
    position: absolute !important;
    right: auto !important; /* 解除右邊錨點定死問題 */
  }

    /* 移除 PrimeVue 原本右下角的單一縮放控制點圖示 */
    .shp-resizable-dialog .p-dialog-resizable-handle {
      display: none !important;
    }

    /* 當 Dialog 處於最大化狀態時的強制覆寫 */
    .shp-resizable-dialog.p-dialog-maximized {
      /* 強制將原本覆蓋在行內的寬高與位移移除，還原給 PrimeVue 的 100% 滿版設定 */
      width: 100vw !important;
      height: 100vh !important;
      top: 0 !important;
      left: 0 !important;
      transform: none !important; /* 👈 清除 translate 偏移動作 */
    }

      /* 最大化時，隱藏四周縮放的鼠標指針，避免干擾 */
      .shp-resizable-dialog.p-dialog-maximized .p-dialog-header {
        cursor: default !important; /* 標題列不可拖拽，滑鼠改回普通指標 */
      }
</style>
