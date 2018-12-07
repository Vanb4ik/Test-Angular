using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using infrastructure.DataAccess.Models;
using infrastructure.Services.Interfaces;
using IdentityModel;

namespace IdentityServer.Services
{
    public class IdentityHelpers
    {
        
        //build claims array from user data
        public static  Claim[] GetUserClaims(IUserService userService, User user)
        {
            User findUser = userService.FindByEmail(user.Email).Result;

            var claimsList = new List<Claim>
            {
                new Claim(JwtClaimTypes.Email, user.Email ?? ""),
                new Claim(JwtClaimTypes.Role, user.Role ?? ""),
            };

            //claimsList.AddRange(findUser.Roles.Select(role => new Claim(JwtClaimTypes.Role, role)));
            //claimsList.AddRange(findUser.CountriesId.Select(countryId => new Claim("countryId", countryId)));
            //claimsList.AddRange(countries.Select(country => new Claim("country", country)));            

            return claimsList.ToArray();
        }
    }
}