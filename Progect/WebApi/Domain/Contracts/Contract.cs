namespace Resolff.APMS.CRM.WebAPI.Domain.Contracts
{
    public class Contract<T>
        where T : class
    {
        public Contract()
            : this(null, null)
        {
        }

        public Contract(T payload)
            : this(payload, null)
        {
        }

        public Contract(string error)
            : this(null, error)
        {
        }

        public Contract(T payload, string error)
        {
            Payload = payload;
            Error = error;
        }

        public string Error { get; }
        public T Payload { get; }
    }
}