using infrastructure.DataAccess.Models;
using infrastructure.DataAccess.Repository.Interface;

namespace infrastructure.DataAccess.Repository
{
    public class OrderRepository : DbGenericRepositoryBase<Order>, IOrderRepository
    {
        public OrderRepository(PostgresDbContext context)
            : base(context)
        {
        }
    }
}