using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using infrastructure.DataAccess;
using infrastructure.DataAccess.Models;
using Infrastructure.Services.Interfaces;

namespace infrastructure.Services
{
    public class PositionService : BaseService<Position>, IPositionService
    {
        
        public PositionService(PostgresDbContext context)
            : base(context)
        {
        }

        public async Task<IList<Position>> FindAllByCategoryId(Guid categoryId)
        {
            var res = Context.Positions.Where(m => m.CategoryId == categoryId).ToList();
            return res;
        }
    }
}