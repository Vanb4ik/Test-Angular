using infrastructure.DataAccess.Models;
using infrastructure.DataAccess.Repository.Interface;

namespace infrastructure.DataAccess.Repository
{
    public class UserRepository : DbGenericRepositoryBase<User>, IUserRepository
    {
        public UserRepository(PostgresDbContext context)
            : base(context)
        {
        }
    }
}