using System;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer.Services;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.Extensions.Logging;

namespace Resolff.APMS.IdentityServer.Customized
{
    public class ProfileService : IProfileService
    {
        private readonly ILogger _logger;

        public ProfileService(
            ILoggerFactory loggerFactory
        )
        {
            _logger = loggerFactory.CreateLogger<ProfileService>();
        }

        //Get user profile date in terms of claims when calling /connect/userinfo
        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            try
            {
                var email = context.Subject.Claims.FirstOrDefault(x => x.Type == "sub");

                if (email == null)
                {
                    _logger.LogError("No claim of type 'sub'");
                }
                else if (email.Value == null)
                {
                    _logger.LogError("email in 'sub' claim is empty");
                }
                else
                {
                    var user = await UserServices.FindAsync(email.Value);
                    if (user != null)
                    {
                        var claims = IdentityHelpers.GetUserClaims(user);
                        context.IssuedClaims = claims.Where(x => context.RequestedClaimTypes.Contains(x.Type)).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("error happend while setting issued claims + \n" + ex.Message);
            }
        }

        //check if user account is active.
        public async Task IsActiveAsync(IsActiveContext context)
        {
            try
            {
                var email = context.Subject.Claims.FirstOrDefault(x => x.Type == "sub");
                var user = await UserServices.FindAsync(email?.Value);

                if (user != null)
                {
                    context.IsActive = !user.IsLockedOut;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("error happend while user activity check + \n" + ex.Message);
            }
        }
    }
}