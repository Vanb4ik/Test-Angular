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
        public PostgresDbContext Context { get; }

        public DbGenericRepositoryBase(PostgresDbContext context)
        {
            Context = context;
        }

        public virtual async Task<T> AddAsync(T entity, bool commit = false)
        {
            if (entity.Id == Guid.Empty)
            {
                entity.Id = Guid.NewGuid();
            }

            await Context.AddAsync(entity);
            if (commit) { Context.SaveChanges(); }
            return entity;
        }

        public virtual async Task AddRangeAsync(IEnumerable<T> entities, bool commit = false)
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

            await Context.Set<T>().AddRangeAsync(enumerable);
            if (commit) { Context.SaveChanges(); }
        }

        public virtual async Task<T> FindAsync(Guid entityID)
        {
            Context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            var result =  await Context.FindAsync<T>(new object[] {entityID});

            return result;
        }

        public virtual async Task<IList<T>> GetAllAsync()
        {
            return await Context.Set<T>().ToListAsync();
        }

        public virtual async Task RemoveAsync(T entity, bool commit = false)
        {
            Context.Set<T>().Remove(entity);
            if (commit) { Context.SaveChanges(); }
        }

        public virtual async Task RemoveRangeAsync(IEnumerable<T> entities, bool commit = false)
        {
            Context.RemoveRange(entities);
            if (commit) { Context.SaveChanges(); }
        }

        public virtual async Task UpdateAsync(T entity, bool commit = false)
        {
            Context.Update(entity);
            if (commit) { Context.SaveChanges(); }
        }

        public virtual async Task UpdateRangeAsync(IEnumerable<T> entities, bool commit = false)
        {
             Context.UpdateRange(entities);
            if (commit) { Context.SaveChanges(); }
        }
    }
}