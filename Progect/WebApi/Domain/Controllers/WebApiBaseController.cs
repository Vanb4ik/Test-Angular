using System.Net;
using Microsoft.AspNetCore.Mvc;
using Resolff.APMS.CRM.WebAPI.Domain.Contracts;
using WebApi.Controllers.Domain.Contracts;

namespace WebApi.Controllers.Domain.Controllers
{
    public abstract class WebApiBaseController : Controller
    {
        protected IActionResult OkContract<T>(T data)
            where T : class
        {
            return Ok(new Contract<T>(data));
        }

        protected IActionResult NotFoundContract<T>(string errorCode)
            where T : class
        {
            return NotFound(new Contract<T>(errorCode));
        }

        protected IActionResult ForbidContract<T>(string errorCode)
            where T : class
        {
            return new ObjectResult(new Contract<T>(errorCode))
            {
                StatusCode = (int) HttpStatusCode.Forbidden
            };
        }

        protected IActionResult BadRequestContract<T>(string errorCode)
            where T : class
        {
            return new ObjectResult(new Contract<T>(errorCode))
            {
                StatusCode = (int) HttpStatusCode.BadRequest
            };
        }

        protected IActionResult OkPagedContract<T>(PagedList<T> data)
            where T : class
        {
            if (data.PagesCount < data.Page && data.PagesCount > 0)
            {
                return NotFound();
            }

            return Ok(new PagedContract<T>(data));
        }

        protected IActionResult NotFoundPagedContract<T>(string errorCode)
            where T : class
        {
            return NotFound(new PagedContract<T>(errorCode));
        }

        protected IActionResult ForbidPagedContract<T>(string errorCode)
            where T : class
        {
            return new ObjectResult(new PagedContract<T>(errorCode))
            {
                StatusCode = (int) HttpStatusCode.Forbidden
            };
        }

        protected IActionResult BadRequestPagedContract<T>(string errorCode)
            where T : class
        {
            return BadRequest(new PagedContract<T>(errorCode));
        }
    }
}