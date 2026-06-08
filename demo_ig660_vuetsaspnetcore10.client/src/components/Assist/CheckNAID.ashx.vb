Imports System.IO
Imports System.Net
Imports System.Security.Cryptography
Imports System.Web
Imports System.Web.Services
Imports Newtonsoft.Json

Public Class CheckNAID
    Implements System.Web.IHttpHandler
    Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        Dim NAID = context.Request.QueryString("NAID")
        If HttpUtility.UrlDecode(Decrypt(NAID)) = "Error" Then
            context.Response.Write("您的登入方式有問題(如未使用憑證)，請聯絡系統管理員。")
            Exit Sub
        End If
        Dim sinfo2 As String() = Split(HttpUtility.UrlDecode(Decrypt(NAID)), "|")
        If Left(sinfo2(1), 6) = "CAType" Then
            context.Response.Write(Replace(sinfo2(3), "Name", "") & "," & Replace(sinfo2(6), "UID", ""))
        Else
            context.Response.Write(Replace(sinfo2(1), "cn", "") & "," & Replace(sinfo2(2), "uid", ""))
        End If
    End Sub
    '解密端
    Public Shared Function Decrypt(base64Input As String) As String
        Dim encryptBytes As Byte() = Convert.FromBase64String(base64Input)
        Dim saltBytes As Byte() = UTF8Encoding.UTF8.GetBytes("roy725attccg102") 'Dim saltBytes As Byte() = Encoding.UTF8.GetBytes("roy725｜" & Date.Now.Hour)
        Dim aes As New AesManaged()
        Dim rfc As New Rfc2898DeriveBytes("Admin8", saltBytes) 'Dim rfc As New Rfc2898DeriveBytes("Admin｜" & Date.Now.Day, saltBytes)
        aes.BlockSize = aes.LegalBlockSizes(0).MaxSize
        aes.KeySize = aes.LegalKeySizes(0).MaxSize
        aes.Key = rfc.GetBytes(aes.KeySize / 8)
        aes.IV = rfc.GetBytes(aes.BlockSize / 8)
        '改成解密
        Dim decryptTrans As ICryptoTransform = aes.CreateDecryptor()
        Dim decryptStream As New MemoryStream()
        Dim decryptor As New CryptoStream(decryptStream, decryptTrans, CryptoStreamMode.Write)
        decryptor.Write(encryptBytes, 0, encryptBytes.Length)
        decryptor.Flush()
        decryptor.Close()
        '解密後的byte[]
        Dim decryptBytes As Byte() = decryptStream.ToArray()
        Dim decryptedString As String = UTF8Encoding.UTF8.GetString(decryptBytes, 0, decryptBytes.Length)
        Return decryptedString
    End Function
    ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property
End Class