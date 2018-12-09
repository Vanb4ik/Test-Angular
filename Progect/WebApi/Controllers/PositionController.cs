/*using System;
using Microsoft.AspNetCore.Mvc;
using WebApi.Controllers.Domain.Attributes;
using WebApi.Domain.Controllers;

namespace WebApi.Controllers
{
    [ApiRoute("position")]
    public class PositionController : AuthorizeWebApiBaseController
    {
        [HttpGet("{categoryId}")]
        public IActionResult Get(Guid cayegoryId)
        {
            return OkContract(new { });
        }

        [HttpDelete("{positionId}")]
        public IActionResult Delete(string positionId)
        {
            return NoContent();
        }

        [HttpPost("")]
        public IActionResult Post(Category category)
        {
            return NoContent();
        }

        [HttpPut("{positionId}")]
        public IActionResult Put(Category category)
        {
            return NoContent();
        }
    }
}*/