using System.Reflection;
using BuildingBlocks.Persistence;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

public static class DependencyInjection
{
    /// <summary>
    /// Registers the composed DbContext for the given module assemblies. Callers must also
    /// register a concrete ICurrentUserAccessor before this resolves (the Api layer's
    /// composition root does so against the authenticated ClaimsPrincipal).
    /// </summary>
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration,
        params Assembly[] moduleAssemblies)
    {
        services.AddSingleton<IEnumerable<Assembly>>(moduleAssemblies);
        services.AddScoped<ISaveChangesInterceptor, AuditableEntitySaveChangesInterceptor>();

        services.AddDbContext<ApplicationDbContext>((serviceProvider, options) =>
        {
            options.UseSqlite(configuration.GetConnectionString("Sqlite"));
            options.AddInterceptors(serviceProvider.GetServices<ISaveChangesInterceptor>());
        });

        return services;
    }
}
