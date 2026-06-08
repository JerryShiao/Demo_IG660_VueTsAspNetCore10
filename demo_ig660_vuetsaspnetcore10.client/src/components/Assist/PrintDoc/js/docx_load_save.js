let zip;
let doc;
loadDocx('Applicationform_rental_housing_services.docx');
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