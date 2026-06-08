Imports System.Net
Imports Newtonsoft.Json.Linq

Public Class TNUrbanHandler
    Implements System.Web.IHttpHandler

    Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim tempURL = context.Request.QueryString.AllKeys(0)
        'ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12
        context.Response.ContentType = "text/plain"
        Dim WC As New WebClient
        WC.Encoding = Encoding.UTF8
        Dim result = WC.DownloadString(tempURL)
        Dim json As JObject = JObject.Parse(result)
        context.Response.Write(json)
    End Sub

    ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class