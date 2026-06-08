<!--SHP 跳窗-->
<template>
  <Dialog v-model:visible="isDialogVisible"
          :header="dialogTitle"
          :modal="true"
          :draggable="true"
          :resizable="true"
          :maximizable="true"
          :style="{ width: dialogWidth }"
          :breakpoints="{ '960px': '95vw' }"
          :contentStyle="{ height: '560px', padding: '0' }">
    <iframe id="tempshpfile"
            :src="iframeSrc"
            style="border: 0; width: 100%; height: 100%;"
            scrolling="no"></iframe>
  </Dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  // 內部的響應式狀態
  const isDialogVisible = ref(false);
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

  // 關鍵：利用 defineExpose 將 openDialog 方法暴露出去，讓父元件可以控制它
  defineExpose({
    openDialog
  });
</script>
