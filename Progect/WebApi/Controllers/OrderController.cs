using Microsoft.AspNetCore.Mvc;
using WebApi.Controllers.Domain.Attributes;
using WebApi.Controllers.Domain.Controllers;

namespace WebApi.Controllers
{
    [ApiRoute("order")]
    public class OrderController: AuthorizeWebApiBaseController
    {
        [HttpGet]
        public IActionResult Get()
        {
            return OkContract(new {});
        }

        [HttpPost]
        public IActionResult Post()
        {
            return NoContent();
        }
    }
}