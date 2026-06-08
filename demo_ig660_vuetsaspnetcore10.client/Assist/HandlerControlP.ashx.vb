Imports System.Net
Imports System.Web
Imports System.Web.Services
Imports Newtonsoft.Json

Public Class HandlerControlP
    Implements System.Web.IHttpHandler

    Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        Dim void = context.Request.QueryString("vo.id")
        Dim WC As New WebClient
        WC.Encoding = Encoding.UTF8
        Dim Uri As String = "http://ctlp.land.ntpc.gov.tw/Q16N/ControlPnt_ajax_detail"
        Dim myParameters As String = "vo.id=" & void
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