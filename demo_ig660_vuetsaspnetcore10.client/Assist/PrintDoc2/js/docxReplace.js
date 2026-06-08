let checked = '■';
let unchecked = '□';
let Register = document.getElementById("form1");//申請登記事由
let Document = document.getElementById("form2");//附繳文件
let Office = document.getElementById("form3");//開業事務所資料
let Applicant = document.getElementById("form4");//申請人資料
let Co_practitioner = document.getElementById("form5");//共同執業人資料


let fileName = '地政士開業及變更登記申請書';




//申請人監聽器
Applicant.addEventListener("change", function () {
    let oldAddr = Applicant.applicant_addr.value;
    let newAddr = Applicant.address_new.value;
    if (Applicant.address.checked) {
        console.log(oldAddr);
        document.getElementById("address_new").value = oldAddr;

    } else {
        console.log(newAddr);
        document.getElementById("address_new").value = newAddr;
    }
})

//共同執業人監聽器
Co_practitioner.addEventListener("change", function () {
    let oldAddr = Co_practitioner.applicant_addr.value;
    let newAddr = Co_practitioner.address_new.value;
    if (Co_practitioner.address.checked) {
        console.log(oldAddr);
        document.getElementById("address_new1").value = oldAddr;

    } else {
        console.log(newAddr);
        document.getElementById("address_new1").value = newAddr;
    }
})


const defaltData = {   

    //申記請事登由
    '開業登記':unchecked,
    '事務所': unchecked,
    '縣市': '',
    //原因A
    '加註延長有效期限': unchecked,
    '事務所名稱變更': unchecked,
    '事務所地址變更': unchecked,
    '共同執業人異動': unchecked,
    '其他': unchecked,    
    '原因A': '',
    //原因B
    '開業執照換發': unchecked,
    '開業執照補發': unchecked,
    '開業執照註銷': unchecked,
    '原因B': '',

    ////附繳文件  
    document_A: unchecked,
    other_A: '　　 　　',
    document_B: unchecked,
    other_B: '　　 　　',
    document_C: unchecked,
    document_D: unchecked,
    other_D: '　　 　　',
    document_E: unchecked,
    document_F: unchecked,
    other_F: '　　 　　',
    document_G: unchecked,
    other_G: '　　 　　',
    
    //開事務業所
    '名稱':'',
    '電話':'',
    '傳真':'',
    '地址':'',
    '行動電話':'',
    '電子郵件信箱':'',    

    //申請人
    '申請人證書字':'    ',
    '申請人證書號':'    ',
    '申請人中文姓名':'',
    '申請人英文姓名':'',
    '申請人學歷':'',
    '申請人經歷':'',
    '申請人戶籍地址':'',
    '申請人通訊地址': '',
    '申請人ID_0':'',
    '申請人ID_1':'',
    '申請人ID_2':'',
    '申請人ID_3':'',
    '申請人ID_4':'',
    '申請人ID_5':'',
    '申請人ID_6':'',
    '申請人ID_7':'',
    '申請人ID_8':'',
    '申請人ID_9':'',
    '申請人男':unchecked,
    '申請人女': unchecked,
    '申請人出生年':'',
    '申請人出生月':'',
    '申請人出生日':'',

    //共同執業人
    '執業人證書字': '    ',
    '執業人證書號': '    ',
    '執業人中文姓名': '',
    '執業人英文姓名': '',
    '執業人學歷': '',
    '執業人經歷': '',
    '執業人戶籍地址': '',
    '執業人通訊地址': '',
    '執業人ID_0': '',
    '執業人ID_1': '',
    '執業人ID_2': '',
    '執業人ID_3': '',
    '執業人ID_4': '',
    '執業人ID_5': '',
    '執業人ID_6': '',
    '執業人ID_7': '',
    '執業人ID_8': '',
    '執業人ID_9': '',
    '執業人男': unchecked,
    '執業人女': unchecked,
    '執業人出生年': '',
    '執業人出生月': '',
    '執業人出生日': '',

    
    

    ////聲明事項
    application_year:'    ',//申請民國年
    application_month:' 　 ',//申請民國月
    application_day:'　　 ',//申請民國日
};

let Data = Object.create(defaltData);

//申記請事登由更換
function ReplaceRegister(data) {
    switch (data.register.value) {
        case 'register_A':
            console.log("■開業登記");            

            Data.開業登記 = checked;

            Data.事務所 = defaltData.事務所;
            Data.縣市 = defaltData.縣市;
            Data.加註延長有效期限 = defaltData.加註延長有效期限;    
            Data.事務所名稱變更 = defaltData.事務所名稱變更;
            Data.事務所地址變更 = defaltData.事務所地址變更;
            Data.共同執業人異動 = defaltData.共同執業人異動;
            Data.其他 = defaltData.其他;
            Data.原因A = defaltData.原因A;
            Data.開業執照換發 = defaltData.開業執照換發;
            Data.開業執照補發 = defaltData.開業執照補發;
            Data.開業執照註銷 = defaltData.開業執照註銷;
            Data.原因B = defaltData.原因B; 
    
            break;
        case 'register_B':
            console.log("■事務所");
            console.log(data.city.value);
            
            Data.事務所 = checked;
            Data.縣市 = data.city.value;

            Data.開業登記 = defaltData.開業登記;
            Data.加註延長有效期限 = defaltData.加註延長有效期限;
            Data.事務所名稱變更 = defaltData.事務所名稱變更;
            Data.事務所地址變更 = defaltData.事務所地址變更;
            Data.共同執業人異動 = defaltData.共同執業人異動;
            Data.其他 = defaltData.其他;
            Data.原因A = defaltData.原因A;
            Data.開業執照換發 = defaltData.開業執照換發;
            Data.開業執照補發 = defaltData.開業執照補發;
            Data.開業執照註銷 = defaltData.開業執照註銷;
            Data.原因B = defaltData.原因B;
            break;
        case 'register_C':
            console.log("■開業執照換發");
            console.log(data.reason1[0].value);
            
            Data.開業執照換發 = checked;
            Data.原因B = data.reason1[0].value;

            Data.開業登記 = defaltData.開業登記;
            Data.事務所 = defaltData.事務所;
            Data.縣市 = defaltData.縣市;
            Data.加註延長有效期限 = defaltData.加註延長有效期限;
            Data.事務所名稱變更 = defaltData.事務所名稱變更;
            Data.事務所地址變更 = defaltData.事務所地址變更;
            Data.共同執業人異動 = defaltData.共同執業人異動;
            Data.其他 = defaltData.其他;
            Data.原因A = defaltData.原因A;
            Data.開業執照補發 = defaltData.開業執照補發;
            Data.開業執照註銷 = defaltData.開業執照註銷;
            break;
        case 'register_D':
            console.log("■開業執照補發");
            console.log(data.reason1[1].value);
            
            Data.開業執照補發 = checked;
            Data.原因B = data.reason1[1].value;

            Data.開業登記 = defaltData.開業登記;
            Data.事務所 = defaltData.事務所;
            Data.縣市 = defaltData.縣市;
            Data.加註延長有效期限 = defaltData.加註延長有效期限;
            Data.事務所名稱變更 = defaltData.事務所名稱變更;
            Data.事務所地址變更 = defaltData.事務所地址變更;
            Data.共同執業人異動 = defaltData.共同執業人異動;
            Data.其他 = defaltData.其他;
            Data.原因A = defaltData.原因A;
            Data.開業執照換發 = defaltData.開業執照換發;
            Data.開業執照註銷 = defaltData.開業執照註銷;
            break;
        case 'register_E':
            console.log("■開業執照註銷");
            console.log(data.reason1[2].value);
            
            Data.開業執照註銷 = checked;
            Data.原因B = data.reason1[2].value;

            Data.開業登記 = defaltData.開業登記;
            Data.事務所 = defaltData.事務所;
            Data.縣市 = defaltData.縣市;
            Data.加註延長有效期限 = defaltData.加註延長有效期限;
            Data.事務所名稱變更 = defaltData.事務所名稱變更;
            Data.事務所地址變更 = defaltData.事務所地址變更;
            Data.共同執業人異動 = defaltData.共同執業人異動;
            Data.其他 = defaltData.其他;
            Data.原因A = defaltData.原因A;
            Data.開業執照換發 = defaltData.開業執照換發;
            Data.開業執照補發 = defaltData.開業執照補發;
            break;
        case 'register_F':
            console.log("■加註延長有效期限");
            console.log(data.reason[0].value);
            
            Data.加註延長有效期限 = checked;
            Data.原因A = data.reason[0].value;

            Data.開業登記 = defaltData.開業登記;
            Data.事務所 = defaltData.事務所;
            Data.縣市 = defaltData.縣市;
            Data.事務所名稱變更 = defaltData.事務所名稱變更;
            Data.事務所地址變更 = defaltData.事務所地址變更;
            Data.共同執業人異動 = defaltData.共同執業人異動;
            Data.其他 = defaltData.其他;
            Data.開業執照換發 = defaltData.開業執照換發;
            Data.開業執照補發 = defaltData.開業執照補發;
            Data.開業執照註銷 = defaltData.開業執照註銷;
            Data.原因B = defaltData.原因B;
            break;
        case 'register_G':
            console.log("■共同執業人異動");
            console.log(data.reason[1].value);
            
            Data.共同執業人異動 = checked;
            Data.原因A = data.reason[1].value;

            Data.開業登記 = defaltData.開業登記;
            Data.事務所 = defaltData.事務所;
            Data.縣市 = defaltData.縣市;
            Data.加註延長有效期限 = defaltData.加註延長有效期限;
            Data.事務所名稱變更 = defaltData.事務所名稱變更;
            Data.事務所地址變更 = defaltData.事務所地址變更;
            Data.其他 = defaltData.其他;
            Data.開業執照換發 = defaltData.開業執照換發;
            Data.開業執照補發 = defaltData.開業執照補發;
            Data.開業執照註銷 = defaltData.開業執照註銷;
            Data.原因B = defaltData.原因B;
            break;
        case 'register_H':
            console.log("■事務所名稱變更");
            console.log(data.reason[2].value);            

            Data.事務所名稱變更 = checked;
            Data.原因A = data.reason[2].value;

            Data.開業登記 = defaltData.開業登記;
            Data.事務所 = defaltData.事務所;
            Data.縣市 = defaltData.縣市;
            Data.加註延長有效期限 = defaltData.加註延長有效期限;
            Data.共同執業人異動 = defaltData.共同執業人異動;
            Data.事務所地址變更 = defaltData.事務所地址變更;
            Data.其他 = defaltData.其他;
            Data.開業執照換發 = defaltData.開業執照換發;
            Data.開業執照補發 = defaltData.開業執照補發;
            Data.開業執照註銷 = defaltData.開業執照註銷;
            Data.原因B = defaltData.原因B;
            break;
        case 'register_I':
            console.log("■事務所地址變更");
            console.log(data.reason[3].value);            

            Data.事務所地址變更 = checked;
            Data.原因A = data.reason[3].value;

            Data.開業登記 = defaltData.開業登記;
            Data.事務所 = defaltData.事務所;
            Data.縣市 = defaltData.縣市;
            Data.加註延長有效期限 = defaltData.加註延長有效期限;
            Data.事務所名稱變更 = defaltData.事務所名稱變更;
            Data.共同執業人異動 = defaltData.共同執業人異動;
            Data.其他 = defaltData.其他;
            Data.開業執照換發 = defaltData.開業執照換發;
            Data.開業執照補發 = defaltData.開業執照補發;
            Data.開業執照註銷 = defaltData.開業執照註銷;
            Data.原因B = defaltData.原因B;
            break;
        case 'register_J':
            console.log("■其他");
            console.log(data.reason[4].value);            

            Data.其他 = checked;
            Data.原因A = data.reason[4].value;

            Data.開業登記 = defaltData.開業登記;
            Data.事務所 = defaltData.事務所;
            Data.縣市 = defaltData.縣市;
            Data.加註延長有效期限 = defaltData.加註延長有效期限;
            Data.事務所名稱變更 = defaltData.事務所名稱變更;
            Data.事務所地址變更 = defaltData.事務所地址變更;
            Data.共同執業人異動 = defaltData.共同執業人異動;
            Data.開業執照換發 = defaltData.開業執照換發;
            Data.開業執照補發 = defaltData.開業執照補發;
            Data.開業執照註銷 = defaltData.開業執照註銷;
            Data.原因B = defaltData.原因B;
            break;
        default:
            console.log("目前無選項");

            Data.開業登記 = defaltData.開業登記;
            Data.事務所 = defaltData.事務所;
            Data.縣市 = defaltData.縣市;
            Data.加註延長有效期限 = defaltData.加註延長有效期限;
            Data.事務所名稱變更 = defaltData.事務所名稱變更;
            Data.事務所地址變更 = defaltData.事務所地址變更;
            Data.共同執業人異動 = defaltData.共同執業人異動;
            Data.其他 = defaltData.其他;
            Data.原因A = defaltData.原因A;
            Data.開業執照換發 = defaltData.開業執照換發;
            Data.開業執照補發 = defaltData.開業執照補發;
            Data.開業執照註銷 = defaltData.開業執照註銷;
            Data.原因B = defaltData.原因B;
            break;
    }

}
//附繳文件內容置換
function ReplaceDocument(data) {

    let letterArr = [];
    for (let i = 65, j = 0; i < 91; i++, j++) {
        letterArr[j] = String.fromCharCode(i);
    }

    for (let i = 0; i < data.document.length; i++) {

        let caseValue = 'document_' + letterArr[i];
        if (data.document[i].checked) {
            switch (data.document[i].value) {
                case caseValue:
                    //console.log(`■${caseValue}`);
                    //console.log(`i:${i}`)
                    if (i === 2 || i === 4) {
                        Data[`${caseValue}`] = checked;
                        
                    } else {
                        let quantityStr = 'other_' + letterArr[i];
                        //console.log('input抓取', document.getElementById(String(caseValue)));
                        Data[`${caseValue}`] = checked;
                        Data[`${quantityStr}`] = document.getElementById(String(caseValue)).value ? ' '+ document.getElementById(caseValue).value + ' ' : defaltData[`${quantityStr}`];
                    }

                    break;                
                default:
                    console.log("目前無選項");
                    break;

            }

        } else {

            switch (data.document[i].value) {
                case caseValue:
                    //console.log(`■${caseValue}`);

                    if (i === 2 || i === 4) {
                        Data[`${caseValue}`] = defaltData[`${caseValue}`];
                    } else {
                        let quantityStr = 'other_' + letterArr[i];
                        Data[`${caseValue}`] = defaltData[`${caseValue}`];
                        Data[`${quantityStr}`] = defaltData[`${quantityStr}`];
                    }

                    break;
                default:
                    console.log("目前無選項");
                    break;
            }
        }

    }
}

//開事務業所內容置換
function ReplaceOffice(data) {
    //事務所名稱
    Data.名稱 = data.office_name.value ? data.office_name.value : defaltData.名稱;
    //事務所地址
    Data.地址 = data.office_addr.value ? data.office_addr.value : defaltData.地址;
    //事務所電話
    Data.電話 = data.office_tel.value ? data.office_tel.value : defaltData.電話;
    //事務所行動電話
    Data.行動電話 = data.office_phone.value ? data.office_phone.value : defaltData.行動電話;
    //事務所傳真號碼
    Data.傳真 = data.office_fax.value ? data.office_fax.value : defaltData.傳真;
    //事務所電子郵件
    Data.電子郵件信箱 = data.office_email.value ? data.office_email.value : defaltData.電子郵件信箱;
}


//申請人內容置換
function ReplaceApplicant(data, check) {
    if (check == '1') {
        //申請人資料-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //證書字號
        Data.申請人證書字 = data.applicant_word.value ? data.applicant_word.value : defaltData.申請人證書字;
        Data.申請人證書號 = data.applicant_num.value ? data.applicant_num.value : defaltData.申請人證書號;
        //性別
        switch (data.gender.value) {
            case 'M':
                Data.申請人男 = checked;
                Data.申請人女 = defaltData.申請人女;
                break;
            case 'F':
                Data.申請人女 = checked;
                Data.申請人男 = defaltData.申請人男;
                break;
            default:
                Data.申請人女 = defaltData.申請人女;
                Data.申請人男 = defaltData.申請人男;
                break;
        }
        //中文姓名
        Data.申請人中文姓名 = data.applicant_name.value ? data.applicant_name.value : defaltData.申請人中文姓名;
        //英文姓名
        Data.申請人英文姓名 = data.applicant_name_us.value ? data.applicant_name_us.value : defaltData.申請人英文姓名;
        //身分證號碼
        if (data.applicant_id.value) {
            let applicantID = [...data.applicant_id.value];
            for (let i = 0; i < 10; i++) {
                let applicantIdStr = '申請人ID_' + i;
                Data[`${applicantIdStr}`] = applicantID[i] ? applicantID[i] : defaltData[`${applicantIdStr}`];
            }
        } else {
            for (let i = 0; i < 10; i++) {
                let applicantIdStr = '申請人ID_' + i;
                Data[`${applicantIdStr}`] = defaltData[`${applicantIdStr}`];
            }
        }

        //出生日期
        let year = data.applicant_year.value;
        let month = data.applicant_month.value < 10 ? '0' + data.applicant_month.value : data.applicant_month.value;
        let day = data.applicant_day.value < 10 ? '0' + data.applicant_day.value : data.applicant_day.value;

        Data.申請人出生年 = data.applicant_year.value ? year : defaltData.申請人出生年;
        Data.申請人出生月 = data.applicant_month.value ? month : defaltData.申請人出生月;
        Data.申請人出生日 = data.applicant_day.value ? day : defaltData.申請人出生日;        

        //學歷
        if (data.education.value == "請選擇") {
            Data.申請人學歷 = defaltData.申請人學歷;
        } else {
            Data.申請人學歷 = data.education.value ? data.education.value : defaltData.申請人學歷;
        };

        //經歷
        Data.申請人經歷 = data.applicant_experience.value ? data.applicant_experience.value : defaltData.申請人經歷;
        //戶籍地址
        let applicantAddr = data.applicant_addr.value;
        Data.申請人戶籍地址 = applicantAddr ? applicantAddr : defaltData.申請人戶籍地址;

        //通訊地址
        let newAddr = data.address_new.value;
        if (data.address.checked) {
            Data.申請人通訊地址 = applicantAddr ? applicantAddr : defaltData.申請人通訊地址;
        } else {
            Data.申請人通訊地址 = newAddr ? newAddr : defaltData.申請人通訊地址;
        }
    } else {
        //共同執業人資料-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //證書字號
        Data.執業人證書字 = data.applicant_word.value ? data.applicant_word.value : defaltData.執業人證書字;
        Data.執業人證書號 = data.applicant_num.value ? data.applicant_num.value : defaltData.執業人證書號;
        //性別
        switch (data.gender.value) {
            case 'M':
                Data.執業人男 = checked;
                Data.執業人女 = defaltData.執業人女;
                break;
            case 'F':
                Data.執業人女 = checked;
                Data.執業人男 = defaltData.執業人男;
                break;
            default:
                Data.執業人女 = defaltData.執業人女;
                Data.執業人男 = defaltData.執業人男;
                break;
        }
        //中文姓名
        Data.執業人中文姓名 = data.applicant_name.value ? data.applicant_name.value : defaltData.執業人中文姓名;
        //英文姓名
        Data.執業人英文姓名 = data.applicant_name_us.value ? data.applicant_name_us.value : defaltData.執業人英文姓名;
        //身分證號碼
        if (data.applicant_id.value) {
            let applicantID = [...data.applicant_id.value];
            for (let i = 0; i < 10; i++) {
                let applicantIdStr = '執業人ID_' + i;
                Data[`${applicantIdStr}`] = applicantID[i] ? applicantID[i] : defaltData[`${applicantIdStr}`];
            }
        } else {
            for (let i = 0; i < 10; i++) {
                let applicantIdStr = '執業人ID_' + i;
                Data[`${applicantIdStr}`] = defaltData[`${applicantIdStr}`];
            }
        }

        //出生日期
        let year = data.applicant_year.value;
        let month = data.applicant_month.value < 10 ? '0' + data.applicant_month.value : data.applicant_month.value;
        let day = data.applicant_day.value < 10 ? '0' + data.applicant_day.value : data.applicant_day.value;

        Data.執業人出生年 = data.applicant_year.value ? year : defaltData.執業人出生年;
        Data.執業人出生月 = data.applicant_month.value ? month : defaltData.執業人出生月;
        Data.執業人出生日 = data.applicant_day.value ? day : defaltData.執業人出生日;

        //學歷
        if (data.education.value == "請選擇") {
            Data.執業人學歷 = defaltData.執業人學歷;
        } else {
            Data.執業人學歷 = data.education.value ? data.education.value : defaltData.執業人學歷;
        };

        //經歷
        Data.執業人經歷 = data.applicant_experience.value ? data.applicant_experience.value : defaltData.執業人經歷;
        //戶籍地址
        let applicantAddr = data.applicant_addr.value;
        Data.執業人戶籍地址 = applicantAddr ? applicantAddr : defaltData.執業人戶籍地址;

        //通訊地址
        let newAddr = data.address_new.value;
        if (data.address.checked) {
            Data.執業人通訊地址 = applicantAddr ? applicantAddr : defaltData.執業人通訊地址;
        } else {
            Data.執業人通訊地址 = newAddr ? newAddr : defaltData.執業人通訊地址;
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
    ReplaceRegister(Register);
    ReplaceDocument(Document);
    ReplaceOffice(Office);
    ReplaceApplicant(Applicant, 1);
    ReplaceApplicant(Co_practitioner);     
    tranDate();
    //設置數據
    doc.setData(Data);
    //doc.setData(defaltData);
    doc.render();


    saveDocx();

})
