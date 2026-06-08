let zip;
let doc;
loadDocx('不動產經紀業備查申請書及應附繳文件一覽表(台南地政處).docx');
let docx;

function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

function loadDocx(path) {
    loadFile(
        path,
        function (error, content) {
            if (error) {
                throw error;
            }
            zip = new PizZip(content);
            doc = new window.docxtemplater(zip);
            //.setOptions({
            //    nullGetter: function () {
            //        return '';
            //    }
            //})
            //let text = doc.getFullText();
            //console.log(doc);
            //alert("Text is " + text);


        }
    );


}

function saveDocx() {

    // 產生一個代表docxtemplater物件的zip檔（不是一個真實的文件，而是在記憶體中的表示）
    docx = doc.getZip().generate({
        type: "blob",
        mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    // 將目標文件物件儲存為目標類型的文件，並命名
    saveAs(docx, '不動產經紀業備查申請書及應附繳文件一覽表(臺南地政處)');
}