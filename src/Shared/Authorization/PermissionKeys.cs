namespace Shared.Authorization;

/// <summary>
/// Single source of truth for Api.BackOffice permission keys (Phase 1 MVP plan, Security §13).
/// The external identity provider must issue matching permission claims; policies are mapped
/// to these keys at Api.BackOffice startup.
/// </summary>
public static class PermissionKeys
{
    public const string NavigationManage = "navigation.manage";
    public const string SidebarManage = "sidebar.manage";
    public const string SliderManage = "slider.manage";
    public const string NewsManage = "news.manage";
    public const string NewsPublish = "news.publish";
    public const string MediaUpload = "media.upload";
    public const string AuditView = "audit.view";

    public static readonly IReadOnlyCollection<string> All =
    [
        NavigationManage, SidebarManage, SliderManage, NewsManage, NewsPublish, MediaUpload, AuditView
    ];
}
