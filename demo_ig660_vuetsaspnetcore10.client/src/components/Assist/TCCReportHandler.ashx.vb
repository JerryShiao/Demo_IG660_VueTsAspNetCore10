Imports System.Net
Imports System.Web
Imports System.Web.Services
Imports Newtonsoft.Json

Public Class TCCReportHandler
    Implements System.Web.IHttpHandler

    Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12
        Dim type = context.Request.QueryString("type")
        Dim CallFunction = context.Request.QueryString("CallFunction")
        Dim TimeCount = context.Request.QueryString("TimeCount")
        If (CallFunction = "GetVilList") Then
            Dim AreaId = context.Request.QueryString("AreaId")
            Dim WC As New WebClient
            WC.Encoding = Encoding.UTF8
            Dim Uri As String = "https://demographics.taichung.gov.tw/Demographic/server/api/TCCReport" + type + "?" + TimeCount
            Dim vm = New With {Key .CallFunction = "GetVilList", Key .AreaId = AreaId}
            Dim myParameters = JsonConvert.SerializeObject(vm)
            WC.Headers.Add(HttpRequestHeader.Accept, "application/json")
            WC.Headers.Add(HttpRequestHeader.ContentType, "application/json")
            Dim result = WC.UploadString(Uri, myParameters)
            context.Response.Write(result)
        ElseIf (CallFunction = "GetData") Then
            If (type = "01") Then
                Dim cboDistValue = context.Request.QueryString("cboDistValue")
                Dim cboDistValueArray As String() = cboDistValue.Split(",")
                Dim cboMonthValue = context.Request.QueryString("cboMonthValue")
                Dim cboVilValue = context.Request.QueryString("cboVilValue")
                Dim cboVilValueArray As String() = cboVilValue.Split(",")
                If cboVilValue.Contains("Z") Then
                    Dim cboVilValueArrayStart As Integer = Integer.Parse(cboVilValueArray(1))
                    Dim cboVilValueArrayEnd As Integer = Integer.Parse(cboVilValueArray(2))
                    Dim TempList As New ArrayList()
                    For I = cboVilValueArrayStart To cboVilValueArrayEnd
                        TempList.Add(Convert.ToString(I))
                    Next I
                    cboVilValueArray = DirectCast(TempList.ToArray(GetType(String)), String())
                End If
                Dim cboYearValue = context.Request.QueryString("cboYearValue")
                Dim WC As New WebClient
                WC.Encoding = Encoding.UTF8
                Dim Uri As String = "https://demographics.taichung.gov.tw/Demographic/server/api/TCCReport" + type + "?" + TimeCount
                Dim vm
                If cboDistValue = "0" Then
                    vm = New With {
                        Key .CallFunction = "GetData",
                        Key .PageVilValue = {},
                        Key .cboDistValue = cboDistValueArray,'{"1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29"},
                        Key .cboVilValue = cboVilValueArray,'{cboVilValue}
                        Key .cboMonthValue = cboMonthValue,
                        Key .cboYearValue = cboYearValue
                    }
                Else
                    vm = New With {
                        Key .CallFunction = "GetData",
                        Key .PageVilValue = {},
                        Key .cboDistValue = cboDistValueArray,'{cboDistValue},
                        Key .cboVilValue = cboVilValueArray,'{cboVilValue}
                        Key .cboMonthValue = cboMonthValue,
                        Key .cboYearValue = cboYearValue}
                End If
                Dim myParameters = JsonConvert.SerializeObject(vm)
                WC.Headers.Add(HttpRequestHeader.ContentType, "application/json")
                Dim result = WC.UploadString(Uri, myParameters)
                context.Response.Write(result)
            ElseIf (type = "15") Then
                Dim cboDistValue = context.Request.QueryString("cboDistValue")
                Dim cboDistValueArray As String() = cboDistValue.Split(",")
                Dim cboMonthValue = context.Request.QueryString("cboMonthValue")
                Dim cboVilValue = context.Request.QueryString("cboVilValue")
                Dim cboVilValueArray As String() = cboVilValue.Split(",")
                If cboVilValue.Contains("Z") Then
                    Dim cboVilValueArrayStart As Integer = Integer.Parse(cboVilValueArray(1))
                    Dim cboVilValueArrayEnd As Integer = Integer.Parse(cboVilValueArray(2))
                    Dim TempList As New ArrayList()
                    For I = cboVilValueArrayStart To cboVilValueArrayEnd
                        TempList.Add(Convert.ToString(I))
                    Next I
                    cboVilValueArray = DirectCast(TempList.ToArray(GetType(String)), String())
                End If
                Dim cboYearValue = context.Request.QueryString("cboYearValue")
                Dim cboSexValue = context.Request.QueryString("cboSexValue")
                Dim WC As New WebClient
                WC.Encoding = Encoding.UTF8
                Dim Uri As String = "https://demographics.taichung.gov.tw/Demographic/server/api/TCCReport" + type + "?" + TimeCount
                Dim vm
                If cboDistValue = "0" Then
                    vm = New With {
                        Key .CallFunction = "GetData",
                        Key .PageVilValue = {},
                        Key .cboDistValue = cboDistValueArray,'{"1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29"},
                        Key .cboVilValue = cboVilValueArray,'{cboVilValue}
                        Key .cboMonthValue = cboMonthValue,
                        Key .cboYearValue = cboYearValue,
                        Key .cboSexValue = cboSexValue
                    }
                Else
                    vm = New With {
                        Key .CallFunction = "GetData",
                        Key .PageVilValue = {},
                        Key .cboDistValue = cboDistValueArray,'{cboDistValue},
                        Key .cboVilValue = cboVilValueArray,'{cboVilValue}
                        Key .cboMonthValue = cboMonthValue,
                        Key .cboYearValue = cboYearValue,
                        Key .cboSexValue = cboSexValue
                    }
                End If
                Dim myParameters = JsonConvert.SerializeObject(vm)
                WC.Headers.Add(HttpRequestHeader.ContentType, "application/json")
                Dim result = WC.UploadString(Uri, myParameters)
                context.Response.Write(result)
            Else
                Dim cboDistValue = context.Request.QueryString("cboDistValue")
                Dim cboMonthValue = context.Request.QueryString("cboMonthValue")
                Dim cboVilValue = context.Request.QueryString("cboVilValue")
                Dim cboYearValue = context.Request.QueryString("cboYearValue")
                Dim cboSexValue = context.Request.QueryString("cboSexValue")
                Dim WC As New WebClient
                WC.Encoding = Encoding.UTF8
                Dim Uri As String = "https://demographics.taichung.gov.tw/Demographic/server/api/TCCReport" + type + "?" + TimeCount
                Dim vm = New With {
                    Key .CallFunction = "GetData",
                    Key .cboDistValue = cboDistValue,
                    Key .cboMonthValue = cboMonthValue,
                    Key .cboVilValue = cboVilValue,
                    Key .cboYearValue = cboYearValue,
                    Key .cboSexValue = cboSexValue
                }
                Dim myParameters = JsonConvert.SerializeObject(vm)
                WC.Headers.Add(HttpRequestHeader.ContentType, "application/json")
                Dim result = WC.UploadString(Uri, myParameters)
                context.Response.Write(result)
            End If
        End If
    End Sub

    ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class