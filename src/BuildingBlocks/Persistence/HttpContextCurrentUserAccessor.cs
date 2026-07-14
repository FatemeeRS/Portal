using System.Security.Claims;
using BuildingBlocks.Common;
using Microsoft.AspNetCore.Http;

namespace BuildingBlocks.Persistence;

/// <summary>
/// Reads the acting user from the token the external identity provider issued. On Api.Portal,
/// requests are always anonymous, so this resolves to null and audit columns fall back to "system".
/// </summary>
public sealed class HttpContextCurrentUserAccessor(IHttpContextAccessor httpContextAccessor) : ICurrentUserAccessor
{
    public string? UserId =>
        httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
}
