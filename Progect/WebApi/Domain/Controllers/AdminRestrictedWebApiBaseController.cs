using infrastructure.DataAccess.Models.Interface;
using infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace WebApi.Domain.Controllers
{
    [Authorize(Roles = "admin")]
    public abstract class
        AdminRestrictedWebApiBaseController<TService, TEntity> : WebApiCrudController<TService, TEntity>
        where TService : IBaseService<TEntity>
        where TEntity : class, IIdentifiable
    {
        protected AdminRestrictedWebApiBaseController(TService service)
            : base(service)
        {
        }
    }
}