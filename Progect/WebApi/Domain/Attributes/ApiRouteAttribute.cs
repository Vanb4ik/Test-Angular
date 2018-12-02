using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers.Domain.Attributes
{
    public class ApiRouteAttribute : RouteAttribute
    {
        public ApiRouteAttribute(string controllerName) : base($"api/{controllerName}")
        {
        }
    }
}