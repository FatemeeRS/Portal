using System.Reflection;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

/// <summary>
/// The composed persistence context. It knows no entities of its own — each module contributes
/// its own IEntityTypeConfiguration&lt;T&gt; classes, discovered here from the module assemblies
/// handed in by the composition root (Api.BackOffice / Api.Portal / Workers Program.cs).
/// </summary>
public sealed class ApplicationDbContext(
    DbContextOptions<ApplicationDbContext> options,
    IEnumerable<Assembly> moduleAssemblies) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var assembly in moduleAssemblies)
            modelBuilder.ApplyConfigurationsFromAssembly(assembly);

        base.OnModelCreating(modelBuilder);
    }
}
