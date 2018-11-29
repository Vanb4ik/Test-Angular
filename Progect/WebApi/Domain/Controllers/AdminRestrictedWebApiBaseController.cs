using Microsoft.AspNetCore.Authorization;
namespace WebApi.Controllers.Domain.Controllers
{
  [Authorize(Roles = "admin")]
  public abstract class AdminRestrictedWebApiBaseController : WebApiBaseController
  {

  }
}