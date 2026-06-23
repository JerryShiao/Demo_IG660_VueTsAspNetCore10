<!-- 圖層控制 / 加入圖層 / CSV地號 跳窗-->
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
          class="csv-resizable-dialog">

    <div class="p-4 bg-[#f9f8f6] rounded-b-xl flex flex-col gap-4">
      <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">

        <!--檔案上傳-->
        <div class="flex flex-col w-full">

          <div style="display:flex;">
            <!--檔案上傳 input (隱藏)-->
            <input ref="fileInput"
                   type="file"
                   accept=".csv"
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

            <!--範例檔 Button-->
            <Button @click="downloadSampleCsv_PlotNumber"
                    title="下載範例檔案"
                    @mouseenter="isButtonHovered = true"
                    @mouseleave="isButtonHovered = false"
                    :style="{ backgroundColor: isButtonHovered ? '#4f46e5' : '#6366f1' }"
                    :pt="{ root: { class: 'w-full border-none rounded-lg text-white font-bold py-3 text-lg' } }">
              <div class="flex items-center justify-center gap-2">
                <i class="pi pi-download font-bold"></i>
                <span class="whitespace-nowrap">範例下載</span>
              </div>
            </Button>&ensp;

            <!--選擇檔案 Button-->
            <Button @click="openFilePicker"
                    title="選擇要匯入的檔案"
                    :pt="{ root: { class: 'w-full border-none rounded-lg text-white font-bold py-3 text-lg' } }">
              <div class="flex items-center justify-center gap-2">
                <i class="pi pi-folder-open font-bold"></i>
                <span class="whitespace-nowrap">選擇檔案</span>
              </div>
            </Button>&ensp;

            <!--開始匯入 Button-->
            <Button :disabled="!selectedFile || loading"
                    :loading="loading"
                    title="開始匯入檔案"
                    severity="success"
                    :pt="{ root: { class: 'w-full border-none rounded-lg text-white font-bold py-3 text-lg' } }">
              <i class="pi pi-upload font-bold"></i>
              <span class="whitespace-nowrap">開始匯入</span>
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

        <!--CSV內容顯示列表-->
        <div class="flex flex-col w-full">
          <div class="flex justify-between items-center mb-2">
            <div class="flex items-center gap-2">
              <span class="text-gray-700 font-semibold">CSV 預覽</span>
              <span class="text-xs text-gray-400 font-normal">( 預期欄位：行政區、地段、地號 )</span>
            </div>
            <span v-if="csvDataList.length > 0" class="text-blue-600 text-sm font-medium">共 {{ csvDataList.length }} 筆</span>
          </div>

          <!-- 類 DataGrid 容器 -->
          <div v-if="csvDataList.length > 0" class="relative overflow-auto border rounded-lg bg-white max-h-[300px] shadow-sm">
            <table class="min-w-full divide-y divide-gray-200 border-separate border-spacing-0">
              <thead class="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th v-for="(header, index) in csvHeaders" :key="index"
                      class="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b bg-gray-50">
                    {{ header }}
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-100">
                <tr v-for="(row, rowIndex) in csvDataList" :key="rowIndex"
                    class="hover:bg-blue-50/50 transition-colors duration-150 odd:bg-white even:bg-gray-50/30">
                  <td v-for="(cell, cellIndex) in row" :key="cellIndex"
                      class="px-4 py-2.5 whitespace-nowrap text-sm text-gray-600 border-b border-gray-100">
                    {{ cell }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="csvDataList.length === 0" class="flex flex-col items-center justify-center py-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
            <span class="text-gray-400 text-sm">尚未上傳檔案或檔案內容為空</span>
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
  import Swal from 'sweetalert2';       // 用於顯示美觀的彈窗提示

  //【宣告】=====================================================================
  const emit = defineEmits(['onImportComplete', 'onError']); // 定義組件事件

  // 控制視窗顯示狀態
  const isDialogVisible = ref(false);          // 控制 Dialog 顯示
  const dialogTitle = ref("CSV 地號");         // Dialog 標題
  const dialogWidth = ref("600px");             // Dialog 預設寬度
  const loading = ref(false);                  // 加載狀態
  const fileInput = ref<HTMLInputElement>();   // 用於觸發檔案選取的隱藏 input 元素
  const selectedFile = ref<File | null>(null); // 使用者選擇的檔案
  const showNotes = ref(true);                 // 控制注意事項顯示/隱藏
  const isButtonHovered = ref(false);          // 按鈕 hover 狀態

  // CSV 資料
  const csvDataList = ref<PlotImportData[]>([]); // 儲存解析後的 CSV 資料列表
  const csvHeaders = ref<string[]>([]); // 儲存 CSV 標題列
  csvHeaders.value = ["行政區", "地段", "地號"]; // 設定 CSV 預期標題列

  // 定義 CSV 解析後的資料結構
  interface PlotImportData {
    district: string; // 行政區
    section: string;  // 地段
    plotNumber: string; // 地號
  }
  //【生命週期】===================================================================
  // 監聽器：當視窗打開時
  watch(
    isDialogVisible,
    (newVal) => {
      if (newVal) {
        // 使用 nextTick 確保 Vue 已將 Dialog 渲染至 DOM，
        nextTick(() => {
          setTimeout(() => {
            initInteractDialog(); // 重新綁定 interactjs 縮放與拖拽
          }, 50); // 延遲 50 毫秒，確保 PrimeVue Dialog 完全開起並掛載完畢
        });
      } else {
        // Dialog 關閉時，清除上傳的檔案
        selectedFile.value = null;
        csvDataList.value = [];
        if (fileInput && fileInput.value) {
          fileInput.value.value = '';  // 重置 input 元件
        }
      }
    },
    { immediate: true } // 👈 加上 immediate: true，讓網頁一打開 (初次建立) 就立刻執行一次這個監聽器
  );

  // 處理檔案選取事件
  const onFileSelect = (event: Event) => {
    try {
      // 取得使用者選擇的檔案
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) {
        target.value = ''; // 清空選取
        throw new Error("未選擇檔案");
      }

      // 驗證檔案是否為 .csv
      if (!file.name.toLowerCase().endsWith('.csv')) {
        target.value = ''; // 清空選取
        throw new Error("請選擇 CSV 檔案");
      }

      // 驗證檔案大小是否超過 5MB
      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSizeInBytes) {
        target.value = ''; // 清空選取
        throw new Error("檔案大小超過 5MB");
      }

      // 取得檔案
      selectedFile.value = file;

      // 讀取 CSV 資料
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (!text) { // 檢查讀取結果是否為空
          return;
        }

        // 解析 CSV (簡單實作：以換行分割，忽略第一行標題)
        const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
        const dataRows = lines.slice(1); // 跳過標題列

        csvDataList.value = dataRows.map(row => {
          const columns = row.split(',');
          return {
            district: columns[0]?.trim() ?? '',
            section: columns[1]?.trim() ?? '',
            plotNumber: columns[2]?.trim() ?? ''
          };
        });
      };

      // 考慮到台灣常見的 CSV 編碼，若有亂碼問題可改用 'Big5'
      reader.readAsText(file, 'UTF-8');
    }
    catch (error) {
      console.error("檔案選取錯誤:", error);
      Swal.fire({
        icon: 'error',
        title: '檔案選取錯誤',
        text: '請重新選擇檔案。',
      });
    }
  };

  // 觸發檔案選取對話框
  const openFilePicker = () => { fileInput.value?.click(); };

  //【方法】===================================================================

  //#region ◆初始化 interactjs [initInteractDialog]
  /**
   * 初始化 interactjs
   */
  const initInteractDialog = () => {
    nextTick(() => {
      const dialogElem = document.querySelector('.csv-resizable-dialog') as HTMLElement;
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

  //#region ◆下載範例檔案 [downloadSampleCsv_PlotNumber]
  /**
   * 下載範例檔案
   */
  const downloadSampleCsv_PlotNumber = () => {
    try {
      const link = document.createElement('a');
      link.href = '/sample-files/CsvSampleFile_PlotNumber.csv';
      link.download = 'CSV地號_匯入範例.csv';
      link.click();
      Swal.fire({
        icon: 'success',
        title: '範例下載成功',
        text: '檔案名稱：CSV地號_匯入範例.csv'
      });
    }
    catch (error) {
      console.error('下載範例檔案失敗:', error);
      Swal.fire({
        icon: 'error',
        title: '下載失敗',
        text: '無法下載範例檔案，請稍後再試。',
      });
    }
  }
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
        csvDataList.value = [];
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
  });</script>

<style>
  /* 確保關閉 PrimeVue 內建溢出限制，讓外層可以觸發 interact 邊緣 */
  .csv-resizable-dialog {
    touch-action: none; /* 防止手機板瀏覽器預設拖動行為 */
    box-sizing: border-box;
    position: absolute !important;
    right: auto !important; /* 解除右邊錨點定死問題 */
  }

    /* 移除 PrimeVue 原本右下角的單一縮放控制點圖示 */
    .csv-resizable-dialog .p-dialog-resizable-handle {
      display: none !important;
    }

    /* 當 Dialog 處於最大化狀態時的強制覆寫 */
    .csv-resizable-dialog.p-dialog-maximized {
      /* 強制將原本覆蓋在行內的寬高與位移移除，還原給 PrimeVue 的 100% 滿版設定 */
      width: 100vw !important;
      height: 100vh !important;
      top: 0 !important;
      left: 0 !important;
      transform: none !important; /* 👈 清除 translate 偏移動作 */
    }

      /* 最大化時，隱藏四周縮放的鼠標指針，避免干擾 */
      .csv-resizable-dialog.p-dialog-maximized .p-dialog-header {
        cursor: default !important; /* 標題列不可拖拽，滑鼠改回普通指標 */
      }
</style>
