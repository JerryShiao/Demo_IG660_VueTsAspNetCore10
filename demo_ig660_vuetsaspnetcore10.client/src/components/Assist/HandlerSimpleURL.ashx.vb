Imports System.Net

Public Class HandlerSimpleURL
    Implements System.Web.IHttpHandler

    Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        If Not ValidateRequestParameters(context) Then
            Return
        End If

        If Not IsAllowedUrl(context) Then '1150313
            Return
        End If

        Dim tempURL = context.Request.QueryString("tempURL")
        tempURL = "http://" & tempURL.Replace("＆", "&")
        Dim PRICESEC = context.Request.QueryString("PRICESEC")
        'ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12
        If PRICESEC Is Nothing Then
            context.Response.ContentType = "text/plain"
            Dim WC As New WebClient
            WC.Encoding = Encoding.UTF8
            Dim result = WC.DownloadString(tempURL)
            context.Response.Write(result)
        Else
            context.Response.ContentType = "text/plain"
            Dim WC As New WebClient
            WC.Encoding = Encoding.UTF8
            Dim result = WC.DownloadString(tempURL & "&PRICESEC=" + PRICESEC)
            context.Response.Write(result)
        End If
    End Sub

    Private Function IsAllowedUrl(ByVal context As HttpContext) As Boolean

        Dim tempURL = context.Request.QueryString("tempURL")
        tempURL = "http://" & tempURL.Replace("＆", "&")

        If String.IsNullOrEmpty(tempURL) Then
            context.Response.StatusCode = 403
            context.Response.Write("{""status"":""Error""}")
            Return False
        End If

        ' 白
        Dim allowedDomains As New List(Of String) From {
        "web.water.gov.tw",
        "taichung.housetube.tw",
        "dtm-openapi.colife.org.tw",
        "twur.nlma.gov.tw"
    }

        ' 解析 URL
        Dim uri As Uri
        Try
            uri = New Uri(tempURL)
        Catch ex As Exception
            context.Response.StatusCode = 403
            context.Response.Write("{""status"":""Error""}")
            Return False
        End Try

        Dim host As String = uri.Host.ToLower()

        ' 比對 host 是否在白名單
        If Not allowedDomains.Any(Function(d) host = d OrElse host.EndsWith("." & d)) Then
            TerminateRequest(context)
            Return False
        End If

        Return True

    End Function


    Private Function ValidateRequestParameters(ByVal context As HttpContext) As Boolean
        ' 驗證 Domain
        Dim ASHXdomain As String = context.Request.Url.GetLeftPart(UriPartial.Authority)
        Dim allowedDomains As String() = {ASHXdomain}
        Dim referer = context.Request.UrlReferrer?.GetLeftPart(UriPartial.Authority)

        If Not allowedDomains.Contains(referer) Then
            context.Response.StatusCode = 403
            context.Response.Write("{""status"":""Error""}")
            Return False
        End If

        ' 驗證QueryString
        For Each key As String In context.Request.QueryString.AllKeys
            Dim value As String = context.Request.QueryString(key)

            If Not String.IsNullOrEmpty(value) Then

                ' 路徑跳脫
                If value.Contains("../") OrElse value.Contains("..\") Then
                    TerminateRequest(context)
                    Return False
                End If

                ' Null Byte
                Dim decodedValue As String = HttpUtility.UrlDecode(value)
                If value.Contains(Chr(0)) OrElse decodedValue.Contains(Chr(0)) OrElse value.ToLower().Contains("%00") Then
                    TerminateRequest(context)
                    Return False
                End If

                ' XSS
                If value.ToLower().Contains("<script") OrElse value.Contains("<") Then
                    TerminateRequest(context)
                    Return False
                End If

            End If
        Next

        Return True
    End Function

    Private Sub TerminateRequest(ByVal context As HttpContext)
        context.Response.Clear()
        context.Response.StatusCode = 400
        context.Response.ContentType = "application/json"
        context.Response.Write("{""status"":""Error""}")
        'context.Response.End()
    End Sub

    ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class