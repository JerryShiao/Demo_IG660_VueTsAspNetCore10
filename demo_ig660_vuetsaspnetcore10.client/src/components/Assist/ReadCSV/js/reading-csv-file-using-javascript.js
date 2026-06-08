var data;
function buildTable(results) {
    results.data.map(x => x[0] = escapeHTML(x[0]))
    var markup = "<table class='table'>";
    data = results.data;
    data = JSON.parse(JSON.stringify(data).replace(/script/g, ' '))
    for (i = 0; i < data.length; i++) {
        markup += "<tr>";
        var row = data[i];
        var cells = row.join(",").split(",");
        for (j = 0; j < cells.length; j++) {
            markup += "<td>";
            markup += cells[j];
            markup += "</th>";
        }
        markup += "</tr>";
    }
    markup += "</table>";
    $("#app").html(markup);
    document.getElementById('connectnote').style.display = 'block';
}

function buildJsonTable(results) {
    results.data.map(x => x[0] = escapeHTML(x[0]))
    var markup = "<table class='table'>";
    data = results.data;
    data = JSON.parse(JSON.stringify(data).replace(/script/g, ' '))
    for (i = 0; i < data.length; i++) {
        markup += "<tr>";
        var row = data[i];
        var cells = row.join(",").split(",");
        for (j = 0; j < cells.length; j++) {
            markup += "<td>";
            markup += cells[j];
            markup += "</td>";
        }
        markup += "</tr>";
    }
    markup += "</table>";
    $("#app").html(markup);
    $('#connectnote').attr("style", "display: block");
    $('#ToCheckJsonType').attr("style", "display: block");
    $('#connectmap').attr("style", "display: block");
    $('#JsonType')[0].selectedIndex = 0;
    $("#propName").html('');
}

function escapeHTML(str) {
    if (typeof str == 'string') {
        return str.replace(/[&<>"'\/]/g, function (char) {
            switch (char) {
                case '&': return '&amp;';
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '"': return '&quot;';
                case '\\': return '&#39;';
                case '/': return '&#x2F;';
                default: return char;
            }
        });
    }
    else { return str }
}

function SentToMap() {
    parent.SentToMap(data);
}
function SentToMap2() {
    parent.SentToMap2(data, $('#coorid').val());
}
function SentToMapCNT() {
    parent.SentToMapCNT(data);
}
function SentToMapCOA() {
    parent.SentToMapCOA(data);
}
function SentToMapB21() {
    parent.SentToMapB21(data);
}

$(document).ready(function () {
    $('#submit').on("click", function (e) {
        e.preventDefault();
        if (!$('#files')[0].files.length) {
            alert("請選擇至少一個檔案進行讀取");
        }
        var fname = '';
        fname = $('#files')[0].files["0"].name;
        if (fname.includes('.kml')) {
            $('#files').parse({
                config: {
                    delimiter: "auto",
                    complete: SentToMap3
                },
                before: function (file, inputElem) {
                },
                error: function (err, file) {
                }
            });
        }
        else if (fname.includes('.json')) {
            $('#files').parse({
                config: {
                    delimiter: "auto",
                    complete: buildJsonTable
                },
                before: function (file, inputElem) {
                },
                error: function (err, file) {
                },
                complete: function () {
                }
            });
        }
        else {
            $('#files').parse({
                config: {
                    delimiter: "auto",
                    complete: buildTable,
                },
                before: function (file, inputElem) {
                },
                error: function (err, file) {
                },
                complete: function () {
                }
            });
        }
    });
});