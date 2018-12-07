using System;
using System.Linq;
using infrastructure.Services;
using infrastructure.Services.Interfaces;
using IdentityServer.Services;
using IdentityServer4.Services;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace IdentityServer
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();

            Console.WriteLine(JsonConvert.SerializeObject(
                Configuration
                    .AsEnumerable()
                    .ToDictionary(_ => _.Key, _ => _.Value)
                , Formatting.Indented));
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.InfrustructureServices(Configuration["ConnectionString"]);
            
            services.AddIdentityServer(_ => _.IssuerUri = Configuration["IdentityServer:IssuerUri"])
                .AddDeveloperSigningCredential()
                .AddInMemoryIdentityResources(Config.GetIdentityResources())
                .AddInMemoryApiResources(Config.GetApiResources(Configuration))
                .AddInMemoryClients(Config.GetClients(Configuration))
                .AddProfileService<ProfileService>();
            services.AddTransient<IResourceOwnerPasswordValidator, ResourceOwnerPasswordValidator>();
            services.AddTransient<IProfileService, ProfileService>();

            services.AddMvc();
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseCors(builder =>
                builder.WithOrigins("*")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
            );
            app.UseIdentityServer();
            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();
        }
    }
}