using infrastructure.DataAccess.Models.Interface;
using infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace WebApi.Domain.Controllers
{
    [Authorize]
    public class AuthorizeWebApiBaseController<TService, TEntity> : WebApiBaseController<TService, TEntity>
        where TService : IBaseService<TEntity>
        where TEntity : class, IIdentifiable
    {
        public AuthorizeWebApiBaseController(TService service) : base(service)
        {
        }
    }
}