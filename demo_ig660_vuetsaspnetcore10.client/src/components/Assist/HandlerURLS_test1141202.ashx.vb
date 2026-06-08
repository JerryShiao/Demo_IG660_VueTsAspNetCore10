Imports System.Net

Public Class HandlerURLS_test1141202
    Implements System.Web.IHttpHandler

    Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim Url_OriginalString = context.Request.Url.OriginalString
        Dim lastIndex As Integer = Url_OriginalString.LastIndexOf("ashx?tempURL=")
        Dim lastPart As String = Url_OriginalString.Substring(lastIndex + 13)
        Dim QueryStr As String = "https://" & lastPart
        Dim QueryStr_ As String = Strings.Replace(QueryStr, "&", "?", Start:=1, Count:=1)

        ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12

        Dim WC As New WebClient
        WC.Encoding = Encoding.UTF8
        WC.Headers.Add("Authorization", "Bearer " & "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IndlbGx3aW5kIn0.QGJ5WdI06Q43uGKtgdwt1oHmcnUg2U4FL6gDd0cogV4")
        Dim result = WC.DownloadString(QueryStr_)
        context.Response.ContentType = "application/json"
        context.Response.Write(result)
    End Sub

    ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class