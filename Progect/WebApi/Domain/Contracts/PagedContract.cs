using System.Collections.Generic;
using WebApi.Controllers.Domain;

namespace WebApi.Domain.Contracts
{
    public class PagedContract<T> : Contract<IList<T>>
        where T : class

    {
        public PagedContract()
            : this(null, null)
        {
        }

        public PagedContract(PagedList<T> payload)
            : this(payload, null)
        {
        }

        public PagedContract(string error)
            : this(null, error)
        {
        }

        public PagedContract(PagedList<T> payload, string error)
            : base(payload.Data, error)
        {
            Page = payload.Page;
            Limit = payload.Limit;
            Total = payload.Total;
            PagesCount = payload.PagesCount;
        }

        public int Page { get; }

        public int Limit { get; }

        public int Total { get; }

        public int PagesCount { get; }
    }
}