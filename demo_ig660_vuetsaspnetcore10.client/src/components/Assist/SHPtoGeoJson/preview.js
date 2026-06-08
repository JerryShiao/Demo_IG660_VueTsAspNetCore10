var inputData = {},
    geoData = {},
    EPSGUser, url, encoding, EPSG, RType, url_name
EPSG4326 = proj4('EPSG:4326');
let separateCheck = true;//點線面分層顯示
function loadshp(config, returnData) {
    url = config.url;
    if (config.url_name) { url_name = config.url_name }
    encoding = typeof config.encoding != 'utf-8' ? config.encoding : 'utf-8';
    EPSG = typeof config.EPSG != 'undefined' ? config.EPSG : 4326;
    RType = config.RType;
    loadEPSG('https://epsg.io/' + EPSG + '.js', function () {
        if (EPSG == 3821)
            proj4.defs([
                ['EPSG:3821', '+proj=tmerc +ellps=GRS67 +towgs84=-752,-358,-179,-.0000011698,.0000018398,.0000009822,.00002329 +lat_0=0 +lon_0=121 +x_0=250000 +y_0=0 +k=0.9999 +units=m +no_defs']
            ]);
        EPSGUser = proj4('EPSG:' + EPSG);
        if (typeof url != 'string') {
            var reader = new FileReader();
            reader.onload = function (e) {
                var URL = window.URL || window.webkitURL || window.mozURL || window.msURL,
                    zip = new JSZip(e.target.result);
                let shpString = zip.file(/.shp$/i);
                let dbfString = zip.file(/.dbf$/i);
                let prjString = zip.file(/.prj$/i);
                if (prjString.length === 1) {
                    if (prjString) {
                        proj4.defs('EPSGUSER', zip.file(prjString[0].name).asText());
                        try {
                            EPSGUser = proj4('EPSGUSER');
                        } catch (e) {
                        }
                    }
                } else {
                    if (prjString) {
                        for (let i = 0; i < prjString.length; i++) {
                            proj4.defs('EPSGUSER', zip.file(prjString[i].name).asText());
                            try {
                                EPSGUser = proj4('EPSGUSER');
                            } catch (e) {
                            }
                        }
                    }
                }
                parent.console.log('shpString', shpString);
                if (shpString.length === 1) {
                    if (RType === "Normal") {
                        SHPParser.load(URL.createObjectURL(new Blob([zip.file(shpString[0].name).asArrayBuffer()])), shpLoader, returnData);
                        DBFParser.load(URL.createObjectURL(new Blob([zip.file(dbfString[0].name).asArrayBuffer()])), encoding, dbfLoader, returnData);
                    }
                    else {
                        SHPParser.load(URL.createObjectURL(new Blob([zip.file(shpString[0].name).asArrayBuffer()])), shpLoader2, returnData);
                        DBFParser.load(URL.createObjectURL(new Blob([zip.file(dbfString[0].name).asArrayBuffer()])), encoding, dbfLoader2, returnData);
                    }
                } else {
                    //點線面分層顯示----------------------------------------------
                    if (shpString.length > 1) {
                        parent.layer.confirm('是否要將點/線/面圖層分層顯示？', {
                            title: 'SHP檔案(點/線/面)圖層分層顯示',
                            icon: 0,
                            //closeBtn: 2,
                            zIndex: parent.layer.zIndex,
                            btn: ['是', '否']
                        },
                            //是按鈕
                            function (index) {
                                separateCheck = true;
                                show_shpString();
                                parent.layer.close(index);
                            },
                            //否按鈕
                            function (index) {
                                separateCheck = false;
                                show_shpString();
                                parent.layer.close(index);
                            });
                    }
                    function show_shpString() {
                        for (let i = 0; i < shpString.length; i++) {
                            inputData = {};
                            if (RType === "Normal") {
                                setTimeout(() => {
                                    SHPParser.load(URL.createObjectURL(new Blob([zip.file(shpString[i].name).asArrayBuffer()])), shpLoader, returnData);
                                }, 300);
                                DBFParser.load(URL.createObjectURL(new Blob([zip.file(dbfString[i].name).asArrayBuffer()])), encoding, dbfLoader, returnData);
                            }
                            else {
                                setTimeout(() => {
                                    SHPParser.load(URL.createObjectURL(new Blob([zip.file(shpString[i].name).asArrayBuffer()])), shpLoader2, returnData);
                                }, 300);
                                DBFParser.load(URL.createObjectURL(new Blob([zip.file(dbfString[i].name).asArrayBuffer()])), encoding, dbfLoader2, returnData);
                            }

                        }
                    }
                    //------------------------------------------------------------

                }
            }
            reader.readAsArrayBuffer(url);
        }
        else {
            JSZipUtils.getBinaryContent(url, function (err, data) {
                if (err) throw err;
                var URL = window.URL || window.webkitURL,
                    zip = new JSZip(data);
                let shpString = zip.file(/.shp$/i);
                let dbfString = zip.file(/.dbf$/i);
                let prjString = zip.file(/.prj$/i);
                if (prjString.length === 1) {
                    if (prjString) {
                        proj4.defs('EPSGUSER', zip.file(prjString[0].name).asText());
                        try {
                            EPSGUser = proj4('EPSGUSER');
                        } catch (e) {
                        }
                    }
                } else {
                    if (prjString) {
                        for (let i = 0; i < prjString.length; i++) {
                            proj4.defs('EPSGUSER', zip.file(prjString[i].name).asText());
                            try {
                                EPSGUser = proj4('EPSGUSER');
                            } catch (e) {
                            }
                        }

                    }
                }
                if (shpString.length === 1) {
                    if (RType === "Normal") {
                        setTimeout(() => {
                            SHPParser.load(URL.createObjectURL(new Blob([zip.file(shpString[0].name).asArrayBuffer()])), shpLoader, returnData);
                        }, 300);
                        DBFParser.load(URL.createObjectURL(new Blob([zip.file(dbfString[0].name).asArrayBuffer()])), encoding, dbfLoader, returnData);
                    }
                    else {
                        setTimeout(() => {
                            SHPParser.load(URL.createObjectURL(new Blob([zip.file(shpString[0].name).asArrayBuffer()])), shpLoader2, returnData);
                        }, 300);
                        DBFParser.load(URL.createObjectURL(new Blob([zip.file(dbfString[0].name).asArrayBuffer()])), encoding, dbfLoader2, returnData);
                    }
                } else {
                    if (shpString.length > 1) {
                        parent.layer.confirm('是否要將點/線/面圖層分層顯示？', {
                            title: 'SHP檔案(點/線/面)圖層分層顯示',
                            icon: 0,
                            //closeBtn: 2,
                            zIndex: parent.layer.zIndex,
                            btn: ['是', '否']
                        },
                            //是按鈕
                            function (index) {
                                separateCheck = true;
                                show_shpString();
                                parent.layer.close(index);
                            },
                            //否按鈕
                            function (index) {
                                separateCheck = false;
                                show_shpString();
                                parent.layer.close(index);
                            });
                    }
                    function show_shpString() {
                        for (let i = 0; i < shpString.length; i++) {
                            inputData = {};
                            if (RType === "Normal") {
                                setTimeout(() => {
                                    SHPParser.load(URL.createObjectURL(new Blob([zip.file(shpString[i].name).asArrayBuffer()])), shpLoader, returnData);
                                }, 300);
                                DBFParser.load(URL.createObjectURL(new Blob([zip.file(dbfString[i].name).asArrayBuffer()])), encoding, dbfLoader, returnData);
                            }
                            else {
                                setTimeout(() => {
                                    SHPParser.load(URL.createObjectURL(new Blob([zip.file(shpString[i].name).asArrayBuffer()])), shpLoader2, returnData);
                                }, 300);
                                DBFParser.load(URL.createObjectURL(new Blob([zip.file(dbfString[i].name).asArrayBuffer()])), encoding, dbfLoader2, returnData);
                            }

                        }
                    }
                }
            });
        }
    });
}

function loadEPSG(url, callback) {
    var script = document.createElement('script');
    script.src = url;
    script.onreadystatechange = callback;
    script.onload = callback;
    document.getElementsByTagName('head')[0].appendChild(script);
}

function TransCoord(x, y) {
    if (proj4)
        var p = proj4(EPSGUser, EPSG4326, [parseFloat(x), parseFloat(y)]);
    return { x: p[0], y: p[1] };
}

function shpLoader(data, returnData) {
    if (!separateCheck) {
        if (data.shapeType !== 5) return false;
    }
    inputData['shp'] = data;
    if (inputData['shp'] && inputData['dbf'])
        if (returnData) returnData(toGeojson(inputData));
}

function dbfLoader(data, returnData) {
    inputData['dbf'] = data;
    if (inputData['shp'] && inputData['dbf'])
        if (returnData) returnData(toGeojson(inputData));
}

function toGeojson(geojsonData) {
    parent.qLoading();
    var geojson = {},
        features = [],
        feature, geometry, points;
    var shpRecords = geojsonData.shp.records;
    var dbfRecords = geojsonData.dbf.records;
    geojson.type = "FeatureCollection";
    min = TransCoord(geojsonData.shp.minX, geojsonData.shp.minY);
    max = TransCoord(geojsonData.shp.maxX, geojsonData.shp.maxY);
    geojson.bbox = [
        min.x,
        min.y,
        max.x,
        max.y
    ];
    geojson.features = features;
    for (var i = 0; i < shpRecords.length; i++) {
        feature = {};
        feature.type = 'Feature';
        geometry = feature.geometry = {};
        properties = feature.properties = dbfRecords[i];

        // point : 1 , polyline : 3 , polygon : 5, multipoint : 8
        if (shpRecords[i].shape !== null) {
            switch (shpRecords[i].shape.type) {
                case 1:
                    geometry.type = "Point";
                    var reprj = TransCoord(shpRecords[i].shape.content.x, shpRecords[i].shape.content.y);
                    geometry.coordinates = [
                        reprj.x, reprj.y
                    ];
                    break;
                case 3:
                case 8:
                    geometry.type = (shpRecords[i].shape.type == 3 ? "LineString" : "MultiPoint");
                    geometry.coordinates = [];
                    for (var j = 0; j < shpRecords[i].shape.content.points.length; j += 2) {
                        var reprj = TransCoord(shpRecords[i].shape.content.points[j], shpRecords[i].shape.content.points[j + 1]);
                        geometry.coordinates.push([reprj.x, reprj.y]);
                    };
                    break;
                case 5:
                    geometry.type = "Polygon";
                    geometry.coordinates = [];
                    for (var pts = 0; pts < shpRecords[i].shape.content.parts.length; pts++) {
                        var partsIndex = shpRecords[i].shape.content.parts[pts],
                            part = [],
                            dataset;
                        for (var j = partsIndex * 2; j < (shpRecords[i].shape.content.parts[pts + 1] * 2 || shpRecords[i].shape.content.points.length); j += 2) {
                            var point = shpRecords[i].shape.content.points;
                            var reprj = TransCoord(point[j], point[j + 1]);
                            part.push([reprj.x, reprj.y]);
                        };
                        geometry.coordinates.push(part);

                    };
                    break;
                case 15:
                    geometry.type = "Polygon";
                    geometry.coordinates = [];
                    for (var pts = 0; pts < shpRecords[i].shape.content.parts.length; pts++) {
                        var partsIndex = shpRecords[i].shape.content.parts[pts],
                            part = [],
                            dataset;
                        for (var j = partsIndex * 2; j < (shpRecords[i].shape.content.parts[pts + 1] * 2 || shpRecords[i].shape.content.points.length); j += 2) {
                            var point = shpRecords[i].shape.content.points;
                            var reprj = TransCoord(point[j], point[j + 1]);
                            part.push([reprj.x, reprj.y]);
                        };
                        geometry.coordinates.push(part);

                    };
                    break;
                default:
            }
        }
        if ("coordinates" in feature.geometry) features.push(feature);
    };
    switch (inputData['shp'].shapeType) {
        case 1:
            url_name = url.name ? `[點]` + url.name.toString() : `[點]` + url_name;
            break;
        case 3:
            url_name = url.name ? `[線]` + url.name.toString() : `[線]` + url_name;
            break;
        case 5:
            url_name = url.name ? `[面]` + url.name.toString() : `[面]` + url_name;
            break;
        case 8:
            url_name = url.name ? `[multipoint]` + url.name.toString() : `[multipoint]` + url_name;
            break;
        default:
            url_name = url.name ? url.name.toString() : url_name;
            break;
    }
    parent.logbt2(geojson, url_name);//SHP ץX     ϼx     ץ 
    return geojson;
}

function shpLoader2(data, returnData) {
    inputData['shp'] = data;
    if (inputData['shp'] && inputData['dbf'])
        if (returnData) returnData(toArcgisjson(inputData));
}

function dbfLoader2(data, returnData) {
    inputData['dbf'] = data;
    if (inputData['shp'] && inputData['dbf'])
        if (returnData) returnData(toArcgisjson(inputData));
}

function toArcgisjson(geojsonData) {
    parent.qLoading();
    var shpRecords = geojsonData.shp.records;
    var dbfRecords = geojsonData.dbf.records;
    var toSQLjson = [], arcgisspatialReference = { "wkid": EPSG };
    for (var i = 0; i < shpRecords.length; i++) {
        var pathdotlen = shpRecords[i].shape.content.points.length / 2;
        var path = [];
        for (var j = 0; j < pathdotlen; j++) {
            var pathdot = [shpRecords[i].shape.content.points[j * 2], shpRecords[i].shape.content.points[j * 2 + 1]];
            path.push(pathdot);
        }
        var GRAPHIC = {
            type: "polyline",
            paths: path,
            spatialReference: arcgisspatialReference
        };
        toSQLjson[i] = Object.assign({}, { "OBJECTID": 1 });
        //toSQLjson[i].OBJECTID = dbfRecords[i].OBJECTID
        toSQLjson[i].Town = dbfRecords[i].Town
        toSQLjson[i].Road = dbfRecords[i].Road
        toSQLjson[i].Lane = dbfRecords[i].Lane
        toSQLjson[i].Lon = dbfRecords[i].Lon
        toSQLjson[i].Way = dbfRecords[i].Way
        toSQLjson[i].LeftCount = parseInt(dbfRecords[i].LeftCount)
        toSQLjson[i].RightCount = parseInt(dbfRecords[i].RightCount)
        toSQLjson[i].MaxVe = parseInt(dbfRecords[i].MaxVe)
        toSQLjson[i].Width = parseFloat(dbfRecords[i].Width)
        toSQLjson[i].RLevel = parseInt(dbfRecords[i].Level)
        toSQLjson[i].RPercent = parseFloat(dbfRecords[i].Percent)
        toSQLjson[i].YMD = dbfRecords[i].YMD
        toSQLjson[i].Note = dbfRecords[i].Note
        toSQLjson[i].Range = dbfRecords[i].Range
        toSQLjson[i].GRAPHIC = JSON.stringify(GRAPHIC);
        toSQLjson[i].EXTENTLX = parseFloat(shpRecords[i].shape.content.maxX);
        toSQLjson[i].EXTENTLY = parseFloat(shpRecords[i].shape.content.maxY);
        toSQLjson[i].EXTENTSX = parseFloat(shpRecords[i].shape.content.minX);
        toSQLjson[i].EXTENTSY = parseFloat(shpRecords[i].shape.content.minY);
    }
    return toSQLjson;
}