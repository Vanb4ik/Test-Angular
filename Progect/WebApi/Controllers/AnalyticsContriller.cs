/*using Microsoft.AspNetCore.Mvc;
using WebApi.Controllers.Domain.Attributes;
using WebApi.Domain.Controllers;

namespace WebApi.Controllers
{
    [ApiRoute("analytics")]
    [Route("[controller]/[acton]")]
    public class AnalyticsController : AdminRestrictedWebApiCrudController
    {
        [HttpGet("{overview}")]
        public IActionResult Overview()
        {
            return OkContract(new { });
        }

        [HttpGet("{analytics}")]
        public IActionResult Analytics()
        {
            return OkContract(new { });
        }
    }
}*/