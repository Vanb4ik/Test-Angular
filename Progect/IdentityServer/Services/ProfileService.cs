using System;
using System.Linq;
using System.Threading.Tasks;
using infrastructure.Services.Interfaces;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.Extensions.Logging;

namespace IdentityServer.Services
{
    public class ProfileService : IProfileService
    {
        private readonly ILogger _logger;
        private readonly IUserService _userService;

        public ProfileService(
            ILoggerFactory loggerFactory,
            IUserService userService
        )
        {
            _userService = userService;
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
                    var user = await _userService.FindByEmail(email.Value);
                    if (user != null)
                    {
                        var claims = IdentityHelpers.GetUserClaims(_userService,user);
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
                var user = await _userService.FindByEmail(email?.Value);

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