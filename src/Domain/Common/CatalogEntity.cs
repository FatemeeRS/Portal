namespace Domain.Common;

/// <summary>
/// Base for the standard content-management shape (audit + soft delete + enable + sort order).
/// Entities that deviate from this shape (singleton settings rows, append-only logs) inherit
/// AuditableEntity or BaseEntity directly instead — see the Phase 1 plan's documented exceptions.
/// </summary>
public abstract class CatalogEntity : AuditableEntity, ISoftDelete, IOrderable, IEnableable
{
    public bool IsDeleted { get; set; }

    public DateTime? DeletedAt { get; set; }

    public int SortOrder { get; set; }

    public bool IsEnabled { get; set; } = true;
}
