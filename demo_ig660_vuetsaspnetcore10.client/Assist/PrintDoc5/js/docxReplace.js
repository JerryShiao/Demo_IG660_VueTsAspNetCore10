let checked = '■';
let unchecked = '□';
let form1 = document.getElementById('form1');
let form2 = document.getElementById('form2');
let form3 = document.getElementById('form3');

//let track = document.getElementById('form3');
//track.addEventListener('click', function () {
//    //console.log('性別', track.gender.value);
//    //ReplaceDocument(track);
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
    //申請人
    applicant_name: '（範例：李大華）',//中文姓名
    applicant_ID: '',//國民身分證統一編號或護照號碼
    male: unchecked,
    female: unchecked,
    applicant_name_en: '（範例：LI,TA-HUA）',//英文姓名
    applicant_year: '',
    applicant_month: '',
    applicant_day: '',
    applicant_citizenship:'中華民國',//國籍
    applicant_office_tel: '（  ）　　　　',
    applicant_home_tel: '（  ）　　　　',
    applicant_phone: '',
    applicant_email: '',
    applicant_addr: '',
    applicant_addr1: '',

    //申請事由
    Certificate_application:unchecked,//申請證書
    Certificate_application_check: unchecked,//曾否請領證書
    Certificate_application_uncheck: unchecked,//否
    Certificate_application_city: '    ',//縣(市)政府請領
    Certificate_application_office: '    ', //市政府地政處請領

    Certificate_reissue: unchecked,//補發證書
    Certificate_reissue_reason:'    ',//原因
    Certificate_reissue_word:'    ',//證書字號(字)
    Certificate_reissue_num: '    ',//證書字號(號)

    Certificate_renewal:unchecked,//換發證書
    Certificate_renewal_reason1:unchecked,//原因1
    Certificate_renewal_reason2: unchecked,//原因2
    Certificate_renewal_reason2_other:'　　　　　　',//原因2事由
    Certificate_renewal_word: '    ',//證書字號(字)
    Certificate_renewal_num: '    ',//證書字號(號)
 

    //附繳文件    
    personID_quantity_checked: unchecked,//身分證明文件影本
    personal_photo_checked: unchecked,//申請人大頭照

    exam_pass_certificate_checked: unchecked,//考試院不動產經紀人考試及格證書
    exam_pass_certificate_word: '    ',//證書字號(字)
    exam_pass_certificate_num: '    ',//證書字號(號)

    experience_proves_checked: unchecked,//具備1年以上經紀營業員經驗證明
    experience_proves_1: unchecked,//薪資或執行業務所得扣繳資料證明影本
    experience_proves_1_quantity: '',//薪資或執行業務所得扣繳資料證明影本份數
    experience_proves_2_1: unchecked,//任職公司或商業登記證明文件影本
    experience_proves_2_1_quantity: '',//任職公司或商業登記證明文件影本份數
    experience_proves_2_2: unchecked,//任職公司或商號業經內政部備案者
    experience_proves_2_2_num: '      ',//任職公司或商號業經內政部備案者案號
    experience_proves_3: unchecked,//代銷業者與起造人或建築業者訂立之委託書或合約書影本
    experience_proves_3_quantity: '',//代銷業者與起造人或建築業者訂立之委託書或合約書影本份數
    experience_proves_4: unchecked,//4-4.其他證明文件
    experience_proves_4_other: '      ',//4-4.其他證明文件

    professional_training_certificate_checked: unchecked,//完成專業訓練30個小時以上證明及其影本
    professional_training_certificate_quantity: '',//完成專業訓練30個小時以上證明及其影本份數

    original_certificate_checked: unchecked,//原核發之不動產經紀人證書及其影本

    certificate_fee_1000: unchecked,//證書費新臺幣1千元現金或匯票1張
    certificate_fee_500: unchecked,// 證書費新臺幣5百元現金或匯票1張
    
    other_checked: unchecked,//其他
    other: '',//其他文件

    //聲明事項
    application_year:' ',//申請民國年
    application_month:' ',//申請民國月
    application_day:' ',//申請民國日
};

let Data = Object.create(defaltData);


//申請事由內容置換
function ReplaceApplyTitle(data) {
    switchValue ||= '申請證書';
    let applicationCheck = parseInt(data.apply.value);
    let renewalReasonCheck = parseInt(data.fullfill.value);
    //console.log('申請事由', switchValue);
    switch (switchValue) {
        case "申請證書":
            renewalReasonCheck = 2;
            Data.Certificate_application = checked;
            Data.Certificate_reissue = unchecked;
            Data.Certificate_renewal = unchecked;
            Data.Certificate_reissue_word = defaltData.Certificate_reissue_word;
            Data.Certificate_reissue_num = defaltData.Certificate_reissue_num;
            Data.Certificate_reissue_reason = defaltData.Certificate_reissue_reason;
            break;
        case "補發證書":
            renewalReasonCheck = 2;
            applicationCheck = 2;
            Data.Certificate_reissue = checked;
            Data.Certificate_application = unchecked;
            Data.Certificate_renewal = unchecked;
            Data.Certificate_reissue_reason = data.reissue_reason.value ? data.reissue_reason.value : defaltData.Certificate_reissue_reason;
            Data.Certificate_reissue_word = data.reissue_word.value ? data.reissue_word.value : defaltData.Certificate_reissue_word;
            Data.Certificate_reissue_num = data.reissue_num.value ? data.reissue_num.value : defaltData.Certificate_reissue_num;
            break;
        case "換發證書":
            applicationCheck = 2;
            Data.Certificate_renewal = checked;
            Data.Certificate_application = unchecked;
            Data.Certificate_reissue = unchecked;
            Data.Certificate_reissue_reason = defaltData.Certificate_reissue_reason;
            Data.Certificate_reissue_word = defaltData.Certificate_reissue_word;
            Data.Certificate_reissue_num = defaltData.Certificate_reissue_num;
            break;
        default:
            applicationCheck = 2;
            renewalReasonCheck = 2;
            Data.Certificate_application = unchecked;
            Data.Certificate_reissue = unchecked;
            Data.Certificate_renewal = unchecked;
            Data.Certificate_reissue_reason = defaltData.Certificate_reissue_reason;
            Data.Certificate_reissue_word = defaltData.Certificate_reissue_word;
            Data.Certificate_reissue_num = defaltData.Certificate_reissue_num;
            break;
    }

    //曾否請領證書
    //console.log('申請證書確認', applicationCheck)
    switch (applicationCheck) {
        case 0:
            Data.Certificate_application_uncheck = checked;
            Data.Certificate_application_check = unchecked;
            Data.Certificate_application_city = defaltData.Certificate_application_city;
            Data.Certificate_application_office = defaltData.Certificate_application_office;
            break;
        case 1:
            Data.Certificate_application_check = checked;
            Data.Certificate_application_uncheck = unchecked;
            Data.Certificate_application_city = data.application_city.value ? data.application_city.value: defaltData.Certificate_application_city;
            Data.Certificate_application_office = data.application_office.value ? data.application_office.value :defaltData.Certificate_application_office;
            break;
        default:
            Data.Certificate_application_check = unchecked;
            Data.Certificate_application_uncheck = unchecked;
            Data.Certificate_application_city = defaltData.Certificate_application_city;
            Data.Certificate_application_office = defaltData.Certificate_application_office;
            break;
    }

    //換發證書原因確認
    //console.log('換發證書原因確認', renewalReasonCheck)
    switch (renewalReasonCheck) {
        case 0:
            Data.Certificate_renewal_reason1 = checked;
            Data.Certificate_renewal_reason2 = unchecked;            
            Data.Certificate_renewal_word = data.renewal_word.value ? data.renewal_word.value :defaltData.Certificate_renewal_word;
            Data.Certificate_renewal_num = data.renewal_num.value ? data.renewal_num.value : defaltData.Certificate_renewal_num;
            Data.Certificate_renewal_reason2_other = defaltData.Certificate_renewal_reason2_other;
            break;
        case 1:
            Data.Certificate_renewal_reason2 = checked;
            Data.Certificate_renewal_reason1 = unchecked;
            //console.log("其他原因", data.fullfill_reason.value);
            Data.Certificate_renewal_reason2_other = data.fullfill_reason.value ? data.fullfill_reason.value : defaltData.Certificate_renewal_reason2_other;
            Data.Certificate_renewal_word = defaltData.Certificate_renewal_word;
            Data.Certificate_renewal_num = defaltData.Certificate_renewal_num;
            break;
        default:
            Data.Certificate_renewal_reason1 = unchecked;
            Data.Certificate_renewal_reason2 = unchecked;
            Data.Certificate_renewal_word = defaltData.Certificate_renewal_word;
            Data.Certificate_renewal_num = defaltData.Certificate_renewal_num;
            Data.Certificate_renewal_reason2_other = defaltData.Certificate_renewal_reason2_other;
            break;
    }
    
   
}

//申請人內容置換
function ReplaceApplicant(data) {

    let gender = data.gender.value;//性別
    gender ||= 0;
    switch (gender) {
        case 'M':
            Data.male = checked;
            Data.female = unchecked;
            break;
        case 'F':
            Data.male = unchecked;
            Data.female = checked;
            break;
        default:
            Data.male = unchecked;
            Data.female = unchecked;
            break;
    }

    let applicant_year = data.querySelector('input[name="applicant_year"]').value;//出生日期(年)
    let applicant_month = data.querySelector('input[name="applicant_month"]').value;//出生日期(月)
    let applicant_day = data.querySelector('input[name="applicant_day"]').value;//出生日期(日)
    applicant_month = (applicant_month) && applicant_month < 10 ? '0' + applicant_month : applicant_month;
    applicant_day = (applicant_day) && applicant_day < 10 ? '0' + applicant_day : applicant_day;
    Data.applicant_year = applicant_year ? applicant_year : defaltData.applicant_year;
    Data.applicant_month = applicant_month ? applicant_month : defaltData.applicant_month;
    Data.applicant_day = applicant_day ? applicant_day : defaltData.applicant_day;
    
    let citizenship = data.querySelector('input[name="applicant_citizenship"]').value;//國籍
    let name = data.querySelector('input[name="applicant_name"]').value;//中文名
    let nameEN = data.querySelector('input[name="applicant_name_en"]').value;//英文名
    let ID = data.querySelector('input[name="applicant_ID"]').value;//身分證字號
    let officeTel = data.querySelector('input[name="applicant_office_tel"]').value;//辦公室電話
    let homeTel = data.querySelector('input[name="applicant_home_tel"]').value;//住家電話
    let phone = data.querySelector('input[name="applicant_phone"]').value;//手機
    let email = data.querySelector('input[name="applicant_email"]').value;//郵件
    let addr = data.querySelector('input[name="applicant_addr"]').value;//戶籍地址
    let addr1 = data.querySelector('input[name="applicant_addr1"]').value;//通訊地址

    Data.applicant_citizenship = citizenship ? citizenship : defaltData.applicant_citizenship;
    Data.applicant_name = name ? name : defaltData.applicant_name;
    Data.applicant_name_en = nameEN ? nameEN : defaltData.applicant_name_en;
    Data.applicant_ID = ID ? ID : defaltData.applicant_ID;
    Data.applicant_office_tel = officeTel ? '（' + officeTel.substr(0, 2) + '）' + officeTel.substr(2, 8) : defaltData.applicant_office_tel;
    Data.applicant_home_tel = homeTel ? '（' + homeTel.substr(0, 2) + '）' + homeTel.substr(2, 8) : defaltData.applicant_home_tel;
    Data.applicant_phone = phone ? phone : defaltData.applicant_phone;
    Data.applicant_email = email ? email : defaltData.applicant_email;
    Data.applicant_addr = addr ? addr : defaltData.applicant_addr;
    Data.applicant_addr1 = addr1 ? addr1 : defaltData.applicant_addr1;
    
}

//附繳文件內容置換
function ReplaceDocument(data) {

    let experienceChecked = false;
    
    for (let i = 0; i < data.document.length; i++) {
        
        if (data.document[i].checked) {

            switch (data.document[i].value) {
                case 'document_A':
                    console.log("■身分證明文件影本");
                    Data.personID_quantity_checked = checked;                 
                    break;
                case 'document_B':
                    console.log("■申請人最近1年內直4公分﹑寬2.8公分正面脫帽半身相片1式2張");
                    Data.personal_photo_checked = checked;                   
                    break;
                case 'document_C':
                    console.log("■考試院不動產經紀人考試及格證書");
                    Data.exam_pass_certificate_checked = checked;
                    Data.exam_pass_certificate_word = data.exam_pass_certificate_word.value ? data.exam_pass_certificate_word.value : defaltData.exam_pass_certificate_word;
                    Data.exam_pass_certificate_num = data.exam_pass_certificate_num.value ? data.exam_pass_certificate_num.value :  defaltData.exam_pass_certificate_num;
                    break;
                case 'document_D':
                    console.log("■具備1年以上經紀營業員經驗證明及其影本各1份");
                    Data.experience_proves_checked = checked;
                    experienceChecked = true;
                    break;
                case 'document_E':
                    console.log("■完成專業訓練30個小時以上證明及其影本");
                    Data.professional_training_certificate_checked = checked;
                    Data.professional_training_certificate_quantity = data.professional_training_certificate_quantity.value ? data.professional_training_certificate_quantity.value : defaltData.professional_training_certificate_quantity;
                    break;
                case 'document_F':
                    console.log("■原核發之不動產經紀人證書及其影本");
                    Data.original_certificate_checked = checked;                    
                    break;
                case 'document_G':
                    console.log("■證書費新臺幣1千元現金或匯票1張");
                    Data.certificate_fee_1000 = checked;
                    
                    break;
                case 'document_H':
                    console.log("■證書費新臺幣5百元現金或匯票1張");
                    Data.certificate_fee_500 = checked;
                    
                    break;
                case 'document_I':
                    console.log("■其他證明文件");
                    Data.other_checked = checked;
                    Data.other = data.other.value ? data.other.value: defaltData.other;
                    break;
                default:
                    console.log("目前無選項");
                    break;

            }

        } else {

            switch (data.document[i].value) {
                case 'document_A':
                    console.log("□身分證明文件影本");
                    Data.personID_quantity_checked = unchecked;                    
                    break;
                case 'document_B':
                    console.log("□申請人最近1年內直4公分﹑寬2.8公分正面脫帽半身相片1式2張");
                    Data.personal_photo_checked = unchecked;                    
                    break;
                case 'document_C':
                    console.log("□考試院不動產經紀人考試及格證書");
                    Data.exam_pass_certificate_checked = unchecked;
                    Data.exam_pass_certificate_word = defaltData.exam_pass_certificate_word;
                    Data.exam_pass_certificate_num = defaltData.exam_pass_certificate_num;
                    break;
                case 'document_D':
                    console.log("□具備1年以上經紀營業員經驗證明及其影本各1份");
                    Data.experience_proves_checked = unchecked;
                    experienceChecked = false;
                    break;
                case 'document_E':
                    console.log("□完成專業訓練30個小時以上證明及其影本");
                    Data.professional_training_certificate_checked = unchecked;
                    Data.professional_training_certificate_quantity = defaltData.professional_training_certificate_quantity;
                    break;
                case 'document_F':
                    console.log("□原核發之不動產經紀人證書及其影本");
                    Data.original_certificate_checked = unchecked;                   
                    break;
                case 'document_G':
                    console.log("□證書費新臺幣1千元現金或匯票1張");
                    Data.certificate_fee_1000 = unchecked;

                    break;
                case 'document_H':
                    console.log("□證書費新臺幣5百元現金或匯票1張");
                    Data.certificate_fee_500 = unchecked;

                    break;
                case 'document_I':
                    console.log("□其他證明文件");
                    Data.other_checked = unchecked;
                    Data.other = defaltData.other;
                    break;
                default:
                    console.log("目前無選項");
                    break;

            }
        }

    }

    //1年以上經紀營業員經驗證明確認
    console.log('具備1年以上經紀營業員經驗證明確認', experienceChecked);
    if (experienceChecked) {
        Data.experience_proves_1 = data.experience_proves_1_quantity.value ? checked : unchecked;
        Data.experience_proves_1_quantity = data.experience_proves_1_quantity.value ? data.experience_proves_1_quantity.value : defaltData.experience_proves_1_quantity;
        Data.experience_proves_2_1 = data.experience_proves_2_1_quantity.value ? checked : unchecked;
        Data.experience_proves_2_1_quantity = data.experience_proves_2_1_quantity.value ? data.experience_proves_2_1_quantity.value : defaltData.experience_proves_2_1_quantity;
        Data.experience_proves_2_2 = data.experience_proves_2_2_num.value ? checked : unchecked;
        Data.experience_proves_2_2_num = data.experience_proves_2_2_num.value ? data.experience_proves_2_2_num.value : defaltData.experience_proves_2_2_num;
        Data.experience_proves_3 = data.experience_proves_3_quantity.value ? checked : unchecked;
        Data.experience_proves_3_quantity = data.experience_proves_3_quantity.value ? data.experience_proves_3_quantity.value : defaltData.experience_proves_3_quantity;
        Data.experience_proves_4 = data.experience_proves_4_other.value ? checked : unchecked;
        Data.experience_proves_4_other = data.experience_proves_4_other.value ? data.experience_proves_4_other.value : defaltData.experience_proves_4_other;
    } else {
        Data.experience_proves_1 = unchecked;
        Data.experience_proves_1_quantity = defaltData.experience_proves_1_quantity;
        Data.experience_proves_2_1 = unchecked;
        Data.experience_proves_2_1_quantity = defaltData.experience_proves_2_1_quantity;
        Data.experience_proves_2_2 = unchecked;
        Data.experience_proves_2_2_num = defaltData.experience_proves_2_2_num;
        Data.experience_proves_3 = unchecked;
        Data.experience_proves_3_quantity = defaltData.experience_proves_3_quantity;
        Data.experience_proves_4 = unchecked;
        Data.experience_proves_4_other = defaltData.experience_proves_4_other;
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
    let year = (parseInt(timeDetails.year) - 1911) + ' ';
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
    ReplaceApplicant(form1);
    ReplaceApplyTitle(form2);
    ReplaceDocument(form3);
    tranDate();
    //設置數據
    doc.setData(Data);
    doc.render();


    saveDocx();

})
