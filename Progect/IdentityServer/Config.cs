using System.Collections.Generic;
using System.Security.Claims;
using IdentityModel;
using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;
using Microsoft.Extensions.Configuration;

namespace IdentityServer
{
    public class Config
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };
        }

        public static IEnumerable<ApiResource> GetApiResources(IConfigurationRoot configuration)
        {
            return new List<ApiResource>
            {
                new ApiResource
                {
                    Name = configuration["IdentityServer:ApiName"],
                    Scopes =
                    {
                        new Scope
                        {
                            Name = configuration["IdentityServer:ApiName"],
                            UserClaims =
                            {
                                JwtClaimTypes.Role,
                                JwtClaimTypes.Email,
                                "countryId"
                            }
                        }
                    }
                }
            };
        }

        public static IEnumerable<Client> GetClients(IConfigurationRoot configuration)
        {
            return new List<Client>()
            {
                new Client()
                {
                    ClientId = configuration["IdentityServer:ApiClientName"],
                    //ClientName = configuration["IdentityServer:ApiClientName"],
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                    AccessTokenLifetime = int.Parse(configuration["IdentityServer:TokenLifetime"]),
                    //IdentityTokenLifetime = 3600,
                    ClientSecrets =
                    {
                        new Secret(configuration["IdentityServer:ApiSecret"].Sha256())
                    },
                    AllowedScopes =
                    {
                        configuration["IdentityServer:ApiName"],
                        IdentityServerConstants.StandardScopes.OfflineAccess
                    },
                    AlwaysSendClientClaims = true,
                    AllowOfflineAccess = true,
                    AlwaysIncludeUserClaimsInIdToken = true,
                    //AllowAccessTokensViaBrowser = true
                }
            };
        }
    }
}