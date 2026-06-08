let zip;
let doc;
//loadDocx('Applicationform_rental_housing_services.docx');
let docx;

function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

function loadDocx(path, size) {
    let sizeList = [400, 300];
    if (size) { sizeList = size; }
    var imageModule = new window.ImageModule({
        getImage: (tagValue) => {
            const base64 = tagValue.split(",")[1];
            const binary = atob(base64);
            const buf = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
                buf[i] = binary.charCodeAt(i);
            }
            return buf.buffer; 
        },
        getSize: () => sizeList,
        //getSize: () => [parent.MView.width, parent.MView.height], 
    });
    loadFile(
        path,
        function (error, content) {
            if (error) {
                throw error;
            }
            zip = new PizZip(content);
            //doc = new window.docxtemplater(zip);
            doc = new window.docxtemplater(zip, { modules: [imageModule] });//加入圖片的功能
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