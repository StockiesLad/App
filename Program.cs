using Microsoft.EntityFrameworkCore;
using MobileAppBackend.Data;

var builder = WebApplication.CreateBuilder(args);

var allowAll = "_allowAll";
builder.Services.AddCors(opts =>
{
    opts.AddPolicy(name: allowAll, policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

builder.WebHost.UseUrls("http://localhost:5000","https://localhost:5001");

builder.Services.AddDbContext<AppDbContext>(opts =>
    opts.UseSqlite("Data Source=staff.db"));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(allowAll);   
//app.UseHttpsRedirection();
app.MapControllers();

using(var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

app.Run();