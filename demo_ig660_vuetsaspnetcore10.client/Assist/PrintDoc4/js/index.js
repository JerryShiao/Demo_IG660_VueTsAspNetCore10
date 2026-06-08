// 申請事由填寫項目
let select = document.querySelector("#selectreason"); //申請事由下拉選單
let signChangeReason = document.querySelector("#signChangeReason")//委託代銷契約變更項目
let placeChangeReason = document.querySelector("#placeChangeReason")//營業處所變更項目
let companyChangeReason = document.querySelector("#companyChangeReason")//經紀業變更項目
let switchValue
select.addEventListener("change", selectFunction);

function selectFunction() {
    switchValue = select.options[select.selectedIndex].value; //申請事由select選單值

    switch (switchValue) {
        case "經紀業變更備查":
            companyChange();
            //addDoc01()
            break;
        case "營業處所分設備查":
            newCompany();
            //addDoc02(switchValue);
            break;
        case "委託代銷契約（簽訂）備查":
            sign();
            //addDoc02(switchValue);
            break;
        case "營業處所變更備查":
            change();
            //addDoc04()
            break;
        case "委託代銷契約變更備查":
            signChange();
            //addDoc05()
            break;
        default:
            defaultreason();
            break;
    }
}



let setInfo = document.getElementById("set"); //經紀業設立
let companyChangeInfo = document.getElementById("companychange"); //經紀業變更
let newInfo = document.getElementById("new"); //營業處所分設
let signInfo = document.getElementById("sign"); //委託代銷契約
let changeInfo = document.getElementById("change"); //營業處所變更
let signChangeInfo = document.getElementById("signchange"); //委託代銷契約變更備查
let extra = document.getElementById("extra"); //設立之附繳資料

//申請事由各項填寫區塊
function defaultreason() {
    setInfo.classList.remove("disable")
    // extra.classList.remove("disable")
    companyChangeInfo.classList.add("disable")
    newInfo.classList.add("disable")
    signInfo.classList.add("disable")
    changeInfo.classList.add("disable")
    signChangeInfo.classList.add("disable")
}
function companyChange() {
    companyChangeInfo.classList.remove("disable")
    setInfo.classList.add("disable")
    newInfo.classList.add("disable")
    signInfo.classList.add("disable")
    changeInfo.classList.add("disable")
    signChangeInfo.classList.add("disable")
    //extra.classList.add("disable")
}
function newCompany() {
    newInfo.classList.remove("disable")
    setInfo.classList.add("disable")
    companyChangeInfo.classList.add("disable")
    signInfo.classList.add("disable")
    changeInfo.classList.add("disable")
    signChangeInfo.classList.add("disable")
    //extra.classList.add("disable")

    let showMoreSign = document.getElementById("showMoreSign");
    let radioGroup = document.querySelectorAll(".radio-group")

    radioGroup[0].addEventListener("change", () => {
        let timeInfo = radioGroup[0].querySelector("input[type=radio]:checked")
        console.log(timeInfo.value)
        if (timeInfo.value === "非常態") {
            showMoreSign.classList.remove("disable")
            showMoreSign.classList.add("row")
        } else {
            showMoreSign.classList.add("disable")
            showMoreSign.classList.remove("row")
        }
    })

}
function sign() {
    signInfo.classList.remove("disable")
    setInfo.classList.add("disable")
    companyChangeInfo.classList.add("disable")
    newInfo.classList.add("disable")
    changeInfo.classList.add("disable")
    signChangeInfo.classList.add("disable")
    //extra.classList.add("disable")
}
function change() {
    changeInfo.classList.remove("disable")
    setInfo.classList.add("disable")
    companyChangeInfo.classList.add("disable")
    signInfo.classList.add("disable")
    newInfo.classList.add("disable")
    signChangeInfo.classList.add("disable")
    //extra.classList.add("disable")
}
function signChange() {
    changeInfo.classList.add("disable")
    setInfo.classList.add("disable")
    companyChangeInfo.classList.add("disable")
    signInfo.classList.add("disable")
    newInfo.classList.add("disable")
    signChangeInfo.classList.remove("disable")
    //extra.classList.add("disable")
}

//經紀業變更備查
function addDoc01() {

    let companySelect = document.getElementById("companyChangeReason");//經紀業變更備查-變更事項select選單
    companySelect.addEventListener("change", () => {
        let companyValue = companySelect.value;//選到的值

        //檢查新增之label是否重複
        let newCheckDiv = document.getElementById("newCheckDiv");
        if (newCheckDiv) newCheckDiv.remove(); //如果新增過就刪除

        // //檢查選到的值是否在文件Obj內
        // if (companyValue in docTextGroup.company) {

        //     let confirmValue = companyKeyArray.filter((a) => a === companyValue);//取出符合之變更名稱(資料為陣列)
        //     let text = confirmValue.toString(); //轉為字串

        //     //動態新增要加入附繳文件區的項目大區塊
        //     for (let i = 0; i < companyObjArray.length; i++) {
        //         if (text === companyObjArray[i][0]) {
        //             let doc = companyObjArray[i][1].text;
        //             let newCheckDiv = document.createElement("div");
        //             newCheckDiv.id = "newCheckDiv";
        //             for (let i = 0; i < doc.length; i++) {

        //                 //建立new label
        //                 let docCheckLabel = document.createElement("label");
        //                 let docCheckbox = document.createElement("input");
        //                 docCheckbox.setAttribute("type", "checkbox");

        //                 //建立text(文件名稱)
        //                 let docCheckboxText = document.createElement("p");
        //                 docCheckboxText.innerHTML = doc[i] + "2份";
        //                 docCheckLabel.appendChild(docCheckbox);
        //                 docCheckLabel.appendChild(docCheckboxText);

        //                 let docForm = document.getElementById("form03")//付繳文件區塊
        //                 newCheckDiv.appendChild(docCheckLabel);
        //                 docForm.appendChild(newCheckDiv);
        //             }
        //         }
        //     }
        // };
    })
}

//營業處所分設備查&委託代銷契約（簽訂）備查
function addDoc02(data) {

    //檢查新增之label是否重複
    let newCheckDiv = document.getElementById("newCheckDiv");
    if (newCheckDiv) newCheckDiv.remove();

    //addLabelforBusiness(data);
}

//營業處所變更備查&委託代銷契約變更備查
function addDoc04() {
    let placeSelect = document.getElementById("placeChangeReason");//營業/代銷變更備查-變更事項select選單
    placeSelect.addEventListener("change", () => {
        let placeValue = placeSelect.value;//選到的值

        //檢查新增之label是否重複
        let newCheckDiv = document.getElementById("newCheckDiv");
        if (newCheckDiv) newCheckDiv.remove();//如果新增過就刪除

        //addLabelforBusiness(placeValue);
    })
}
//委託代銷契約變更備查
function addDoc05() {
    let signSelect = document.getElementById("signChangeReason");//營業/代銷變更備查-變更事項select選單
    signSelect.addEventListener("change", () => {
        let signValue = signSelect.value;//選到的值

        //檢查新增之label是否重複
        let newCheckDiv = document.getElementById("newCheckDiv");
        if (newCheckDiv) newCheckDiv.remove();//如果新增過就刪除

        //addLabelforBusiness(signValue);
    })
}


//附繳文件數量檢查
let checkboxListener = document.getElementById('form03');
checkboxListener.addEventListener('change',(e)=>{
    console.log('checkboxListener.document.length',checkboxListener.document.length);
    let checkedCount = 0;
    for(let i=0;i<checkboxListener.document.length;i++){
        if(checkboxListener.document[i].checked)checkedCount++;
    }

    if(checkedCount > 8){
        alert('最多8份附繳文件!!!');
        e.target.checked = false;
    }
})

let formList = document.getElementsByTagName('form');
for (let i = 0; i < formList.length; i++) {
    formList[i].setAttribute('onsubmit', 'return rejectSubmit();');
}
function rejectSubmit() {
    return false;
}
// // 附繳文件總表
// const docText = ["公司或商業登記證明文件影本", "營業保證金繳存證明影本", "同業公會會員證明影本", "不動產經紀人員名冊", "不動產經紀人員證書（明）影本", "其名冊及身分證明文件影本負責人、董事、監察人、經理人", "停業或復業登記證明文件影本", "加盟或退盟文件影本", "委託代銷契約書影本", "及業務終止後個人資料處理方法個人資料檔案安全維護計畫", "原許可文件", "建造執照影本"]

// let docTextGroup = {
//     company: {
//         "名稱": {
//             text: [docText[0], docText[9]]
//         },
//         "所在地": {
//             text: [docText[0], docText[9]]
//         },
//         "組織型態": {
//             text: [docText[0], docText[9]]
//         },
//         "組織解散或終止營業": {
//             text: [docText[0], docText[10]]
//         },
//         "負責人、董事、監察人或經理人": {
//             text: [docText[0], docText[5], docText[9]]
//         },
//         "經營型態": {
//             text: [docText[7], docText[9]]
//         },
//         "營業項目": {
//             text: [docText[0]]
//         },
//         "加入之同業公會": {
//             text: [docText[2]]
//         },
//         "僱用之經紀人員": {
//             text: [docText[3]]
//         },
//         "遷入": {
//             text: [docText[2], docText[3]]
//         },
//         "停業": {
//             text: [docText[6]]
//         },
//         "復業": {
//             text: [docText[2], docText[3], docText[6]]
//         },
//         "個人資料檔案安全維護計畫及業務終止後個人資料處理方法": {
//             text: [docText[9]]
//         },
//     },
//     business: {
//         "營業處所分設備查": {
//             text: [docText[1], docText[3], docText[8]]
//         },
//         "僱用之經紀人員": {
//             text: [docText[3]]
//         },
//         "代理銷售不動產名稱": {
//             text: [docText[8]]
//         },
//         "設立目的": {
//             text: [docText[8]]
//         },
//         "銷售總金額": {
//             text: [docText[8]]
//         },
//         "設立期間": {
//             text: [docText[8]]
//         },
//         "委託代銷契約（簽訂）備查": {
//             text: [docText[8], docText[11]]
//         },
//         "委託代銷期間": {
//             text: [docText[8]]
//         },
//         "代理銷售戶(棟)數": {
//             text: [docText[8]]
//         },
//         "委託代銷契約終止或解除": {
//             text: [docText[8]]
//         },
//         "建造執照(日期或字號)": {
//             text: [docText[11]]
//         },
//         "委託代銷之營業處所": {
//             text: [docText[8]]
//         },
//     }
// }

// let companyObjArray = Object.entries(docTextGroup.company); //取出經紀業:文件之物件總對照表
// let companyKeyArray = Object.keys(docTextGroup.company); //經紀業對照物件-變更名稱
// let businessObjArray = Object.entries(docTextGroup.business); //營業處所對照物件
// let businessKeyArray = Object.keys(docTextGroup.business); //營業處所對照物件-變更名稱

// //將對應文件名稱加上checkbox後放入付繳文件區塊
// function addLabelforBusiness(selectValue) {

//     if (selectValue in docTextGroup.business) {
//         // let KeyArray = property+'KeyArray'
//         let confirmValue = businessKeyArray.filter((a) => a === selectValue);//取出符合之變更名稱
//         let text = confirmValue.toString(); //轉為字串

//         for (let i = 0; i < businessObjArray.length; i++) {
//             if (text === businessObjArray[i][0]) {
//                 let doc = businessObjArray[i][1].text;
//                 let newCheckDiv = document.createElement("div");
//                 newCheckDiv.id = "newCheckDiv";

//                 //將對應文件名稱加上checkbox後放入付繳文件區塊
//                 for (let i = 0; i < doc.length; i++) {

//                     //建立new label
//                     let docCheckLabel = document.createElement("label");
//                     let docCheckbox = document.createElement("input");
//                     docCheckbox.setAttribute("type", "checkbox");
//                     docCheckbox.setAttribute("value", `${doc[i]}2`);
//                     docCheckbox.name ="document";
                    

//                     //建立text(文件名稱)
//                     let docCheckboxText = document.createElement("p");
//                     docCheckboxText.innerHTML = doc[i] + "2份";
//                     docCheckLabel.appendChild(docCheckbox);
//                     docCheckLabel.appendChild(docCheckboxText);

//                     let docForm = document.getElementById("form03")//付繳文件區塊
//                     newCheckDiv.appendChild(docCheckLabel);
//                     docForm.appendChild(newCheckDiv);
//                 }
//             }
//         }
//     };
// }