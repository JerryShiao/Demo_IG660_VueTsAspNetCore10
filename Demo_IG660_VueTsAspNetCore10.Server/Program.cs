using Microsoft.AspNetCore.ResponseCompression;
using System.IO.Compression;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// --- 1. 配置 Response Compression (回應壓縮) ---
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true; // 允許在 HTTPS 下壓縮（請注意 CRIME/BREACH 攻擊風險，若無敏感個資則安全）
    options.Providers.Add<BrotliCompressionProvider>(); // 優先使用 Brotli
    options.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(
        new[] { "application/json", "application/geo+json" }); // 確保 GIS 相關的 JSON 被壓縮
});

// 設定 Brotli 壓縮等級為最速（Optimal），適合 GIS 這種重複性高、極好壓縮的文字資料
builder.Services.Configure<BrotliCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.Optimal;
});

// --- 2. 配置 System.Text.Json 瘦身設定 ---
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // 當屬性值為 null 時，直接不寫入 JSON，大幅減少欄位體積
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;

        // （選用）GIS 欄位建議維持小駝峰命名法，與前端 JS 完美接軌
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    });

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// 啟用回應壓縮中間件（必須放在靜態檔案與路由之前）
app.UseResponseCompression();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
