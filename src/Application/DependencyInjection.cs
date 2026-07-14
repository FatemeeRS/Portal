using System.Reflection;
using Application.Common.Behaviors;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Application;

public static class DependencyInjection
{
    /// <summary>
    /// Registers MediatR handlers and FluentValidation validators found in the given module
    /// assemblies. The Application layer itself knows no module by name — modules are handed
    /// in by the composition root (Api.BackOffice / Api.Portal / Workers Program.cs).
    /// </summary>
    public static IServiceCollection AddApplication(this IServiceCollection services, params Assembly[] moduleAssemblies)
    {
        services.AddMediatR(config =>
        {
            config.RegisterServicesFromAssemblies(moduleAssemblies);
            config.AddOpenBehavior(typeof(LoggingBehavior<,>));
            config.AddOpenBehavior(typeof(ValidationBehavior<,>));
        });

        services.AddValidatorsFromAssemblies(moduleAssemblies);

        return services;
    }
}
