Imports System.Web
Imports System.Web.Services

Public Class GetAIKeyHandler
    Implements System.Web.IHttpHandler

    Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        context.Response.ContentType = "text/plain"
        Dim API_key As String = "AIzaSyCmBvFEVq3PVXMCTeLt6q2CBrAy-W1Xalc"
        Dim API_key2 As String = "AIzaSyD1d8eYXWmUr9jNswtr7H1B6lL-NiR9Oi4"
        Dim currentMinute As Integer = DateTime.Now.Minute
        ' 判斷奇偶數
        If currentMinute Mod 2 = 0 Then
            ' 偶數分鐘
            context.Response.Write(API_key)
        Else
            ' 奇數分鐘
            context.Response.Write(API_key2)
        End If
    End Sub

    ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class