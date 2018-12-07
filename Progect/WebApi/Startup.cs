using System;
using System.Linq;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using WebApi.Config;


namespace WebApi
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


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .InfrustructureServices(Configuration["ConnectionString"])
                .Configure<FormOptions>(x =>
                {
                    x.ValueLengthLimit = int.MaxValue;
                    x.MultipartBodyLengthLimit = long.MaxValue; // In case of multipart
                    x.MultipartHeadersLengthLimit = int.MaxValue;
                })
                .AddIdentityServerServices(Configuration)
                .AddMvc();
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            var staticFilesOptions = new StaticFileOptions
            {
                OnPrepareResponse = context =>
                {
                    context.Context.Response.Headers.Add("Cache-Control", "no-cache, no-store");
                    context.Context.Response.Headers.Add("Expires", "-1");
                }
            };

            app
                //.UseApplicationLogging(loggerFactory, Configuration)
                .UseAuthentication()
                .MigratePrintDb()
                .UseStaticFiles(staticFilesOptions)
                .UseConfiguredCors()
                .UseMvc();
        }
    }
}