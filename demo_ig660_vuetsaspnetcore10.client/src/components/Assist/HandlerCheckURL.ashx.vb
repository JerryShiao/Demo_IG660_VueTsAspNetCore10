Imports System.Net
Imports System.Web
Imports System.Web.Services

Public Class HandlerCheckURL
    Implements System.Web.IHttpHandler

    Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim tempURL = context.Request.QueryString("tempURL")
        tempURL = tempURL.Replace("＆", "&")
        context.Response.ContentType = "text/plain"
        Dim WCb As WebRequest = WebRequest.Create(tempURL)

        WCb.Method = "HEAD"
        Try
            Dim WResp = WCb.GetResponse()
            context.Response.Write(WResp.ContentLength)
        Catch ex As Exception
        End Try
    End Sub

    ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class