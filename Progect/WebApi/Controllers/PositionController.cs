using System;
using System.Threading.Tasks;
using infrastructure.DataAccess.Models;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using WebApi.Domain.Attributes;
using WebApi.Domain.Controllers;

namespace WebApi.Controllers
{
    [ApiRoute("position")]
    public class PositionController : AuthorizeWebApiBaseController<IPositionService, Position>
    {
        public PositionController(IPositionService service):base(service)
        { }

        [HttpGet("getAll/{categoryId}")]
        public async Task<IActionResult> GetAll(Guid categoryId)
        {
            var result = await Service.FindAllByCategoryId(categoryId);

            return OkContract(result);
        }
    }
}