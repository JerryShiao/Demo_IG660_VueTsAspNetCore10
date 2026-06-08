let xmlDoc = loadXML("LandlordForm.xml");//引入檔案位置
let x2js = new X2JS();//新建xml轉換json物件
let jsonObj = x2js.xml2js(xmlDoc);//轉換為json物件

//讀取xml檔案
function loadXML(path) {
    let xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", path, false);
    xmlhttp.send();

    let xmlDoc = xmlhttp.responseXML;
    let str = new XMLSerializer().serializeToString(xmlDoc);
    return str;
}

//下載xml檔案
function saveXMLFile(_fileName, _text) {
    var textFileAsBlob = new Blob([_text], { type: 'text/xml' });//application/xml

    var downloadLink = document.createElement("a");
    downloadLink.download = _fileName;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    } else {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();

    function destroyClickedElement(event) {
        document.body.removeChild(event.target);
    }
}