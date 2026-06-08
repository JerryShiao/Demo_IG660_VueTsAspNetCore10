let checked = '■';
let unchecked = '□';
let form1 = document.getElementById('form1');
let form3 = document.getElementById('form3');
let form4 = document.getElementById('form4');
let form5 = document.getElementById('form5');

//let track = document.getElementById('form5');
//track.addEventListener('click', function () {
//    //ReplaceApplicant(track, 1);
//    //ReplaceApplicant(track);
//    //ReplacePerson(tablelist);
//    ReplaceDocument(form5);
    
//})

let Data = {
    //申請事由
    apply_confirm: '□',//■申請許可
    apply_change_confirm: '□',//■申請變更原許可
    change_name: '□',//■名稱
    change_person: '□',//■負責人
    change_item: '□',//■營業項目
    apply_reconfirm: '□',//■重新申請許可
    year_confirm: '    ',
    month_confirm: '    ',
    day_confirm: '    ',
    word_confirm: '    ',
    num_confirm: '    ',
    before_change: '                ',
    after_change: '                ',
    Original_licensing_authority: '   ',
    year_confirm1: '    ',
    month_confirm1: '    ',
    day_confirm1: '    ',
    word_confirm1: '    ',
    num_confirm1: '    ',

    //租賃住宅服務業
    rental_residence_name: '        ',
    //營業項目：□租賃住宅代管業□租賃住宅包租業
    rental_residence_escrow: '□',//■租賃住宅代管業
    rental_residence_charter: '□',//■租賃住宅包租業
    rental_residence_addr: '            ',
    rental_residence_tel: '          ',
    rental_residence_fax_checked:'□',//■傳真
    rental_residence_fax: '          ',
    rental_residence_email_checked: '□',//■電子郵件信箱
    rental_residence_email: '            ',
    Uniform_numbers_checked: '□',//是否已辦理公司登記：■是
    Uniform_numbers_unchecked: '□',//是否已辦理公司登記：■否
    Uniform_numbers: '          ',

    //申請人(代表公司之負責人)
    applicant_name: '        ',
    applicant_email: '        ',
    applicant_office_tel: '        ',
    applicant_home_tel: '        ',
    applicant_phone: '        ',
    applicant_addr: '               ',
    applicant_addr1: '              ',

    //代理人
    agent_name: '        ',
    agent_email: '        ',
    agent_office_tel: '        ',
    agent_home_tel: '        ',
    agent_phone: '        ',
    agent_addr: '               ',

    //附繳文件
    License_application_quantity_checked: '□',//■租賃住宅服務業經營許可申請書
    License_application_quantity: '    ',//租賃住宅服務業經營許可申請書份數
    personID_quantity_checked: '□',//■負責人身分證明文件影本
    personID_quantity: '    ',//負責人身分證明文件影本份數
    office_name_quantity_checked: '□',//■公司名稱及所營事業登記預查證明文件影本
    office_name_quantity: '    ',//公司名稱及所營事業登記預查證明文件影本份數
    office_register_quantity_checked: '□',//■公司登記證明文件影本
    office_register_quantity: '    ',//公司登記證明文件影本份數
    agentID_quantity_checked: '□',//■代理人身分證明文件影本
    agentID_quantity: '    ',//代理人身分證明文件影本份數
    Original_quantity_checked: '□',//■原許可文件
    Original_quantity: '    ',//原許可文件份數
    other_checked: '□',//■其他
    other: '               ',//其他
};


////租賃住宅服務業負責人名冊
let person = {};
for (let i = 0; i < 8; i++) {
    person[i] = {
        'charge': 'person' + (i + 1) + '_charge',
        'name': 'person' + (i + 1) + '_name',
        'year': 'person' + (i + 1) + '_year',
        'month': 'person' + (i + 1) + '_month',
        'day': 'person' + (i + 1) + '_day',
        'ID': 'person' + (i + 1) + '_ID',
    };

    Data[person[i].charge] = "";
    Data[person[i].name] = "";
    Data[person[i].year] = "";
    Data[person[i].month] = "    ";
    Data[person[i].day] = "    ";
    Data[person[i].ID] = "";


}

//data.agentID_quantity_checked = checked;

//申請事由內容置換
function ReplaceApplyTitle(data) {

    switch (switchValue) {
        case "申請許可":
            Data.apply_confirm = checked;
            ReplaceNullDocx('申請許可');
            break;
        case "申請變更許可":
            Data.apply_change_confirm = checked;
            
            Data.year_confirm = data.year.value;
            data.month.value < 10 ? Data.month_confirm = '0' + data.month.value : Data.month_confirm = data.month.value;
            data.day.value < 10 ? Data.day_confirm = '0' + data.day.value : Data.day_confirm = data.day.value;
            Data.word_confirm = data.word.value;
            Data.num_confirm = data.num.value;

            switch (data.changeItem.value) {
                case '名稱':
                    Data.change_name = checked;
                    break;
                case '負責人':
                    Data.change_person = checked;
                    break;
                case '營業項目':
                    Data.change_item = checked;
                    break;
                default:
                    break;
            }
            Data.before_change = data.beforeChange.value;
            Data.after_change = data.afterChange.value;
            ReplaceNullDocx('申請變更許可');
            break;
        case "重新申請許可(遷出原許可機關管轄區域者適用)":
            Data.apply_reconfirm = checked;

            Data.Original_licensing_authority = data.OriginalLicensingAuthority.value;
            Data.year_confirm1 = data.year1.value;
            data.month1.value < 10 ? Data.month_confirm1 = '0' + data.month1.value : Data.month_confirm1 = data.month1.value;
            data.day1.value < 10 ? Data.day_confirm1 = '0' + data.day1.value : Data.day_confirm1 = data.day1.value;           
            Data.word_confirm1 = data.word1.value;
            Data.num_confirm1 = data.num1.value;

            ReplaceNullDocx('重新申請許可');
            break;
        default:
            ReplaceNullDocx();            
            break;
    }
   
}
//預設申請事由內容
function ReplaceNullDocx(data) {
    switch (data) {
        case "申請許可":
            Data.apply_change_confirm = unchecked;
            Data.apply_reconfirm = unchecked;

            Data.year_confirm = '    ';
            Data.month_confirm = '    ';
            Data.day_confirm = '    ';
            Data.word_confirm = '    ';
            Data.num_confirm = '    ';
            Data.before_change = '                ';
            Data.after_change = '                ';
            Data.Original_licensing_authority = '   ';
            Data.year_confirm1 = '    ';
            Data.month_confirm1 = '    ';
            Data.day_confirm1 = '    ';
            Data.word_confirm1 = '    ';
            Data.num_confirm1 = '    ';
            break;
        case "申請變更許可":
            Data.apply_confirm = unchecked;
            Data.apply_reconfirm = unchecked;

            Data.Original_licensing_authority = '   ';
            Data.year_confirm1 = '    ';
            Data.month_confirm1 = '    ';
            Data.day_confirm1 = '    ';
            Data.word_confirm1 = '    ';
            Data.num_confirm1 = '    ';
            break;
        case "重新申請許可":
            Data.apply_confirm = unchecked;
            Data.apply_change_confirm = unchecked;

            Data.year_confirm = '    ';
            Data.month_confirm = '    ';
            Data.day_confirm = '    ';
            Data.word_confirm = '    ';
            Data.num_confirm = '    ';
            Data.before_change = '                ';
            Data.after_change = '                ';
            break;
        default:
            Data.apply_confirm = unchecked;
            Data.apply_change_confirm = unchecked;
            Data.apply_reconfirm = unchecked;

            Data.year_confirm = '    ';
            Data.month_confirm = '    ';
            Data.day_confirm = '    ';
            Data.word_confirm = '    ';
            Data.num_confirm = '    ';
            Data.before_change = '                ';
            Data.after_change = '                ';
            Data.Original_licensing_authority = '   ';
            Data.year_confirm1 = '    ';
            Data.month_confirm1 = '    ';
            Data.day_confirm1 = '    ';
            Data.word_confirm1 = '    ';
            Data.num_confirm1 = '    ';
            break;
    }
}
//租賃住宅服務業內容置換
function ReplaceRentalResidence(data) {
    data.residenceName.value ? Data.rental_residence_name = data.residenceName.value : Data.rental_residence_name = '        ';
    data.residenceAddr.value ? Data.rental_residence_addr = data.residenceAddr.value : Data.rental_residence_addr = '        ';
    data.residenceTel.value ? Data.rental_residence_tel = data.residenceTel.value : Data.rental_residence_tel = '        ';

    //傳真
    if (data.residenceFax.value) {
        Data.rental_residence_fax = data.residenceFax.value;
        Data.rental_residence_fax_checked = checked;
    } else {
        Data.rental_residence_fax = '        ';
        Data.rental_residence_fax_checked = unchecked;
    }

    //Eemail
    if (data.residenceEmail.value) {
        Data.rental_residence_email = data.residenceEmail.value;
        Data.rental_residence_email_checked = checked;
    } else {
        Data.rental_residence_email = '        ';
        Data.rental_residence_email_checked = unchecked;
    }

    //公司統一編號
    switch (data.register.value) {
        case '1':
            Data.Uniform_numbers = data.companynumbers.value;
            Data.Uniform_numbers_checked = checked;
            Data.Uniform_numbers_unchecked = unchecked;
            break;
        case '0':
            Data.Uniform_numbers = '        ';
            Data.Uniform_numbers_checked = unchecked;
            Data.Uniform_numbers_unchecked = checked;
            break;
        default:
            Data.Uniform_numbers = '        ';
            Data.Uniform_numbers_checked = unchecked;
            Data.Uniform_numbers_unchecked = unchecked;
            break;
    }
    

    switch (data.comtype.value) {
        case '租賃住宅代管業':
            Data.rental_residence_escrow = checked;
            Data.rental_residence_charter = unchecked;
            break;
        case '租賃住宅包租業':
            Data.rental_residence_charter = checked;
            Data.rental_residence_escrow = unchecked;
            break;
        default:
            Data.rental_residence_charter = unchecked;
            Data.rental_residence_escrow = unchecked;
            break;
    }
}

//租賃住宅服務業負責人名冊內容置換
function ReplacePerson(data) {
    //console.log(data);
    //console.log(nameNum);
    //console.log(data.tb1.querySelectorAll('input')[0].value);
    for (let i = 0; i < data.tb1.querySelectorAll('input').length; i++) {

        //console.log(Data[person[i].charge]);
        //console.log(data.tb3.querySelectorAll('input')[i].value);
        let year, month, day;
        if (data.tb3.querySelectorAll('input')[i].value) {
            year = data.tb3.querySelectorAll('input')[i].value.substring(0, 4);
            month = data.tb3.querySelectorAll('input')[i].value.substring(5, 7);
            day = data.tb3.querySelectorAll('input')[i].value.substring(8, 10);
        } else {
            year = "";
            month = "    ";
            day = "    ";
        }
        
        //console.log(year);
        //console.log(month);
        //console.log(day);
        Data[person[i].charge] = data.tb1.querySelectorAll('input')[i].value;
        Data[person[i].name] = data.tb2.querySelectorAll('input')[i].value;
        Data[person[i].year] = year;
        Data[person[i].month] = month;
        Data[person[i].day] = day;
        Data[person[i].ID] = data.tb4.querySelectorAll('input')[i].value;
    }
}

//申請人與代理人內容置換
function ReplaceApplicant(data,checked) {
    if (checked == 1) {
        //申請人資料-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //console.log(data.applicantName.value);
        
        data.applicantName.value ? Data.applicant_name = data.applicantName.value:Data.applicant_name = '        ';
        data.applicantEmail.value ? Data.applicant_email = data.applicantEmail.value:Data.applicant_email = '        ';
        data.applicantOfficeTel.value ? Data.applicant_office_tel = data.applicantOfficeTel.value:Data.applicant_office_tel = '        ';
        data.applicantHomeTel.value ? Data.applicant_home_tel = data.applicantHomeTel.value:Data.applicant_home_tel = '        ';
        data.applicantPhone.value ? Data.applicant_phone = data.applicantPhone.value:Data.applicant_phone = '        ';
        data.applicantAddr.value ? Data.applicant_addr = data.applicantAddr.value:Data.applicant_addr = '               ';
        data.applicantAddr1.value ? Data.applicant_addr1 = data.applicantAddr1.value : Data.applicant_addr1 = '              ';

    } else {
        //共同執業人資料-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //console.log(data.agentName.value);
        
        data.agentName.value ? Data.agent_name = data.agentName.value: Data.agent_name = '        ';
        data.agentEmail.value ? Data.agent_email = data.agentEmail.value: Data.agent_email = '        ';
        data.agentOfficeTel.value ? Data.agent_office_tel = data.agentOfficeTel.value: Data.agent_office_tel = '        ';
        data.agentHomeTel.value ? Data.agent_home_tel = data.agentHomeTel.value : Data.agent_home_tel = '        ';
        data.agentPhone.value ? Data.agent_phone = data.agentPhone.value: Data.agent_phone = '        ';
        data.agentAddr.value ? Data.agent_addr = data.agentAddr.value : Data.agent_addr = '               ';
    }
}

//附繳文件內容置換
function ReplaceDocument(data) {

    for (let i = 0; i < data.document.length; i++) {

        if (data.document[i].checked) {

            switch (data.document[i].value) {
                case 'document_A':
                    console.log("■租賃住宅服務業經營許可申請書");
                    Data.License_application_quantity_checked = checked;
                    Data.License_application_quantity = document.getElementById('document_A').value ? ' ' + document.getElementById('document_A').value + ' ' :'    ';
                    break;
                case 'document_B':
                    console.log("■負責人身分證明文件影本");
                    Data.personID_quantity_checked = checked;
                    Data.personID_quantity = document.getElementById('document_B').value ? ' ' + document.getElementById('document_B').value + ' ' : '    ';;//預設1份
                    break;
                case 'document_C':
                    console.log("■公司名稱及所營事業登記預查證明文件影本");
                    Data.office_name_quantity_checked = checked;
                    Data.office_name_quantity = document.getElementById('document_C').value ? ' ' + document.getElementById('document_C').value + ' ' : '    ';;//預設1份
                    break;
                case 'document_D':
                    console.log("■公司登記證明文件影本");
                    Data.office_register_quantity_checked = checked;
                    Data.office_register_quantity = document.getElementById('document_D').value ? ' ' + document.getElementById('document_D').value + ' ' : '    ';;//預設1份
                    break;
                case 'document_E':
                    console.log("■代理人身分證明文件影本");
                    Data.agentID_quantity_checked = checked;
                    Data.agentID_quantity = document.getElementById('document_E').value ? ' ' + document.getElementById('document_E').value + ' ' : '    ';;//預設1份
                    break;
                case 'document_F':
                    console.log("■原許可文件");
                    Data.Original_quantity_checked = checked;
                    Data.Original_quantity = document.getElementById('document_F').value ? ' ' + document.getElementById('document_F').value + ' ' : '    ';;//預設1份
                    break;
                case 'document_G':
                    console.log("■其他");
                    Data.other_checked = checked;
                    
                    break;
                default:
                    console.log("目前無選項");
                    break;

            }

        } else {

            switch (data.document[i].value) {
                case 'document_A':
                    console.log("□租賃住宅服務業經營許可申請書");
                    Data.License_application_quantity_checked = unchecked;
                    Data.License_application_quantity = '    ';//預設1份
                    break;
                case 'document_B':
                    console.log("□負責人身分證明文件影本");
                    Data.personID_quantity_checked = unchecked;
                    Data.personID_quantity = '    ';//預設1份
                    break;
                case 'document_C':
                    console.log("□公司名稱及所營事業登記預查證明文件影本");
                    Data.office_name_quantity_checked = unchecked;
                    Data.office_name_quantity = '    ';//預設1份
                    break;
                case 'document_D':
                    console.log("□公司登記證明文件影本");
                    Data.office_register_quantity_checked = unchecked;
                    Data.office_register_quantity = '    ';//預設1份
                    break;
                case 'document_E':
                    console.log("□代理人身分證明文件影本");
                    Data.agentID_quantity_checked = unchecked;
                    Data.agentID_quantity = '    ';//預設1份
                    break;
                case 'document_F':
                    console.log("□原許可文件");
                    Data.Original_quantity_checked = unchecked;
                    Data.Original_quantity = '    ';//預設1份
                    break;
                case 'document_G':
                    console.log("□其他");
                    Data.other_checked = unchecked;

                    break;
                default:
                    console.log("目前無選項");
                    break;

            }
        }

    }
}

//下載申請書
let btn = document.getElementById("download");
btn.addEventListener("click", function () {
    //console.log("123");

    //console.log(Data);
    //表單內容置換
    ReplaceApplyTitle(form1);
    ReplaceRentalResidence(form2);
    ReplacePerson(tablelist);
    ReplaceApplicant(form3, 1);
    ReplaceApplicant(form4);
    ReplaceDocument(form5);

    //設置數據
    doc.setData(Data);
    doc.render();


    //console.log(person[0].charge);
    //doc.render();
    // 產生一個代表docxtemplater物件的zip檔（不是一個真實的文件，而是在記憶體中的表示）
    docx = doc.getZip().generate({
        type: "blob",
        mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    // 將目標文件物件儲存為目標類型的文件，並命名
    saveAs(docx, '租賃住宅服務業經營許可申請書');

})
