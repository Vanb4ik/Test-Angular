using infrastructure.DataAccess.Models;
using infrastructure.DataAccess.Repository.Interface;

namespace infrastructure.DataAccess.Repository
{
    public class CategoryRepository : DbGenericRepositoryBase<Category>, ICategoryRepository
    {
        public CategoryRepository(PostgresDbContext context)
            : base(context)
        {
        }
    }
}