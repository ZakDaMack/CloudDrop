using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;

using CloudDrop.Contexts;
using CloudDrop.Models;

const string DevCorsOrigins = "_devCorsOrigins";

IConfigurationRoot config = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", true)
    .AddEnvironmentVariables()
    .Build();

var builder = WebApplication.CreateBuilder(args);

// increase form size to 1GB
builder.WebHost.ConfigureKestrel(options => options.Limits.MaxRequestBodySize = 1_000_000_000);


// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddRouting(options => options.LowercaseUrls = true);
builder.Services.AddDbContext<UserContext>(options => options.UseInMemoryDatabase("clouddrop_db"));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// add the REACT SPA
builder.Services.AddSpaStaticFiles(options => options.RootPath = "Client/build");

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(DevCorsOrigins);
}

//app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// prep react app
app.UseSpa(spa => {        
    spa.Options.SourcePath = "Client";        
    if (app.Environment.IsDevelopment())             
        spa.UseReactDevelopmentServer(npmScript: "start");
});

// add the user auth
IServiceScopeFactory serviceScopeFactory = app.Services.GetService<IServiceScopeFactory>();
using (var scope = serviceScopeFactory.CreateScope())
{
    UserContext? users = scope.ServiceProvider.GetService(typeof(UserContext)) as UserContext;
    User u = new User()
    {
        Name = config["AUTH_USER"],
        TokenHash = BCrypt.Net.BCrypt.HashPassword(config["AUTH_PW"]),
        DirectoryLocation = config["UPLOAD_DIR"],
        AcceptedFileTypes = ""
        //Name = "zak",
        //TokenHash = BCrypt.Net.BCrypt.HashPassword("twat"),
        //DirectoryLocation = "/upload",
        //AcceptedFileTypes = ""
    };
    users.Add(u);
    users.SaveChanges();
}

app.Run();