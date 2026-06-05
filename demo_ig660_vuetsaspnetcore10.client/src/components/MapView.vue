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
      <div id="MapViewDiv" style="width: 100%; height: 100%; padding:0;margin:0 "></div>
    </div>

    <!--左側選單-->
    <div id="rightpanel" class="animate__animated animate__fadeIn"
         style="width: 64px; height: 85%; position: absolute; left: -8px; top: 72px; border-radius: 8px; box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);">
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
  </div>
</template>

<script setup lang="ts">
  //【引入】=====================================================================
  // Vue
  import {
    ref,      // 引入ref函數以創建響應式變量
    onMounted // 引入onMounted函數以在組件掛載後執行代碼
  } from 'vue';

  // Loading 遮罩使用官方提供的 useLoading 函式
  import { useLoading } from 'vue-loading-overlay';

  // ArcGIS SDK
  import Map from '@arcgis/core/Map';
  import MapView from '@arcgis/core/views/MapView';
  import Popup from '@arcgis/core/widgets/Popup';

  // 套件
  import Swal from 'sweetalert2'; //sweetalert2

  //【宣告】=====================================================================
  const activeMenu = ref(null);     // 控制當前顯示哪一個下拉選單
  const isSideOpen = ref(true);     // 控制左側選單的開合
  const showDrawTools = ref(false); // 控制繪圖工具面板顯示/隱藏
  let mainMap : Map;     // 宣告一個變量來存儲地圖實例
  let mapView: MapView; // 宣告一個變量來存儲地圖視圖實例

  // 1. 初始化 loading 控制器
  const $loading = useLoading();
  let loader: any = null; // 用來記錄畫面上遮罩實體的變數

  mainMap = new Map({
    basemap: "osm", // 添加底圖(地形圖)
    ground: {
      navigationConstraint: {
        type: "stay-above"
      }
    }
  });

  //【初始化】===================================================================
  // 在組件掛載後執行
  onMounted(() => {

    // 2. 網頁一掛載，立刻開起遮罩，並將其實體存入 loader
    loader = $loading.show({
      color: '#41b883',
      loader: 'spinner',
      transition: 'fade',
      backgroundColor: 'rgba(0, 0, 0, 0.75)' // 深色背景 (透明度 75%)
    });

    CreateMap(); // 創建地圖
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
  function CreateMap() {
    mapView = new MapView({
      container: "MapViewDiv",
      map: mainMap,
      center: [120.85, 23.75], // 設定初始中心點：台灣中心坐標（經度, 緯度）
      zoom: 10,              // 設定初始縮放等級
      constraints: {
        rotationEnabled: false,
        snapToZoom: false
      },
      popupEnabled: true,
      popup: {
        dockEnabled: false,
        dockOptions: {
          breakpoint: false,
          buttonEnabled: true,
          position: "bottom-right"
        }
      }
    });

    // 在地圖視圖加載完成後執行
    mapView.when(() => {
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

</script>

<style scoped>
  /* 佈局容器 */
  .map-layout {
    width: 100%;
    font-family: "Microsoft JhengHei", Arial, sans-serif;
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
</style>
