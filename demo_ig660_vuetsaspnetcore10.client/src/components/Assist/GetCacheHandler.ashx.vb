Imports System.Net
Imports System.Web
Imports System.Web.Services

Public Class GetCacheHandler
    Implements System.Web.IHttpHandler

    Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim tempURL = context.Request.QueryString("tempURL")
        Dim token = "cIg-JAWdeMsezV3N9JiIa1-sVE-0as_OCbIciAD1LfV8yKOOuWaY6KRgcqZ03mUM"
        ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12
        context.Response.ContentType = "text/plain"
        Dim WC As New WebClient
        WC.Encoding = Encoding.UTF8
        Dim result = WC.DownloadString(tempURL & "?token=" + token)
        context.Response.Write(result)
    End Sub

    ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class