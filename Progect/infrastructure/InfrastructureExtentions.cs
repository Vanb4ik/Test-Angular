using infrastructure.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

public static class InfrastructureExtentions
{
    public static IServiceCollection InfrustructureServices(this IServiceCollection services,
        string connectionString)
    {
        services.AddDbContext<PostgresDbContext>(builder => builder.UseSqlServer(connectionString));

        return services;
    }
}