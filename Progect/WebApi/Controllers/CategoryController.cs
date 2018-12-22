/*using System;
using infrastructure.TokenAccess.Repository.Interface;
using Microsoft.AspNetCore.Mvc;
using WebApi.Controllers.Domain.Attributes;
using WebApi.Domain.Controllers;

namespace WebApi.Controllers
{
    [ApiRoute("category")]
    public class Category : AdminRestrictedWebApiCrudController<ICategoryServi, Category>
    {
        public Category(ICategoryRepository)
        {
            
        }
        [HttpGet("")]
        public IActionResult Get()
        {
            return OkContract(new { });
        }

        [HttpGet("{categoryId}")]
        public IActionResult Get(Guid categoryId)
        {
            return OkContract(new {categoryId});
        }

        [HttpDelete("{categoryId}")]
        public IActionResult Delete(string categoryId)
        {
            return NoContent();
        }

        [HttpPost("")]
        public IActionResult Post(Category category)
        {
            return NoContent();
        }

        [HttpPut("{categoryId}")]
        public IActionResult Put(Category category)
        {
            return NoContent();
        }
    }
}*/