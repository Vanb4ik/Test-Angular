using System;
using System.Threading.Tasks;
using IdentityServer4.Models;
using IdentityServer4.Validation;
using Resolff.APMS.IdentityServer.Customized;

namespace IdentityServer.Services
{
    public class ResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator
    {
        //this is used to validate your user account with provided grant at /connect/token
        public async Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            try
            {
                var email = context.UserName;
                var user = await UserServices.FindAsync(email);
                if (user != null)
                {
                    // TODO : password is not in hash yet
                    if (user.PasswordHash == context.Password)
                    {
                        await UserServices.ChangeLastLoginDate(user.Email);
                        context.Result = new GrantValidationResult(
                            subject: user.Email,
                            authenticationMethod: "custom",
                            claims: IdentityHelpers.GetUserClaims(user));

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