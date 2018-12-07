using infrastructure.DataAccess;
using infrastructure.Services;
using infrastructure.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;

public static class InfrastructureExtentions
{
    public static IServiceCollection InfrustructureServices(this IServiceCollection services,
        string connectionString)
    {
        services
            .AddEntityFrameworkNpgsql()
            .AddDbContext<PostgresDbContext>(builder => builder.UseNpgsql(connectionString),
                ServiceLifetime.Singleton)
            .AddScoped<IUserService, UserService>()
            /*
            .BuildServiceProvider();*/
            ;
        return services;
    }
}