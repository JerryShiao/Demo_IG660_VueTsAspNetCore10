let changeinfo = document.getElementById("change")
let newinfo = document.getElementById("new")

// 申請事由填寫項目
let select = document.querySelector("#selectreason");
let switchValue;

select.addEventListener("click", selectFunction);

function selectFunction() {
    switchValue = select.options[select.selectedIndex].value;
    console.log(switchValue);
    switch (switchValue) {
        case "申請變更許可":
            change();
            break;
        case "重新申請許可(遷出原許可機關管轄區域者適用)":
            newagree();
            break;
        default:
            defaultreason()
            break;
    }
}

function defaultreason() {
    changeinfo.classList.add("disable")
    newinfo.classList.add("disable")
}
function change() {
    changeinfo.classList.remove("disable")
    newinfo.classList.add("disable")
}

function newagree() {
    newinfo.classList.remove("disable")
    changeinfo.classList.add("disable")
}

// // 租賃頁統編填寫
let form2 = document.getElementById('form2');
let comnumber = document.getElementById("companynumber");

form2.addEventListener('click', function () {

    form2.register.value ? console.log(form2.register.value) : console.log('Null');
    if (form2.register.value == 1) {
        comnumber.classList.remove("disable")
    } else {
        comnumber.classList.add("disable")
    }
})


// 表格欄位新增

let tablelist = document.getElementsByClassName('tb-col');
let newDiv = document.createElement('div');
let tablegroup = document.getElementById('tablegroup');
let deleteIcon = document.querySelector('.del');
// console.log(tablelist);

let addBtn = document.getElementById("add");
let delBtn = document.getElementById("del")
let c = 0;
let newTitle = [];
let newName = [];
let newDate = [];
let newDoc = [];

addBtn.addEventListener("click", () => {
    //console.log(tablelist);
    if (c < 7) {

        newTitle[c] = document.createElement('input');
        newTitle[c].classList.add("tb-data");
        newTitle[c].type = "text";
        let nameNum = c + 2;
        newTitle[c].name = "A" + nameNum;
        tablelist.tb1.appendChild(newTitle[c]);

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

        // delBtn.classList.remove("disable");
        c++;
    } else {

        // addBtn.classList.add("disable");

    }

})

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

tablegroup.addEventListener("click", function () {
    // console.log("hi");
    // console.log(c);
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

let formList = document.getElementsByTagName('form');
for (let i = 0; i < formList.length; i++) {
    formList[i].setAttribute('onsubmit', 'return rejectSubmit();');
}
function rejectSubmit() {
    return false;
}
