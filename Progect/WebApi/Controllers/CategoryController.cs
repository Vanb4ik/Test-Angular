using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using infrastructure.DataAccess.Models;
using infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebApi.Domain.Attributes;
using WebApi.Domain.Controllers;

namespace WebApi.Controllers
{
    [ApiRoute("category")]
    
    public class CategoryController : AuthorizeWebApiBaseController<ICategoryService, Category>
    {
        public CategoryController(ICategoryService categoryService)
            : base(categoryService)
        {
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> Get()
        {
            IList<Category> result = await Service.GetAllAsync();
            
            return OkContract(result);
        }
        
        [HttpPost("upload")]
        public async Task<IActionResult> Post(IFormFile image, string rawCategory)
        {
            Category category = JsonConvert.DeserializeObject<Category>(rawCategory);
            if (category == null)
            {
                return BadRequestContract("");
            }

            if (category.Id != Guid.Empty)
            {
                var findCategoryInRepo = await Service.FindAsync(category.Id);
                if (findCategoryInRepo == null)
                {
                    return BadRequestContract("");
                }
            }
            
            Category result = await Service.SaveCategoryAsync(category, image);
            
            return OkContract(result);
        }
    }
}