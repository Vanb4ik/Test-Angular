using infrastructure.DataAccess.Models;
using infrastructure.DataAccess.Repository.Interface;

namespace infrastructure.DataAccess.Repository
{
    public class PositionRepository : DbGenericRepositoryBase<Position>, IPositionRepository
    {
        public PositionRepository(PostgresDbContext context)
            : base(context)
        {
        }
    }
}