namespace BuildingBlocks.Common;

/// <summary>
/// Resolves the acting user for audit and authorization purposes. Implemented at the Api layer
/// against the external identity provider's ClaimsPrincipal — Phase 1 reads tokens, it doesn't issue them.
/// </summary>
public interface ICurrentUserAccessor
{
    string? UserId { get; }
}
