using Microsoft.AspNetCore.Authorization;

namespace WebApi.Controllers.Domain.Controllers
{
    [Authorize]
    public class AuthorizeWebApiBaseController : WebApiBaseController
    {
    }
}