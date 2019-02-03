using infrastructure.DataAccess;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace WebApi.Config
{
    public static class WebAppExtentions
    {
        public static IApplicationBuilder MigratePrintDb(this IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>()
                .CreateScope())
            {
                var dbcontext = serviceScope.ServiceProvider.GetService<PostgresDbContext>();

                try
                {
                    dbcontext.Users.Any();
                }
                catch (System.Exception)
                {

                    dbcontext.Database.EnsureCreated();
                //    dbcontext.Database.GetMigrations();
                }

                dbcontext.Database.Migrate();
                dbcontext.SeedData();
            }

            return app;
        }
    }
}