Imports System.Web
Imports System.Net.Mail
Imports System.Web.Services
Imports System.IO
Imports System.Net
Imports Newtonsoft.Json

Public Class Handler_SMTP_OB
    Implements System.Web.IHttpHandler
    Private WithEvents Doctemp As New WebClient
    Dim strxml As String
    Dim S1
    Dim S2
    Dim S3
    Dim S4
    Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        Dim data = context.Request.Form()
        S1 = data("S1")
        S2 = data("S2")
        S3 = data("S3")
        S4 = data("S4")
        SendEmail(S1, S2, S3, S4)
    End Sub
    Public Sub SendEmail(subject As String, text As String, toAddress As String, fromAddress As String)
        Dim message As New MailMessage(New MailAddress(fromAddress, "WebGIS公務通知信箱"), New MailAddress(toAddress))
        message.Subject = subject
        message.Body = text
        message.IsBodyHtml = True
        Dim server
        server = New SmtpClient("smtp.gmail.com", 587)
        server.UseDefaultCredentials = False
        server.Credentials = New NetworkCredential("tccgland", "tccgland123")

        server.EnableSsl = True
        server.DeliveryMethod = SmtpDeliveryMethod.Network
        server.Timeout = 15000
        server.Send(message)
        server = Nothing
        message.Dispose()
    End Sub
    ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property
End Class