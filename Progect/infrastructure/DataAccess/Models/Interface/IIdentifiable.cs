using System;

namespace infrastructure.DataAccess.Models.Interface
{
    public interface IIdentifiable
    {
        Guid Id { get; set; }
    }
}