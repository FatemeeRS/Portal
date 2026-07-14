using BuildingBlocks.Common;
using Microsoft.Extensions.DependencyInjection;

namespace BuildingBlocks.Persistence;

public static class CurrentUserServiceCollectionExtensions
{
    public static IServiceCollection AddCurrentUserAccessor(this IServiceCollection services)
    {
        services.AddHttpContextAccessor();
        services.AddScoped<ICurrentUserAccessor, HttpContextCurrentUserAccessor>();
        return services;
    }
}
