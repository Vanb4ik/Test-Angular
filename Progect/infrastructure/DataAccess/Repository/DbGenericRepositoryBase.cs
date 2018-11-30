using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using infrastructure.DataAccess.Models.Interface;
using infrastructure.DataAccess.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace infrastructure.DataAccess.Repository
{
    public class DbGenericRepositoryBase<T> : IRepositoryBase<T>
        where T : class, IIdentifiable
    {
        private PostgresDbContext _context;

        public DbGenericRepositoryBase(PostgresDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(T entity)
        {
            if (entity.Id == Guid.Empty)
            {
                entity.Id = Guid.NewGuid();
            }

            await _context.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task AddRangeAsync(IEnumerable<T> entities)
        {
            var enumerable = entities.ToList();
            if (!enumerable.Any())
            {
                return;
            }
            foreach (T entity in enumerable)
            {
                if (entity.Id == Guid.Empty)
                {
                    entity.Id = Guid.NewGuid();
                }
            }
            await _context.Set<T>().AddRangeAsync(enumerable);
            await _context.SaveChangesAsync();
        }


        public async Task<T> FindAsync(Guid entityID)
        {
            return await _context.FindAsync<T>(new object[]{entityID});
        }

        public async Task<IList<T>> GetAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task RemoveAsync(T entity)
        {
            _context.Set<T>().Remove(entity);
        }

        public async Task RemoveRangeAsync(IEnumerable<T> entities)
        {
            _context.RemoveRange(entities);
        }

        public async Task UpdateAsync(T entity)
        {
            _context.Update(entity);

        }

        public async Task UpdateRangeAsync(IEnumerable<T> entities)
        {
            _context.UpdateRange(entities);
        }
    }
}