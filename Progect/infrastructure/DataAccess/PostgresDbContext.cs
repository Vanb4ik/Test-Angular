using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using infrastructure.DataAccess.Models;
using infrastructure.Enums;
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
            bool saveFlag = false;

            if (!Users.Any())
            {
                saveFlag = true;
                var users = new List<User>()
                {
                    new User()
                    {
                        Id = Guid.NewGuid(),
                        Email = "admin@i.i",
                        PasswordHash = "admin@i.i",
                        Role = Enum.GetName(typeof(Role), Role.admin),
                        IsApproved = true,
                    },
                    new User()
                    {
                        Id = Guid.NewGuid(),
                        Email = "owner@i.i",
                        PasswordHash = "owner@i.i",
                        Role = Enum.GetName(typeof(Role), Role.owner),
                        IsApproved = true,
                    }
                };

                Users.AddRangeAsync(users);
            }

            if (!Categories.Any())
            {
                saveFlag = true;
                var category = new List<Category>()
                {
                    new Category()
                    {
                        Id = Guid.NewGuid(),
                        Name = "Test category 1",
                        UserId = Users.First().Id,
                        ImageSrc ="/upload/images/cat1.jpg"
                    }, 
                    new Category()
                    {
                        Id = Guid.NewGuid(),
                        Name = "Test category 2",
                        UserId = Users.First().Id,
                        ImageSrc ="/upload/images/cat2.jpeg"
                    },
                };

                Categories.AddRangeAsync(category);
            }

            if (saveFlag)
            {
                SaveChanges();
            }
        }
    }
}