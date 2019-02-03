using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using infrastructure.DataAccess.Models.Interface;

namespace infrastructure.DataAccess.Repository.Interface
{
    public interface IRepositoryBase<T> where T : class, IIdentifiable
    {
        Task<T> AddAsync(T entity);
        Task RemoveAsync(T entity);
        Task UpdateAsync(T entity);
        Task<T> FindAsync(Guid entityId);
        Task RemoveRangeAsync(IEnumerable<T> entities);
        Task UpdateRangeAsync(IEnumerable<T> entities);
        Task AddRangeAsync(IEnumerable<T> entities);
        Task<IList<T>> GetAllAsync();
    }
}