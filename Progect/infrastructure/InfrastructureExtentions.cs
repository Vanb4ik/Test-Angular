using infrastructure.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;

public static class InfrastructureExtentions
{
    public static IServiceCollection InfrustructureServices(this IServiceCollection services,
        string connectionString)
    {
        services
            .AddMvc();
        services
            .AddEntityFrameworkNpgsql()
            .AddDbContext<PostgresDbContext>(builder => builder.UseNpgsql(connectionString),
                ServiceLifetime.Singleton)
            /*
            .BuildServiceProvider();*/
            ;
        return services;
    }
}