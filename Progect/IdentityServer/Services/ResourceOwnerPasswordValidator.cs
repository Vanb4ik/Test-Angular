using System;
using System.Threading.Tasks;
using infrastructure.Services.Interfaces;
using IdentityServer4.Models;
using IdentityServer4.Validation;

namespace IdentityServer.Services
{
    public class ResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator
    {
        private readonly IUserService _userService;

        public ResourceOwnerPasswordValidator(IUserService userService)
        {
            _userService = userService;
        }
        //this is used to validate your user account with provided grant at /connect/token
        public async Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            try
            {
                var email = context.UserName;
                var user = await _userService.FindByEmail(email);
                if (user != null)
                {
                    // TODO : password is not in hash yet
                    if (user.PasswordHash == context.Password)
                    {
                        await _userService.ChangeLastLoginDate(user.Email);
                        context.Result = new GrantValidationResult(
                            subject: user.Email,
                            authenticationMethod: "custom",
                            claims: IdentityHelpers.GetUserClaims(_userService, user));

                        return;
                    }

                    context.Result = InvalidGrantResult("Incorrect password");
                    return;
                }

                context.Result = InvalidGrantResult("User does not exist.");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                context.Result = InvalidGrantResult("Invalid email or password");
            }
        }

        private GrantValidationResult InvalidGrantResult(string mess)
        {
            return new GrantValidationResult(TokenRequestErrors.InvalidGrant, mess);
        }
    }
}