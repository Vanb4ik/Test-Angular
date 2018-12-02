using System;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace WebApi.Configuration
{
    public static class StartupExtensions
    {
        public static IServiceCollection AddIdentityServerServices(this IServiceCollection collection,
            IConfigurationRoot config)
        {
            collection.AddMvcCore()
                //.AddAuthorization()
                .AddAuthorization(options =>
                    {
                        options.AddPolicy("AdminsOnly", policyUser => { policyUser.RequireClaim("role", "admin"); });
                        options.AddPolicy("AdminsManagersOnly",
                            policyUser => { policyUser.RequireClaim("role", "manager", "admin"); });
                    }
                )
                .AddJsonFormatters();

            collection
                .AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                .AddIdentityServerAuthentication(options =>
                {
                    options.Authority = config["IdentityServer:Url"];
                    options.RequireHttpsMetadata = bool.Parse(config["IdentityServer:RequireHttpsMetadata"]);
                    options.ApiName = config["IdentityServer:ApiName"];
                    options.ApiSecret = config["IdentityServer:ApiSecret"];
                });

            return collection;
        }

        public static IApplicationBuilder UseConfiguredCors(this IApplicationBuilder app)
        {
            return app.UseCors(builder =>
                builder.WithOrigins("*")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
            );
        }
    }
}