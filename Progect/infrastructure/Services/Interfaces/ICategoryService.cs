using System.IO;
using System.Threading.Tasks;
using infrastructure.DataAccess.Models;

namespace infrastructure.Services.Interfaces
{
    public interface ICategoryService : IBaseService<Category>
    {
        Task<Category> SaveCategoryAsync(Category category, Stream stream = null);
    }
}