using System.Threading.Tasks;
using infrastructure.DataAccess.DTO;
using infrastructure.DataAccess.Models;
using infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Domain.Attributes;
using WebApi.Domain.Controllers;

namespace WebApi.Controllers
{
    [ApiRoute("user")]
    public class UserController : AdminRestrictedWebApiCrudController<IUserService, User>
    {
        public UserController(IUserService service) : base(service)
        {
        }

        [HttpPost("owner")]
        [AllowAnonymous]
        public async Task<IActionResult> Post([FromBody] Owner owner)
        {
            if (owner == null || string.IsNullOrEmpty(owner.Email) || string.IsNullOrEmpty(owner.PasswordHash))
            {
                return BadRequestContract("Invalid data owner");
            }

            User findUser = await Service.FindByEmail(owner.Email);

            if (findUser != null)
            {
                return BadRequestContract("Email is not unical");
            }
            
            await Service.AddAsync(owner.ToUser());

            return NoContent();
        }
    }
}