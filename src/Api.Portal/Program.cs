using System.Reflection;
using Application;
using BuildingBlocks.Exceptions;
using BuildingBlocks.Persistence;
using Infrastructure;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Serilog;

// Phase 2 adds each module's assembly here as it's built (Media, Navigation, Sidebar,
// Slider, News). Only the host assembly is scanned for now — Foundation phase has no
// business modules yet, and MediatR requires at least one assembly to scan.
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
        options.SwaggerDoc("v1", new() { Title = "Api.Portal", Version = "v1" }));

    builder.Services.AddApplication(moduleAssemblies);
    builder.Services.AddInfrastructure(builder.Configuration, moduleAssemblies);
    builder.Services.AddCurrentUserAccessor();

    builder.Services.AddOutputCache();

    builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
    builder.Services.AddProblemDetails();

    builder.Services.AddHealthChecks()
        .AddSqlite(builder.Configuration.GetConnectionString("Sqlite")!, name: "sqlite");

    // Fully public host — every route is anonymous by design (Phase1.md client scope).
    builder.Services.AddCors(options => options.AddDefaultPolicy(policy => policy
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .WithMethods("GET")));

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
    app.UseOutputCache();

    app.MapControllers();
    app.MapHealthChecks("/health", new HealthCheckOptions());

    app.Run();
}
finally
{
    Log.CloseAndFlush();
}
