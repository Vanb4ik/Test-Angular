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
    public class UserController : AdminRestrictedWebApiBaseController<IUserService, User>
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
                return BadRequest("Invalid data owner");
            }

            User findUser = await Service.FindByEmail(owner.Email);

            if (findUser != null)
            {
                return BadRequestContract("Email is not unical");
            }

            await Service.AddAsync(owner.ToUser());

            return NoContent();
        }

        [HttpGet("owner")]
        [AllowAnonymous]
        public async Task<IActionResult> Get([FromQuery] string email,[FromQuery] string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                return BadRequest("Invalid data owner");
            }

            User findUserByEmail = await Service.FindByEmail(email);
            
            if (findUserByEmail == null)
            {
                return BadRequestContract("The user with this email was not found");
            }

            User findUserByPassword = await Service.FindByPassword(password);

            if (findUserByPassword == null || findUserByEmail.Email != email)
            {
                return BadRequestContract("Invalid password");
            }

            var token =  await Service.GetAuthorize(findUserByEmail);

            return Ok(token);
        }
    }
}