using System.Net;
using infrastructure.DataAccess.Models.Interface;
using infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using WebApi.Controllers.Domain;
using WebApi.Domain.Contracts;

namespace WebApi.Domain.Controllers
{
    public abstract class WebApiBaseController<TService, TEntity> : Controller 
        where TService : IBaseService<TEntity>
        where TEntity : class, IIdentifiable
    {
        protected TService Service { get; }

        protected WebApiBaseController(TService service)
        {
            Service = service;
        }
        
        protected IActionResult OkContract(TEntity data)
        {
            return Ok(new Contract<TEntity>(data));
        }

        protected IActionResult NotFoundContract(string errorCode)
        {
            return NotFound(new Contract<TEntity>(errorCode));
        }

        protected IActionResult ForbidContract(string errorCode)
        {
            return new ObjectResult(new Contract<TEntity>(errorCode))
            {
                StatusCode = (int) HttpStatusCode.Forbidden
            };
        }

        protected IActionResult BadRequestContract(string errorCode)
        {
            return new ObjectResult(new Contract<TEntity>(errorCode))
            {
                StatusCode = (int) HttpStatusCode.BadRequest
            };
        }

        protected IActionResult OkPagedContract(PagedList<TEntity> data)
        {
            if (data.PagesCount < data.Page && data.PagesCount > 0)
            {
                return NotFound();
            }

            return Ok(new PagedContract<TEntity>(data));
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