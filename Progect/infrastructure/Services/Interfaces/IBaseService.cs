using infrastructure.DataAccess.Models.Interface;
using infrastructure.DataAccess.Repository.Interface;

namespace infrastructure.Services.Interfaces
{
    public interface IBaseService<T>: IRepositoryBase<T> where T : class, IIdentifiable
    {
        
    }
}