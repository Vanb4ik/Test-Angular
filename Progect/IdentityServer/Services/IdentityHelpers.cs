using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using IdentityModel;
using Resolff.APMS.IdentityServer.Customized;

namespace IdentityServer.Services
{
    public class IdentityHelpers
    {
        //build claims array from user data
        public static Claim[] GetUserClaims(User user)
        {
            User findUser = UserServices.FindAsync(user.Email).Result;

            var claimsList = new List<Claim>
            {
                new Claim(JwtClaimTypes.Email, user.Email ?? ""),
                /*new Claim("avatar_src", user.Avatar ?? ""),*/
            };

            claimsList.AddRange(findUser.Roles.Select(role => new Claim(JwtClaimTypes.Role, role)));
            claimsList.AddRange(findUser.CountriesId.Select(countryId => new Claim("countryId", countryId)));
            //claimsList.AddRange(countries.Select(country => new Claim("country", country)));            

            return claimsList.ToArray();
        }
    }
}