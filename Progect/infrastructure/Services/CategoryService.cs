using System;
using System.IO;
using System.Threading.Tasks;
using infrastructure.Config;
using infrastructure.DataAccess;
using infrastructure.DataAccess.Models;
using infrastructure.Services.Interfaces;
using Microsoft.Extensions.Options;

namespace infrastructure.Services
{
    public class CategoryService : BaseService<Category>, ICategoryService
    {
        private IFileStoreService _fileStoreService;
        public CategoryService(PostgresDbContext context, IFileStoreService fileStoreService)
            : base(context)
        {
            _fileStoreService = fileStoreService;
        }

        public async Task<Category> SaveCategoryAsync(Category category, Stream stream = null)
        {
            if (stream != null)
            {
                category.ImageSrc = await SaveImageToFSAsync(category, stream);
            }

            if (category.Id == Guid.Empty)
            {
                await AddAsync(category);
                
                return category;
            }

            await UpdateAsync(category);

                
            return category;
        }

        private async Task<string> SaveImageToFSAsync(Category category, Stream stream)
        {
            var imageDir = _fileStoreService.GetImageDir();
            var imageToParentFullPassDirectory = Path.Combine(imageDir.AbsolutePas, category.Id.ToString());
            var imageToParentRelativePassDirectory = Path.Combine(imageDir.RelativePas, category.Id.ToString());
            var imageFileName = $"{Guid.NewGuid()}_.jpg";
            
            var imageFullPassFileName = Path.Combine(imageToParentFullPassDirectory,imageFileName);
            var imageRelativePassFileName = Path.Combine(imageToParentRelativePassDirectory,imageFileName);

            using (var imageStream = new FileStream(imageFullPassFileName, FileMode.Create))
            {
                await stream.CopyToAsync(imageStream);
            }

            return imageRelativePassFileName;
        }
        
    }
}