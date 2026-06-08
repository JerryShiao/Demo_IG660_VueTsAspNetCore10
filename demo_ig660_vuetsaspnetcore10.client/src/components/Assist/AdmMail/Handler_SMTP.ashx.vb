Imports System.Web
Imports System.Net.Mail
Imports System.Web.Services
Imports System.IO
Imports System.Net
Imports Newtonsoft.Json

Public Class Handler_SMTP
    Implements System.Web.IHttpHandler
    Private WithEvents Doctemp As New WebClient
    Dim strxml As String
    Dim S1
    Dim S2
    Dim S3
    Dim S4
    Dim S5
    Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        Dim data = context.Request.Form()
        S1 = data("S1")
        S2 = data("S2")
        S3 = data("S3")
        S4 = data("S4")
        S5 = data("S5")
        If S5.ToString.Split("|")(6) = "HC" Then
            Doctemp.OpenReadAsync(New Uri("http://localhost/webgis/Assist/AdmMail/docTempHC.xml", UriKind.Absolute))
        ElseIf S5.ToString.Split("|")(6) = "TC" Then
            Doctemp.OpenReadAsync(New Uri("http://localhost/webgis/Assist/AdmMail/docTempTC.xml", UriKind.Absolute))
        ElseIf S5.ToString.Split("|")(6) = "HCC" Then
            Doctemp.OpenReadAsync(New Uri("http://localhost/webgis/Assist/AdmMail/docTempHCC.xml", UriKind.Absolute))
        End If
    End Sub
    Private Sub Doctemp_comp(sender As System.Object, e As System.Net.OpenReadCompletedEventArgs) Handles Doctemp.OpenReadCompleted
        Dim streamxml As IO.Stream = e.Result
        Dim xeld As XDocument = XDocument.Load(streamxml)
        Dim xel As XElement = xeld.LastNode
        strxml = xel.ToString
        If S5.ToString.Split("|")(6) = "HC" Then
            strxml = strxml.Replace("＃", S5.ToString.Split("|")(0))
            strxml = strxml.Replace("＄", S5.ToString.Split("|")(1))
            strxml = strxml.Replace("％", S5.ToString.Split("|")(2))
            strxml = strxml.Replace("︿", S5.ToString.Split("|")(3))
            strxml = strxml.Replace("＆", S5.ToString.Split("|")(4))
            strxml = strxml.Replace("＊", S5.ToString.Split("|")(5))
        ElseIf S5.ToString.Split("|")(6) = "TC" Then
            strxml = strxml.Replace("＃", S5.ToString.Split("|")(0))
            strxml = strxml.Replace("＄", S5.ToString.Split("|")(1))
            strxml = strxml.Replace("％", S5.ToString.Split("|")(2))
            strxml = strxml.Replace("︿", S5.ToString.Split("|")(3))
            strxml = strxml.Replace("＆", S5.ToString.Split("|")(4))
            strxml = strxml.Replace("＊", S5.ToString.Split("|")(5))
        ElseIf S5.ToString.Split("|")(6) = "HCC" Then
            strxml = strxml.Replace("＃", S5.ToString.Split("|")(0))
            strxml = strxml.Replace("＄", S5.ToString.Split("|")(1))
            strxml = strxml.Replace("％", S5.ToString.Split("|")(2))
            strxml = strxml.Replace("︿", S5.ToString.Split("|")(3))
            strxml = strxml.Replace("＆", S5.ToString.Split("|")(4))
            strxml = strxml.Replace("＊", S5.ToString.Split("|")(5))
        End If
        strxml = xeld.FirstNode.ToString & strxml
        SendEmail(S1, S2, S3, S4, strxml)
    End Sub
    Public Sub SendEmail(subject As String, text As String, toAddress As String, fromAddress As String, tempxml As String)
        Dim message As New MailMessage(New MailAddress(fromAddress, "WebGIS公務通知信箱"), New MailAddress(toAddress))
        message.Subject = subject
        message.Body = text
        message.IsBodyHtml = True
        If tempxml <> "T" Then
            Dim xmlDoc As XDocument = New XDocument
            xmlDoc = XDocument.Parse(tempxml)
            Dim tempstream As New MemoryStream
            xmlDoc.Save(tempstream)
            tempstream.Position = 0
            Dim item As New Mail.Attachment(tempstream, "case.xml")
            item.NameEncoding = System.Text.Encoding.GetEncoding("utf-8")
            item.TransferEncoding = System.Net.Mime.TransferEncoding.Base64
            item.ContentDisposition.Inline = False
            item.ContentDisposition.DispositionType = System.Net.Mime.DispositionTypeNames.Attachment
            message.Attachments.Add(item)
        End If
        Dim server
        If S5.ToString.Split("|")(6) = "HC" Then
            server = New SmtpClient("smtp.gmail.com", 587)
            server.UseDefaultCredentials = False
            server.Credentials = New NetworkCredential("hccgland", "hccglandimo")
        ElseIf S5.ToString.Split("|")(6) = "TC" Then
            server = New SmtpClient("smtp.gmail.com", 587)
            server.UseDefaultCredentials = False
            server.Credentials = New NetworkCredential("tccgland", "tccgland123")
        ElseIf S5.ToString.Split("|")(6) = "HCC" Then
            server = New SmtpClient("mail.hchg.gov.tw", 25)
            server.UseDefaultCredentials = False
            server.Credentials = New NetworkCredential("P411129", "Sherry100-101")
        Else
            server = New SmtpClient("smtp.gmail.com", 587)
            server.UseDefaultCredentials = False
            server.Credentials = New NetworkCredential("ntpclandi", "eqilicjstjgdwdof")
        End If
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