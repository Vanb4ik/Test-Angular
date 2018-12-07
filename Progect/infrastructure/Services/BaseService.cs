using infrastructure.DataAccess;
using infrastructure.DataAccess.Models.Interface;
using infrastructure.DataAccess.Repository;
using infrastructure.Services.Interfaces;

namespace infrastructure.Services
{
    public class BaseService<T> : DbGenericRepositoryBase<T>, IBaseService<T> where T : class, IIdentifiable
    {
       
        public BaseService(PostgresDbContext context)
            : base(context)
        {
        }
    }
}