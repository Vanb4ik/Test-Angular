using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using infrastructure.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using DbContext = Microsoft.EntityFrameworkCore.DbContext;

namespace infrastructure.DataAccess
{
    public class PostgresDbContext : DbContext
    {
        public Microsoft.EntityFrameworkCore.DbSet<Category> Categories { get; set; }

        //public DbSet<Order> Orders { get; set; }
        public Microsoft.EntityFrameworkCore.DbSet<Position> Positions { get; set; }
        public Microsoft.EntityFrameworkCore.DbSet<User> Users { get; set; }

        public PostgresDbContext(DbContextOptions<PostgresDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            /*Unique constraint*/
//            modelBuilder.Entity<Category>()
//                .HasIndex(p => p.Id)
//                .IsUnique();
//
//            modelBuilder.Entity<Position>()
//                .HasIndex(p => p.Id)
//                .IsUnique();
//
//            modelBuilder.Entity<User>()
//                .HasIndex(p => p.Id)
//                .IsUnique();
//
//
//            /*Required constraint*/
//            modelBuilder.Entity<Category>(e =>
//            {
//                e.Property(m => m.Id)
//                    .IsRequired();
//                
//                e.Property(m => m.UserId)
//                    .IsRequired();
//                
//                e.Property(m => m.Name)
//                    .IsRequired();
//            });
//                
//
//            modelBuilder.Entity<Position>()
//                .Property(m => new
//                {
//                    m.Id,
//                    m.UserId,
//                    m.CategoryId,
//                    m.Cost,
//                    m.Name
//                })
//                .IsRequired();
//
//            modelBuilder.Entity<User>()
//                .Property(m => new
//                {
//                    m.Id,
//                    m.Email,
//                    m.Password
//                })
//                .IsRequired();
        }

        public void SeedData()
        {
            if (!Users.Any())
            {
                var users = new List<User>()
                {
                    new User()
                    {
                        Id = Guid.NewGuid(),
                        Email = "admin@i.i",
                        Password = "admin@i.i",
                        Role = "admin"
                    },
                    new User()
                    {
                        Id = Guid.NewGuid(),
                        Email = "user@i.i",
                        Password = "user@i.i",
                        Role = "user"
                    }
                };

                Users.AddRange(users);
                SaveChanges();
            }
        }
    }
}