Imports System.Net
Imports System.Web
Imports System.Web.Services
Imports Newtonsoft.Json

Public Class HandlerREC
    Implements System.Web.IHttpHandler

    Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12
        Dim secret = context.Request.QueryString("secret")
        Dim resp = context.Request.QueryString("resp")
        Dim WC As New WebClient
        WC.Encoding = Encoding.UTF8
        Dim Uri As String = "https://www.google.com/recaptcha/api/siteverify"
        Dim myParameters As String = "secret=" & secret & "&response=" & resp
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