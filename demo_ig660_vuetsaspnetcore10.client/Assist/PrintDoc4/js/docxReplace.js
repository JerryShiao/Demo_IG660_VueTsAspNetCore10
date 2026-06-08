let checked = '■';
let unchecked = '□';
let form1 = document.getElementById('form01');
let form2 = document.getElementById('form02');
let form3 = document.getElementById('form03');
let form4 = document.getElementById('form04');
let form5 = document.getElementById('form05');

//let track = document.getElementById('form02');
//track.addEventListener('change', function () {
//    //console.log('性別', track.gender.value);
//    //ReplaceDocument(form3)
//    //ReplaceApplyTitle(form2);
//    //console.log('名稱', track.name.value);
//})
//新增停業及其他監聽器
form2.addEventListener('change', () => {
    //監聽器重做
    if (form2.reason.value === "經紀業變更備查") {
        let checkboxChange_stop = document.getElementById('checkbox_stop');
        let stopDiv = document.getElementById('div_stop');
        checkboxChange_stop.addEventListener('change', () => {
            checkboxChange_stop.checked ? stopDiv.classList.remove('disable') : stopDiv.classList.add('disable');
            
        }, { once: true, });

        //日期互換
        let labelNew = stopDiv.querySelector('.row');
        //console.log('labelNew', labelNew);
        labelNew.addEventListener('change', () => {
            let dateEnd = form2.停業終.value;
            if (dateEnd) {
                let dateEndNew = parseInt(dateEnd.replaceAll('-', ''));
                let dateStart = form2.停業起.value;
                let dateStartNew = parseInt(dateStart.replaceAll('-', ''));
                if (dateStartNew > dateEndNew) {
                    form2.停業終.value = dateStart;
                    form2.停業起.value = dateEnd;
                }
                //console.log('更換成功!!!')

            }
        }, { once: true, });

        let checkboxChange_other = document.getElementById('checkbox_other');
        let otherDiv = document.getElementById('div_other');
        checkboxChange_other.addEventListener('change', () => {
            checkboxChange_other.checked ? otherDiv.classList.remove('disable') : otherDiv.classList.add('disable');

        }, { once: true, });
        //let selectChange = document.getElementById('companyChangeReason');
        //selectChange.addEventListener('change', () => {
        //    let labelNew = document.getElementById('labelAdd');
        //    if (labelNew) labelNew.remove();
        //    if (form2.變更事項.value === '停業') {
        //        //console.log('變了!!!', form2.變更事項.value);
        //        let label = document.createElement('label');
        //        label.classList.add('label-group');
        //        label.id = 'labelAdd';
        //        let p = document.createElement('p');
        //        p.classList.add('input-title');
        //        p.textContent = '停業期間';

        //        let div = document.createElement('div');
        //        div.classList.add('row-3');

        //        let date1 = document.createElement('input');
        //        date1.type = "date";
        //        date1.name = "停業起";
        //        let span = document.createElement('span');
        //        span.textContent = '至';
        //        let date2 = document.createElement('input');
        //        date2.type = "date";
        //        date2.name = "停業終";

        //        div.appendChild(date1);
        //        div.appendChild(span);
        //        div.appendChild(date2);
        //        label.appendChild(p);
        //        label.appendChild(div);

        //        let Add = document.getElementById('addChange');
        //        Add.appendChild(label);

        //        //日期互換
        //        labelNew = document.getElementById('labelAdd');
        //        labelNew.addEventListener('change', () => {
        //            let dateEnd = form2.停業終.value;
        //            if (dateEnd) {
        //                let dateEndNew = parseInt(dateEnd.replaceAll('-', ''));
        //                let dateStart = form2.停業起.value;
        //                let dateStartNew = parseInt(dateStart.replaceAll('-', ''));
        //                if (dateStartNew > dateEndNew) {
        //                    form2.停業終.value = dateStart;
        //                    form2.停業起.value = dateEnd;
        //                }
        //                //console.log('更換成功!!!')

        //            }
        //        });


        //    }
        //    if (form2.變更事項.value === '其他') {
        //        //console.log('變了!!!', form2.變更事項.value);
        //        //if (labelNew) labelNew.remove();
        //        //console.log('變了!!!', form2.變更事項.value);
        //        let label = document.createElement('label');
        //        label.classList.add('label-group');
        //        label.id = 'labelAdd';
        //        let p = document.createElement('p');
        //        p.classList.add('input-title');
        //        p.textContent = '其他變更事項';

        //        let other = document.createElement('input');
        //        other.type = "text";
        //        other.name = "經紀業變更備查_其他";


        //        label.appendChild(p);
        //        label.appendChild(other);

        //        let Add = document.getElementById('addChange');
        //        Add.appendChild(label);

        //    }

        //});


    }
    if (form2.reason.value === "營業處所分設備查") {
        let label1 = document.getElementById('非常態營業處所設立期間');
        let label2 = document.getElementById('委託代銷期間');
        if (label1) {
            label1.addEventListener('change', () => {
                //console.log('非常態營業處所設立期間');
                let dateEnd = form2.設立終.value;
                if (dateEnd) {
                    let dateEndNew = parseInt(dateEnd.replaceAll('-', ''));
                    let dateStart = form2.設立起.value;
                    let dateStartNew = parseInt(dateStart.replaceAll('-', ''));
                    if (dateStartNew > dateEndNew) {
                        form2.設立終.value = dateStart;
                        form2.設立起.value = dateEnd;
                    }
                    //console.log('更換成功!!!')

                }
            });
            label2.addEventListener('change', () => {
                //console.log('委託代銷期間');
                let dateEnd = form2.委託代銷終.value;
                if (dateEnd) {
                    let dateEndNew = parseInt(dateEnd.replaceAll('-', ''));
                    let dateStart = form2.委託代銷起.value;
                    let dateStartNew = parseInt(dateStart.replaceAll('-', ''));
                    if (dateStartNew > dateEndNew) {
                        form2.委託代銷終.value = dateStart;
                        form2.委託代銷起.value = dateEnd;
                    }
                    //console.log('更換成功!!!')

                }
            });
        }
    }
    //非常態營業處所設立期間1監聽器不用
    if (form2.reason.value === "委託代銷契約（簽訂）備查") {
        //let label1 = document.getElementById('非常態營業處所設立期間1');
        let label2 = document.getElementById('委託代銷期間1');
        if (label2) {
            //label1.addEventListener('change', () => {
            //    //console.log('非常態營業處所設立期間');
            //    let dateEnd = form2.設立終1.value;
            //    if (dateEnd) {
            //        let dateEndNew = parseInt(dateEnd.replaceAll('-', ''));
            //        let dateStart = form2.設立起1.value;
            //        let dateStartNew = parseInt(dateStart.replaceAll('-', ''));
            //        if (dateStartNew > dateEndNew) {
            //            form2.設立終1.value = dateStart;
            //            form2.設立起1.value = dateEnd;
            //        }
            //        //console.log('更換成功!!!')

            //    }
            //});
            label2.addEventListener('change', () => {
                //console.log('委託代銷期間');
                let dateEnd = form2.委託代銷終1.value;
                if (dateEnd) {
                    let dateEndNew = parseInt(dateEnd.replaceAll('-', ''));
                    let dateStart = form2.委託代銷起1.value;
                    let dateStartNew = parseInt(dateStart.replaceAll('-', ''));
                    if (dateStartNew > dateEndNew) {
                        form2.委託代銷終1.value = dateStart;
                        form2.委託代銷起1.value = dateEnd;
                    }
                    //console.log('更換成功!!!')

                }
            });
        }
    }
    if (form2.reason.value === "營業處所變更備查") {
        let checkboxChange_other = document.getElementById('checkbox_other1');
        let otherDiv = document.getElementById('div_other1');
        checkboxChange_other.addEventListener('change', () => {
            checkboxChange_other.checked ? otherDiv.classList.remove('disable') : otherDiv.classList.add('disable');

        }, { once: true, });

        //let otherSelect = document.getElementById('placeChangeReason');
        //let lablelSearch = document.getElementById('labelOtherAdd');
        //if (form2.營業處所變更事項.value === '其他') {
        //    if (!lablelSearch) {
        //        let label = document.createElement('label');
        //        label.classList.add('label-group');
        //        label.id = 'labelOtherAdd';
        //        let p = document.createElement('p');
        //        p.classList.add('input-title');
        //        p.textContent = '其他變更事項';

        //        let other = document.createElement('input');
        //        other.type = "text";
        //        other.name = "營業處所變更備查_其他";


        //        label.appendChild(p);
        //        label.appendChild(other);
        //        //console.log('otherSelect', otherSelect.parentNode);
        //        insertAfter(label, otherSelect.parentNode);
        //    }

        //} else {
        //    if (lablelSearch) lablelSearch.remove();
        //}
    }
    if (form2.reason.value === "委託代銷契約變更備查") {
        let checkboxChange_other = document.getElementById('checkbox_other2');
        let otherDiv = document.getElementById('div_other2');
        checkboxChange_other.addEventListener('change', () => {
            checkboxChange_other.checked ? otherDiv.classList.remove('disable') : otherDiv.classList.add('disable');

        }, { once: true, });

        //let otherSelect = document.getElementById('signChangeReason');
        //let lablelSearch = document.getElementById('labelOtherAdd1');
        //if (form2.委託代銷契約變更事項.value === '其他') {
        //    if (!lablelSearch) {
        //        let label = document.createElement('label');
        //        label.classList.add('label-group');
        //        label.id = 'labelOtherAdd1';
        //        let p = document.createElement('p');
        //        p.classList.add('input-title');
        //        p.textContent = '其他變更事項';

        //        let other = document.createElement('input');
        //        other.type = "text";
        //        other.name = "營業處所變更備查_其他1";


        //        label.appendChild(p);
        //        label.appendChild(other);
        //        //console.log('otherSelect', otherSelect.parentNode);
        //        insertAfter(label, otherSelect.parentNode);
        //    }

        //} else {
        //    if (lablelSearch) lablelSearch.remove();
        //}
    }

})
//新增兄弟元素
function insertAfter(newNode, curNode) {
    curNode.parentNode.insertBefore(newNode, curNode.nextElementSibling);
}
//新增同戶籍地址監聽器
let address = document.querySelector('#address');
address.addEventListener('change', () => {
    let same = document.querySelector('input[name="Address"]');
    //console.log('點擊成功', same);
    if (same.checked) {
        let addr = document.querySelector('#applicant_addr');
        let addr1 = document.querySelector('#applicant_addr1');
        addr1.value = addr.value;
        //console.log('相同', addr);
        addr1.addEventListener('change', () => {
            same.checked = false;
            //console.log('不相同', addr1);
        })
    }
});

const defaltData = {

    //受理機關
    '受理機關': '臺南',

    //經紀業
    '經紀業名稱':'　　　　　　  ',
    '許可日期_年':'     ',
    '許可日期_月':'    ',
    '許可日期_日': '    ',
    '統一編號': '　　　　    ',
    '專線電話': '　　　',
    '所在地':'',
    '文號':'',
    '電子郵件':'',
    '網址': '',

    //申請備查事由
    //經紀業設立備查
    '經紀業設立備查': unchecked,
    '經紀人員數':' ',
    '同業公會名稱': ' ',
    //經紀業變更備查
    '經紀業變更備查': unchecked,
    '名稱變更':unchecked,
    '所在地變更':unchecked,
    '組織型態變更':unchecked,
    '組織解散':unchecked,
    '經營型態變更':unchecked,
    '營業項目變更':unchecked,
    '同業公會變更':unchecked,
    '經紀人員變更':unchecked,
    '遷入':unchecked,
    '經理人變更':unchecked,
    '停業':unchecked,
    '停業起_年':'',
    '停業起_月':'',
    '停業起_日': '',
    '停業終_年': '',
    '停業終_月':'',
    '停業終_日':'',
    '代銷業務變更':unchecked,
    '復業':unchecked,
    '個人資料處理方法變更':unchecked,
    '經紀業變更備查_其他':unchecked,
    '經紀業變更備查_其他內容': '',
    '變更前事項內容': '',
    '變更後事項內容': '',

    //營業處所分設備查
    '營業處所分設備查': unchecked,
    '常態':unchecked,
    '非常態':unchecked,
    '營業處所名稱': '',
    '營業處所所在地':'',
    '設立年':' ',
    '設立月':'',
    '設立日':'',
    '經紀人員數1':' ',

    //委託代銷契約
    '委託代銷契約': unchecked,
    '營業處所設立目的': '',
    '設立起_年': ' ',
    '設立起_月': '',
    '設立起_日': '',
    '設立終_年': ' ',
    '設立終_月': '',
    '設立終_日': '',
    '不動產名稱':'',
    '不動產所在地': '',
    '執照核發年': '  ',
    '執照核發月': '  ',
    '執照核發日': '  ',
    '字號':'',
    '銷售總金額':'　　　　　',
    '代理銷售戶':'　　　',
    '委託代銷': unchecked,
    '委託代銷起_年': ' ',
    '委託代銷起_月': '',
    '委託代銷起_日': '',
    '委託代銷終_年': ' ',
    '委託代銷終_月': '',
    '委託代銷終_日': '',
    '委託代銷_其他': unchecked,
    '委託代銷_其他內容': '      ',

    //營業處所變更備查
    '營業處所變更備查': unchecked,    
    '委託代銷契約變更備查': unchecked,//委託代銷契約變更備查
    '營業處所名稱1': '　　　　　 ',
    '營業處所名稱變更':unchecked,
    '營業處所所在地變更':unchecked,
    '營業處所僱用之經紀人員變更':unchecked,
    '營業處所遷入':unchecked,
    '營業處所裁撤':unchecked,
    '營業處所設立目的變更':unchecked,
    '營業處所銷售總金額變更':unchecked,
    '營業處所設立期間變更':unchecked,
    '營業處所不動產名稱變更':unchecked,
    '營業處所建造執照變更':unchecked,
    '營業處所代理銷售戶數變更':unchecked,
    '營業處所委託代銷契約終止':unchecked,
    '營業處所委託代銷期間變更':unchecked,
    '營業處所委託代銷之營業處所變更':unchecked,
    '營業處所委其他':unchecked,
    '營業處所委其他內容':'',
    '變更前事項內容1':'',
    '變更後事項內容1': '',

    //負責人
    '負責人姓名':'　　　　　　',
    '負責人電子郵件信箱':'',
    '負責人辦公室':'　　　　　',
    '負責人住家':'　　　　　',
    '負責人行動':'',
    '負責人戶籍地址':'',
    '負責人通訊地址':'',

    //代理人
    '代理人姓名': '　　　　　　',
    '代理人電子郵件信箱': '',
    '代理人辦公室': '　　　　　',
    '代理人住家': '　　　　　',
    '代理人行動': '',
    '代理人通訊地址': '',
 

    ////附繳文件  
    document1:'　　　　　　　　　　　　　　 ',
    document2:'　　　　　　　　　　　　 ',
    document3:'　　　　　　　　　　　　　　 ',
    document4:'　　　　　　　　　　　　 ',
    document5:'　　　　　　　　　　　　　　 ',
    document6:'　　　　　　　　　　　　 ',
    document7:'　　　　　　　　　　　　　　 ',
    document8:'　　　　　　　　　　　　 ',
    

    //聲明事項
    application_year:'　　　',//申請民國年
    application_month:'　　 ',//申請民國月
    application_day:'　 　',//申請民國日
};

let Data = Object.create(defaltData);

//經紀業內容更換
function ReplaceBrokerage(data) {
    
    let name = data.name.value;
    let date = data.date.value.replaceAll('-', '');
    let year = parseInt(date.substr(0, 4))-1911;
    let month = date.substr(4, 2);
    let day = date.substr(6, 2);

    Data.經紀業名稱 = name ? name : defaltData.經紀業名稱;
    Data.許可日期_年 = year ? year : defaltData.許可日期_年;
    Data.許可日期_月 = month ? month : defaltData.許可日期_月;
    Data.許可日期_日 = day ? day : defaltData.許可日期_日;

    let ID = data.ID.value;
    let tel = data.tel.value;
    let email = data.email.value;
    let address = data.address.value;
    let webURL = data.webURL.value;
    let docNum = data.docNum.value;

    Data.統一編號 = ID ? ID : defaltData.統一編號;
    Data.專線電話 = tel ? tel : defaltData.專線電話;
    Data.電子郵件 = email ? email : defaltData.電子郵件;
    Data.所在地 = address ? address : defaltData.所在地;
    Data.網址 = webURL ? webURL : defaltData.網址;
    Data.文號 = docNum ? docNum : defaltData.文號;   


}
//申請備查事由
function ReplaceApplyTitle(data) {
    //console.log(switchValue);
    switchValue ||= '經紀業設立備查';
    //let applicationCheck = parseInt(data.apply.value);
    //let renewalReasonCheck = parseInt(data.fullfill.value);
    ////console.log('申請事由', switchValue);
    switch (switchValue) {
        case "經紀業設立備查":
            
            Data.經紀業設立備查 = checked;
            let peopleCount = data.經紀人員數.value;
            let guildName = data.同業公會名稱.value;
            Data.經紀人員數 = peopleCount ? peopleCount : defaltData.經紀人員數;
            Data.同業公會名稱 = guildName ? guildName : defaltData.同業公會名稱;
            //還原資料為預設值;
            Data.經紀業變更備查 = unchecked;
            itemChangeCheck('無');
            Data.營業處所分設備查 = unchecked;
            salesOfficeReplace(0, data);
            Data.委託代銷契約 = unchecked;
            Data.營業處所變更備查 = unchecked;
            salesOfficeTypeCheck('無');
            Data.委託代銷契約變更備查 = unchecked;
            businessChangeCheck('無');
           
            break;
        case "經紀業變更備查":
            Data.經紀業變更備查 = checked;
            console.log('變更前事項內容', data.變更前事項內容.value);
            console.log('變更後事項內容', data.變更後事項內容.value);
            let itemChange = data.變更事項.value;
            itemChange ||= '名稱';            
            itemChangeCheck(itemChange,data);

            let beforeChange = data.變更前事項內容.value;
            let afterChange = data.變更後事項內容.value;
            Data.變更前事項內容 = beforeChange ? beforeChange : defaltData.變更前事項內容;
            Data.變更後事項內容 = afterChange ? afterChange : defaltData.變更後事項內容;

            //還原資料為預設值;
            Data.經紀業設立備查 = unchecked;
            Data.營業處所分設備查 = unchecked;
            salesOfficeReplace(0, data);
            Data.委託代銷契約 = unchecked;
            Data.營業處所變更備查 = unchecked;
            salesOfficeTypeCheck('無');
            Data.委託代銷契約變更備查 = unchecked;
            businessChangeCheck('無');
            break;
        case "營業處所分設備查":
            Data.營業處所分設備查 = checked;
            let salesOfficeType = data.time.value;
            //console.log('常態與非常態', salesOfficeType);
            let salesOffice = salesOfficeTypeCheck(salesOfficeType);                      
            salesOfficeReplace(salesOffice, data);
            
            //還原資料為預設值;
            Data.經紀業設立備查 = unchecked;
            Data.經紀人員數 = defaltData.經紀人員數;
            Data.同業公會名稱 = defaltData.同業公會名稱;
            Data.經紀業變更備查 = unchecked;
            itemChangeCheck('無');
            Data.委託代銷契約 = unchecked;
            Data.營業處所變更備查 = unchecked;            
            Data.委託代銷契約變更備查 = unchecked;
            businessChangeCheck('無');
            break;
        case "委託代銷契約（簽訂）備查":
            Data.委託代銷契約 = checked;
            //let consignmentContractType = data.time1.value;
            //console.log('常態與非常態', consignmentContractType);
            //salesOfficeTypeCheck(consignmentContractType);
            salesOfficeTypeCheck('無');
            salesOfficeReplace(3, data);

            //還原資料為預設值;
            Data.經紀業設立備查 = unchecked;
            Data.經紀人員數 = defaltData.經紀人員數;
            Data.同業公會名稱 = defaltData.同業公會名稱;
            Data.經紀業變更備查 = unchecked;
            itemChangeCheck('無');
            Data.營業處所分設備查 = unchecked;
            Data.營業處所變更備查 = unchecked;            
            Data.委託代銷契約變更備查 = unchecked;
            businessChangeCheck('無');
            break;
        case "營業處所變更備查":
            Data.營業處所變更備查 = checked;
            let reasonChangeBefore = data.變更前事項內容1.value;
            let reasonChangeAfter = data.變更後事項內容1.value;
            let businessName = data.營業處所名稱1.value;
            Data.營業處所名稱1 = businessName ? businessName : defaltData.營業處所名稱1;
            Data.變更前事項內容1 = reasonChangeBefore ? reasonChangeBefore : defaltData.變更前事項內容1;
            Data.變更後事項內容1 = reasonChangeAfter ? reasonChangeAfter : defaltData.變更後事項內容1;

            //let businessSelect = data.營業處所變更事項;
            //console.log('營業處所變更事項', businessSelect);
            //console.log('營業處所變更事項', data.營業處所變更備查_其他.value);
            //let other;
            //if (data.營業處所變更事項.value == '其他') other = data.營業處所變更備查_其他.value;
            //other ? businessChangeCheck(businessSelect, other) : businessChangeCheck(businessSelect);
            businessChangeCheck(data, '營業處所變更備查_其他');

            //還原資料為預設值;
            Data.經紀業設立備查 = unchecked;
            Data.經紀人員數 = defaltData.經紀人員數;
            Data.同業公會名稱 = defaltData.同業公會名稱;
            Data.經紀業變更備查 = unchecked;
            itemChangeCheck('無');
            Data.營業處所分設備查 = unchecked;
            salesOfficeReplace(0, data);
            salesOfficeTypeCheck('無');
            Data.委託代銷契約 = unchecked;
            Data.委託代銷契約變更備查 = unchecked;
            break;
        case "委託代銷契約變更備查":
            Data.委託代銷契約變更備查 = checked;
            let reasonChangeBefore1 = data.變更前事項內容2.value;
            let reasonChangeAfter1 = data.變更後事項內容2.value;
            Data.變更前事項內容1 = reasonChangeBefore1 ? reasonChangeBefore1 : defaltData.變更前事項內容1;
            Data.變更後事項內容1 = reasonChangeAfter1 ? reasonChangeAfter1 : defaltData.變更後事項內容1;

            //let businessSelect1 = data.委託代銷契約變更事項.value;
            //console.log('委託代銷契約變更事項', businessSelect1);
            //let other1;
            //if (data.委託代銷契約變更事項.value == '其他') other1 = data.營業處所變更備查_其他1.value;
            //other1 ? businessChangeCheck(businessSelect1, other1) : businessChangeCheck(businessSelect1);
            businessChangeCheck(data, '營業處所變更備查_其他1');

            //還原資料為預設值;
            Data.經紀業設立備查 = unchecked;
            Data.經紀人員數 = defaltData.經紀人員數;
            Data.同業公會名稱 = defaltData.同業公會名稱;
            Data.經紀業變更備查 = unchecked;
            itemChangeCheck('無');
            Data.營業處所分設備查 = unchecked;
            salesOfficeReplace(0, data);
            Data.委託代銷契約 = unchecked;
            Data.營業處所變更備查 = unchecked;
            Data.營業處所名稱1 = defaltData.營業處所名稱1;
            break;
        default:
            
            //還原資料為預設值;
            Data.經紀業設立備查 = unchecked;
            Data.經紀人員數 = defaltData.經紀人員數;
            Data.同業公會名稱 = defaltData.同業公會名稱;
            Data.經紀業變更備查 = unchecked;
            itemChangeCheck('無');
            Data.營業處所分設備查 = unchecked;
            salesOfficeReplace(0, data);
            Data.委託代銷契約 = unchecked;
            Data.營業處所變更備查 = unchecked;
            salesOfficeTypeCheck('無');
            Data.委託代銷契約變更備查 = unchecked;
            businessChangeCheck('無');
            break;
    }          
}
//經紀業變更備查-變更事項內容置換
function itemChangeCheck(itemValue,data) {
    switch (itemValue) {
        case '無':
            //還原資料為預設值
            Data.名稱變更 = unchecked;
            Data.所在地變更 = unchecked;
            Data.組織型態變更 = unchecked;
            Data.組織解散 = unchecked;
            Data.經營型態變更 = unchecked;
            Data.營業項目變更 = unchecked;
            Data.同業公會變更 = unchecked;
            Data.經紀人員變更 = unchecked;
            Data.遷入 = unchecked;
            Data.經理人變更 = unchecked;
            Data.停業 = unchecked;
            Data.代銷業務變更 = unchecked;
            Data.復業 = unchecked;
            Data.個人資料處理方法變更 = unchecked;
            Data.經紀業變更備查_其他 = unchecked;
            Data.變更前事項內容 = defaltData.變更前事項內容;
            Data.變更後事項內容 = defaltData.變更後事項內容;
            break;
        default:
            for (let i = 0; i < data.變更事項.length; i++) {
                if (data.變更事項[i].checked) {
                    switch (data.變更事項[i].value) {
                        case '名稱':
                            Data.名稱變更 = checked;
                            break;
                        case '所在地':
                            Data.所在地變更 = checked;
                            break;
                        case '組織型態':
                            Data.組織型態變更 = checked;
                            break;
                        case '組織解散或終止營業':
                            Data.組織解散 = checked;
                            break;
                        case '組織解散或終止營業':
                            Data.組織解散 = checked;
                            break;
                        case '負責人、董事、監察人或經理人變更':
                            Data.經理人變更 = checked;
                            break;
                        case '經營型態':
                            Data.經營型態變更 = checked;
                            break;
                        case '營業項目':
                            Data.營業項目變更 = checked;
                            break;
                        case '加入之同業公會':
                            Data.同業公會變更 = checked;
                            break;
                        case '僱用之經紀人員':
                            Data.經紀人員變更 = checked;
                            break;
                        case '遷入':
                            Data.遷入 = checked;
                            break;
                        case '停業':
                            Data.停業 = checked;
                            //取日期值            
                            let dateStart = data.停業起.value.replaceAll('-', '');
                            let dateEnd = data.停業終.value.replaceAll('-', '');
                            //console.log('停業起', data.停業起.value);
                            //console.log('停業終', data.停業終.value);
                            let yearStart = parseInt(dateStart.substr(0, 4)) - 1911;
                            let monthStart = dateStart.substr(4, 2);
                            let dayStart = dateStart.substr(6, 2);
                            console.log(`停業起${yearStart}年${monthStart}月${dayStart}日`);
                            Data.停業起_年 = yearStart ? yearStart : defaltData.停業起_年;
                            Data.停業起_月 = monthStart ? monthStart : defaltData.停業起_月;
                            Data.停業起_日 = dayStart ? dayStart : defaltData.停業起_日;

                            let yearEnd = parseInt(dateEnd.substr(0, 4)) - 1911;
                            let monthEnd = dateEnd.substr(4, 2);
                            let dayEnd = dateEnd.substr(6, 2);
                            console.log(`停業終${yearEnd}年${monthEnd}月${dayEnd}日`);
                            Data.停業終_年 = yearEnd ? yearEnd : defaltData.停業終_年;
                            Data.停業終_月 = monthEnd ? monthEnd : defaltData.停業終_月;
                            Data.停業終_日 = dayEnd ? dayEnd : defaltData.停業終_日;
                            break;
                        case '復業':
                            Data.復業 = checked;
                            break;
                        case '個人資料檔案安全維護計畫及業務終止後個人資料處理方法':
                            Data.個人資料處理方法變更 = checked;
                            break;
                        case '經營國外不動產仲介或代銷業務':
                            Data.代銷業務變更 = checked;
                            break;
                        case '其他':
                            Data.經紀業變更備查_其他 = checked;
                            //取其他值            
                            let otherData = data.經紀業變更備查_其他.value;
                            Data.經紀業變更備查_其他內容 = otherData ? otherData : defaltData.經紀業變更備查_其他內容;
                            break;
                        default:
                            //還原資料為預設值
                            Data.名稱變更 = unchecked;
                            Data.所在地變更 = unchecked;
                            Data.組織型態變更 = unchecked;
                            Data.組織解散 = unchecked;
                            Data.經營型態變更 = unchecked;
                            Data.營業項目變更 = unchecked;
                            Data.同業公會變更 = unchecked;
                            Data.經紀人員變更 = unchecked;
                            Data.遷入 = unchecked;
                            Data.經理人變更 = unchecked;
                            Data.停業 = unchecked;
                            Data.代銷業務變更 = unchecked;
                            Data.復業 = unchecked;
                            Data.個人資料處理方法變更 = unchecked;
                            Data.經紀業變更備查_其他 = unchecked;
                            Data.變更前事項內容 = defaltData.變更前事項內容;
                            Data.變更後事項內容 = defaltData.變更後事項內容;
                            break;

                    }
                } else {
                    switch (data.變更事項[i].value) {
                        case '名稱':
                            Data.名稱變更 = unchecked;
                            break;
                        case '所在地':
                            Data.所在地變更 = unchecked;
                            break;
                        case '組織型態':
                            Data.組織型態變更 = unchecked;
                            break;
                        case '組織解散或終止營業':
                            Data.組織解散 = unchecked;
                            break;
                        case '組織解散或終止營業':
                            Data.組織解散 = unchecked;
                            break;
                        case '負責人、董事、監察人或經理人變更':
                            Data.經理人變更 = unchecked;
                            break;
                        case '經營型態':
                            Data.經營型態變更 = unchecked;
                            break;
                        case '營業項目':
                            Data.營業項目變更 = unchecked;
                            break;
                        case '加入之同業公會':
                            Data.同業公會變更 = unchecked;
                            break;
                        case '僱用之經紀人員':
                            Data.經紀人員變更 = unchecked;
                            break;
                        case '遷入':
                            Data.遷入 = unchecked;
                            break;
                        case '停業':
                            Data.停業 = unchecked;
                            
                            Data.停業起_年 = defaltData.停業起_年;
                            Data.停業起_月 = defaltData.停業起_月;
                            Data.停業起_日 = defaltData.停業起_日;

                           
                            Data.停業終_年 = defaltData.停業終_年;
                            Data.停業終_月 = defaltData.停業終_月;
                            Data.停業終_日 = defaltData.停業終_日;
                            break;
                        case '復業':
                            Data.復業 = unchecked;
                            break;
                        case '個人資料檔案安全維護計畫及業務終止後個人資料處理方法':
                            Data.個人資料處理方法變更 = unchecked;
                            break;
                        case '經營國外不動產仲介或代銷業務':
                            Data.代銷業務變更 = unchecked;
                            break;
                        case '其他':
                            Data.經紀業變更備查_其他 = unchecked;                            
                            Data.經紀業變更備查_其他內容 = defaltData.經紀業變更備查_其他內容;
                            break;
                        default:
                            //還原資料為預設值
                            Data.名稱變更 = unchecked;
                            Data.所在地變更 = unchecked;
                            Data.組織型態變更 = unchecked;
                            Data.組織解散 = unchecked;
                            Data.經營型態變更 = unchecked;
                            Data.營業項目變更 = unchecked;
                            Data.同業公會變更 = unchecked;
                            Data.經紀人員變更 = unchecked;
                            Data.遷入 = unchecked;
                            Data.經理人變更 = unchecked;
                            Data.停業 = unchecked;
                            Data.代銷業務變更 = unchecked;
                            Data.復業 = unchecked;
                            Data.個人資料處理方法變更 = unchecked;
                            Data.經紀業變更備查_其他 = unchecked;
                            Data.變更前事項內容 = defaltData.變更前事項內容;
                            Data.變更後事項內容 = defaltData.變更後事項內容;
                            break;

                    }
                }
            }
            break;
    }
    //switch (itemValue) {
    //    case '名稱':
    //        Data.名稱變更 = checked;

    //        //還原資料為預設值
    //        Data.所在地變更 = unchecked;
    //        Data.組織型態變更 = unchecked;
    //        Data.組織解散 = unchecked;
    //        Data.經營型態變更 = unchecked;
    //        Data.營業項目變更 = unchecked;
    //        Data.同業公會變更 = unchecked;
    //        Data.經紀人員變更 = unchecked;
    //        Data.遷入 = unchecked;
    //        Data.經理人變更 = unchecked;
    //        Data.停業 = unchecked;
    //        Data.代銷業務變更 = unchecked;
    //        Data.復業 = unchecked;
    //        Data.個人資料處理方法變更 = unchecked;
    //        Data.經紀業變更備查_其他 = unchecked;

    //        break;
    //    case '所在地':
    //        Data.所在地變更 = checked;

    //        //還原資料為預設值
    //        Data.名稱變更 = unchecked;
    //        Data.組織型態變更 = unchecked;
    //        Data.組織解散 = unchecked;
    //        Data.經營型態變更 = unchecked;
    //        Data.營業項目變更 = unchecked;
    //        Data.同業公會變更 = unchecked;
    //        Data.經紀人員變更 = unchecked;
    //        Data.遷入 = unchecked;
    //        Data.經理人變更 = unchecked;
    //        Data.停業 = unchecked;
    //        Data.代銷業務變更 = unchecked;
    //        Data.復業 = unchecked;
    //        Data.個人資料處理方法變更 = unchecked;
    //        Data.經紀業變更備查_其他 = unchecked;
    //        break;
    //    case '組織型態':
    //        Data.組織型態變更 = checked;

    //        //還原資料為預設值
    //        Data.名稱變更 = unchecked;
    //        Data.所在地變更 = unchecked;
    //        Data.組織解散 = unchecked;
    //        Data.經營型態變更 = unchecked;
    //        Data.營業項目變更 = unchecked;
    //        Data.同業公會變更 = unchecked;
    //        Data.經紀人員變更 = unchecked;
    //        Data.遷入 = unchecked;
    //        Data.經理人變更 = unchecked;
    //        Data.停業 = unchecked;
    //        Data.代銷業務變更 = unchecked;
    //        Data.復業 = unchecked;
    //        Data.個人資料處理方法變更 = unchecked;
    //        Data.經紀業變更備查_其他 = unchecked;
    //        break;
    //    case '組織解散或終止營業':
    //        Data.組織解散 = checked;

    //        //還原資料為預設值
    //        Data.名稱變更 = unchecked;
    //        Data.所在地變更 = unchecked;
    //        Data.組織型態變更 = unchecked;
    //        Data.經營型態變更 = unchecked;
    //        Data.營業項目變更 = unchecked;
    //        Data.同業公會變更 = unchecked;
    //        Data.經紀人員變更 = unchecked;
    //        Data.遷入 = unchecked;
    //        Data.經理人變更 = unchecked;
    //        Data.停業 = unchecked;
    //        Data.代銷業務變更 = unchecked;
    //        Data.復業 = unchecked;
    //        Data.個人資料處理方法變更 = unchecked;
    //        Data.經紀業變更備查_其他 = unchecked;
    //        break;
    //    case '負責人、董事、監察人或經理人變更':
    //        Data.經理人變更 = checked;

    //        //還原資料為預設值
    //        Data.名稱變更 = unchecked;
    //        Data.所在地變更 = unchecked;
    //        Data.組織型態變更 = unchecked;
    //        Data.組織解散 = unchecked;
    //        Data.經營型態變更 = unchecked;
    //        Data.營業項目變更 = unchecked;
    //        Data.同業公會變更 = unchecked;
    //        Data.經紀人員變更 = unchecked;
    //        Data.遷入 = unchecked;
    //        Data.停業 = unchecked;
    //        Data.代銷業務變更 = unchecked;
    //        Data.復業 = unchecked;
    //        Data.個人資料處理方法變更 = unchecked;
    //        Data.經紀業變更備查_其他 = unchecked;
    //        break;
    //    case '經營型態':
    //        Data.經營型態變更 = checked;

    //        //還原資料為預設值
    //        Data.名稱變更 = unchecked;
    //        Data.所在地變更 = unchecked;
    //        Data.組織型態變更 = unchecked;
    //        Data.組織解散 = unchecked;
    //        Data.營業項目變更 = unchecked;
    //        Data.同業公會變更 = unchecked;
    //        Data.經紀人員變更 = unchecked;
    //        Data.遷入 = unchecked;
    //        Data.經理人變更 = unchecked;
    //        Data.停業 = unchecked;
    //        Data.代銷業務變更 = unchecked;
    //        Data.復業 = unchecked;
    //        Data.個人資料處理方法變更 = unchecked;
    //        Data.經紀業變更備查_其他 = unchecked;
    //        break;
    //    case '營業項目':
    //        Data.營業項目變更 = checked;

    //        //還原資料為預設值
    //        Data.名稱變更 = unchecked;
    //        Data.所在地變更 = unchecked;
    //        Data.組織型態變更 = unchecked;
    //        Data.組織解散 = unchecked;
    //        Data.經營型態變更 = unchecked;
    //        Data.同業公會變更 = unchecked;
    //        Data.經紀人員變更 = unchecked;
    //        Data.遷入 = unchecked;
    //        Data.經理人變更 = unchecked;
    //        Data.停業 = unchecked;
    //        Data.代銷業務變更 = unchecked;
    //        Data.復業 = unchecked;
    //        Data.個人資料處理方法變更 = unchecked;
    //        Data.經紀業變更備查_其他 = unchecked;
    //        break;
    //    case '加入之同業公會':
    //        Data.同業公會變更 = checked;

    //        //還原資料為預設值
    //        Data.名稱變更 = unchecked;
    //        Data.所在地變更 = unchecked;
    //        Data.組織型態變更 = unchecked;
    //        Data.組織解散 = unchecked;
    //        Data.經營型態變更 = unchecked;
    //        Data.營業項目變更 = unchecked;
    //        Data.經紀人員變更 = unchecked;
    //        Data.遷入 = unchecked;
    //        Data.經理人變更 = unchecked;
    //        Data.停業 = unchecked;
    //        Data.代銷業務變更 = unchecked;
    //        Data.復業 = unchecked;
    //        Data.個人資料處理方法變更 = unchecked;
    //        Data.經紀業變更備查_其他 = unchecked;
    //        break;
    //    case '僱用之經紀人員':
    //        Data.經紀人員變更 = checked;

    //        //還原資料為預設值
    //        Data.名稱變更 = unchecked;
    //        Data.所在地變更 = unchecked;
    //        Data.組織型態變更 = unchecked;
    //        Data.組織解散 = unchecked;
    //        Data.經營型態變更 = unchecked;
    //        Data.營業項目變更 = unchecked;
    //        Data.同業公會變更 = unchecked;
    //        Data.遷入 = unchecked;
    //        Data.經理人變更 = unchecked;
    //        Data.停業 = unchecked;
    //        Data.代銷業務變更 = unchecked;
    //        Data.復業 = unchecked;
    //        Data.個人資料處理方法變更 = unchecked;
    //        Data.經紀業變更備查_其他 = unchecked;
    //        break;
    //    case '遷入':
    //        Data.遷入 = checked;

    //        //還原資料為預設值
    //        Data.名稱變更 = unchecked;
    //        Data.所在地變更 = unchecked;
    //        Data.組織型態變更 = unchecked;
    //        Data.組織解散 = unchecked;
    //        Data.經營型態變更 = unchecked;
    //        Data.營業項目變更 = unchecked;
    //        Data.同業公會變更 = unchecked;
    //        Data.經紀人員變更 = unchecked;
    //        Data.經理人變更 = unchecked;
    //        Data.停業 = unchecked;
    //        Data.代銷業務變更 = unchecked;
    //        Data.復業 = unchecked;
    //        Data.個人資料處理方法變更 = unchecked;
    //        Data.經紀業變更備查_其他 = unchecked;
    //        break;
    //    case '停業':
    //        Data.停業 = checked;
    //        //取日期值            
    //        let dateStart = data.停業起.value.replaceAll('-', '');
    //        let dateEnd = data.停業終.value.replaceAll('-', '');
    //        //console.log('停業起', data.停業起.value);
    //        //console.log('停業終', data.停業終.value);
    //        let yearStart = parseInt(dateStart.substr(0, 4)) - 1911;
    //        let monthStart = dateStart.substr(4, 2);
    //        let dayStart = dateStart.substr(6, 2);
    //        console.log(`停業起${yearStart}年${monthStart}月${dayStart}日`);
    //        Data.停業起_年 = yearStart ? yearStart : defaltData.停業起_年;
    //        Data.停業起_月 = monthStart ? monthStart : defaltData.停業起_月;
    //        Data.停業起_日 = dayStart ? dayStart : defaltData.停業起_日;

    //        let yearEnd = parseInt(dateEnd.substr(0, 4)) - 1911;
    //        let monthEnd = dateEnd.substr(4, 2);
    //        let dayEnd = dateEnd.substr(6, 2);
    //        console.log(`停業終${yearEnd}年${monthEnd}月${dayEnd}日`);
    //        Data.停業終_年 = yearEnd ? yearEnd : defaltData.停業終_年;
    //        Data.停業終_月 = monthEnd ? monthEnd : defaltData.停業終_月;
    //        Data.停業終_日 = dayEnd ? dayEnd : defaltData.停業終_日;

    //        //還原資料為預設值
    //        Data.名稱變更 = unchecked;
    //        Data.所在地變更 = unchecked;
    //        Data.組織型態變更 = unchecked;
    //        Data.組織解散 = unchecked;
    //        Data.經營型態變更 = unchecked;
    //        Data.營業項目變更 = unchecked;
    //        Data.同業公會變更 = unchecked;
    //        Data.經紀人員變更 = unchecked;
    //        Data.遷入 = unchecked;
    //        Data.經理人變更 = unchecked;
    //        Data.代銷業務變更 = unchecked;
    //        Data.復業 = unchecked;
    //        Data.個人資料處理方法變更 = unchecked;
    //        Data.經紀業變更備查_其他 = unchecked;
    //        break;
    //    case '復業':
    //        Data.復業 = checked;

    //        //還原資料為預設值
    //        Data.名稱變更 = unchecked;
    //        Data.所在地變更 = unchecked;
    //        Data.組織型態變更 = unchecked;
    //        Data.組織解散 = unchecked;
    //        Data.經營型態變更 = unchecked;
    //        Data.營業項目變更 = unchecked;
    //        Data.同業公會變更 = unchecked;
    //        Data.經紀人員變更 = unchecked;
    //        Data.遷入 = unchecked;
    //        Data.經理人變更 = unchecked;
    //        Data.停業 = unchecked;
    //        Data.代銷業務變更 = unchecked;
    //        Data.個人資料處理方法變更 = unchecked;
    //        Data.經紀業變更備查_其他 = unchecked;
    //        break;
    //    case '個人資料檔案安全維護計畫及業務終止後個人資料處理方法':
    //        Data.個人資料處理方法變更 = checked;

    //        //還原資料為預設值
    //        Data.名稱變更 = unchecked;
    //        Data.所在地變更 = unchecked;
    //        Data.組織型態變更 = unchecked;
    //        Data.組織解散 = unchecked;
    //        Data.經營型態變更 = unchecked;
    //        Data.營業項目變更 = unchecked;
    //        Data.同業公會變更 = unchecked;
    //        Data.經紀人員變更 = unchecked;
    //        Data.遷入 = unchecked;
    //        Data.經理人變更 = unchecked;
    //        Data.停業 = unchecked;
    //        Data.代銷業務變更 = unchecked;
    //        Data.復業 = unchecked;
    //        Data.經紀業變更備查_其他 = unchecked;
    //        break;
    //    case '經營國外不動產仲介或代銷業務':
    //        Data.代銷業務變更 = checked;

    //        //還原資料為預設值
    //        Data.名稱變更 = unchecked;
    //        Data.所在地變更 = unchecked;
    //        Data.組織型態變更 = unchecked;
    //        Data.組織解散 = unchecked;
    //        Data.經營型態變更 = unchecked;
    //        Data.營業項目變更 = unchecked;
    //        Data.同業公會變更 = unchecked;
    //        Data.經紀人員變更 = unchecked;
    //        Data.遷入 = unchecked;
    //        Data.經理人變更 = unchecked;
    //        Data.停業 = unchecked;
    //        Data.復業 = unchecked;
    //        Data.個人資料處理方法變更 = unchecked;
    //        Data.經紀業變更備查_其他 = unchecked;
    //        break;
    //    case '其他':
    //        Data.經紀業變更備查_其他 = checked;
    //        //取其他值            
    //        let otherData = data.經紀業變更備查_其他.value;
    //        Data.經紀業變更備查_其他內容 = otherData ? otherData : defaltData.經紀業變更備查_其他內容;

    //        //還原資料為預設值
    //        Data.名稱變更 = unchecked;
    //        Data.所在地變更 = unchecked;
    //        Data.組織型態變更 = unchecked;
    //        Data.組織解散 = unchecked;
    //        Data.經營型態變更 = unchecked;
    //        Data.營業項目變更 = unchecked;
    //        Data.同業公會變更 = unchecked;
    //        Data.經紀人員變更 = unchecked;
    //        Data.遷入 = unchecked;
    //        Data.經理人變更 = unchecked;
    //        Data.停業 = unchecked;
    //        Data.代銷業務變更 = unchecked;
    //        Data.復業 = unchecked;
    //        Data.個人資料處理方法變更 = unchecked;
    //        break;
    //    default:

    //        //還原資料為預設值
    //        Data.名稱變更 = unchecked;
    //        Data.所在地變更 = unchecked;
    //        Data.組織型態變更 = unchecked;
    //        Data.組織解散 = unchecked;
    //        Data.經營型態變更 = unchecked;
    //        Data.營業項目變更 = unchecked;
    //        Data.同業公會變更 = unchecked;
    //        Data.經紀人員變更 = unchecked;
    //        Data.遷入 = unchecked;
    //        Data.經理人變更 = unchecked;
    //        Data.停業 = unchecked;
    //        Data.代銷業務變更 = unchecked;
    //        Data.復業 = unchecked;
    //        Data.個人資料處理方法變更 = unchecked;
    //        Data.經紀業變更備查_其他 = unchecked;
    //        Data.變更前事項內容 = defaltData.變更前事項內容;
    //        Data.變更後事項內容 = defaltData.變更後事項內容;
    //        break;
    //}
}
//常態與非常態內容置換
function salesOfficeTypeCheck(type) {
    switch (type) {
        case "常態":
            //console.log('常態', type);
            Data.常態 = checked;
            Data.非常態 = unchecked;
            return 1;
            break;
        case "非常態":
            //console.log('非常態', type);
            Data.非常態 = checked;
            Data.常態 = unchecked;
            return 2;
            break;
        default:
            //console.log('都不是', type);
            Data.常態 = unchecked;
            Data.非常態 = unchecked;
            return 0;
            break;
    }
}
//營業處所分設內容置換
function salesOfficeReplace(type, data) {
    let salesOfficeName;//營業處所名稱
    let salesOfficeAddress; //營業處所所在地
    let salesOffice_peopleCount;//經紀人員數
    let salesOfficeDate;//設立日期
    let salesOfficeYear;//設立年
    let salesOfficeMonth;//設立月
    let salesOfficeDay;//設立日
    let salesAgent//代理銷售戶
    let salesAmount//銷售總金額
    let realestateLocation//不動產所在地
    let licenseDate//建造執照核發日期
    let licenseYear;//建造執照核發年
    let licenseMonth;//建造執照核發月
    let licenseDay;//建造執照核發日
    let licenseWord//字號
    let purpose//非常態營業處所設立目的
    let purposeStartDate//設立起
    let purposeStartYear;//設立年
    let purposeStartMonth;//設立月
    let purposeStartDay;//設立日
    let purposeEndDate//設立終
    let purposeEndYear;//設立年
    let purposeEndMonth;//設立月
    let purposeEndDay;//設立日
    let realEstateName//不動產名稱
    let consignmentSalesStart//委託代銷起
    let consignmentSalesEnd//委託代銷終
    let consignmentSalesStartYear;//委託代銷起年
    let consignmentSalesStartMonth;//委託代銷起月
    let consignmentSalesStartDay;//委託代銷起日
    let consignmentSalesEndYear;//委託代銷終年
    let consignmentSalesEndMonth;//委託代銷終月
    let consignmentSalesEndDay;//委託代銷終日
    let consignmentSalesOther//委託代銷_其他內容
    switch (type) {
        case 1://營業處所分設-常態
            salesOfficeName = data.營業處所名稱.value;
            salesOfficeAddress = data.營業處所所在地.value;
            salesOffice_peopleCount = data.經紀人員數1.value;
            //console.log('經紀人員數1', salesOffice_peopleCount);

            Data.營業處所名稱 = salesOfficeName ? salesOfficeName : defaltData.營業處所名稱;
            Data.營業處所所在地 = salesOfficeAddress ? salesOfficeAddress : defaltData.營業處所所在地;
            Data.經紀人員數1 = salesOffice_peopleCount ? salesOffice_peopleCount : defaltData.經紀人員數1;

            salesOfficeDate = data.設立日期.value.replaceAll('-', '');
            salesOfficeYear = parseInt(salesOfficeDate.substr(0, 4)) - 1911;
            salesOfficeMonth = salesOfficeDate.substr(4, 2);
            salesOfficeDay = salesOfficeDate.substr(6, 2);

            Data.設立年 = salesOfficeYear ? salesOfficeYear : defaltData.設立年;
            Data.設立月 = salesOfficeMonth ? salesOfficeMonth : defaltData.設立月;
            Data.設立日 = salesOfficeDay ? salesOfficeDay : defaltData.設立日;

            //還原※預設值
            Data.營業處所設立目的 = defaltData.營業處所設立目的;
            Data.設立起_年 = defaltData.設立起_年;
            Data.設立起_月 = defaltData.設立起_月;
            Data.設立起_日 = defaltData.設立起_日;
            Data.設立終_年 = defaltData.設立終_年;
            Data.設立終_月 = defaltData.設立終_月;
            Data.設立終_日 = defaltData.設立終_日;
            Data.不動產名稱 = defaltData.不動產名稱;
            Data.不動產所在地 = defaltData.不動產所在地;
            Data.執照核發年 = defaltData.執照核發年;
            Data.執照核發月 = defaltData.執照核發月;
            Data.執照核發日 = defaltData.執照核發日;
            Data.字號 = defaltData.字號;
            Data.銷售總金額 = defaltData.銷售總金額;
            Data.代理銷售戶 = defaltData.代理銷售戶;
            Data.委託代銷 = defaltData.委託代銷;
            Data.委託代銷起_年 = defaltData.委託代銷起_年;
            Data.委託代銷起_月 = defaltData.委託代銷起_月;
            Data.委託代銷起_日 = defaltData.委託代銷起_日;
            Data.委託代銷終_年 = defaltData.委託代銷終_年;
            Data.委託代銷終_月 = defaltData.委託代銷終_月;
            Data.委託代銷終_日 = defaltData.委託代銷終_日;
            Data.委託代銷_其他 = defaltData.委託代銷_其他;
            Data.委託代銷_其他內容 = defaltData.委託代銷_其他內容;
            break;
        case 2://營業處所分設-非常態
            
            salesOfficeName = data.營業處所名稱.value;
            salesOfficeAddress = data.營業處所所在地.value;
            salesOffice_peopleCount = data.經紀人員數1.value;
            //console.log('經紀人員數1', salesOffice_peopleCount);

            Data.營業處所名稱 = salesOfficeName ? salesOfficeName : defaltData.營業處所名稱;
            Data.營業處所所在地 = salesOfficeAddress ? salesOfficeAddress : defaltData.營業處所所在地;
            Data.經紀人員數1 = salesOffice_peopleCount ? salesOffice_peopleCount : defaltData.經紀人員數1;

            salesOfficeDate = data.設立日期.value.replaceAll('-', '');
            salesOfficeYear = parseInt(salesOfficeDate.substr(0, 4)) - 1911;
            salesOfficeMonth = salesOfficeDate.substr(4, 2);
            salesOfficeDay = salesOfficeDate.substr(6, 2);

            Data.設立年 = salesOfficeYear ? salesOfficeYear : defaltData.設立年;
            Data.設立月 = salesOfficeMonth ? salesOfficeMonth : defaltData.設立月;
            Data.設立日 = salesOfficeDay ? salesOfficeDay : defaltData.設立日;

            //新增※值
            salesAgent = data.代理銷售戶.value;
            salesAmount = data.銷售總金額.value;
            realestateLocation = data.不動產所在地.value;

            licenseDate = data.建造執照核發日期.value.replaceAll('-', '');
            licenseYear = parseInt(licenseDate.substr(0, 4)) - 1911;
            licenseMonth = licenseDate.substr(4, 2);
            licenseDay = licenseDate.substr(6, 2);            
            
            licenseWord = data.字號.value;
            purpose = data.非常態營業處所設立目的.value;

            purposeStartDate = data.設立起.value.replaceAll('-', '');
            purposeStartYear = parseInt(purposeStartDate.substr(0, 4)) - 1911;
            purposeStartMonth = purposeStartDate.substr(4, 2);
            purposeStartDay = purposeStartDate.substr(6, 2);

            purposeEndDate = data.設立終.value.replaceAll('-', '');
            purposeEndYear = parseInt(purposeEndDate.substr(0, 4)) - 1911;
            purposeEndMonth = purposeEndDate.substr(4, 2);
            purposeEndDay = purposeEndDate.substr(6, 2);

            realEstateName = data.不動產名稱.value;

            consignmentSalesStart = data.委託代銷起.value.replaceAll('-', '');
            consignmentSalesStartYear = parseInt(consignmentSalesStart.substr(0, 4)) - 1911;
            consignmentSalesStartMonth = consignmentSalesStart.substr(4, 2);
            consignmentSalesStartDay = consignmentSalesStart.substr(6, 2);

            consignmentSalesEnd = data.委託代銷終.value.replaceAll('-', '');
            consignmentSalesEndYear = parseInt(consignmentSalesEnd.substr(0, 4)) - 1911;
            consignmentSalesEndMonth = consignmentSalesEnd.substr(4, 2);
            consignmentSalesEndDay = consignmentSalesEnd.substr(6, 2);

            consignmentSalesOther = data.委託代銷_其他內容.value;

            Data.代理銷售戶 = salesAgent ? salesAgent : defaltData.代理銷售戶;
            Data.銷售總金額 = salesAmount ? salesAmount : defaltData.銷售總金額;
            Data.不動產所在地 = realestateLocation ? realestateLocation : defaltData.不動產所在地;
            Data.執照核發年 = licenseYear ? licenseYear : defaltData.執照核發年;
            Data.執照核發月 = licenseMonth ? licenseMonth : defaltData.執照核發月;
            Data.執照核發日 = licenseDay ? licenseDay : defaltData.執照核發日;        

            Data.字號 = licenseWord ? licenseWord : defaltData.字號;
            Data.營業處所設立目的 = purpose ? purpose : defaltData.營業處所設立目的;

            Data.設立起_年 = purposeStartYear ? purposeStartYear : defaltData.設立起_年;
            Data.設立起_月 = purposeStartMonth ? purposeStartMonth : defaltData.設立起_月;
            Data.設立起_日 = purposeStartDay ? purposeStartDay : defaltData.設立起_日;

            Data.設立終_年 = purposeEndYear ? purposeEndYear : defaltData.設立終_年;
            Data.設立終_月 = purposeEndMonth ? purposeEndMonth : defaltData.設立終_月;
            Data.設立終_日 = purposeEndDay ? purposeEndDay : defaltData.設立終_日;
            

            Data.不動產名稱 = realEstateName ? realEstateName : defaltData.不動產名稱;

            Data.委託代銷 = consignmentSalesStart || consignmentSalesEnd ? checked : defaltData.委託代銷;
            Data.委託代銷起_年 = consignmentSalesStartYear ? consignmentSalesStartYear : defaltData.委託代銷起_年;
            Data.委託代銷起_月 = consignmentSalesStartMonth ? consignmentSalesStartMonth : defaltData.委託代銷起_月;
            Data.委託代銷起_日 = consignmentSalesStartDay ? consignmentSalesStartDay : defaltData.委託代銷起_日;
            Data.委託代銷終_年 = consignmentSalesEndYear ? consignmentSalesEndYear : defaltData.委託代銷終_年;
            Data.委託代銷終_月 = consignmentSalesEndMonth ? consignmentSalesEndMonth : defaltData.委託代銷終_月;
            Data.委託代銷終_日 = consignmentSalesEndDay ? consignmentSalesEndDay : defaltData.委託代銷終_日;

            Data.委託代銷_其他 = consignmentSalesOther ? checked : defaltData.委託代銷_其他;
            Data.委託代銷_其他內容 = consignmentSalesOther ? consignmentSalesOther : defaltData.委託代銷_其他內容;
                        
            break;

        case 3://委託代銷契約（簽訂）備查
            //salesOfficeName = data.營業處所名稱1.value;
            //salesOfficeAddress = data.營業處所所在地1.value;
            //salesOffice_peopleCount = data.經紀人員數11.value;
            //console.log('經紀人員數1', salesOffice_peopleCount);

            //Data.營業處所名稱 = salesOfficeName ? salesOfficeName : defaltData.營業處所名稱;
            //Data.營業處所所在地 = salesOfficeAddress ? salesOfficeAddress : defaltData.營業處所所在地;
            //Data.經紀人員數1 = salesOffice_peopleCount ? salesOffice_peopleCount : defaltData.經紀人員數1;

            //salesOfficeDate = data.設立日期1.value.replaceAll('-', '');
            //salesOfficeYear = parseInt(salesOfficeDate.substr(0, 4)) - 1911;
            //salesOfficeMonth = salesOfficeDate.substr(4, 2);
            //salesOfficeDay = salesOfficeDate.substr(6, 2);

            //Data.設立年 = salesOfficeYear ? salesOfficeYear : defaltData.設立年;
            //Data.設立月 = salesOfficeMonth ? salesOfficeMonth : defaltData.設立月;
            //Data.設立日 = salesOfficeDay ? salesOfficeDay : defaltData.設立日;

            //新增※值
            //salesAgent = data.代理銷售戶1.value;
            //salesAmount = data.銷售總金額1.value;
            realestateLocation = data.不動產所在地1.value;//v

            licenseDate = data.建造執照核發日期1.value.replaceAll('-', '');//v
            licenseYear = parseInt(licenseDate.substr(0, 4)) - 1911;
            licenseMonth = licenseDate.substr(4, 2);
            licenseDay = licenseDate.substr(6, 2);

            licenseWord = data.字號1.value;//v
            //purpose = data.非常態營業處所設立目的1.value;

            //purposeStartDate = data.設立起1.value.replaceAll('-', '');
            //purposeStartYear = parseInt(purposeStartDate.substr(0, 4)) - 1911;
            //purposeStartMonth = purposeStartDate.substr(4, 2);
            //purposeStartDay = purposeStartDate.substr(6, 2);

            //purposeEndDate = data.設立終1.value.replaceAll('-', '');
            //purposeEndYear = parseInt(purposeEndDate.substr(0, 4)) - 1911;
            //purposeEndMonth = purposeEndDate.substr(4, 2);
            //purposeEndDay = purposeEndDate.substr(6, 2);

            realEstateName = data.不動產名稱1.value;//v

            consignmentSalesStart = data.委託代銷起1.value.replaceAll('-', '');//v
            consignmentSalesStartYear = parseInt(consignmentSalesStart.substr(0, 4)) - 1911;
            consignmentSalesStartMonth = consignmentSalesStart.substr(4, 2);
            consignmentSalesStartDay = consignmentSalesStart.substr(6, 2);

            consignmentSalesEnd = data.委託代銷終1.value.replaceAll('-', '');//v
            consignmentSalesEndYear = parseInt(consignmentSalesEnd.substr(0, 4)) - 1911;
            consignmentSalesEndMonth = consignmentSalesEnd.substr(4, 2);
            consignmentSalesEndDay = consignmentSalesEnd.substr(6, 2);

            consignmentSalesOther = data.委託代銷_其他內容1.value;//v

            //Data.代理銷售戶 = salesAgent ? salesAgent : defaltData.代理銷售戶;
            //Data.銷售總金額 = salesAmount ? salesAmount : defaltData.銷售總金額;
            Data.不動產所在地 = realestateLocation ? realestateLocation : defaltData.不動產所在地;//v
            Data.執照核發年 = licenseYear ? licenseYear : defaltData.執照核發年;//v
            Data.執照核發月 = licenseMonth ? licenseMonth : defaltData.執照核發月;//v
            Data.執照核發日 = licenseDay ? licenseDay : defaltData.執照核發日;//v

            Data.字號 = licenseWord ? licenseWord : defaltData.字號;//v
            //Data.營業處所設立目的 = purpose ? purpose : defaltData.營業處所設立目的;

            //Data.設立起_年 = purposeStartYear ? purposeStartYear : defaltData.設立起_年;
            //Data.設立起_月 = purposeStartMonth ? purposeStartMonth : defaltData.設立起_月;
            //Data.設立起_日 = purposeStartDay ? purposeStartDay : defaltData.設立起_日;

            //Data.設立終_年 = purposeEndYear ? purposeEndYear : defaltData.設立終_年;
            //Data.設立終_月 = purposeEndMonth ? purposeEndMonth : defaltData.設立終_月;
            //Data.設立終_日 = purposeEndDay ? purposeEndDay : defaltData.設立終_日;


            Data.不動產名稱 = realEstateName ? realEstateName : defaltData.不動產名稱;//v

            Data.委託代銷 = consignmentSalesStart || consignmentSalesEnd ? checked : defaltData.委託代銷;//v
            Data.委託代銷起_年 = consignmentSalesStartYear ? consignmentSalesStartYear : defaltData.委託代銷起_年;//v
            Data.委託代銷起_月 = consignmentSalesStartMonth ? consignmentSalesStartMonth : defaltData.委託代銷起_月;//v
            Data.委託代銷起_日 = consignmentSalesStartDay ? consignmentSalesStartDay : defaltData.委託代銷起_日;//v
            Data.委託代銷終_年 = consignmentSalesEndYear ? consignmentSalesEndYear : defaltData.委託代銷終_年;//v
            Data.委託代銷終_月 = consignmentSalesEndMonth ? consignmentSalesEndMonth : defaltData.委託代銷終_月;//v
            Data.委託代銷終_日 = consignmentSalesEndDay ? consignmentSalesEndDay : defaltData.委託代銷終_日;//v

            Data.委託代銷_其他 = consignmentSalesOther ? checked : defaltData.委託代銷_其他;//v
            Data.委託代銷_其他內容 = consignmentSalesOther ? consignmentSalesOther : defaltData.委託代銷_其他內容;//v
            break;

        default:
            Data.營業處所名稱 = defaltData.營業處所名稱;
            Data.營業處所所在地 = defaltData.營業處所所在地;
            Data.經紀人員數1 = defaltData.經紀人員數1;
            Data.設立年 = defaltData.設立年;
            Data.設立月 = defaltData.設立月;
            Data.設立日 = defaltData.設立日;

            //還原※預設值
            Data.營業處所設立目的 = defaltData.營業處所設立目的;
            Data.設立起_年 = defaltData.設立起_年;
            Data.設立起_月 = defaltData.設立起_月;
            Data.設立起_日 = defaltData.設立起_日;
            Data.設立終_年 = defaltData.設立終_年;
            Data.設立終_月 = defaltData.設立終_月;
            Data.設立終_日 = defaltData.設立終_日;
            Data.不動產名稱 = defaltData.不動產名稱;
            Data.不動產所在地 = defaltData.不動產所在地;
            Data.執照核發年 = defaltData.執照核發年;
            Data.執照核發月 = defaltData.執照核發月;
            Data.執照核發日 = defaltData.執照核發日;
            Data.字號 = defaltData.字號;
            Data.銷售總金額 = defaltData.銷售總金額;
            Data.代理銷售戶 = defaltData.代理銷售戶;
            Data.委託代銷 = defaltData.委託代銷;
            Data.委託代銷起_年 = defaltData.委託代銷起_年;
            Data.委託代銷起_月 = defaltData.委託代銷起_月;
            Data.委託代銷起_日 = defaltData.委託代銷起_日;
            Data.委託代銷終_年 = defaltData.委託代銷終_年;
            Data.委託代銷終_月 = defaltData.委託代銷終_月;
            Data.委託代銷終_日 = defaltData.委託代銷終_日;
            Data.委託代銷_其他 = defaltData.委託代銷_其他;
            Data.委託代銷_其他內容 = defaltData.委託代銷_其他內容;
            break;

    }
    
}

//營業處所變更備查-變更事項內容置換
function businessChangeCheck(data, itemValue) {
    let checkboxData;
    if (switchValue === '營業處所變更備查') {
        checkboxData = data.營業處所變更事項;
    } else if (switchValue === '委託代銷契約變更備查') {
        checkboxData = data.委託代銷契約變更事項;
    } else {
        //還原資料為預設值
        Data.營業處所名稱變更 = unchecked;
        Data.營業處所所在地變更 = unchecked;
        Data.營業處所僱用之經紀人員變更 = unchecked;
        Data.營業處所遷入 = unchecked;
        Data.營業處所裁撤 = unchecked;
        Data.營業處所設立目的變更 = unchecked;
        Data.營業處所銷售總金額變更 = unchecked;
        Data.營業處所設立期間變更 = unchecked;
        Data.營業處所不動產名稱變更 = unchecked;
        Data.營業處所建造執照變更 = unchecked;
        Data.營業處所代理銷售戶數變更 = unchecked;
        Data.營業處所委託代銷契約終止 = unchecked;
        Data.營業處所委託代銷期間變更 = unchecked;
        Data.營業處所委託代銷之營業處所變更 = unchecked;
        Data.營業處所委其他 = unchecked;
        Data.營業處所名稱1 = defaltData.營業處所名稱1;
        Data.變更前事項內容1 = defaltData.變更前事項內容1;
        Data.變更後事項內容1 = defaltData.變更後事項內容1;

        return false;
    }
    for (let i = 0; i < checkboxData.length; i++) {
        if (checkboxData[i].checked) {
            switch (checkboxData[i].value) {
                case '名稱':
                    Data.營業處所名稱變更 = checked;
                    break;
                case '所在地':
                    Data.營業處所所在地變更 = checked;
                    break;
                case '僱用之經紀人員':
                    Data.營業處所僱用之經紀人員變更 = checked;
                    break;
                case '遷入':
                    Data.營業處所遷入 = checked;
                    break;
                case '裁撤':
                    Data.營業處所裁撤 = checked;
                    break;
                case '設立目的':
                    Data.營業處所設立目的變更 = checked;
                    break;
                case '銷售總金額':
                    Data.營業處所銷售總金額變更 = checked;
                    break;
                case '設立期間':
                    Data.營業處所設立期間變更 = checked;
                    break;
                case '代理銷售不動產名稱':
                    Data.營業處所不動產名稱變更 = checked;
                    break;
                case '建造執照（日期或字號）':
                    Data.營業處所建造執照變更 = checked;
                    break;
                case '代理銷售戶(棟)數':
                    Data.營業處所代理銷售戶數變更 = checked;
                    break;
                case '委託代銷契約終止或解除':
                    Data.營業處所委託代銷契約終止 = checked;
                    break;
                case '委託代銷期間':
                    Data.營業處所委託代銷期間變更 = checked;
                    break;
                case '委託代銷之營業處所':
                    Data.營業處所委託代銷之營業處所變更 = checked;
                    break;
                case '其他':
                    Data.營業處所委其他 = checked;
                    //console.log('itemValue', itemValue);
                    //console.log(`data['${itemValue}']`, data[`${itemValue}`]);
                    Data.營業處所委其他內容 = data[itemValue].value ? data[itemValue].value : defaltData.營業處所委其他內容;
                    break;
                default:

                    //還原資料為預設值
                    Data.營業處所名稱變更 = unchecked;
                    Data.營業處所所在地變更 = unchecked;
                    Data.營業處所僱用之經紀人員變更 = unchecked;
                    Data.營業處所遷入 = unchecked;
                    Data.營業處所裁撤 = unchecked;
                    Data.營業處所設立目的變更 = unchecked;
                    Data.營業處所銷售總金額變更 = unchecked;
                    Data.營業處所設立期間變更 = unchecked;
                    Data.營業處所不動產名稱變更 = unchecked;
                    Data.營業處所建造執照變更 = unchecked;
                    Data.營業處所代理銷售戶數變更 = unchecked;
                    Data.營業處所委託代銷契約終止 = unchecked;
                    Data.營業處所委託代銷期間變更 = unchecked;
                    Data.營業處所委託代銷之營業處所變更 = unchecked;
                    Data.營業處所委其他 = unchecked;
                    //Data.營業處所名稱1 = defaltData.營業處所名稱1;
                    //Data.變更前事項內容1 = defaltData.變更前事項內容1;
                    //Data.變更後事項內容1 = defaltData.變更後事項內容1;
                    break;

            }
        } else {
            switch (checkboxData[i].value) {
                case '名稱':
                    Data.營業處所名稱變更 = unchecked;
                    break;
                case '所在地':
                    Data.營業處所所在地變更 = unchecked;
                    break;
                case '僱用之經紀人員':
                    Data.營業處所僱用之經紀人員變更 = unchecked;
                    break;
                case '遷入':
                    Data.營業處所遷入 = unchecked;
                    break;
                case '裁撤':
                    Data.營業處所裁撤 = unchecked;
                    break;
                case '設立目的':
                    Data.營業處所設立目的變更 = unchecked;
                    break;
                case '銷售總金額':
                    Data.營業處所銷售總金額變更 = unchecked;
                    break;
                case '設立期間':
                    Data.營業處所設立期間變更 = unchecked;
                    break;
                case '代理銷售不動產名稱':
                    Data.營業處所不動產名稱變更 = unchecked;
                    break;
                case '建造執照（日期或字號）':
                    Data.營業處所建造執照變更 = unchecked;
                    break;
                case '代理銷售戶(棟)數':
                    Data.營業處所代理銷售戶數變更 = unchecked;
                    break;
                case '委託代銷契約終止或解除':
                    Data.營業處所委託代銷契約終止 = unchecked;
                    break;
                case '委託代銷期間':
                    Data.營業處所委託代銷期間變更 = unchecked;
                    break;
                case '委託代銷之營業處所':
                    Data.營業處所委託代銷之營業處所變更 = unchecked;
                    break;
                case '其他':
                    Data.營業處所委其他 = unchecked;
                    Data.營業處所委其他內容 = defaltData.營業處所委其他內容;
                    break;
                default:

                    //還原資料為預設值
                    Data.營業處所名稱變更 = unchecked;
                    Data.營業處所所在地變更 = unchecked;
                    Data.營業處所僱用之經紀人員變更 = unchecked;
                    Data.營業處所遷入 = unchecked;
                    Data.營業處所裁撤 = unchecked;
                    Data.營業處所設立目的變更 = unchecked;
                    Data.營業處所銷售總金額變更 = unchecked;
                    Data.營業處所設立期間變更 = unchecked;
                    Data.營業處所不動產名稱變更 = unchecked;
                    Data.營業處所建造執照變更 = unchecked;
                    Data.營業處所代理銷售戶數變更 = unchecked;
                    Data.營業處所委託代銷契約終止 = unchecked;
                    Data.營業處所委託代銷期間變更 = unchecked;
                    Data.營業處所委託代銷之營業處所變更 = unchecked;
                    Data.營業處所委其他 = unchecked;
                    //Data.營業處所名稱1 = defaltData.營業處所名稱1;
                    //Data.變更前事項內容1 = defaltData.變更前事項內容1;
                    //Data.變更後事項內容1 = defaltData.變更後事項內容1;
                    break;

            }
        }
        
    }
    //if (data) {
    //    Data.營業處所委其他內容 = data ? data : defaltData.營業處所委其他內容;
    //} else {
    //    Data.營業處所委其他內容 = defaltData.營業處所委其他內容;
    //}
    //switch (itemValue) {
    //    case '名稱':
    //        Data.營業處所名稱變更 = checked;

    //        //還原資料為預設值
    //        Data.營業處所所在地變更 = unchecked;
    //        Data.營業處所僱用之經紀人員變更 = unchecked;
    //        Data.營業處所遷入 = unchecked;
    //        Data.營業處所裁撤 = unchecked;
    //        Data.營業處所設立目的變更 = unchecked;
    //        Data.營業處所銷售總金額變更 = unchecked;
    //        Data.營業處所設立期間變更 = unchecked;
    //        Data.營業處所不動產名稱變更 = unchecked;
    //        Data.營業處所建造執照變更 = unchecked;
    //        Data.營業處所代理銷售戶數變更 = unchecked;
    //        Data.營業處所委託代銷契約終止 = unchecked;
    //        Data.營業處所委託代銷期間變更 = unchecked;
    //        Data.營業處所委託代銷之營業處所變更 = unchecked;
    //        Data.營業處所委其他 = unchecked;

    //        break;
    //    case '所在地':
    //        Data.營業處所所在地變更 = checked;

    //        //還原資料為預設值
    //        Data.營業處所名稱變更 = unchecked;
    //        Data.營業處所僱用之經紀人員變更 = unchecked;
    //        Data.營業處所遷入 = unchecked;
    //        Data.營業處所裁撤 = unchecked;
    //        Data.營業處所設立目的變更 = unchecked;
    //        Data.營業處所銷售總金額變更 = unchecked;
    //        Data.營業處所設立期間變更 = unchecked;
    //        Data.營業處所不動產名稱變更 = unchecked;
    //        Data.營業處所建造執照變更 = unchecked;
    //        Data.營業處所代理銷售戶數變更 = unchecked;
    //        Data.營業處所委託代銷契約終止 = unchecked;
    //        Data.營業處所委託代銷期間變更 = unchecked;
    //        Data.營業處所委託代銷之營業處所變更 = unchecked;
    //        Data.營業處所委其他 = unchecked;
    //        break;
    //    case '僱用之經紀人員':
    //        Data.營業處所僱用之經紀人員變更 = checked;

    //        //還原資料為預設值
    //        Data.營業處所名稱變更 = unchecked;
    //        Data.營業處所所在地變更 = unchecked;
    //        Data.營業處所遷入 = unchecked;
    //        Data.營業處所裁撤 = unchecked;
    //        Data.營業處所設立目的變更 = unchecked;
    //        Data.營業處所銷售總金額變更 = unchecked;
    //        Data.營業處所設立期間變更 = unchecked;
    //        Data.營業處所不動產名稱變更 = unchecked;
    //        Data.營業處所建造執照變更 = unchecked;
    //        Data.營業處所代理銷售戶數變更 = unchecked;
    //        Data.營業處所委託代銷契約終止 = unchecked;
    //        Data.營業處所委託代銷期間變更 = unchecked;
    //        Data.營業處所委託代銷之營業處所變更 = unchecked;
    //        Data.營業處所委其他 = unchecked;
    //        break;
    //    case '遷入':
    //        Data.營業處所遷入 = checked;

    //        //還原資料為預設值
    //        Data.營業處所名稱變更 = unchecked;
    //        Data.營業處所所在地變更 = unchecked;
    //        Data.營業處所僱用之經紀人員變更 = unchecked;
    //        Data.營業處所裁撤 = unchecked;
    //        Data.營業處所設立目的變更 = unchecked;
    //        Data.營業處所銷售總金額變更 = unchecked;
    //        Data.營業處所設立期間變更 = unchecked;
    //        Data.營業處所不動產名稱變更 = unchecked;
    //        Data.營業處所建造執照變更 = unchecked;
    //        Data.營業處所代理銷售戶數變更 = unchecked;
    //        Data.營業處所委託代銷契約終止 = unchecked;
    //        Data.營業處所委託代銷期間變更 = unchecked;
    //        Data.營業處所委託代銷之營業處所變更 = unchecked;
    //        Data.營業處所委其他 = unchecked;
    //        break;
    //    case '裁撤':
    //        Data.營業處所裁撤 = checked;

    //        //還原資料為預設值
    //        Data.營業處所名稱變更 = unchecked;
    //        Data.營業處所所在地變更 = unchecked;
    //        Data.營業處所僱用之經紀人員變更 = unchecked;
    //        Data.營業處所遷入 = unchecked;
    //        Data.營業處所設立目的變更 = unchecked;
    //        Data.營業處所銷售總金額變更 = unchecked;
    //        Data.營業處所設立期間變更 = unchecked;
    //        Data.營業處所不動產名稱變更 = unchecked;
    //        Data.營業處所建造執照變更 = unchecked;
    //        Data.營業處所代理銷售戶數變更 = unchecked;
    //        Data.營業處所委託代銷契約終止 = unchecked;
    //        Data.營業處所委託代銷期間變更 = unchecked;
    //        Data.營業處所委託代銷之營業處所變更 = unchecked;
    //        Data.營業處所委其他 = unchecked;
    //        break;
    //    case '設立目的':
    //        Data.營業處所設立目的變更 = checked;

    //        //還原資料為預設值
    //        Data.營業處所名稱變更 = unchecked;
    //        Data.營業處所所在地變更 = unchecked;
    //        Data.營業處所僱用之經紀人員變更 = unchecked;
    //        Data.營業處所遷入 = unchecked;
    //        Data.營業處所裁撤 = unchecked;
    //        Data.營業處所銷售總金額變更 = unchecked;
    //        Data.營業處所設立期間變更 = unchecked;
    //        Data.營業處所不動產名稱變更 = unchecked;
    //        Data.營業處所建造執照變更 = unchecked;
    //        Data.營業處所代理銷售戶數變更 = unchecked;
    //        Data.營業處所委託代銷契約終止 = unchecked;
    //        Data.營業處所委託代銷期間變更 = unchecked;
    //        Data.營業處所委託代銷之營業處所變更 = unchecked;
    //        Data.營業處所委其他 = unchecked;
    //        break;
    //    case '銷售總金額':
    //        Data.營業處所銷售總金額變更 = checked;

    //        //還原資料為預設值
    //        Data.營業處所名稱變更 = unchecked;
    //        Data.營業處所所在地變更 = unchecked;
    //        Data.營業處所僱用之經紀人員變更 = unchecked;
    //        Data.營業處所遷入 = unchecked;
    //        Data.營業處所裁撤 = unchecked;
    //        Data.營業處所設立目的變更 = unchecked;
    //        Data.營業處所設立期間變更 = unchecked;
    //        Data.營業處所不動產名稱變更 = unchecked;
    //        Data.營業處所建造執照變更 = unchecked;
    //        Data.營業處所代理銷售戶數變更 = unchecked;
    //        Data.營業處所委託代銷契約終止 = unchecked;
    //        Data.營業處所委託代銷期間變更 = unchecked;
    //        Data.營業處所委託代銷之營業處所變更 = unchecked;
    //        Data.營業處所委其他 = unchecked;
    //        break;
    //    case '設立期間':
    //        Data.營業處所設立期間變更 = checked;

    //        //還原資料為預設值
    //        Data.營業處所名稱變更 = unchecked;
    //        Data.營業處所所在地變更 = unchecked;
    //        Data.營業處所僱用之經紀人員變更 = unchecked;
    //        Data.營業處所遷入 = unchecked;
    //        Data.營業處所裁撤 = unchecked;
    //        Data.營業處所設立目的變更 = unchecked;
    //        Data.營業處所銷售總金額變更 = unchecked;
    //        Data.營業處所不動產名稱變更 = unchecked;
    //        Data.營業處所建造執照變更 = unchecked;
    //        Data.營業處所代理銷售戶數變更 = unchecked;
    //        Data.營業處所委託代銷契約終止 = unchecked;
    //        Data.營業處所委託代銷期間變更 = unchecked;
    //        Data.營業處所委託代銷之營業處所變更 = unchecked;
    //        Data.營業處所委其他 = unchecked;
    //        break;
    //    case '代理銷售不動產名稱':
    //        Data.營業處所不動產名稱變更 = checked;

    //        //還原資料為預設值
    //        Data.營業處所名稱變更 = unchecked;
    //        Data.營業處所所在地變更 = unchecked;
    //        Data.營業處所僱用之經紀人員變更 = unchecked;
    //        Data.營業處所遷入 = unchecked;
    //        Data.營業處所裁撤 = unchecked;
    //        Data.營業處所設立目的變更 = unchecked;
    //        Data.營業處所銷售總金額變更 = unchecked;
    //        Data.營業處所設立期間變更 = unchecked;
    //        Data.營業處所建造執照變更 = unchecked;
    //        Data.營業處所代理銷售戶數變更 = unchecked;
    //        Data.營業處所委託代銷契約終止 = unchecked;
    //        Data.營業處所委託代銷期間變更 = unchecked;
    //        Data.營業處所委託代銷之營業處所變更 = unchecked;
    //        Data.營業處所委其他 = unchecked;
    //        break;
    //    case '建造執照（日期或字號）':
    //        Data.營業處所建造執照變更 = checked;

    //        //還原資料為預設值
    //        Data.營業處所名稱變更 = unchecked;
    //        Data.營業處所所在地變更 = unchecked;
    //        Data.營業處所僱用之經紀人員變更 = unchecked;
    //        Data.營業處所遷入 = unchecked;
    //        Data.營業處所裁撤 = unchecked;
    //        Data.營業處所設立目的變更 = unchecked;
    //        Data.營業處所銷售總金額變更 = unchecked;
    //        Data.營業處所設立期間變更 = unchecked;
    //        Data.營業處所不動產名稱變更 = unchecked;
    //        Data.營業處所代理銷售戶數變更 = unchecked;
    //        Data.營業處所委託代銷契約終止 = unchecked;
    //        Data.營業處所委託代銷期間變更 = unchecked;
    //        Data.營業處所委託代銷之營業處所變更 = unchecked;
    //        Data.營業處所委其他 = unchecked;
    //        break;
    //    case '代理銷售戶(棟)數':
    //        Data.營業處所代理銷售戶數變更 = checked;

    //        //還原資料為預設值
    //        Data.營業處所名稱變更 = unchecked;
    //        Data.營業處所所在地變更 = unchecked;
    //        Data.營業處所僱用之經紀人員變更 = unchecked;
    //        Data.營業處所遷入 = unchecked;
    //        Data.營業處所裁撤 = unchecked;
    //        Data.營業處所設立目的變更 = unchecked;
    //        Data.營業處所銷售總金額變更 = unchecked;
    //        Data.營業處所設立期間變更 = unchecked;
    //        Data.營業處所不動產名稱變更 = unchecked;
    //        Data.營業處所建造執照變更 = unchecked;
    //        Data.營業處所委託代銷契約終止 = unchecked;
    //        Data.營業處所委託代銷期間變更 = unchecked;
    //        Data.營業處所委託代銷之營業處所變更 = unchecked;
    //        Data.營業處所委其他 = unchecked;
    //        break;
    //    case '委託代銷契約終止或解除':
    //        Data.營業處所委託代銷契約終止 = checked;

    //        //還原資料為預設值
    //        Data.營業處所名稱變更 = unchecked;
    //        Data.營業處所所在地變更 = unchecked;
    //        Data.營業處所僱用之經紀人員變更 = unchecked;
    //        Data.營業處所遷入 = unchecked;
    //        Data.營業處所裁撤 = unchecked;
    //        Data.營業處所設立目的變更 = unchecked;
    //        Data.營業處所銷售總金額變更 = unchecked;
    //        Data.營業處所設立期間變更 = unchecked;
    //        Data.營業處所不動產名稱變更 = unchecked;
    //        Data.營業處所建造執照變更 = unchecked;
    //        Data.營業處所代理銷售戶數變更 = unchecked;
    //        Data.營業處所委託代銷期間變更 = unchecked;
    //        Data.營業處所委託代銷之營業處所變更 = unchecked;
    //        Data.營業處所委其他 = unchecked;
    //        break;
    //    case '委託代銷期間':
    //        Data.營業處所委託代銷期間變更 = checked;

    //        //還原資料為預設值
    //        Data.營業處所名稱變更 = unchecked;
    //        Data.營業處所所在地變更 = unchecked;
    //        Data.營業處所僱用之經紀人員變更 = unchecked;
    //        Data.營業處所遷入 = unchecked;
    //        Data.營業處所裁撤 = unchecked;
    //        Data.營業處所設立目的變更 = unchecked;
    //        Data.營業處所銷售總金額變更 = unchecked;
    //        Data.營業處所設立期間變更 = unchecked;
    //        Data.營業處所不動產名稱變更 = unchecked;
    //        Data.營業處所建造執照變更 = unchecked;
    //        Data.營業處所代理銷售戶數變更 = unchecked;
    //        Data.營業處所委託代銷契約終止 = unchecked;
    //        Data.營業處所委託代銷之營業處所變更 = unchecked;
    //        Data.營業處所委其他 = unchecked;
    //        break;
    //    case '委託代銷之營業處所':
    //        Data.營業處所委託代銷之營業處所變更 = checked;

    //        //還原資料為預設值
    //        Data.營業處所名稱變更 = unchecked;
    //        Data.營業處所所在地變更 = unchecked;
    //        Data.營業處所僱用之經紀人員變更 = unchecked;
    //        Data.營業處所遷入 = unchecked;
    //        Data.營業處所裁撤 = unchecked;
    //        Data.營業處所設立目的變更 = unchecked;
    //        Data.營業處所銷售總金額變更 = unchecked;
    //        Data.營業處所設立期間變更 = unchecked;
    //        Data.營業處所不動產名稱變更 = unchecked;
    //        Data.營業處所建造執照變更 = unchecked;
    //        Data.營業處所代理銷售戶數變更 = unchecked;
    //        Data.營業處所委託代銷契約終止 = unchecked;
    //        Data.營業處所委託代銷期間變更 = unchecked;
    //        Data.營業處所委其他 = unchecked;
    //        break;
    //    case '其他':
    //        Data.營業處所委其他 = checked;            

    //        //還原資料為預設值
    //        Data.營業處所名稱變更 = unchecked;
    //        Data.營業處所所在地變更 = unchecked;
    //        Data.營業處所僱用之經紀人員變更 = unchecked;
    //        Data.營業處所遷入 = unchecked;
    //        Data.營業處所裁撤 = unchecked;
    //        Data.營業處所設立目的變更 = unchecked;
    //        Data.營業處所銷售總金額變更 = unchecked;
    //        Data.營業處所設立期間變更 = unchecked;
    //        Data.營業處所不動產名稱變更l = unchecked;
    //        Data.營業處所建造執照變更 = unchecked;
    //        Data.營業處所代理銷售戶數變更 = unchecked;
    //        Data.營業處所委託代銷契約終止 = unchecked;
    //        Data.營業處所委託代銷期間變更 = unchecked;
    //        Data.營業處所委託代銷之營業處所變更 = unchecked;
    //        break;
    //    default:

    //        //還原資料為預設值
    //        Data.營業處所名稱變更 = unchecked;
    //        Data.營業處所所在地變更 = unchecked;
    //        Data.營業處所僱用之經紀人員變更 = unchecked;
    //        Data.營業處所遷入 = unchecked;
    //        Data.營業處所裁撤 = unchecked;
    //        Data.營業處所設立目的變更 = unchecked;
    //        Data.營業處所銷售總金額變更 = unchecked;
    //        Data.營業處所設立期間變更 = unchecked;
    //        Data.營業處所不動產名稱變更 = unchecked;
    //        Data.營業處所建造執照變更 = unchecked;
    //        Data.營業處所代理銷售戶數變更 = unchecked;
    //        Data.營業處所委託代銷契約終止 = unchecked;
    //        Data.營業處所委託代銷期間變更 = unchecked;
    //        Data.營業處所委託代銷之營業處所變更 = unchecked;
    //        Data.營業處所委其他 = unchecked;
    //        Data.營業處所名稱1 = defaltData.營業處所名稱1;
    //        Data.變更前事項內容1 = defaltData.變更前事項內容1;
    //        Data.變更後事項內容1 = defaltData.變更後事項內容1;
    //        break;

    //}
}

//申請人內容置換
function ReplaceApplicant(data,type) {     
    
    
    let name;//中文名     
    let officeTel;//辦公室電話
    let homeTel;//住家電話
    let phone;//手機
    let email;//郵件
    let addr;//戶籍地址
    let addr1;//通訊地址

    if (type) {       
        //console.log('代理人');
        //代理人
        name = data.Name2.value;
        officeTel = data.telOffice2.value;
        homeTel = data.telHome2.value;
        phone = data.phoneNumber2.value;
        email = data.Email2.value;        
        addr1 = data.applicant_addr2.value;

        Data.代理人姓名 = name ? name : defaltData.代理人姓名;
        Data.代理人辦公室 = officeTel ? '（' + officeTel.substr(0, 2) + '）' + officeTel.substr(2, 8) : defaltData.代理人辦公室;
        Data.代理人住家 = homeTel ? '（' + homeTel.substr(0, 2) + '）' + homeTel.substr(2, 8) : defaltData.代理人住家;
        Data.代理人行動 = phone ? phone : defaltData.代理人行動;
        Data.代理人電子郵件信箱 = email ? email : defaltData.代理人電子郵件信箱;
        Data.代理人通訊地址 = addr1 ? addr1 : defaltData.代理人通訊地址;
    } else {
        //console.log('負責人');
        //負責人
        name = data.Name.value;
        officeTel = data.telOffice.value;
        homeTel = data.telHome.value;
        phone = data.phoneNumber.value;
        email = data.Email.value;
        addr = data.applicant_addr.value;
        addr1 = data.applicant_addr1.value;

        Data.負責人姓名 = name ? name : defaltData.負責人姓名;        
        Data.負責人辦公室 = officeTel ? '（' + officeTel.substr(0, 2) + '）' + officeTel.substr(2, 8) : defaltData.負責人辦公室;
        Data.負責人住家 = homeTel ? '（' + homeTel.substr(0, 2) + '）' + homeTel.substr(2, 8) : defaltData.負責人住家;
        Data.負責人行動 = phone ? phone : defaltData.負責人行動;
        Data.負責人電子郵件信箱 = email ? email : defaltData.負責人電子郵件信箱;
        Data.負責人戶籍地址 = addr ? addr : defaltData.負責人戶籍地址;
        Data.負責人通訊地址 = addr1 ? addr1 : defaltData.負責人通訊地址;
    }    

   
    
}

//附繳文件內容置換
function ReplaceDocument(data) {
    
    let c = 0;
    let property = [];
    
    Data.document1 = defaltData.document1;
    Data.document2 = defaltData.document2;
    Data.document3 = defaltData.document3;
    Data.document4 = defaltData.document4;
    Data.document5 = defaltData.document5;
    Data.document6 = defaltData.document6;
    Data.document7 = defaltData.document7;
    Data.document8 = defaltData.document8;

    for (let i = 0; i < data.document.length; i++) {
        
        if (data.document[i].checked) {
            property[c] = 'document' + (c + 1);
            console.log('變數名稱', property[c]);
            let Doc = data.document[i].parentNode.textContent.trim().replace('份', '');
            //Doc.replace(/\r\n|\n/g, "");
            //Doc.replace(/\s+/g, "");
            //Doc.replace('份', '');
            //console.log('附繳文件', data.document[i].parentNode.textContent.trim());
            Data[`${property[c]}`] = Doc ? Doc : defaltData[`${property[c]}`];
            console.log('附繳文件', Data[`${property[c]}`]);
            c++;
        }
    }
    
}

//轉換現在的民國年月日
function tranDate() {
    //取得當天日期-------------------
    let time = new Date();
    let timeDetails = {
        year: time.getFullYear(),
        month: time.getMonth() + 1,
        date: time.getDate(),
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds(),
    };
    //-------------------------------
    //let dateObject = new Date();
    let day = parseInt(timeDetails.date) < 10 ? ' 0' + timeDetails.date + ' ' : ' '+timeDetails.date + ' ';
    let month = parseInt(timeDetails.month) < 10 ? ' 0' + timeDetails.month + ' ' : ' '+ timeDetails.month + ' ';
    let year = ' '+(parseInt(timeDetails.year) - 1911) + ' ';
    //console.log("年", year);
    //console.log("月", month);
    //console.log("日", day);
    Data.application_year = year ? year: defaltData.application_year;
    Data.application_month = month ? month : defaltData.application_month;
    Data.application_day = day ? day : defaltData.application_day;
    
}

//下載申請書
let btn = document.getElementById("download");
btn.addEventListener("click", function () {
    //console.log("123");

    //console.log(Data);
    //表單內容置換 
    ReplaceBrokerage(form1);
    ReplaceApplyTitle(form2);
    ReplaceDocument(form3);
    ReplaceApplicant(form4);
    ReplaceApplicant(form5, 1);    
    tranDate();
    //設置數據
    doc.setData(Data);
    doc.render();


    saveDocx();

})
