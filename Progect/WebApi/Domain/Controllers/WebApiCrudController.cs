using System;
using System.Threading.Tasks;
using infrastructure.DataAccess.Models.Interface;
using infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Domain.Controllers
{
    public abstract class WebApiCrudController<TService, TEntity>
        : WebApiBaseController<TService, TEntity>
        where TService : IBaseService<TEntity>
        where TEntity : class, IIdentifiable
    {
        protected WebApiCrudController(TService service)
            : base(service)
        {
        }

        [HttpGet("{id}")]
        public virtual async Task<IActionResult> Get(Guid id)
        {
            var result = await Service.FindAsync(id);
            return OkContract(result);
        }

        [HttpPost("")]
        public virtual async Task<IActionResult> Post([FromBody] TEntity entity)
        {
            await Service.AddAsync(entity, commit:true);
            return OkContract(entity);
        }

        [HttpPut("")]
        public virtual async Task<IActionResult> Put([FromBody] TEntity entity)
        {
            await Service.UpdateAsync(entity, commit: true);
            return OkContract(entity);
        }

        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> Delete(Guid id)
        {
            TEntity findItem = await Service.FindAsync(id);
            if (findItem == null)
            {
                return NotFound();
            }

            await Service.RemoveAsync(findItem, commit: true);
            return NoContent();
        }
    }
}