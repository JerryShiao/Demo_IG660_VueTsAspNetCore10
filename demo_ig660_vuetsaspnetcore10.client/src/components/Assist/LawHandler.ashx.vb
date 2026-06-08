Imports System.Net
Imports System.Web
Imports System.Web.Services

Public Class LawHandler
    Implements System.Web.IHttpHandler

    Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12
        Dim county = context.Request.QueryString("county")
        Dim town = context.Request.QueryString("town")
        Dim sec = context.Request.QueryString("sec")
        Dim saletype = context.Request.QueryString("saletype")
        Dim proptype = context.Request.QueryString("proptype")
        Dim checkyn = context.Request.QueryString("checkyn")
        Dim emptyyn = context.Request.QueryString("emptyyn")
        Dim WC As New WebClient
        WC.Encoding = Encoding.UTF8
        Dim Uri As String = "https://aomp109.judicial.gov.tw/judbp/wkw/WHD1A02/QUERY.htm"
        Dim myParameters As String = "gov=&crtnm=%E5%85%A8%E9%83%A8&court=&county=" + county + "&town=" + town + "&proptype=" + proptype + "&saletype=" + saletype + "&keyword=&saledate1=&saledate2=&minprice1=&minprice2=&saleno=&crmyy=&crmid=&crmno=&dpt=&comm_yn=&stopitem=&sec=" + sec + "&rrange=&area1=&area2=&debtor=&checkyn=" + checkyn + "&emptyyn=" + emptyyn + "&ttitle=&sorted_column=A.CRMYY%2C+A.CRMID%2C+A.CRMNO%2C+A.SALENO%2C+A.ROWID&sorted_type=ASC&_ORDER_BY=&pageNum=1&pageSize=200"
        WC.Headers.Add(HttpRequestHeader.ContentType, "application/x-www-form-urlencoded")
        Dim result = WC.UploadString(Uri, myParameters)
        context.Response.Write(result)
    End Sub

    ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class