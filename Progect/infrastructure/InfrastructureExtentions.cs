using infrastructure.DataAccess;
using infrastructure.Services;
using infrastructure.Services.Interfaces;
using Infrastructure.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

public static class InfrastructureExtentions
{
    public static IServiceCollection InfrustructureServices(this IServiceCollection services,
        string connectionString)
    {
        services
            .AddEntityFrameworkNpgsql()
            .AddDbContext<PostgresDbContext>(builder => builder.UseNpgsql(connectionString),
                ServiceLifetime.Scoped)
            
            .AddScoped<IPositionService, PositionService>()
            .AddScoped<IUserService, UserService>()
            .AddScoped<ICategoryService, CategoryService>()
            .AddScoped<IFileStoreService, FileStoreService>()
            
            ;
        return services;
    }
}