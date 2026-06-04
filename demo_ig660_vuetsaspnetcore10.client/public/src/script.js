body2 = document.querySelector("body");
sideMenu = document.getElementById("side-menu");
functionBtn = document.querySelectorAll(".functionBtn");
layerBtn = document.getElementById("layerBtn");
mobileMenu = document.getElementById("mobile-menu");
page = document.getElementById("page");
result = document.querySelector(".result-page");
sideLayer = document.getElementById("layerlistpanel");//讀取圖資選單


//建立側邊功能欄功能名稱(name-tag)
//for (let i = 0; i < functionBtn.length; i++) {
//    let nameTag = document.createElement("p");
//    nameTag.classList.add("name-tag");
//    nameTag.textContent = functionBtn[i].getAttribute("title");
//    functionBtn[i].appendChild(nameTag);
//}

//側邊功能欄開合功能
sideMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.target.id === "side-menu") {
        if (window.screen.width > 600) { 
            sideMenu.classList.toggle("open");
            sideLayer.classList.toggle("openLayer");
        }
    }
});

//側邊功能欄-繪圖工具展開
let controlExtendBtn = document.querySelector(".control");
controlExtendBtn.addEventListener("click", () => {
    let extendGroup = document.querySelector(".extend-group");
    extendGroup.classList.toggle("extend");
});

//側邊功能-收合所有頁面
// closePageBtn = document.querySelector(".closePageBtn");
//closePageBtn.addEventListener("click", () => {
//    page.classList.toggle("active");
//    result.classList.toggle("opened");
//    closePageBtn.classList.toggle("active");
//});

//圖層區塊開合
//layerBtn.addEventListener("click", () => {
//    let layer = document.querySelector(".layer");
//    layer.classList.toggle("open");
//    layerBtn.classList.toggle("open");
//});

//圖層可視度閉合
let eyeBtn = document.querySelectorAll(".visibleLayer");
eyeBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (btn.className === "unvisibleLayer") {
            btn.children[0].setAttribute("src", "../src/Icons/eye-alt.svg");
        } else {
            btn.children[0].setAttribute("src", "../src/Icons/eye-close.svg");
        }
        btn.classList.toggle("unvisibleLayer");
        btn.classList.toggle("visibleLayer");
    });
});


//nav-menu選單開合
navMenu = document.getElementById("menu");
menu = document.querySelectorAll(".menu-type");
menuItem = document.querySelectorAll(".menu-item");


menu.forEach((el) => {
    el.addEventListener("click", function (e) {
        e.preventDefault();
        if (this.classList.contains('active')) {
            // 如果有 active class，就移除
            this.classList.remove('active');
        } else {
            // 移除其他 <li> 的 active
            menu.forEach(li => li.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

//對應menu跳出對應選單page
//同時mobile-menu關閉(icon改回default)
menuItem.forEach((item) => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.dataset.searchtype) {
            let typeName = e.target.dataset.searchtype;
            let pageTitle = document.querySelector(".page-title");
            pageTitle.textContent = typeName;
        }
        if (e.target.nodeName === "A" || e.target.nodeName === "LI") {
            if (!page.classList.contains("active")) {
                page.classList.add("active");
            }
            navMenu.classList.remove("opened");
        }
        mobileMenu.children[0].src = mobileMenu.children[0].src.replaceAll('cancel', 'menu');
    });
});


//開始查詢，跳出結果視窗(result-page)
// goBtn = document.querySelector(".goBtn");
//goBtn.addEventListener("click", () => {
//    result.classList.toggle("opened");
//});


//手機板menu選單
//mobileMenu.addEventListener("click", () => {
//    navMenu.classList.toggle("opened");
//    if (mobileMenu.children[0].src.includes("menu")) {
//        mobileMenu.children[0].src = mobileMenu.children[0].src.replaceAll('menu', 'cancel');
//    } else {
//        mobileMenu.children[0].src = mobileMenu.children[0].src.replaceAll('cancel', 'menu');
//    }
//});

//icon狀態顏色更改
allBtn = document.querySelectorAll(".btnIcon");
body2.addEventListener("mouseover", (e) => {
    e.stopPropagation();
    if (e.target.classList.contains("btnIcon") || e.target.classList.contains("iconImg")) {
        e.target.src = e.target.src.replaceAll('Icons', "Icons/hover-icon");
    }
});
body2.addEventListener("mouseout", (e) => {
    e.stopPropagation();
    if (e.target.classList.contains("btnIcon") || e.target.classList.contains("iconImg")) {
        e.target.src = e.target.src.replaceAll('Icons/hover-icon', "Icons");
    }
});


//tab-list換頁面內容
tabs = document.querySelectorAll(".tab-container");

tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
        e.stopPropagation();
        if (e.target.classList.contains("tab-item")) {
            let activeTab = tab.querySelectorAll(".tab-item.active");
            for (let i = 0; i < activeTab.length; i++) {
                activeTab[i].classList.remove("active");
            }
            e.target.classList.add("active");
            let content = tab.querySelectorAll(".tab-list");
            for (let i = 0; i < content.length; i++) {
                if (content[i].dataset.tabcontent === e.target.dataset.tab) {
                    content[i].classList.add("active");
                } else {
                    content[i].classList.remove("active");
                }
            }
        }
    });
});