<!--圖台主頁面-->

<template>
  <div class="map-layout">

    <!--上方 Logo 與選單-->
    <header class="navbar">
      <!--上方 Logo-->
      <div class="logo-area" @click="OpenHome">
        <img src="/icons/png/logo_tn3.png" alt="Logo" />
      </div>
      <!--上方選單-->
      <nav class="menu-container">
        <ul class="nav-links">
          <!--定位查詢-->
          <li @mouseenter="activeMenu = 'locate'" @mouseleave="activeMenu = null">
            <a class="main-link" href="javascript:;">
              定位查詢
              <i class="arrow-down"></i>
            </a>
            <transition name="slide">
              <ul class="dropdown" v-show="activeMenu === 'locate'">
                <li><a title="包含地建號,門牌,道路,路口,地標,坐標" @click="NofunctionAlert();">常用定位</a></li>
                <li><a @click="NofunctionAlert();">行政區域定位</a></li>
                <li><a @click="NofunctionAlert();">開發區位定位</a></li>
                <li><a @click="NofunctionAlert();">社區定位</a></li>
                <li><a @click="NofunctionAlert();">電桿定位</a></li>
              </ul>
            </transition>
          </li>
          <!--房地市場-->
          <li @mouseenter="activeMenu = 'market'" @mouseleave="activeMenu = null">
            <a class="main-link" href="javascript:;">房地市場 <i class="arrow-down"></i></a>
            <transition name="slide">
              <ul class="dropdown" v-show="activeMenu === 'market'">
                <li><a @click="NofunctionAlert();">實價登錄查詢</a></li>
                <li><a @click="NofunctionAlert();">社區建案看板</a></li>
                <li><a @click="NofunctionAlert();">法拍待拍</a></li>
                <li><a @click="NofunctionAlert();">法拍拍定</a></li>
              </ul>
            </transition>
          </li>
          <!--交易安全-->
          <li @mouseenter="activeMenu = 'safety'"
              @mouseleave="activeMenu = null">
            <a class="main-link" href="javascript:;">交易安全 <i class="arrow-down"></i></a>
            <transition name="slide">
              <ul class="dropdown" v-show="activeMenu === 'safety'">
                <li><a @click="NofunctionAlert();">建案備查與銷售</a></li>
                <li><a @click="NofunctionAlert();">不動產相關業者</a></li>
                <li><a @click="NofunctionAlert();">建管執照地圖</a></li>
                <li><a @click="NofunctionAlert();">建物屋齡模擬</a></li>
                <li><a @click="NofunctionAlert();">土地參考檔分類</a></li>
              </ul>
            </transition>
          </li>
          <!--地政資訊-->
          <li @mouseenter="activeMenu = 'land'"
              @mouseleave="activeMenu = null">
            <a class="main-link" href="javascript:;">地政資訊 <i class="arrow-down"></i></a>
            <transition name="slide">
              <ul class="dropdown" v-show="activeMenu === 'land'">
                <li><a @click="NofunctionAlert();">未辦繼承</a></li>
                <li><a @click="NofunctionAlert();">地籍清理</a></li>
                <li><a @click="NofunctionAlert();">375租約</a></li>
                <li><a @click="NofunctionAlert();">縣有耕地</a></li>
                <li><a @click="NofunctionAlert();">原住民保留地</a></li>
                <li><a @click="NofunctionAlert();">控制點查詢</a></li>
                <li><a @click="NofunctionAlert();">土地標售</a></li>
              </ul>
            </transition>
          </li>
          <!--生活資訊-->
          <li @mouseenter="activeMenu = 'life'"
              @mouseleave="activeMenu = null">
            <a class="main-link" href="javascript:;">生活資訊 <i class="arrow-down"></i></a>
            <transition name="slide">
              <ul class="dropdown" v-show="activeMenu === 'life'">
                <li><a href="https://165.npa.gov.tw/#/" target="_blank">165反詐騙</a></li>
                <li><a @click="NofunctionAlert();">空氣品質</a></li>
                <li><a @click="NofunctionAlert();">日曬指數</a></li>
                <li><a @click="NofunctionAlert();">雨量資料</a></li>
                <li><a @click="NofunctionAlert();">天氣報告</a></li>
                <li><a @click="NofunctionAlert();">停水公告</a></li>
                <li><a @click="NofunctionAlert();">近期地震</a></li>
                <li><a @click="NofunctionAlert();">挖掘資訊</a></li>
              </ul>
            </transition>
          </li>
        </ul>
      </nav>
      <!--右側的佔位容器-->
      <div class="right-area"></div>
    </header>

    <!--地圖內容-->
    <div id="mapDiv" class="map-container" style="background-color:white">
      <div ref="mapElement" style="width: 100%; height: 100%; padding:0;margin:0 "></div>
    </div>

    <!--左側選單-->
    <div id="rightpanel" class="animate__animated animate__fadeIn"
         style="width: 64px; height: 75%; position: absolute; left: -8px; top: 72px; border-radius: 8px; box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);">
      <div id="side-menu" :class="['side-menu', { open: isSideOpen }]" style="z-index:1000;">
        <div class="btnGroup flex-col">
          <button id="maptool1" class="functionBtn" title="圖面分析" @click="NofunctionAlert();">
            <img class="iconImg" src="/src/Icons/map-analytic.svg" alt="">
            <p class="name-tag">圖面分析</p>
          </button>
          <button class="functionBtn" id="" title="3D切換" @click="NofunctionAlert();">
            <img class="iconImg" src="/src/Icons/3D.svg" alt="">
            <p class="name-tag">3D切換</p>
          </button>
          <button class="functionBtn" title="地圖列印" @click="NofunctionAlert();">
            <img class="iconImg" src="/src/Icons/printer.svg" alt="">
            <p class="name-tag">地圖列印</p>
          </button>
          <div class="btnGroup btn-extend flex flex-col" id="MSGA_left">
            <button :class="['functionBtn', 'control', { 'active': showDrawTools }]"
                    title="繪圖工具" @click.stop="ToggleDrawTools">
              <img class="iconImg" src="/src/Icons/draw-measure.svg" alt="">
              <p class="name-tag">繪圖工具</p>
            </button>
            <div class="extend-group" v-show="showDrawTools">
              <div>
                <button class="functionBtn" id="MDD" title="清除" @click="NofunctionAlert();">
                  <img class="iconImg" src="/src/Icons/erase.svg" alt="">
                  <p class="name-tag">清除</p>
                </button>
                <button class="functionBtn" id="MDT" title="文字" @click="NofunctionAlert();">
                  <img class="iconImg" src="/src/Icons/font.svg" alt="">
                  <p class="name-tag">文字</p>
                </button>
                <button class="functionBtn" id="MDC" title="圓形" @click="NofunctionAlert();">
                  <img class="iconImg" src="/src/Icons/circle.svg" alt="">
                  <p class="name-tag">圓形</p>
                </button>
                <button class="functionBtn" id="MDL" title="線狀" @click="NofunctionAlert();">
                  <img class="iconImg" src="/src/Icons/line.svg" alt="">
                  <p class="name-tag">線狀</p>
                </button>
                <button class="functionBtn" id="MDA" title="面狀" @click="NofunctionAlert();">
                  <img class="iconImg" src="/src/Icons/surface.svg" alt="">
                  <p class="name-tag">面狀</p>
                </button>
                <button class="functionBtn" id="MDR" title="矩形" @click="NofunctionAlert();">
                  <img class="iconImg" src="/src/Icons/rec.svg" alt="">
                  <p class="name-tag">矩形</p>
                </button>
                <button class="functionBtn" id="MDP" title="點狀" @click="NofunctionAlert();">
                  <img class="iconImg" src="/src/Icons/point.svg" alt="">
                  <p class="name-tag">點狀</p>
                </button>
              </div>
            </div>
          </div>
          <button class="functionBtn" id="" @click="NofunctionAlert();" title="環境設定">
            <img class="iconImg" src="/src/Icons/tool.svg" alt="">
            <p class="name-tag">環境設定</p>
          </button>
          <button class="functionBtn" id="" @click="NofunctionAlert();" title="地圖樣式">
            <img class="iconImg" src="/src/Icons/erase.svg" alt="">
            <p class="name-tag">地圖樣式</p>
          </button>
        </div>
        <div class="btnGroup flex-col">
          <button class="functionBtn" id="" title="回入口頁" onclick="window.open('https://ig660.nantou.gov.tw/into')">
            <img class="iconImg" src="/src/Icons/home.svg" alt="">
            <p class="name-tag">回入口頁</p>
          </button>
          <button @click="isSideOpen = !isSideOpen" class="functionBtn closePageBtn" title="收合畫面">
            <img class="iconImg" src="/src/Icons/sidebar-expand.svg" alt="">
            <p class="name-tag">收合畫面</p>
          </button>
        </div>
      </div>
    </div>

    <!--圖層控制-->
    <div class="layer-trigger-container">
      <div class="layer-control-btn" @click="isLayerPanelVisible = !isLayerPanelVisible">
        <div class="btn-content">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M10.9827 0.222385C11.6277 -0.0741283 12.3724 -0.0741283 13.0174 0.222385L22.4809 4.56265C22.8488 4.73025 23.0826 5.09552 23.0826 5.49946C23.0826 5.90341 22.8488 6.26868 22.4809 6.43627L13.0174 10.7765C12.3724 11.0731 11.6277 11.0731 10.9827 10.7765L1.51923 6.43627C1.15125 6.26438 0.91748 5.89911 0.91748 5.49946C0.91748 5.09981 1.15125 4.73025 1.51923 4.56265L10.9827 0.222385ZM20.1778 9.00606L22.4809 10.0632C22.8488 10.2308 23.0826 10.5961 23.0826 11C23.0826 11.4039 22.8488 11.7692 22.4809 11.9368L13.0174 16.2771C12.3724 16.5736 11.6277 16.5736 10.9827 16.2771L1.51923 11.9368C1.15125 11.7649 0.91748 11.3996 0.91748 11C0.91748 10.6004 1.15125 10.2308 1.51923 10.0632L3.82232 9.00606L10.4026 12.0228C11.4156 12.4869 12.5845 12.4869 13.5975 12.0228L20.1778 9.00606ZM13.5975 17.5233L20.1778 14.5066L22.4809 15.5637C22.8488 15.7313 23.0826 16.0966 23.0826 16.5005C23.0826 16.9045 22.8488 17.2698 22.4809 17.4373L13.0174 21.7776C12.3724 22.0741 11.6277 22.0741 10.9827 21.7776L1.51923 17.4373C1.15125 17.2655 0.91748 16.9002 0.91748 16.5005C0.91748 16.1009 1.15125 15.7313 1.51923 15.5637L3.82232 14.5066L10.4026 17.5233C11.4156 17.9874 12.5845 17.9874 13.5975 17.5233Z" fill="#3c90cd" />
          </svg>
          <p style="text-align: center; font-weight: bolder; margin-top: -3px;">圖層控制</p>
        </div>
      </div>
    </div>

    <!--圖層控制 跳窗 BEGIN ============================================================ -->
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
              left: 'calc(100vw - 470px)' /* 2. 改用 left 定位初始位置在右側 */
            }"
            class="resizable-dialog"
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
                  <i class="pi pi-info-circle info-icon" ></i>
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
              <Button label="更多歷史底圖" size="small" severity="info" @click="NofunctionAlert();" />
              <Button label="回到預設底圖" size="small" severity="secondary" @click="NofunctionAlert();" />
              <Button label="目前開啟圖層" size="small" severity="success" @click="NofunctionAlert();" />
            </div>

            <div class="checkbox-container">
              <Checkbox v-model="isTaichungLayerVisible" inputId="tc-layer-checkbox" :binary="true" disabled />同時顯示臺中市圖資
              <label for="tc-layer-checkbox"> 同時顯示臺中市圖資 </label>
            </div>
          </TabPanel>

          <TabPanel value="history">
            <p class="empty-text">暫無歷程紀錄</p>
          </TabPanel>

          <TabPanel value="import">
            <div class="import-grid">
              <Button label="SHP" severity="contrast" raised @click="handleOpenShp()" />
              <Button label="KML" severity="contrast" raised @click="NofunctionAlert()" />
              <Button label="DXF" severity="contrast" raised @click="NofunctionAlert()" />
              <Button label="CSV 地號" severity="contrast" raised @click="NofunctionAlert()" />
              <Button label="CSV 坐標" severity="contrast" raised @click="NofunctionAlert()" />
              <Button label="XML(建物模型)" severity="secondary" raised @click="NofunctionAlert()" />
              <Button label="ZPB(建物平面圖)" severity="secondary" raised @click="NofunctionAlert()" />
              <Button label="載入地圖服務" severity="warn" raised @click="NofunctionAlert()" />
              <Button label="資料說明" severity="warn" raised @click="NofunctionAlert()" />
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Dialog>
    <!--圖層控制 跳窗 END ============================================================== -->
    <!--SHP 跳窗 BEGIN ================================================================= -->
    <template>
      <div>
        <ShpDialog ref="shpDialogRef" />
      </div>
    </template>
    <!--SHP 跳窗 END =================================================================== -->
  </div>
</template>

<script setup lang="ts">
  //【引入】=====================================================================
  // Vue
  import {
    ref,        // 引入ref函數以創建響應式變量
    shallowRef, // 引入shallowRef函數以創建淺響應式變量
    onMounted,  // 引入onMounted函數以在組件掛載後執行代碼
    watch,      // 引入watch函數以監視變量的變化
    nextTick    // 記得引入 nextTick
  } from 'vue';

  // Loading 遮罩使用官方提供的 useLoading 函式
  import { useLoading } from 'vue-loading-overlay';

  // ArcGIS SDK
  import Map from '@arcgis/core/Map';
  import MapView from '@arcgis/core/views/MapView';
  import SceneView from '@arcgis/core/views/SceneView';
  import Popup from '@arcgis/core/widgets/Popup';

  // 套件
  import Swal from 'sweetalert2';   
  import interact from 'interactjs';

  // ---  SHP 跳窗 ---
  import ShpDialog from './ShpDialog.vue'; // 引入ShpDialog組件
  const shpDialogRef = ref < InstanceType < typeof ShpDialog > | null > (null); // 創建對ShpDialog組件的引用

  //【宣告】=====================================================================
  const mapElement = ref(null);     // 用於綁定地圖容器的ref
  const mapView = shallowRef < MapView | SceneView | null > (null); // 地圖視圖的響應式引用
  const mapInstance = shallowRef < Map | null > (null);             // 抽取 Map 實例

  const activeMenu = ref < string | null > (null);     // 控制當前顯示哪一個下拉選單
  const isSideOpen = ref(true);     // 控制左側選單的開合
  const showDrawTools = ref(false); // 控制繪圖工具面板顯示/隱藏

  // —— PrimeVue 控制響應式變數 ——
  const isLayerPanelVisible = ref(true);           // 控制圖層控制跳窗的顯示隱藏
  const activeTab = ref('import');                 // 預設開啟「加入圖層」頁籤
  const activeAccordion = ref('electronic-maps');  // 預設展開「電子地圖與歷史底圖」面板
  const isTaichungLayerVisible = ref(false);       // 臺中市圖資勾選狀態


  // —— 初始化 loading 控制器 ——
  const $loading = useLoading();
  let loader: any = null; // 用來記錄畫面上遮罩實體的變數

  //【初始化】===================================================================
  // 在組件掛載後執行
  onMounted(async () => {

    // 初始化 Map
    const mainMap = new Map({
      basemap: "osm", // 添加底圖(地形圖)
      ground: {
        navigationConstraint: {
          type: "stay-above"
        }
      }
    });
    mapInstance.value = mainMap;

    // 2. 網頁一掛載，立刻開起遮罩，並將其實體存入 loader
    loader = $loading.show({
      color: '#41b883',
      loader: 'spinner',
      transition: 'fade',
      backgroundColor: 'rgba(0, 0, 0, 0.75)' // 深色背景 (透明度 75%)
    });

    await CreateMap(); // 創建地圖

    // 啟動 Windows 視窗功能
    initInteractDialog();
  });

  // 監聽器：當使用者關閉又打開圖層選單時，必須重新綁定
  watch(isLayerPanelVisible, (newVal) => {
    if (newVal) {
      initInteractDialog();
    }
  });

  //【方法】=====================================================================

  //#region ◆開啟首頁 [OpenHome]
  /**
   * 開啟首頁
   */
  const OpenHome = () => {
    window.open('https://ig660.nantou.gov.tw/into', '_blank');
  };
  //#endregion

  //#region ◆開啟/關閉繪圖工具面板 [ToggleDrawTools]
  /**
   * 開啟/關閉繪圖工具面板
   */
  const ToggleDrawTools = () => {
    showDrawTools.value = !showDrawTools.value;
  };
  //#endregion

  //#region ◆創建地圖 [CreateMap]
  /**
   * 創建地圖
   */
  async function CreateMap() {
    mapView.value = new MapView({
      container: mapElement.value as any,
      map: mapInstance.value,  // 使用之前儲存的 map 實例
      center: [120.85, 23.75], // 設定初始中心點：台灣中心坐標（經度, 緯度）
      zoom: 10,                // 設定初始縮放等級
      constraints: {
        rotationEnabled: false,
        snapToZoom: false
      },
      popupEnabled: true
    });

    // 在地圖視圖加載完成後執行
    await mapView.value?.when(() => {
      // 如果遮罩還開著，就把它關掉
      if (loader) {
        loader.hide();
      }
    });
  }
  //#endregion

  //#region ◆功能停用提示 [NofunctionAlert]
  /**
   * 功能停用提示
   */
  function NofunctionAlert() {
    Swal.fire({
      title: '功能停用',
      text: '此 Demo 尚未實作此功能！',
      icon: 'warning',
    });
  }
  //#endregion

  //#region ◆點擊 SHP 按鈕時觸發 [handleOpenShp]
  /**
   * 點擊 SHP 按鈕時觸發
   */
  const handleOpenShp = () => {
    // 直接呼叫子元件暴露出來的 openDialog() 方法
    shpDialogRef.value?.openDialog();
  };
  //#endregion

  // 初始化 interactjs
  const initInteractDialog = () => {
    // 確保 DOM 已經渲染
    nextTick(() => {
      const dialogElem = document.querySelector('.resizable-dialog') as HTMLElement;
      if (!dialogElem) return;

      // 清除舊的綁定避免重複初始化
      interact(dialogElem).unset();

      interact(dialogElem)
        .resizable({
          // 關鍵：開啟上下左右四個邊、以及四個角
          edges: { left: true, right: true, bottom: true, top: true },
          listeners: {
            start(event) {
              // 檢查 PrimeVue 是否幫視窗加上了最大化的 class (常見為 p-dialog-maximized)
              if (event.target.classList.contains('p-dialog-maximized')) {
                return false; // 阻斷事件
              }
            },
            move(event) {
              const target = event.target;

              // 如果是最大化狀態，不執行任何縮放計算
              if (target.classList.contains('p-dialog-maximized')) return;

              // 從 dataset 讀取目前的累計位移，若沒有則初始化為 0
              let x = parseFloat(target.getAttribute('data-x') || '0');
              let y = parseFloat(target.getAttribute('data-y') || '0');

              // 根據拖拽方向，動態調整寬高
              target.style.width = event.rect.width + 'px';
              target.style.height = event.rect.height + 'px';

              // 如果拉動的是「左邊」或「上邊」，除了改寬高，視窗本體也需要跟著位移
              x += event.deltaRect.left;
              y += event.deltaRect.top;

              target.style.transform = `translate(${x}px, ${y}px)`;

              // 存回屬性中記錄
              target.setAttribute('data-x', x.toString());
              target.setAttribute('data-y', y.toString());
            }
          },
          modifiers: [
            // 限制最小與最大尺寸
            interact.modifiers.restrictSize({
              min: { width: 350, height: 400 },
              max: { width: 800, height: 800 }
            })
          ]
        })
        .draggable({
          // 限制：只有滑鼠點擊標題列 (.p-dialog-header) 才能拖動視窗
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

</script>

<style scoped>
  /* 基礎佈局 */
  .map-layout {
    width: 100%;
    font-family: "Microsoft JhengHei", Arial, sans-serif;
  }

  /* 地圖內容 */
  .map-container {
    position: absolute;
    top: 64px; /* navbar 高度 */
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: calc(100vh - 64px);
    overflow: hidden;
  }

  /*【上方選單】BEGIN =======================================================*/
  /* 導覽列：改為白色背景 */
  .navbar {
    height: 65px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    padding: 0 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 淺色陰影增加立體感 */
    position: relative;
    z-index: 1000;
    border-bottom: 1px solid #eee;
  }

  /* Logo 樣式 */
  .logo-area {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-right: 40px;
  }

    .logo-area img {
      height: 45px;
    }

  /* 選單容器 */
  .menu-container {
    flex-grow: 1;
    display: flex;
    justify-content: center;
  }

  .nav-links {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
  }

    .nav-links > li {
      position: relative;
      margin: 0 10px;
    }

  /* 第一層文字：藍色、粗體 */
  .main-link {
    text-decoration: none;
    color: #0056b3; /* 標準深藍色 */
    font-size: 17px;
    font-weight: bold; /* 粗體 */
    line-height: 65px;
    padding: 0 15px;
    display: block;
    transition: all 0.3s ease;
  }

    .main-link:hover {
      color: #003d7a; /* 滑過時顏色深一點 */
      background-color: #f8f9fa; /* 輕微背景色 */
    }

  /* 藍色下拉三角形 */
  .arrow-down {
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #0056b3; /* 三角形也改藍色 */
    margin-left: 6px;
    vertical-align: middle;
  }

  /* 下拉選單 */
  .dropdown {
    position: absolute;
    top: 65px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ffffff;
    min-width: 180px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    padding: 8px 0;
    list-style: none;
    border: 1px solid #e0e0e0;
  }

    .dropdown li a {
      display: block;
      padding: 12px 20px;
      color: #444;
      text-decoration: none;
      font-size: 15px;
      font-weight: normal; /* 下拉選單內部維持一般字重，較好閱讀 */
      white-space: nowrap;
      transition: background 0.2s;
      cursor: pointer;
    }

      .dropdown li a:hover {
        background-color: #eef4ff; /* 淡淡的藍色背景 */
        color: #0056b3;
      }

  /* 動畫效果：向下滑入 */
  .slide-enter-active, .slide-leave-active {
    transition: all 0.25s ease-out;
  }

  .slide-enter-from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }

  .slide-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(0px);
  }

  .right-area {
    width: 120px;
  }
  /* 手機版簡單隱藏 (可再擴充為漢堡選單) */
  @media screen and (max-width: 768px) {
    .menu-container {
      display: none;
    }
  }
  /*【上方選單】END =======================================================*/

  /*【左側選單】BEGIN =====================================================*/
  .functionBtn.active {
    background-color: rgb(196 201 136 / var(--tw-bg-opacity));
    /* 可選：添加更多樣式 */
  }

  .functionBtn {
    transition: all 0.3s ease;
  }

  .iconImg {
    transition: filter 0.3s ease;
  }

  .functionBtn:hover .iconImg {
    filter: brightness(1.3) drop-shadow(0 0 2px rgba(0, 0, 0, 0.3));
  }

  /* 改變紅色 */
  .functionBtn:hover .iconImg {
    filter: invert(0.5) sepia(1) hue-rotate(-20deg) saturate(1.5);
  }
  /*【左側選單】END =====================================================*/


  /*【圖層控制】BEGIN =====================================================*/
  /* —— 圖層按鈕與新面板樣式 —— */
  .layer-trigger-container {
    position: fixed;
    left: 66px;
    bottom: 16px;
    z-index: 99;
  }

  .layer-control-btn {
    width: 64px;
    height: 64px;
    color: #3c90cd;
    background-color: white;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
    transition: all 0.3s ease;
  }

    .layer-control-btn:hover {
      background-color: #e0f2ff;
      box-shadow: 0px 0px 8px 0px rgba(60, 144, 205, 0.4);
    }

  .btn-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
  }

  .btn-text {
    text-align: center;
    font-weight: bolder;
    margin-top: -3px;
    font-size: 12px;
  }

  /* PrimeVue 打造的新版圖層控制面板容器 */
  .layer-control-panel {
    width: 340px;
    position: absolute;
    left: 58px;
    top: 72px;
    background-color: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.15);
    z-index: 999;
    padding: 16px;
    border: 1px solid #e2e8f0;
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .panel-title {
    font-weight: bold;
    font-size: 16px;
    color: #334155;
  }

  /* 折疊面板內部小樣式 */
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

  /* 按鈕與排版優化 */
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

  /* 匯入外部資料網格系統 */
  .import-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    padding: 4px 0;
  }
  /*【圖層控制】END =====================================================*/
</style>

<style>
  /*【跳窗】BEGIN =====================================================*/
  /* 確保關閉 PrimeVue 內建溢出限制，讓外層可以觸發 interact 邊緣 */
  .resizable-dialog {
    touch-action: none; /* 防止手機板瀏覽器預設拖動行為 */
    box-sizing: border-box;
    position: absolute !important;
    right: auto !important; /* 👈 強制解除右邊錨點定死的問題 */
  }

    /* 移除 PrimeVue 原本右下角的單一縮放控制點圖示 */
    .resizable-dialog .p-dialog-resizable-handle {
      display: none !important;
    }

    /* 當 Dialog 處於最大化狀態時的強制覆寫 */
    .resizable-dialog.p-dialog-maximized {
      /* 強制將原本覆蓋在行內的寬高與位移移除，還原給 PrimeVue 的 100% 滿版設定 */
      width: 100vw !important;
      height: 100vh !important;
      top: 0 !important;
      left: 0 !important;
      transform: none !important; /* 👈 清除 translate 偏移動作 */
    }

      /* 💡 新增：最大化時，隱藏四周縮放的鼠標指針，避免干擾 */
      .resizable-dialog.p-dialog-maximized .p-dialog-header {
        cursor: default !important; /* 標題列不可拖拽，滑鼠改回普通指標 */
      }
  /*【跳窗】END =======================================================*/

  /*【Swal】BEGIN =====================================================*/
  /* ✅ 新增：確保 Swal 永遠在 Dialog 上方 */
  .swal2-container {
    z-index: 10000 !important;
  }

    /* 💡 如果發現 Swal 被其他元素覆蓋，可以強制提升它的 z-index */
    .swal2-container.swal2-shown {
      z-index: 10000 !important;
    }
  /*【Swal】END =======================================================*/
</style>
