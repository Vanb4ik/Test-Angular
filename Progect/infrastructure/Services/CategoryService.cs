using System;
using System.IO;
using System.Threading.Tasks;
using infrastructure.DataAccess;
using infrastructure.DataAccess.Models;
using infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Http;

namespace infrastructure.Services
{
    public class CategoryService : BaseService<Category>, ICategoryService
    {
        private readonly IFileStoreService _fileStoreService;
        public CategoryService(PostgresDbContext context, IFileStoreService fileStoreService)
            : base(context)
        {
            _fileStoreService = fileStoreService;
        }

        public async Task<Category> SaveCategoryAsync(Category category, IFormFile image = null)
        {
            if (category.Id == Guid.Empty)
            {
                var savedCategory = await AddAsync(category);
                category.Id = savedCategory.Id;
            }
            else
            {
                await UpdateAsync(category);
            }
            if (image != null)
            {
                category.ImageSrc = await SaveImageToFSAsync(category, image);
            }

            Context.SaveChanges();
            return category;
        }

        private async Task<string> SaveImageToFSAsync(Category category, IFormFile image)
        {
            var stream = image.OpenReadStream();
            var imageDir = _fileStoreService.GetImageDir();
            var imageToParentFullPassDirectory = Path.Combine(imageDir.AbsolutePas, category.Id.ToString());
            var imageToParentRelativePassDirectory = Path.Combine(imageDir.RelativePas, category.Id.ToString());
            var ext = Path.GetExtension(image.FileName);
            var imageFileName = $"{Guid.NewGuid()}_{ext}";

            if (!Directory.Exists(imageToParentFullPassDirectory))
            {
                Directory.CreateDirectory(imageToParentFullPassDirectory);
            }
            var imageFullPassFileName = Path.Combine(imageToParentFullPassDirectory, imageFileName);
            var imageRelativePassFileName = Path.Combine(imageToParentRelativePassDirectory, imageFileName);

            using (var imageStream = new FileStream(imageFullPassFileName, FileMode.Create))
            {
                await stream.CopyToAsync(imageStream);
            }

            return imageRelativePassFileName;
        }

    }
}