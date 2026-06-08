Imports System.Net
Imports System.Web
Imports System.Web.Services
Imports Newtonsoft.Json
Public Class GetDataHandler
    Implements System.Web.IHttpHandler

    Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        'Dim landURL = context.Request.QueryString("landURL")
        Dim tempURL = context.Request.QueryString("tempURL")
        'Dim PRICESEC = context.Request.QueryString("PRICESEC")
        Dim zon = context.Request.QueryString("zon")
        Dim sec = context.Request.QueryString("sec")
        ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12
        context.Response.ContentType = "text/plain"
        Dim WC As New WebClient
        WC.Encoding = Encoding.UTF8
        Dim result = WC.DownloadString(tempURL & "&zon=" + zon & "&sec=" + sec)
        context.Response.Write(result)
    End Sub

    ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class