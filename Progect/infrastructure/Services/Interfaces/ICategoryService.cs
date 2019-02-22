using System.IO;
using System.Threading.Tasks;
using infrastructure.DataAccess.Models;
using Microsoft.AspNetCore.Http;

namespace infrastructure.Services.Interfaces
{
    public interface ICategoryService : IBaseService<Category>
    {
        Task<Category> SaveCategoryAsync(Category category, IFormFile image = null);
    }
}