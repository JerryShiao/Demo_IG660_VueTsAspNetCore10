let checked = '■';
let unchecked = '□';
let form1 = document.getElementById('form01');
let form2 = document.getElementById('form02');
let form3 = document.getElementById('form03');
let form4 = document.getElementById('form04');
let form5 = document.getElementById('form05');
let form6 = document.getElementById('form06');

//let track = document.getElementById('form06');
//track.addEventListener('change', function () {
//    //console.log('性別', track.gender.value);
//    ReplaceDocument(form6)
//    //console.log('申請事由', switchValue);
//})

//新增同戶籍地址監聽器
let address = document.querySelector('#address');
address.addEventListener('change', () => {
    let same = document.querySelector('input[name="address"]');
    //console.log('點擊成功', same);
    if (same.checked) {
        let addr = document.querySelector('input[name="applicant_addr"]');
        let addr1 = document.querySelector('input[name="applicant_addr1"]');
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
    '受理機關': '　臺南　',

    //申請事由
    '申請許可': unchecked,

    '申請補發許可': unchecked,
    '申請補發許可原因':'　　　　　　',
    '申請補發許可字':'　　　　',
    '申請補發許可號': '　　　　　　　　　　',

    '申請換發許可': unchecked,
    '申請換發許可原因': '　　　　　　',
    '申請換發許可字': '　　　　',
    '申請換發許可號': '　　　　　　　　　　',

    '申請變更原許可事項': unchecked,    
    '申請變更原許可事項字': '　　　　',
    '申請變更原許可事項號': '　　　　　　　　　　',
    '名稱變更':unchecked,
    '所在地變更':unchecked,
    '負責人變更':unchecked,
    '組織型態變更':unchecked,
    '營業項目變更': unchecked,
    '變更前事項內容':'',
    '變更後事項內容': '',

    '申請註銷許可': unchecked,
    '申請註銷許可原因': '　　　　　　',
    '申請註銷許可字': '　　　　',
    '申請註銷許可號': '　　　　　　　　　　',

    //經紀業
    '經紀業名稱': '　　　　　　　　　　　　',
    '經紀業所在地':'',
    '經紀業電話':'　　　　　　　',
    '經紀業傳真':'　　　　　　　',
    '經紀業電子郵件信箱':'',
    '公司': unchecked,
    '商號': unchecked,

    '已辦理公司登記是': unchecked,
    '已辦理公司登記統一編號': '　　　　　　　　　　',
    '已辦理公司登記否': unchecked,

    '已辦理商業登記是': unchecked,
    '已辦理商業登記統一編號': '　　　　　　　　　　',
    '已辦理商業登記否': unchecked,

    '直營體系': unchecked,
    '加盟體系': unchecked,
    '加盟體系內容': '　　　　　　　　　　',

    '不動產仲介經紀業': unchecked,
    '不動產代銷經紀業': unchecked,

    '經營國外不動產仲介或代銷業務是': unchecked,
    '經營國外不動產仲介或代銷業務否': unchecked,

    //負責人
    '負責人姓名': '　　　　　　　　',
    '負責人電子郵件信箱': '',
    '負責人辦公室': '　　　　　　　',
    '負責人住家': '　　　　　　　',
    '負責人行動': '',
    '負責人戶籍地址': '',
    '負責人通訊地址': '',

    //代理人
    '代理人姓名': '　　　　　　　　',
    '代理人電子郵件信箱': '',
    '代理人辦公室': '　　　　　　　',
    '代理人住家': '　　　　　　　',
    '代理人行動': '',
    '代理人通訊地址': '',
        

    //聲明事項
    application_year:'　',//申請民國年
    application_month:'',//申請民國月
    application_day:'',//申請民國日
};
for (let i = 0; i < 8; i++) {
    //let jobTitle;//職稱
    //let name;//姓名
    //let date;//出生日期
    //let ID;//國民身分證統一編號或護照號碼

    defaltData[`A${(i + 1)}`] = '';
    defaltData[`B${(i + 1)}`] = '';
    defaltData[`C${(i + 1)}`] = '年     月     日';
    defaltData[`D${(i + 1)}`] = '';
    //附繳文件
    defaltData[`document${(i + 1)}`] = '　　　　　　　　　　　　　　 ';
}
let Data = Object.create(defaltData);
//console.log(Data);

//申請事由內容置換---------------------------------------------------------
function ReplaceApplyTitle(data) {
    switchValue ||= '申請許可';
   
    //console.log('申請事由', switchValue);
    switch (switchValue) {
        case "申請許可":
            Data.申請許可 = checked;
            ReplaceApplyContentData(switchValue, data);
            //還原預設值
            Data.申請補發許可 = unchecked;
            Data.申請換發許可 = unchecked;
            Data.申請變更原許可事項 = unchecked;
            Data.申請註銷許可 = unchecked;
            break;
        case "申請補發許可":
            Data.申請補發許可 = checked;
            ReplaceApplyContentData(switchValue, data);
            //還原預設值
            Data.申請許可 = unchecked;
            Data.申請換發許可 = unchecked;
            Data.申請變更原許可事項 = unchecked;
            Data.申請註銷許可 = unchecked;
            break;
        case "申請換發許可":
            Data.申請換發許可 = checked;
            ReplaceApplyContentData(switchValue, data);
            //還原預設值
            Data.申請許可 = unchecked;
            Data.申請補發許可 = unchecked;
            Data.申請變更原許可事項 = unchecked;
            Data.申請註銷許可 = unchecked;
            break;
        case "申請變更原許可事項":           
            Data.申請變更原許可事項 = checked;
            ReplaceApplyContentData(switchValue, data);
            //還原預設值
            Data.申請許可 = unchecked;
            Data.申請補發許可 = unchecked;
            Data.申請換發許可 = unchecked;
            Data.申請註銷許可 = unchecked;
            break;
        case "申請註銷許可":
            Data.申請註銷許可 = checked;
            ReplaceApplyContentData(switchValue, data);
            //還原預設值
            Data.申請許可 = unchecked;
            Data.申請補發許可 = unchecked;
            Data.申請換發許可 = unchecked;
            Data.申請變更原許可事項 = unchecked;
            break;
        default:
            ReplaceApplyContentData(switchValue, data);
            //還原預設值
            Data.申請許可 = unchecked;
            Data.申請補發許可 = unchecked;
            Data.申請換發許可 = unchecked;
            Data.申請變更原許可事項 = unchecked;
            Data.申請註銷許可 = unchecked;
            break;
    }

    
    
   
}
//還原許可原因內容
function ReplaceApplyContentData(switchData,formData) {

    switch (switchData) {
        case "申請補發許可":
            Data.申請補發許可原因 = formData.申請補發許可原因.value ? formData.申請補發許可原因.value: defaltData.申請補發許可原因;
            Data.申請補發許可字 = formData.申請補發許可字.value ? formData.申請補發許可字.value :defaltData.申請補發許可字;
            Data.申請補發許可號 = formData.申請補發許可號.value ? formData.申請補發許可號.value :defaltData.申請補發許可號;
            ReplaceContentChange();

            //還原預設值
            Data.申請換發許可原因 = defaltData.申請換發許可原因;
            Data.申請換發許可字 = defaltData.申請換發許可字;
            Data.申請換發許可號 = defaltData.申請換發許可號;

            Data.申請變更原許可事項字 = defaltData.申請變更原許可事項字;
            Data.申請變更原許可事項號 = defaltData.申請變更原許可事項號;
            Data.變更前事項內容 = defaltData.變更前事項內容;
            Data.變更後事項內容 = defaltData.變更後事項內容;

            Data.申請註銷許可原因 = defaltData.申請註銷許可原因;
            Data.申請註銷許可字 = defaltData.申請註銷許可字;
            Data.申請註銷許可號 = defaltData.申請註銷許可號;
            break;
        case "申請換發許可":
            Data.申請換發許可原因 = formData.申請換發許可原因.value ? formData.申請換發許可原因.value : defaltData.申請換發許可原因;
            Data.申請換發許可字 = formData.申請換發許可字.value ? formData.申請換發許可字.value : defaltData.申請換發許可字;
            Data.申請換發許可號 = formData.申請換發許可號.value ? formData.申請換發許可號.value : defaltData.申請換發許可號;
            ReplaceContentChange();

            //還原預設值
            Data.申請補發許可原因 = defaltData.申請補發許可原因;
            Data.申請補發許可字 = defaltData.申請補發許可字;
            Data.申請補發許可號 = defaltData.申請補發許可號;

            Data.申請變更原許可事項字 = defaltData.申請變更原許可事項字;
            Data.申請變更原許可事項號 = defaltData.申請變更原許可事項號;
            Data.變更前事項內容 = defaltData.變更前事項內容;
            Data.變更後事項內容 = defaltData.變更後事項內容;

            Data.申請註銷許可原因 = defaltData.申請註銷許可原因;
            Data.申請註銷許可字 = defaltData.申請註銷許可字;
            Data.申請註銷許可號 = defaltData.申請註銷許可號;
            break;
        case "申請變更原許可事項":
            Data.申請變更原許可事項字 = formData.申請變更原許可事項字.value ? formData.申請變更原許可事項字.value : defaltData.申請變更原許可事項字;
            Data.申請變更原許可事項號 = formData.申請變更原許可事項號.value ? formData.申請變更原許可事項號.value : defaltData.申請變更原許可事項號;
            Data.變更前事項內容 = formData.變更前事項內容.value ? formData.變更前事項內容.value : defaltData.變更前事項內容;
            Data.變更後事項內容 = formData.變更後事項內容.value ? formData.變更後事項內容.value : defaltData.變更後事項內容;
            ReplaceContentChange(formData.變更事項.value);

            //還原預設值
            Data.申請補發許可原因 = defaltData.申請補發許可原因;
            Data.申請補發許可字 = defaltData.申請補發許可字;
            Data.申請補發許可號 = defaltData.申請補發許可號;

            Data.申請換發許可原因 = defaltData.申請換發許可原因;
            Data.申請換發許可字 = defaltData.申請換發許可字;
            Data.申請換發許可號 = defaltData.申請換發許可號;

            Data.申請註銷許可原因 = defaltData.申請註銷許可原因;
            Data.申請註銷許可字 = defaltData.申請註銷許可字;
            Data.申請註銷許可號 = defaltData.申請註銷許可號;
            break;       
        case "申請註銷許可":
            Data.申請註銷許可原因 = formData.申請註銷許可原因.value ? formData.申請註銷許可原因.value : defaltData.申請註銷許可原因;
            Data.申請註銷許可字 = formData.申請註銷許可字.value ? formData.申請註銷許可字.value : defaltData.申請註銷許可字;
            Data.申請註銷許可號 = formData.申請註銷許可號.value ? formData.申請註銷許可號.value : defaltData.申請註銷許可號;
            ReplaceContentChange();

            //還原預設值
            Data.申請補發許可原因 = defaltData.申請補發許可原因;
            Data.申請補發許可字 = defaltData.申請補發許可字;
            Data.申請補發許可號 = defaltData.申請補發許可號;

            Data.申請換發許可原因 = defaltData.申請換發許可原因;
            Data.申請換發許可字 = defaltData.申請換發許可字;
            Data.申請換發許可號 = defaltData.申請換發許可號;

            Data.申請變更原許可事項字 = defaltData.申請變更原許可事項字;
            Data.申請變更原許可事項號 = defaltData.申請變更原許可事項號;
            Data.變更前事項內容 = defaltData.變更前事項內容;
            Data.變更後事項內容 = defaltData.變更後事項內容;
            break;
        default:
            ReplaceContentChange();

            //還原預設值
            Data.申請補發許可原因 = defaltData.申請補發許可原因;
            Data.申請補發許可字 = defaltData.申請補發許可字;
            Data.申請補發許可號 = defaltData.申請補發許可號;

            Data.申請換發許可原因 = defaltData.申請換發許可原因;
            Data.申請換發許可字 = defaltData.申請換發許可字;
            Data.申請換發許可號 = defaltData.申請換發許可號;

            Data.申請變更原許可事項字 = defaltData.申請變更原許可事項字;
            Data.申請變更原許可事項號 = defaltData.申請變更原許可事項號;
            Data.變更前事項內容 = defaltData.變更前事項內容;
            Data.變更後事項內容 = defaltData.變更後事項內容;
            
            Data.申請註銷許可原因 = defaltData.申請註銷許可原因;
            Data.申請註銷許可字 = defaltData.申請註銷許可字;
            Data.申請註銷許可號 = defaltData.申請註銷許可號;

            break;
    }
}
//更換變更事項內容
function ReplaceContentChange(selectValue) {    
    switch (selectValue) {
        case '名稱':
            Data.名稱變更 = checked;
            //還原預設值
            Data.所在地變更 = unchecked;
            Data.負責人變更 = unchecked;
            Data.組織型態變更 = unchecked;
            Data.營業項目變更 = unchecked;
            break;
        case '所在地':
            Data.所在地變更 = checked;
            //還原預設值
            Data.名稱變更 = unchecked;
            Data.負責人變更 = unchecked;
            Data.組織型態變更 = unchecked;
            Data.營業項目變更 = unchecked;
            break;
        case '組織型態':
            Data.組織型態變更 = checked;
            //還原預設值
            Data.名稱變更 = unchecked;
            Data.所在地變更 = unchecked;
            Data.負責人變更 = unchecked;
            Data.營業項目變更 = unchecked;
            break;
        case '營業項目':
            Data.營業項目變更 = checked;
            //還原預設值
            Data.名稱變更 = unchecked;
            Data.所在地變更 = unchecked;
            Data.負責人變更 = unchecked;
            Data.組織型態變更 = unchecked;
            break;
        case '負責人':
            Data.負責人變更 = checked;
            //還原預設值
            Data.名稱變更 = unchecked;
            Data.所在地變更 = unchecked;
            Data.組織型態變更 = unchecked;
            Data.營業項目變更 = unchecked;
            break;
        default:
            //還原預設值
            Data.名稱變更 = unchecked;
            Data.所在地變更 = unchecked;
            Data.負責人變更 = unchecked;
            Data.組織型態變更 = unchecked;
            Data.營業項目變更 = unchecked;
    
            break;
    }
}
//-------------------------------------------------------------------------
//經紀業內容置換-----------------------------------------------------------
function ReplaceBrokerage(data) {
    let name = data.經紀業名稱.value;
    let tel = data.經紀業電話.value;
    let fax = data.經紀業傳真.value;
    let email = data.經紀業電子郵件信箱.value;
    let addr = data.經紀業所在地.value;

    Data.經紀業名稱 = name ? name : defaltData.經紀業名稱;
    Data.經紀業電話 = tel ? tel : defaltData.經紀業電話;
    Data.經紀業傳真 = fax ? fax : defaltData.經紀業傳真;
    Data.經紀業電子郵件信箱 = email ? email : defaltData.經紀業電子郵件信箱;
    Data.經紀業所在地 = addr ? addr : defaltData.經紀業所在地;

    //組織型態
    switch (data.type.value) {
        case '公司':
            Data.公司 = checked;
            Data.商號 = unchecked;
            break;
        case '商號':
            Data.公司 = unchecked;
            Data.商號 = checked;
            break;
        default:
            Data.公司 = unchecked;
            Data.商號 = unchecked;
            break;
    }    
    //是否已辦理公司登記
    switch (data.companyRegister.value) {
        case '是':
            Data.已辦理公司登記是 = checked;
            let companyID = data.已辦理公司登記統一編號.value;
            Data.已辦理公司登記統一編號 = companyID ? companyID: defaltData.已辦理公司登記統一編號;
            Data.已辦理公司登記否 = unchecked;
            break;
        case '否':
            Data.已辦理公司登記否 = checked;
            Data.已辦理公司登記是 = unchecked;
            Data.已辦理公司登記統一編號 = defaltData.已辦理公司登記統一編號;
            break;
        default:
            Data.已辦理公司登記是 = unchecked;
            Data.已辦理公司登記否 = unchecked;
            Data.已辦理公司登記統一編號 = defaltData.已辦理公司登記統一編號;          
            break;
    }
    //是否已辦理商業登記
    switch (data.businessRegister.value) {
        case '是':
            Data.已辦理商業登記是 = checked;
            let businessID = data.已辦理商業登記統一編號.value;
            Data.已辦理商業登記統一編號 = businessID ? businessID : defaltData.已辦理公司登記統一編號;
            Data.已辦理商業登記否 = unchecked;
            break;
        case '否':
            Data.已辦理商業登記否 = checked;
            Data.已辦理商業登記是 = unchecked;
            Data.已辦理商業登記統一編號 = defaltData.已辦理公司登記統一編號;
            break;
        default:
            Data.已辦理商業登記是 = unchecked;
            Data.已辦理商業登記否 = unchecked;
            Data.已辦理商業登記統一編號 = defaltData.已辦理公司登記統一編號;
            break;
    }
    //經營型態
    switch (data.style.value) {
        case '直營體系':
            Data.直營體系 = checked;
            Data.加盟體系 = unchecked;
            Data.加盟體系內容 = defaltData.加盟體系內容;
            break;
        case '加盟體系':
            Data.加盟體系 = checked;
            let styleContent = data.加盟體系內容.value;
            Data.加盟體系內容 = styleContent ? styleContent : defaltData.加盟體系內容;
            Data.直營體系 = unchecked;
            break;
        default:
            Data.直營體系 = unchecked;
            Data.加盟體系 = unchecked;
            Data.加盟體系內容 = defaltData.加盟體系內容;         
            break;
    }
    //營業項目
    switch (data.item.value) {
        case '不動產仲介經紀業':
            Data.不動產仲介經紀業 = checked;
            Data.不動產代銷經紀業 = unchecked;
            break;
        case '不動產代銷經紀業':
            Data.不動產仲介經紀業 = unchecked;
            Data.不動產代銷經紀業 = checked;
            break;
        default:
            Data.不動產仲介經紀業 = unchecked;
            Data.不動產代銷經紀業 = unchecked;          
            break;
    }
    //是否經營國外不動產仲介或代銷業務
    switch (data.foreign.value) {
        case '是':
            Data.經營國外不動產仲介或代銷業務是 = checked;
            Data.經營國外不動產仲介或代銷業務否 = unchecked;
            break;
        case '否':
            Data.經營國外不動產仲介或代銷業務是 = unchecked;
            Data.經營國外不動產仲介或代銷業務否 = checked;
            break;
        default:
            Data.經營國外不動產仲介或代銷業務是 = unchecked;
            Data.經營國外不動產仲介或代銷業務否 = unchecked;
            break;
    }
}
//-------------------------------------------------------------------------
//經紀業負責人、董事、監察人、經理人名冊-----------------------------------
function ReplacePersonList(data) {
    let tableLength = document.querySelectorAll('.tb-data').length / 4;

    for (let i = 0; i < tableLength; i++) {
        let jobTitle = data[`A${(i+1)}`].value;//職稱
        let name = data[`B${(i + 1)}`].value;//姓名
        let ID = data[`D${(i + 1)}`].value;//國民身分證統一編號或護照號碼
        //console.log('職稱', jobTitle);
        //console.log('姓名', name);
        //console.log('國民身分證統一編號或護照號碼', ID);
        let date = data[`C${(i + 1)}`].value.replaceAll('-','');//出生日期
        let year = parseInt(date.substr(0, 4))-1911;
        let month = date.substr(4, 2);
        let day = date.substr(6, 2);
        let birthdate = year + '年' + month + '月' + day + '日';
        //console.log('出生日期', birthdate);
        
        Data[`A${(i + 1)}`] = jobTitle ? jobTitle : defaltData[`A${(i + 1)}`];
        Data[`B${(i + 1)}`] = name ? name : defaltData[`B${(i + 1)}`];
        Data[`C${(i + 1)}`] = date ? birthdate : defaltData[`C${(i + 1)}`];
        Data[`D${(i + 1)}`] = ID ? ID : defaltData[`D${(i + 1)}`];
    }

    
};
//-------------------------------------------------------------------------



//申請人內容置換
function ReplaceApplicant(data, type) {
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

    //資料重設
    for (let i = 0; i < 8; i++) {        
        //附繳文件
        Data[`document${(i + 1)}`] = defaltData[`document${(i + 1)}`];
    }

    for (let i = 0; i < data.document.length; i++) {

        if (data.document[i].checked) {
            property[c] = 'document' + (c + 1);
            //console.log('變數名稱', property[c]);
            let Doc = data.document[i].value+2;
            //Doc.replace(/\r\n|\n/g, "");
            //Doc.replace(/\s+/g, "");
            //Doc.replace('份', '');
            //console.log('附繳文件', data.document[i].parentNode.textContent.trim());
            Data[`${property[c]}`] = Doc ? Doc : defaltData[`${property[c]}`];
            //console.log('附繳文件', Data[`${property[c]}`]);
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
    let day = parseInt(timeDetails.date) < 10 ? '0' + timeDetails.date + ' ' : timeDetails.date + ' ';
    let month = parseInt(timeDetails.month) < 10 ? '0' + timeDetails.month + ' ' : timeDetails.month + ' ';
    let year = (parseInt(timeDetails.year) - 1911);
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
    ReplaceApplyTitle(form1);
    ReplaceBrokerage(form2);
    ReplacePersonList(form3)
    ReplaceApplicant(form4);
    ReplaceApplicant(form5, 1);
    ReplaceDocument(form6);
    
    tranDate();
    //設置數據
    doc.setData(Data);
    doc.render();


    saveDocx();

})
