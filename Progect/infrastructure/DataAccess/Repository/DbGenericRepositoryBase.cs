﻿using System;
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

        public async Task AddAsync(T entity)
        {
            if (entity.Id == Guid.Empty)
            {
                entity.Id = Guid.NewGuid();
            }

            await Context.AddAsync(entity);
            await Context.SaveChangesAsync();
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

            await Context.Set<T>().AddRangeAsync(enumerable);
            await Context.SaveChangesAsync();
        }


        public async Task<T> FindAsync(Guid entityID)
        {
            return await Context.FindAsync<T>(new object[] {entityID});
        }

        public async Task<IList<T>> GetAllAsync()
        {
            return await Context.Set<T>().ToListAsync();
        }

        public async Task RemoveAsync(T entity)
        {
            Context.Set<T>().Remove(entity);
        }

        public async Task RemoveRangeAsync(IEnumerable<T> entities)
        {
            Context.RemoveRange(entities);
        }

        public async Task UpdateAsync(T entity)
        {
            Context.Update(entity);
        }

        public async Task UpdateRangeAsync(IEnumerable<T> entities)
        {
            Context.UpdateRange(entities);
        }
    }
}