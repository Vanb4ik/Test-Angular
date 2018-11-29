using System;
using System.Collections.Generic;

namespace WebApi.Controllers.Domain
{
    public class PagedList<T>
    {
        public PagedList()
        {
        }

        public PagedList(int page, int limit, int total, IList<T> data)
            : this()
        {
            Page = page;
            Limit = limit;
            Total = total;
            Data = data;
        }

        public int Page { get; set; }

        public int Limit { get; set; }

        public int Total { get; set; }

        public IList<T> Data { get; set; }

        public int PagesCount => (int) Math.Ceiling(Total / (double) Limit);
    }
}