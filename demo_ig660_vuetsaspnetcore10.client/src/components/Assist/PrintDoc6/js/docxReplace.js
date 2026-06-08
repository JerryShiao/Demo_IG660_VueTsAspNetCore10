let checked = '■';
let unchecked = '□';
let form1 = document.getElementById('form01');
let form2 = document.getElementById('form02');
let form3 = document.getElementById('form03');
let form4 = document.getElementById('form04');
let form5 = document.getElementById('form05');


let track = document.getElementById('form04');
track.addEventListener('change', function () {
    //console.log('性別', track.gender.value);
    //ReplaceAcceptingAuthority(form5);
    ReplaceDocument(form4);
    //console.log('名稱', track.name.value);
})

//新增兄弟元素
//function insertAfter(newNode, curNode) {
//    curNode.parentNode.insertBefore(newNode, curNode.nextElementSibling);
//}
//新增同戶籍地址監聽器
//let address = document.querySelector('#address');
//address.addEventListener('change', () => {
//    let same = document.querySelector('input[name="Address"]');
//    //console.log('點擊成功', same);
//    if (same.checked) {
//        let addr = document.querySelector('#applicant_addr');
//        let addr1 = document.querySelector('#applicant_addr1');
//        addr1.value = addr.value;
//        //console.log('相同', addr);
//        addr1.addEventListener('change', () => {
//            same.checked = false;
//            //console.log('不相同', addr1);
//        })
//    }
//});

const defaltData = {

    //受理機關
    '受理機關': '　　　　',
    '受理公會': '　　　　　',

    //(地政士)申請人
    '地政士姓名':'',
    '地政士開業執照字號':'',
    '地政士通訊地址': '',
    '地政士電話': '', 

    //地政士登記助理員
    //助理員1
    '助理員姓名':'',
    '助理員出生日期':'　年 月 日',
    '助理員男':unchecked,
    '助理員女':unchecked,
    '台內地登字':'    ',
    '號': '          ',
    '助理員學歷':'',
    '助理員經歷':'',
    '助理員住址':'',
    '僱傭':unchecked,
    '終止僱傭':unchecked,
    '姓名變更':unchecked,
    '出生日期變更':unchecked,
    '國民身分證統一編號變更':unchecked,
    '其他變更':unchecked,
    '其他變更內容': '',
    //助理員2
    '助理員姓名1': '',
    '助理員出生日期1': '　年 月 日',
    '助理員男1': unchecked,
    '助理員女1': unchecked,
    '台內地登字1': '    ',
    '號1': '          ',
    '助理員學歷1': '',
    '助理員經歷1': '',
    '助理員住址1': '',
    '僱傭1': unchecked,
    '終止僱傭1': unchecked,
    '姓名變更1': unchecked,
    '出生日期變更1': unchecked,
    '國民身分證統一編號變更1': unchecked,
    '其他變更1': unchecked,
    '其他變更內容1': '',


    //附繳文件  
    document1_content:'　　　',
    document2_content:'　　　',
    document3_content:'　　　　',
    document4_content:'　　　　',
    document5_content:'　　　　　',
    document6_content:'',
   
    

    //聲明事項
    application_year:'　　　',//申請民國年
    application_month:'　　　',//申請民國月
    application_day:'　　　',//申請民國日
};

for (let i = 0; i < 10; i++) {
    //(地政士)申請人身分證字號
    let ID0 = 'ID0_' + i;
    defaltData[`${ID0}`] = '';
    let ID1 = 'ID1_' + i;
    defaltData[`${ID1}`] = '';
    let ID2 = 'ID2_' + i;
    defaltData[`${ID2}`] = '';    
}
for (let i = 1; i < 7; i++) {
    let document = 'document' + i;
    defaltData[`${document}`] = unchecked;
}
let Data = Object.create(defaltData);
//console.log('Data', Data);

//受理機關內容更換
function ReplaceAcceptingAuthority(data) {
    
    let mechanism = data.受理機關.value;
    let guild = data.受理公會.value;

    //console.log('受理機關', mechanism);
    //console.log('受理公會', guild);

    Data.受理機關 = mechanism ? mechanism : defaltData.受理機關;
    Data.受理公會 = guild ? guild : defaltData.受理公會;
}

//(地政士)申請人內容更換
function ReplaceLandlord(data) {
    let Landlordname = data.地政士姓名.value;
    let LandlordID = data.國民身分證統一編號.value;
    let LandlordNum = data.地政士開業執照字號.value;
    let LandlordTel = data.地政士電話.value;
    let LandlordAddr = data.地政士通訊地址.value;

    //console.log('地政士姓名', Landlordname);
    //console.log('國民身分證統一編號', LandlordID);
    //console.log('地政士開業執照字號', LandlordNum);
    //console.log('地政士電話', LandlordTel);
    //console.log('地政士通訊地址', LandlordAddr);

    Data.地政士姓名 = Landlordname ? Landlordname : defaltData.地政士姓名;
    ReplaceID('ID0_', LandlordID);
    Data.地政士開業執照字號 = LandlordNum ? LandlordNum : defaltData.地政士開業執照字號;
    Data.地政士電話 = LandlordTel ? LandlordTel : defaltData.地政士電話;
    Data.地政士通訊地址 = LandlordAddr ? LandlordAddr : defaltData.地政士通訊地址;
}

//身分證轉換
function ReplaceID(IDstr,data) {
    let newID = [...data];
    for (let i = 0; i < newID.length; i++) {
        let newStr = IDstr + i;
        Data[`${newStr}`] = newID[i] ? newID[i] : defaltData[`${newStr}`];
    }
}

//申請事由
function ReplaceApplyTitle(switchData,formData,type) {
   
    switch (switchData) {
        case "僱傭":
            
            if (type) {
                Data.僱傭1 = checked;

                //還原預設值
                Data.終止僱傭1 = unchecked;
                Data.姓名變更1 = unchecked;
                Data.出生日期變更1 = unchecked;
                Data.國民身分證統一編號變更1 = unchecked;
                Data.其他變更1 = unchecked;
                Data.其他變更內容1 = '';
            } else {
                Data.僱傭 = checked;

                //還原預設值
                Data.終止僱傭 = unchecked;
                Data.姓名變更 = unchecked;
                Data.出生日期變更 = unchecked;
                Data.國民身分證統一編號變更 = unchecked;
                Data.其他變更 = unchecked;
                Data.其他變更內容 = '';
            }           
            break;
        case "終止僱傭":
            if (type) {
                Data.終止僱傭1 = checked;

                //還原預設值
                Data.僱傭1 = unchecked;
                Data.姓名變更1 = unchecked;
                Data.出生日期變更1 = unchecked;
                Data.國民身分證統一編號變更1 = unchecked;
                Data.其他變更1 = unchecked;
                Data.其他變更內容1 = '';
            } else {
                Data.終止僱傭 = checked;

                //還原預設值
                Data.僱傭 = unchecked;
                Data.姓名變更 = unchecked;
                Data.出生日期變更 = unchecked;
                Data.國民身分證統一編號變更 = unchecked;
                Data.其他變更 = unchecked;
                Data.其他變更內容 = '';
            }
            break;
        case "姓名變更":
            if (type) {
                Data.姓名變更1 = checked;

                //還原預設值
                Data.僱傭1 = unchecked;
                Data.終止僱傭1 = unchecked;
                Data.出生日期變更1 = unchecked;
                Data.國民身分證統一編號變更1 = unchecked;
                Data.其他變更1 = unchecked;
                Data.其他變更內容1 = '';
            } else {
                Data.姓名變更 = checked;

                //還原預設值
                Data.僱傭 = unchecked;
                Data.終止僱傭 = unchecked;
                Data.出生日期變更 = unchecked;
                Data.國民身分證統一編號變更 = unchecked;
                Data.其他變更 = unchecked;
                Data.其他變更內容 = '';
            }
            break;
        case "出生日期變更":
            if (type) {
                Data.出生日期變更1 = checked;

                //還原預設值
                Data.僱傭1 = unchecked;
                Data.終止僱傭1 = unchecked;
                Data.姓名變更1 = unchecked;
                Data.國民身分證統一編號變更1 = unchecked;
                Data.其他變更1 = unchecked;
                Data.其他變更內容1 = '';
            } else {
                Data.出生日期變更 = checked;

                //還原預設值
                Data.僱傭 = unchecked;
                Data.終止僱傭 = unchecked;
                Data.姓名變更 = unchecked;
                Data.國民身分證統一編號變更 = unchecked;
                Data.其他變更 = unchecked;
                Data.其他變更內容 = '';
            }
            break;
        case "國民身分證統一編號變更":
            if (type) {
                Data.國民身分證統一編號變更1 = checked;

                //還原預設值
                Data.僱傭1 = unchecked;
                Data.終止僱傭1 = unchecked;
                Data.姓名變更1 = unchecked;
                Data.出生日期變更1 = unchecked;
                Data.其他變更1 = unchecked;
                Data.其他變更內容1 = '';
            } else {
                Data.國民身分證統一編號變更 = checked;

                //還原預設值
                Data.僱傭 = unchecked;
                Data.終止僱傭 = unchecked;
                Data.姓名變更 = unchecked;
                Data.出生日期變更 = unchecked;
                Data.其他變更 = unchecked;
                Data.其他變更內容 = '';
            }
            break;
        case "其他":
            if (type) {
                Data.其他變更1 = checked;
                Data.其他變更內容1 = formData.otherReason.value ? formData.otherReason.value : defaltData.其他變更內容1;

                //還原預設值
                Data.僱傭1 = unchecked;
                Data.終止僱傭1 = unchecked;
                Data.姓名變更1 = unchecked;
                Data.出生日期變更1 = unchecked;
                Data.國民身分證統一編號變更1 = unchecked;
            } else {
                Data.其他變更 = checked;
                Data.其他變更內容 = formData.otherReason.value ? formData.otherReason.value : defaltData.其他變更內容;

                //還原預設值
                Data.僱傭 = unchecked;
                Data.終止僱傭 = unchecked;
                Data.姓名變更 = unchecked;
                Data.出生日期變更 = unchecked;
                Data.國民身分證統一編號變更 = unchecked;
            }
            break;
        default:
            
            if (type) {
                //還原預設值
                Data.僱傭1 = unchecked;
                Data.終止僱傭1 = unchecked;
                Data.姓名變更1 = unchecked;
                Data.出生日期變更1 = unchecked;
                Data.國民身分證統一編號變更1 = unchecked;
                Data.其他變更1 = unchecked;
                Data.其他變更內容1 = '';
            } else {

                //還原預設值
                Data.僱傭 = unchecked;
                Data.終止僱傭 = unchecked;
                Data.姓名變更 = unchecked;
                Data.出生日期變更 = unchecked;
                Data.國民身分證統一編號變更 = unchecked;
                Data.其他變更 = unchecked;
                Data.其他變更內容 = '';
            }
            break;
    }          
}

//申請人內容置換
function ReplaceApplicant(data,type) {
    
    let name;//姓名
    let gender;//性別
    let date;//出生日期
    let ID;//國民身分證統一編號
    let word;//台內地登字
    let num;//號
    let addr;//住址
    let EQ;//學歷(Educational qualifications)
    let experience;//經歷
    let RFA;//申請事由(Reason for application)

    name = data.姓名.value;
    gender = data.gender.value;
    date = data.出生日期.value;
    ID = data.國民身分證統一編號.value;
    word = data.台內地登字.value;
    num = data.號.value;
    addr = data.住址.value;
    EQ = data.學歷.value;
    experience = data.經歷.value;
    RFA = data.申請事由.value;  
       

    if (type) {        
        //助理員2
        Data.助理員姓名1 = name ? name : defaltData.助理員姓名1;

        date = date.replaceAll('-', '');
        let year = parseInt(date.substr(0, 4)) - 1911;
        let month = date.substr(4, 2);
        let day = date.substr(6, 2);
        let birthdate = year + '年' + month + '月' + day + '日';
        Data.助理員出生日期1 = date ? birthdate : defaltData.助理員出生日期1;

        ReplaceID('ID2_', ID);
        Data.台內地登字1 = word ? word : defaltData.台內地登字1;
        Data.號1 = num ? num : defaltData.號1;
        Data.助理員學歷1 = EQ ? EQ : defaltData.助理員學歷1;
        Data.助理員經歷1 = experience ? experience : defaltData.助理員經歷1;
        Data.助理員住址1 = addr ? addr : defaltData.助理員住址1;

        ReplaceApplyTitle(RFA, data,type);
        switch (gender) {
            case '男':
                Data.助理員男1 = checked;
                Data.助理員女1 = unchecked;
                break;
            case '女':
                Data.助理員女1 = checked;
                Data.助理員男1 = unchecked;
                break;
            default:
                Data.助理員男1 = unchecked;
                Data.助理員女1 = unchecked;
                break;
        }

    } else {
        //助理員1
        Data.助理員姓名 = name ? name : defaltData.助理員姓名;

        date = date.replaceAll('-', '');
        let year = parseInt(date.substr(0, 4)) - 1911;
        let month = date.substr(4, 2);
        let day = date.substr(6, 2);
        let birthdate = year + '年' + month + '月' + day + '日';
        Data.助理員出生日期 = date ? birthdate : defaltData.助理員出生日期;

        ReplaceID('ID1_', ID);
        Data.台內地登字 = word ? word : defaltData.台內地登字;
        Data.號 = num ? num : defaltData.號;
        Data.助理員學歷 = EQ ? EQ : defaltData.助理員學歷;
        Data.助理員經歷 = experience ? experience : defaltData.助理員經歷;
        Data.助理員住址 = addr ? addr : defaltData.助理員住址;
        
        //console.log('申請事由', RFA);
        ReplaceApplyTitle(RFA, data);
        switch (gender) {
            case '男':
                Data.助理員男 = checked;
                Data.助理員女 = unchecked;
                break;
            case '女':
                Data.助理員女 = checked;
                Data.助理員男 = unchecked;
                break;
            default:
                Data.助理員男 = unchecked;
                Data.助理員女 = unchecked;
                break;
        }
        
    }    

   
    
}

//附繳文件內容置換
function ReplaceDocument(data) {      
    let property = [];        

    for (let i = 0; i < data.document.length; i++) {
        property[i] = 'document' + (i + 1);
        //console.log('變數名稱', property[c]);
        let Doc = data.document[i].value;
        //console.log('附繳文件', Doc);        
        if (data.document[i].checked) {
            switch (Doc) {
                case property[i]:
                    let contentStr = property[i] + '_content';
                    let content = data[`${contentStr}`].value;
                    //console.log('content', content)
                    Data[`${property[i]}`] = Doc ? checked : unchecked;
                    Data[`${contentStr}`] = content ? content : defaltData[`${contentStr}`];
                    break;
                default:
                    break;
            }
        } else {
            switch (Doc) {
                case property[i]:
                    let contentStr = property[i] + '_content';                    
                    //console.log('content', content)
                    Data[`${property[i]}`] = Doc ? unchecked : checked;
                    Data[`${contentStr}`] = defaltData[`${contentStr}`];
                    break;
                default:
                    break;
            }
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
    ReplaceAcceptingAuthority(form5);
    ReplaceLandlord(form1);
    ReplaceApplicant(form2);
    ReplaceApplicant(form3, 1);
    ReplaceDocument(form4);
    tranDate();

    //設置數據
    doc.setData(Data);
    doc.render();


    saveDocx();

})
