namespace Domain.Common;

public abstract class BaseEntity : IHasDomainEvents
{
    private readonly List<DomainEvent> _domainEvents = [];

    public int Id { get; protected set; }

    public IReadOnlyCollection<DomainEvent> DomainEvents => _domainEvents.AsReadOnly();

    public void ClearDomainEvents() => _domainEvents.Clear();

    protected void RaiseDomainEvent(DomainEvent domainEvent) => _domainEvents.Add(domainEvent);
}
