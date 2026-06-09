<!--SHP 跳窗-->
<template>
  <Dialog v-model:visible="isDialogVisible"
          :header="dialogTitle"
          :modal="true"
          :draggable="false"
          :resizable="false"
          :maximizable="true"
          :style="{ width: dialogWidth, position: 'absolute' }"
          :breakpoints="{ '960px': '95vw' }"
          :contentStyle="{ height: '560px', padding: '0' }"
          class="shp-resizable-dialog">
    <iframe id="tempshpfile"
            :src="iframeSrc"
            style="border: 0; width: 100%; height: 100%;"
            scrolling="no"></iframe>
  </Dialog>
</template>

<script setup lang="ts">
  import { ref, watch, nextTick } from 'vue';
  import interact from 'interactjs';

  // 內部的響應式狀態
  const isDialogVisible = ref(false); // 控制 Dialog 顯示
  const dialogTitle = ref("Shapefile載入與預覽");
  const iframeSrc = ref("./Assist/SHPtoGeoJson/index.html");
  const dialogWidth = ref("364px");

  /**
   * 提供給外部元件呼叫的「開啟視窗」方法
   */
  const openDialog = () => {
    try {
      isDialogVisible.value = false; // 清理或重置狀態
    } catch (e) {
      console.error("清理事件失敗:", e);
    }
    isDialogVisible.value = true;
  };

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
      }
    },
    { immediate: true } // 👈 加上 immediate: true，讓網頁一打開 (初次建立) 就立刻執行一次這個監聽器
  );

  // 初始化 interactjs (從原本 MapView 移過來)
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

  // 關鍵：利用 defineExpose 將 openDialog 方法暴露出去，讓父元件可以控制它
  defineExpose({
    openDialog
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
