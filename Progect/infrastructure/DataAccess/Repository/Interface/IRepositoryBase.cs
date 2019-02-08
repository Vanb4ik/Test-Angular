using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using infrastructure.DataAccess.Models.Interface;

namespace infrastructure.DataAccess.Repository.Interface
{
    public interface IRepositoryBase<T> where T : class, IIdentifiable
    {
        Task RemoveRangeAsync(IEnumerable<T> entities, bool commit = false);
        Task UpdateRangeAsync(IEnumerable<T> entities, bool commit = false);
        Task AddRangeAsync(IEnumerable<T> entities, bool commit = false);
        Task<T> AddAsync(T entity, bool commit=false);
        Task RemoveAsync(T entity, bool commit = false);
        Task UpdateAsync(T entity, bool commit = false);
        Task<T> FindAsync(Guid entityId);
        Task<IList<T>> GetAllAsync();
    }
}