// 申請事由填寫項目
let select = document.querySelector("#selectreason"); //申請事由下拉選單
let switchValue
select.addEventListener("change", selectFunction);

function selectFunction() {
    switchValue = select.options[select.selectedIndex].value; //申請事由select選單值
    setDefault();
    switch (switchValue) {
        case "申請補發許可":
            reNew();
            break;
        case "申請換發許可":
            changeNew();
            break;
        case "申請變更原許可事項":
            change();
            break;
        case "申請註銷許可":
            cancel();
            break;
        default:
            defaultBlock()
            defaultDoc();
            break;
    }
}

let detailreasonItem = document.querySelector("#form01 label:nth-child(2)"); //申請許可原因展開
let changeItem = document.getElementById("changeItem"); //申請變更原許可事項展開
let cancelItem = document.getElementById("cancelItem"); //申請註銷許可展開
let changeNewItem = document.getElementById("changeNewItem"); //申請換發許可展開
let reNewItem = document.getElementById("reNewItem"); //申請補發許可展開

//申請事由各項填寫區塊
function cancel() {//申請註銷許可
    detailreasonItem.classList.add("disable");
    cancelItem.classList.remove("disable");
    changeItem.classList.add("disable");
    changeNewItem.classList.add("disable");
    reNewItem.classList.add("disable");
    typeInput[0].checked = false;
    typeInput[1].checked = false;
    deleteBCDF();
}
function change() {//申請變更原許可事項
    detailreasonItem.classList.add("disable");
    changeItem.classList.remove("disable");
    cancelItem.classList.add("disable");
    changeNewItem.classList.add("disable");
    reNewItem.classList.add("disable");
    typeInput[0].checked = false;
    typeInput[1].checked = false;
}
function changeNew() {//申請換發許可
    detailreasonItem.classList.add("disable");
    changeNewItem.classList.remove("disable");
    changeItem.classList.add("disable");
    cancelItem.classList.add("disable");
    reNewItem.classList.add("disable");
    typeInput[0].checked = false;
    typeInput[1].checked = false;
    deleteBCDF();
}
function reNew() {//申請補發許可
    detailreasonItem.classList.add("disable");
    reNewItem.classList.remove("disable");
    changeItem.classList.add("disable");
    cancelItem.classList.add("disable");
    changeNewItem.classList.add("disable");
    typeInput[0].checked = false;
    typeInput[1].checked = false;
    //申請補發時
    document.querySelector("[name=B]").classList.add("disable")
    document.querySelector("[name=C]").classList.add("disable")
    document.querySelector("[name=D]").classList.add("disable")
    document.querySelector("[name=F]").classList.add("disable")
    document.querySelector("[name=G]").classList.add("disable")
}
function defaultBlock() {//申請許可
    detailreasonItem.classList.remove("disable");
    changeItem.classList.add("disable");
    cancelItem.classList.add("disable");
    changeNewItem.classList.add("disable");
    reNewItem.classList.add("disable");
    typeInput[0].checked = true;
}

// 經紀業負責人、董事、監察人、經理人名冊表格欄位新增
let tablelist = document.getElementsByClassName('tb-col');//每個tb-col
let newDiv = document.createElement('div');
let tablegroup = document.getElementById('tablegroup');//全table

let addBtn = document.getElementById("add");//新增欄位btn
let delBtn = document.getElementById("del")//刪除欄位btn
let c = 0;//計數器

let newTitle = [];
let newName = [];
let newDate = [];
let newDoc = [];

addBtn.addEventListener("click", () => {
    // console.log(tablelist);
    if (c < 7) {

        newTitle[c] = document.createElement('input');//建立新的input
        newTitle[c].classList.add("tb-data");//套用CSS樣式
        newTitle[c].type = "text";//將input type設為text
        let nameNum = c + 2;
        newTitle[c].name = "A" + nameNum;//命名name
        tablelist.tb1.appendChild(newTitle[c]);//插入第一列

        newName[c] = document.createElement('input');
        newName[c].classList.add("tb-data");
        newName[c].type = "text";
        newName[c].name = "B" + nameNum;
        tablelist.tb2.appendChild(newName[c]);

        newDate[c] = document.createElement('input');
        newDate[c].classList.add("tb-data");
        newDate[c].type = "date";
        newDate[c].placeholder = "年 / 月 / 日";
        newDate[c].name = "C" + nameNum;
        tablelist.tb3.appendChild(newDate[c]);

        newDoc[c] = document.createElement('input');
        newDoc[c].classList.add("tb-data");
        newDoc[c].type = "text";
        newDoc[c].name = "D" + nameNum;
        tablelist.tb4.appendChild(newDoc[c]);

        c++;
    } else {
        // addBtn.classList.add("disable");
    }
})

//點擊刪除欄位btn時各刪除一欄
delBtn.addEventListener("click", function () {
    if (c > 0) {
        tablelist.tb1.removeChild(tablelist.tb1.querySelectorAll('input')[c]);
        tablelist.tb2.removeChild(tablelist.tb2.querySelectorAll('input')[c]);
        tablelist.tb3.removeChild(tablelist.tb3.querySelectorAll('input')[c]);
        tablelist.tb4.removeChild(tablelist.tb4.querySelectorAll('input')[c]);
    } else {
        // delBtn.classList.add("disable");
        // addBtn.classList.remove("disable");
    }

    c <= 0 ? c = 0 : c--;

})

//僅一欄時隱藏刪除欄位btn；最多8欄時隱藏新增欄位btn
tablegroup.addEventListener("click", function () {
    switch (c) {
        case 7:
            addBtn.classList.add("disable");
            break;
        case 0:
            delBtn.classList.add("disable");
            addBtn.classList.remove("disable");
            break;
        default:
            delBtn.classList.remove("disable");
            addBtn.classList.remove("disable");
            break;
    }

})


//填寫統一編號區塊
let companyRegisterInput = document.querySelectorAll("[name=companyRegister]")//公司登記
let businessRegisterInput = document.querySelectorAll("[name=businessRegister]")//商業登記

function addTaxId(data, name) {
    let newTaxInput = document.createElement("input");
    newTaxInput.setAttribute("type", "text");
    newTaxInput.setAttribute("placeholder", "請輸入統一編號");
    newTaxInput.name = name;
    for (let i = 0; i < data.length; i++) {
        data[i].addEventListener("click", () => {
            if (data[i].value === "是") {
                data[i].parentElement.appendChild(newTaxInput);
                newTaxInput.classList.remove("disable")
            } else if (data[i].value === "否") {
                newTaxInput.classList.add("disable")
            }
        })
    }
}
addTaxId(companyRegisterInput, '已辦理公司登記統一編號');
addTaxId(businessRegisterInput, '已辦理商業登記統一編號');


//加盟填寫區塊
let styleInput = document.querySelectorAll("[name=style]")//經營型態
function addStyle(data, name) {
    let styleInput = document.createElement("input");
    styleInput.setAttribute("type", "text");
    styleInput.setAttribute("placeholder", "請輸入加盟之公司/商號");
    styleInput.style = 'width:auto';
    styleInput.name = name;
    for (let i = 0; i < data.length; i++) {
        data[i].addEventListener("click", () => {
            companyStyleCheck();
            if (data[i].value === "加盟體系") {
                data[i].parentElement.appendChild(styleInput);
                styleInput.classList.remove("disable")
            } else if (data[i].value === "直營體系") {
                styleInput.classList.add("disable")
            }
        })
    }
}
addStyle(styleInput, '加盟體系內容');

//判斷經紀業預設組織型態
let detailReason = document.getElementById("detailreason");
let typeInput = document.querySelectorAll("[name=type]")//組織型態

detailReason.addEventListener("change", () => {
    if (detailreason.value === "新設公司") {
        typeInput[0].checked = true;
    } else {
        typeInput[1].checked = true;
    }
})

//不動產經紀業申請經營許可應附繳文件一覽表
let docText = ["不動產經紀業經營許可申請書", "負責人、董事、監察人、經理人身分證明文件影本", "經濟部核准保留公司名稱預查表影本", "直轄市或縣(市)政府登記商號名稱預查表影本", "代理人身分證明文件影本", "加盟證明文件影本", "原許可文件"]

let docTextGroup = {
    A: docText[0],
    B: docText[1],
    C: docText[2],
    D: docText[3],
    E: docText[4],
    F: docText[5],
    G: docText[6]
}

//取出docTextGroup所有文件並加入附繳文件區
let docTextGroupArray = Object.entries(docTextGroup);
//console.log(docTextGroupArray);
let docTextGroupValues = Object.values(docTextGroup);//stringArray
//console.log(docTextGroupValues);
let docTextGroupKeys = Object.keys(docTextGroup);
//console.log(docTextGroupKeys);

let docForm = document.getElementById("form06")//付繳文件區塊
let newCheckDiv = document.createElement("div");
newCheckDiv.id = "newCheckDiv";

for (let i = 0; i < docTextGroupValues.length; i++) {
    let docCheckLabel = document.createElement("label");
    docCheckLabel.setAttribute("name", `${docTextGroupKeys[i]}`);
    let docCheckbox = document.createElement("input");
    docCheckbox.setAttribute("type", "checkbox");
    docCheckbox.setAttribute("value", `${docTextGroupValues[i]}`);
    docCheckbox.name = 'document';

    let docCheckboxText = document.createElement("p");
    docCheckboxText.innerHTML = docTextGroupValues[i] + "2份";
    docCheckLabel.appendChild(docCheckbox);
    docCheckLabel.appendChild(docCheckboxText);
    // docCheckLabel.setAttribute("class", "disable");

    //把前步驟建立好的label區塊加到附繳文件區塊
    newCheckDiv.appendChild(docCheckLabel);
    docForm.appendChild(newCheckDiv);
}

//判斷為直營則移除F(加盟證明文件影本)
function companyStyleCheck() {
    if (styleInput[0].checked) {
        document.querySelector("[name=F]").classList.add("disable")
    } else if (styleInput[1].checked) {
        document.querySelector("[name=F]").classList.remove("disable")
    }
}

//申請許可原因為新設公司/新設商號時
detailReason.addEventListener("change", () => {
    if (detailReason.value === "新設公司") {
        document.querySelector("[name=D]").classList.add("disable")
        document.querySelector("[name=G]").classList.add("disable")
    } else {
        document.querySelector("[name=D]").classList.remove("disable")
        document.querySelector("[name=C]").classList.add("disable")
    }
})

//設定表單default附繳文件
function defaultDoc() {
    document.querySelector("[name=D]").classList.add("disable")
    document.querySelector("[name=G]").classList.add("disable")
}
defaultDoc();

//重整文件顯示狀態
function setDefault() {
    document.querySelector("[name=A]").classList.remove("disable")
    document.querySelector("[name=B]").classList.remove("disable")
    document.querySelector("[name=C]").classList.remove("disable")
    document.querySelector("[name=D]").classList.remove("disable")
    document.querySelector("[name=E]").classList.remove("disable")
    document.querySelector("[name=F]").classList.remove("disable")
    document.querySelector("[name=G]").classList.remove("disable")
}

////申請換發/註銷時
function deleteBCDF() {
    document.querySelector("[name=B]").classList.add("disable")
    document.querySelector("[name=C]").classList.add("disable")
    document.querySelector("[name=D]").classList.add("disable")
    document.querySelector("[name=F]").classList.add("disable")
}


//變更許可事項
let itemChangeReason = document.getElementById("itemChangeReason");
itemChangeReason.addEventListener("change", () => {
    setDefault();
    switch (itemChangeReason.value) {
        case "所在地":
            deleteBCDF()
            break;
        case "負責人":
            document.querySelector("[name=C]").classList.add("disable")
            document.querySelector("[name=D]").classList.add("disable")
            document.querySelector("[name=F]").classList.add("disable")
            break;
        default:
            document.querySelector("[name=B]").classList.add("disable")
            document.querySelector("[name=D]").classList.add("disable")
            document.querySelector("[name=F]").classList.add("disable")
            break;
    }

})

//判斷變更事項為公司/商號
for (let i = 0; i < typeInput.length; i++) {
    typeInput[i].addEventListener("click", () => {
        switch (typeInput[1].checked) {
            case true:
                document.querySelector("[name=C]").classList.add("disable")
                document.querySelector("[name=D]").classList.remove("disable")
                break;
            case false:
                document.querySelector("[name=C]").classList.remove("disable")
                document.querySelector("[name=D]").classList.add("disable")
                break;
            default:
                break;
        }
    })
}

let formList = document.getElementsByTagName('form');
for (let i = 0; i < formList.length; i++) {
    formList[i].setAttribute('onsubmit', 'return rejectSubmit();');
}
function rejectSubmit() {
    return false;
}
