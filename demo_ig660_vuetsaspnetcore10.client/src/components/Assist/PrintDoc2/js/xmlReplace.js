let Register = document.getElementById("form1");//申請登記事由
let Document = document.getElementById("form2");//附繳文件
let Office = document.getElementById("form3");//開業事務所資料
let Applicant = document.getElementById("form4");//申請人資料
let Co_practitioner = document.getElementById("form5");//共同執業人資料
let Document_id = ' 1 ';//身分證明文件影本，預設1份
let Document_certificate = ' 1 ';//地政士或土地登記專業代理人證書及其影本，預設1份
let Document_change = ' 1 ';//內容變更證明文件，預設1份
let Document_license_fee = ' 100 ';//執照費 新台幣，預設100元
let Document_training = ' 1 ';//最近四年內完成專業訓練30小時以上或與專業訓練相當之證明文件，預設1份

let fileName = '地政士開業及變更登記申請書';




//申請人監聽器
Applicant.addEventListener("click", function () {
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
Co_practitioner.addEventListener("click", function () {
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

//測試資料用
//let track = document.getElementById("form4");//用form抓取值
//track.addEventListener("click", function () {
//    //for (let i = 0; i < track.document.length; i++) {
//    //    track.document[i].checked ? console.log(track.document[i].value) : null;          
//    //}    
//    //console.log(track.office_tel.value);
//    //console.log(track.office_phone.value);    
//})

function ReplaceRegisterXML(data) {
    switch (data.register.value) {
        case 'register_A':
            console.log("■開業登記");
            console.log(data.reason[0].value);
            jsonObj['wordDocument'].body.sect.tbl.tr[3].tc[1].p[0].r.t.__text = "■開業登記";
            
            ReplaceNullXML('reason_default');
            break;
        case 'register_B':
            console.log("■事務所自");
            console.log(data.reason[1].value);
            jsonObj['wordDocument'].body.sect.tbl.tr[3].tc[1].p[1].r[0].t.__text = "■事務所自";
            jsonObj['wordDocument'].body.sect.tbl.tr[3].tc[1].p[1].r[2].t.__text = data.city.value;
            jsonObj['wordDocument'].body.sect.tbl.tr[3].tc[1].p[1].r[4].t.__text = "遷入";
            
            ReplaceNullXML('reason_C');
            break;
        case 'register_C':
            console.log("■開業執照換發");
            console.log(data.reason1[0].value);
            jsonObj['wordDocument'].body.sect.tbl.tr[4].tc[1].p[0].r.t.__text = "■開業執照換發";
            jsonObj['wordDocument'].body.sect.tbl.tr[4].tc[3].p.r.t.__text = data.reason1[0].value;
            ReplaceNullXML('reason_B');
            break;
        case 'register_D':
            console.log("■開業執照補發");
            console.log(data.reason1[1].value);
            jsonObj['wordDocument'].body.sect.tbl.tr[4].tc[1].p[1].r.t.__text = "■開業執照補發";
            jsonObj['wordDocument'].body.sect.tbl.tr[4].tc[3].p.r.t.__text = data.reason1[1].value;
            ReplaceNullXML('reason_B');
            break;
        case 'register_E':
            console.log("■開業執照註銷");
            console.log(data.reason1[2].value);
            jsonObj['wordDocument'].body.sect.tbl.tr[4].tc[1].p[2].r.t.__text = "■開業執照註銷";
            jsonObj['wordDocument'].body.sect.tbl.tr[4].tc[3].p.r.t.__text = data.reason1[2].value;
            ReplaceNullXML('reason_B');
            break;
        case 'register_F':
            console.log("■加註延長有效日期");
            console.log(data.reason[2].value);
            jsonObj['wordDocument'].body.sect.tbl.tr[3].tc[2].p[0].r.t.__text = "■加註延長有效日期";
            jsonObj['wordDocument'].body.sect.tbl.tr[3].tc[4].p.r.t.__text = data.reason[0].value;
            ReplaceNullXML('reason_A');
            break;
        case 'register_G':
            console.log("■共同執業人異動");
            console.log(data.reason[3].value);
            jsonObj['wordDocument'].body.sect.tbl.tr[3].tc[2].p[3].r.t.__text = "■共同執業人異動";
            jsonObj['wordDocument'].body.sect.tbl.tr[3].tc[4].p.r.t.__text = data.reason[1].value;
            ReplaceNullXML('reason_A');
            break;
        case 'register_H':
            console.log("■事務所名稱變更");
            console.log(data.reason[4].value);
            jsonObj['wordDocument'].body.sect.tbl.tr[3].tc[2].p[1].r.t.__text = "■事務所名稱變更";
            jsonObj['wordDocument'].body.sect.tbl.tr[3].tc[4].p.r.t.__text = data.reason[2].value;
            ReplaceNullXML('reason_A');
            break;
        case 'register_I':
            console.log("■事務所地址變更");
            console.log(data.reason[5].value);
            jsonObj['wordDocument'].body.sect.tbl.tr[3].tc[2].p[2].r.t.__text = "■事務所地址變更"
            jsonObj['wordDocument'].body.sect.tbl.tr[3].tc[4].p.r.t.__text = data.reason[3].value;
            ReplaceNullXML('reason_A');
            break;
        case 'register_J':
            console.log("■其他");
            console.log(data.reason[6].value);
            jsonObj['wordDocument'].body.sect.tbl.tr[3].tc[2].p[4].r.t.__text = "■其他";
            jsonObj['wordDocument'].body.sect.tbl.tr[3].tc[4].p.r.t.__text = data.reason[4].value;
            ReplaceNullXML('reason_A');
            break;
        default:
            console.log("目前無選項");
            ReplaceNullXML('reason_default');
            break;
    }

}

function ReplaceDocumentXML(data) {

    for (let i = 0; i < data.document.length; i++) {

        if (data.document[i].checked) {

            switch (data.document[i].value) {
                case 'document_A':
                    console.log("■身分證明文件影本");
                    jsonObj['wordDocument'].body.sect.tbl.tr[5].tc[1].p[0].r[0].t.__text = "1.■身分證明文件影本";
                    jsonObj['wordDocument'].body.sect.tbl.tr[5].tc[1].p[0].r[2].t.__text = Document_id;//預設1份
                    break;
                case 'document_B':
                    console.log("■最近一年內2吋半身照片(1式2張)");
                    jsonObj['wordDocument'].body.sect.tbl.tr[5].tc[1].p[2].r.t.__text = "3,■最近一年內2吋半身照片(1式2張)";
                    break;
                case 'document_C':
                    console.log("■地政士或土地登記專業代理人證書及其影本");
                    jsonObj['wordDocument'].body.sect.tbl.tr[5].tc[1].p[1].r[0].t.__text = "2,■地政士或土地登記專業代理人證書及其影本";
                    jsonObj['wordDocument'].body.sect.tbl.tr[5].tc[1].p[1].r[2].t.__text = Document_certificate;//預設1份
                    break;
                case 'document_D':
                    console.log("■內容變更證明文件");
                    jsonObj['wordDocument'].body.sect.tbl.tr[5].tc[1].p[3].r[0].t.__text = "4.■內容變更證明文件";
                    jsonObj['wordDocument'].body.sect.tbl.tr[5].tc[1].p[3].r[2].t.__text = Document_change;//預設1份
                    break;
                case 'document_E':
                    console.log("■原地政士(土地登記專業代理人)開業執照1份");
                    jsonObj['wordDocument'].body.sect.tbl.tr[5].tc[1].p[4].r.t.__text = "5.■原地政士(土地登記專業代理人)開業執照1份";
                    break;
                case 'document_F':
                    console.log("■執照費 新台幣");
                    jsonObj['wordDocument'].body.sect.tbl.tr[5].tc[1].p[5].r[0].t.__text = "6.■執照費 新台幣";
                    jsonObj['wordDocument'].body.sect.tbl.tr[5].tc[1].p[5].r[2].t.__text = Document_license_fee//預設100元
                    break;
                case 'document_G':
                    console.log("■最近四年內完成專業訓練30小時以上或與專業訓練相當之證明文件");
                    jsonObj['wordDocument'].body.sect.tbl.tr[5].tc[1].p[6].r[0].t.__text = "7.■最近四年內完成專業訓練30小時以上或與專業訓練相當之證明文件";
                    jsonObj['wordDocument'].body.sect.tbl.tr[5].tc[1].p[6].r[2].t.__text = Document_training;//預設1份
                    break;
                default:
                    console.log("目前無選項");
                    break;

            }
            
        } else {

            switch (data.document[i].value) {
                case 'document_A':
                    jsonObj['wordDocument'].body.sect.tbl.tr[5].tc[1].p[0].r[2].t.__text = "    ";//身分證明文件影本
                    break;
                case 'document_C':
                    jsonObj['wordDocument'].body.sect.tbl.tr[5].tc[1].p[1].r[2].t.__text = "    ";//地政士或土地登記專業代理人證書及其影本
                    break;
                case 'document_D':
                    jsonObj['wordDocument'].body.sect.tbl.tr[5].tc[1].p[3].r[2].t.__text = "    ";//內容變更證明文件
                    break;
                case 'document_F':
                    jsonObj['wordDocument'].body.sect.tbl.tr[5].tc[1].p[5].r[2].t.__text = "    ";//執照費 新台幣
                    break;
                case 'document_G':
                    jsonObj['wordDocument'].body.sect.tbl.tr[5].tc[1].p[6].r[2].t.__text = "     ";//最近四年內完成專業訓練30小時以上或與專業訓練相當之證明文件
                    break;
                default:
                    console.log("目前無選項");                    
                    break;
            }
        }
        
    }
}

function ReplaceOfficeXML(data) {
    //事務所名稱
    data.office_name.value ? jsonObj['wordDocument'].body.sect.tbl.tr[6].tc[2].p.r.t.__text = data.office_name.value : jsonObj['wordDocument'].body.sect.tbl.tr[6].tc[2].p.r.t.__text = '';
    //事務所地址
    data.office_addr.value ? jsonObj['wordDocument'].body.sect.tbl.tr[6].tc[4].p.r.t.__text = data.office_addr.value : jsonObj['wordDocument'].body.sect.tbl.tr[6].tc[4].p.r.t.__text = '';
    //事務所電話
    data.office_tel.value ? jsonObj['wordDocument'].body.sect.tbl.tr[7].tc[2].p.r.t.__text = data.office_tel.value : jsonObj['wordDocument'].body.sect.tbl.tr[7].tc[2].p.r.t.__text = '';
    //事務所行動電話
    data.office_phone.value ? jsonObj['wordDocument'].body.sect.tbl.tr[7].tc[4].p.r.t.__text = data.office_phone.value : jsonObj['wordDocument'].body.sect.tbl.tr[7].tc[4].p.r.t.__text = '';
    //事務所傳真號碼
    data.office_fax.value ? jsonObj['wordDocument'].body.sect.tbl.tr[8].tc[2].p.r.t.__text = data.office_fax.value : jsonObj['wordDocument'].body.sect.tbl.tr[8].tc[2].p.r.t.__text = '';
    //事務所電子郵件
    data.office_email.value ? jsonObj['wordDocument'].body.sect.tbl.tr[8].tc[4].p.r.t.__text = data.office_email.value : jsonObj['wordDocument'].body.sect.tbl.tr[8].tc[4].p.r.t.__text = '';
}

function ReplaceApplicantXML(data,check) {
    if (check == '1') {
        //申請人資料-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //證書字號
        data.applicant_num.value ? jsonObj['wordDocument'].body.sect.tbl.tr[9].tc[2].p.r[1].t.__text = data.applicant_num.value : jsonObj['wordDocument'].body.sect.tbl.tr[9].tc[2].p.r[1].t.__text = '    ';
        //性別
        switch (data.gender.value) {
            case 'M':
                jsonObj['wordDocument'].body.sect.tbl.tr[14].tc[2].p.r.t.__text = "■男 □女";
                break;
            case 'F':
                jsonObj['wordDocument'].body.sect.tbl.tr[14].tc[2].p.r.t.__text = "□男 ■女";
                break;
            default:
                console.log("目前無選項");
                break;
        }         
        //中文姓名
        data.applicant_name.value ? jsonObj['wordDocument'].body.sect.tbl.tr[10].tc[2].p.r[0].t.__text = data.applicant_name.value : jsonObj['wordDocument'].body.sect.tbl.tr[10].tc[2].p.r[0].t.__text = '';
        //英文姓名
        data.applicant_name_us.value ? jsonObj['wordDocument'].body.sect.tbl.tr[11].tc[2].p.r[0].t.__text = data.applicant_name_us.value : jsonObj['wordDocument'].body.sect.tbl.tr[11].tc[2].p.r[0].t.__text = '';
        //身分證號碼
        if (data.applicant_id.value) {
            let applicantID = [...data.applicant_id.value];
            for (let i = 0; i < 10; i++) {
                jsonObj['wordDocument'].body.sect.tbl.tr[12].tc[i + 2].p.r.t.__text = applicantID[i];
            }
        } else {
            for (let i = 0; i < 10; i++) {
                jsonObj['wordDocument'].body.sect.tbl.tr[12].tc[i + 2].p.r.t.__text = '';
            }
        }
        
        //出生日期
        let year = data.applicant_year.value;
        let month = data.applicant_month.value < 10 ? '0' + data.applicant_month.value : data.applicant_month.value;
        let day = data.applicant_day.value < 10 ? '0' + data.applicant_day.value : data.applicant_day.value;
        if (year && month && day) {
            let birthdate = year + '年' + month + '月' + day + '日';
            jsonObj['wordDocument'].body.sect.tbl.tr[14].tc[4].p.r.t.__text = birthdate;
        } else {
            jsonObj['wordDocument'].body.sect.tbl.tr[14].tc[4].p.r.t.__text = "    年  月  日";
        }        
        
        //學歷
        if (data.education.value == "請選擇") {
            ReplaceNullXML('Applicant_default');
        } else {
            jsonObj['wordDocument'].body.sect.tbl.tr[9].tc[4].p.r.t.__text = data.education.value;
        };
        
        //經歷
        data.applicant_experience.value ? jsonObj['wordDocument'].body.sect.tbl.tr[10].tc[4].p.r.t.__text = data.applicant_experience.value : jsonObj['wordDocument'].body.sect.tbl.tr[10].tc[4].p.r.t.__text = '';
        //戶籍地址
        let applicantAddr = data.applicant_addr.value;
        applicantAddr ? jsonObj['wordDocument'].body.sect.tbl.tr[11].tc[4].p.r.t.__text = applicantAddr : jsonObj['wordDocument'].body.sect.tbl.tr[11].tc[4].p.r.t.__text = '';

        //通訊地址
        let newAddr = data.address_new.value;
        if (data.address.checked) {
            applicantAddr ? jsonObj['wordDocument'].body.sect.tbl.tr[13].tc[13].p.r.t.__text = applicantAddr : jsonObj['wordDocument'].body.sect.tbl.tr[13].tc[13].p.r.t.__text = '';
        } else {
            newAddr ? jsonObj['wordDocument'].body.sect.tbl.tr[13].tc[13].p.r.t.__text = newAddr : jsonObj['wordDocument'].body.sect.tbl.tr[13].tc[13].p.r.t.__text = '';
        }
    } else {
        //共同執業人資料-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //證書字號
        data.applicant_num.value ? jsonObj['wordDocument'].body.sect.tbl.tr[15].tc[2].p.r[1].t.__text = data.applicant_num.value : jsonObj['wordDocument'].body.sect.tbl.tr[15].tc[2].p.r[1].t.__text = '    ';
        //性別
        switch (data.gender.value) {
            case 'M':
                jsonObj['wordDocument'].body.sect.tbl.tr[20].tc[2].p.r.t.__text = "■男 □女";
                break;
            case 'F':
                jsonObj['wordDocument'].body.sect.tbl.tr[20].tc[2].p.r.t.__text = "□男 ■女";
                break;
            default:
                console.log("目前無選項");
                break;
        }
        //中文姓名
        data.applicant_name.value ? jsonObj['wordDocument'].body.sect.tbl.tr[16].tc[2].p.r.t.__text = data.applicant_name.value : jsonObj['wordDocument'].body.sect.tbl.tr[16].tc[2].p.r.t.__text = '';
        //英文姓名
        data.applicant_name_us.value ? jsonObj['wordDocument'].body.sect.tbl.tr[17].tc[2].p.r.t.__text = data.applicant_name_us.value : jsonObj['wordDocument'].body.sect.tbl.tr[17].tc[2].p.r.t.__text = '';
        //身分證號碼
        if (data.applicant_id.value) {
            let applicantID = [...data.applicant_id.value];
            for (let i = 0; i < 10; i++) {
                jsonObj['wordDocument'].body.sect.tbl.tr[18].tc[i+2].p.r.t.__text = applicantID[i];
            }
        } else {
            for (let i = 0; i < 10; i++) {
                jsonObj['wordDocument'].body.sect.tbl.tr[18].tc[i + 2].p.r.t.__text = '';
            }
        }

        //出生日期
        let year = data.applicant_year.value
        let month = data.applicant_month.value < 10 ? '0' + data.applicant_month.value : data.applicant_month.value;
        let day = data.applicant_day.value < 10 ? '0' + data.applicant_day.value : data.applicant_day.value;
        if (year && month && day) {
            let birthdate = '年' + month + '月' + day + '日';
            jsonObj['wordDocument'].body.sect.tbl.tr[20].tc[4].p.r[0].t.__text = year;
            jsonObj['wordDocument'].body.sect.tbl.tr[20].tc[4].p.r[1].t.__text = birthdate;
        } else {
            jsonObj['wordDocument'].body.sect.tbl.tr[20].tc[4].p.r[0].t.__text = '';
            jsonObj['wordDocument'].body.sect.tbl.tr[20].tc[4].p.r[1].t.__text = "    年  月  日";
        }

        //學歷
        if (data.education.value == "請選擇") {
            ReplaceNullXML('co-practitioner_default');
        } else {
            jsonObj['wordDocument'].body.sect.tbl.tr[15].tc[4].p.r.t.__text = data.education.value;
        };

        //經歷
        data.applicant_experience.value ? jsonObj['wordDocument'].body.sect.tbl.tr[16].tc[4].p.r.t.__text = data.applicant_experience.value : jsonObj['wordDocument'].body.sect.tbl.tr[16].tc[4].p.r.t.__text = '';
        //戶籍地址
        let applicantAddr = data.applicant_addr.value;
        applicantAddr ? jsonObj['wordDocument'].body.sect.tbl.tr[17].tc[4].p.r.t.__text = applicantAddr : jsonObj['wordDocument'].body.sect.tbl.tr[17].tc[4].p.r.t.__text = '';

        //通訊地址
        let newAddr = data.address_new.value;
        if (data.address.checked) {
            applicantAddr ? jsonObj['wordDocument'].body.sect.tbl.tr[19].tc[13].p.r.t.__text = applicantAddr : jsonObj['wordDocument'].body.sect.tbl.tr[19].tc[13].p.r.t.__text = '';
        } else {
            newAddr ? jsonObj['wordDocument'].body.sect.tbl.tr[19].tc[13].p.r.t.__text = newAddr : jsonObj['wordDocument'].body.sect.tbl.tr[19].tc[13].p.r.t.__text = '';
        }
    }
}

//更新資料為null
function ReplaceNullXML(data) {
    switch (data) {
        case 'reason_A':
            jsonObj['wordDocument'].body.sect.tbl.tr[3].tc[1].p[1].r[2].t.__text = '    ';//事務所自m市、縣(市)遷入
            jsonObj['wordDocument'].body.sect.tbl.tr[4].tc[3].p.r.t.__text = '';//原因B
            break;
        case 'reason_B':
            jsonObj['wordDocument'].body.sect.tbl.tr[3].tc[1].p[1].r[2].t.__text = '    ';//事務所自m市、縣(市)遷入
            jsonObj['wordDocument'].body.sect.tbl.tr[3].tc[4].p.r.t.__text = '';//原因A
            break;
        case 'reason_C':
            jsonObj['wordDocument'].body.sect.tbl.tr[3].tc[4].p.r.t.__text = '';//原因A
            jsonObj['wordDocument'].body.sect.tbl.tr[4].tc[3].p.r.t.__text = '';//原因B
            break;
        case 'reason_default':
            jsonObj['wordDocument'].body.sect.tbl.tr[3].tc[1].p[1].r[2].t.__text = '    ';//事務所自m市、縣(市)遷入
            jsonObj['wordDocument'].body.sect.tbl.tr[3].tc[4].p.r.t.__text = '';//原因A
            jsonObj['wordDocument'].body.sect.tbl.tr[4].tc[3].p.r.t.__text = '';//原因B  
            break;
        case 'Applicant_default':
            jsonObj['wordDocument'].body.sect.tbl.tr[9].tc[4].p.r.t.__text = '';//申請人學歷
            break;
        case 'co-practitioner_default':
            jsonObj['wordDocument'].body.sect.tbl.tr[15].tc[4].p.r.t.__text = '';//共同執業人學歷
            break;            
        default:
            jsonObj['wordDocument'].body.sect.tbl.tr[3].tc[1].p[1].r[2].t.__text = '    ';//事務所自m市、縣(市)遷入
            jsonObj['wordDocument'].body.sect.tbl.tr[3].tc[4].p.r.t.__text = '';//原因A
            jsonObj['wordDocument'].body.sect.tbl.tr[4].tc[3].p.r.t.__text = '';//原因B            
            break;

    }
    

}
//轉換現在的民國年月日
function tranDate() {
    let dateObject = new Date();
    let day = dateObject.getDay() < 10 ? '0' + dateObject.getDay() : dateObject.getDay();
    let month = dateObject.getMonth() < 10 ? '0' + dateObject.getMonth() : dateObject.getMonth();
    let year = dateObject.getFullYear() - 1911;
    jsonObj['wordDocument'].body.sect.tbl.tr[21].tc[1].p[4].r[1].t.__text = year;
    jsonObj['wordDocument'].body.sect.tbl.tr[21].tc[1].p[4].r[3].t.__text = month;
    jsonObj['wordDocument'].body.sect.tbl.tr[21].tc[1].p[4].r[5].t.__text = day;
}

//下載置換的xml檔案

let btn = document.getElementById("download");
btn.addEventListener("click", function () {
    console.log("downlod_xml");
    ReplaceRegisterXML(Register);
    ReplaceDocumentXML(Document);
    ReplaceOfficeXML(Office);
    ReplaceApplicantXML(Applicant,1);
    ReplaceApplicantXML(Co_practitioner);
    tranDate();
    let new_xml = x2js.js2xml(jsonObj);//轉換為xml檔案
    saveXMLFile(fileName, new_xml);
})