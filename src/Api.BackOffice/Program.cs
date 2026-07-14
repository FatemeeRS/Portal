using System.Reflection;
using Application;
using BuildingBlocks.Exceptions;
using BuildingBlocks.Persistence;
using Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using Shared.Authorization;

// Phase 2 adds each module's assembly here as it's built (Media, Navigation, Sidebar,
// Slider, News, Audit). Only the host assembly is scanned for now — Foundation phase has
// no business modules yet, and MediatR requires at least one assembly to scan.
var moduleAssemblies = new[] { Assembly.GetExecutingAssembly() };

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .Enrich.FromLogContext()
    .CreateBootstrapLogger();

try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Host.UseSerilog((context, services, configuration) => configuration
        .ReadFrom.Configuration(context.Configuration)
        .ReadFrom.Services(services)
        .Enrich.FromLogContext()
        .WriteTo.Console());

    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(options =>
        options.SwaggerDoc("v1", new() { Title = "Api.BackOffice", Version = "v1" }));

    builder.Services.AddApplication(moduleAssemblies);
    builder.Services.AddInfrastructure(builder.Configuration, moduleAssemblies);
    builder.Services.AddCurrentUserAccessor();

    // Validates tokens issued by the external identity provider (Phase 1 does not issue
    // tokens itself — see the plan's Security §13 and the Sprint 1 IdP-contract spike).
    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            // Authority is intentionally unset until the external identity provider's contract
            // is confirmed (Sprint 1 spike, plan §16) — every Bearer-protected request will 401
            // until then, rather than the host crashing on every single request.
            var authority = builder.Configuration["Identity:Authority"];
            if (!string.IsNullOrWhiteSpace(authority))
                options.Authority = authority;

            options.Audience = builder.Configuration["Identity:Audience"];
            options.RequireHttpsMetadata = !builder.Environment.IsDevelopment();
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true
            };
        });

    builder.Services.AddAuthorizationBuilder()
        .AddPolicy($"permission:{PermissionKeys.NavigationManage}", p => p.RequireClaim("permission", PermissionKeys.NavigationManage))
        .AddPolicy($"permission:{PermissionKeys.SidebarManage}", p => p.RequireClaim("permission", PermissionKeys.SidebarManage))
        .AddPolicy($"permission:{PermissionKeys.SliderManage}", p => p.RequireClaim("permission", PermissionKeys.SliderManage))
        .AddPolicy($"permission:{PermissionKeys.NewsManage}", p => p.RequireClaim("permission", PermissionKeys.NewsManage))
        .AddPolicy($"permission:{PermissionKeys.NewsPublish}", p => p.RequireClaim("permission", PermissionKeys.NewsPublish))
        .AddPolicy($"permission:{PermissionKeys.MediaUpload}", p => p.RequireClaim("permission", PermissionKeys.MediaUpload))
        .AddPolicy($"permission:{PermissionKeys.AuditView}", p => p.RequireClaim("permission", PermissionKeys.AuditView));

    builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
    builder.Services.AddProblemDetails();

    builder.Services.AddHealthChecks()
        .AddSqlite(builder.Configuration.GetConnectionString("Sqlite")!, name: "sqlite");

    builder.Services.AddCors(options => options.AddDefaultPolicy(policy => policy
        .WithOrigins(builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [])
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials()));

    var app = builder.Build();

    app.UseExceptionHandler();

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseSerilogRequestLogging();
    app.UseHttpsRedirection();
    app.UseCors();
    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();
    app.MapHealthChecks("/health", new HealthCheckOptions());

    app.Run();
}
finally
{
    Log.CloseAndFlush();
}
