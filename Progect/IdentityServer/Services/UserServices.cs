using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Resolff.APMS.IdentityServer.Customized
{
    public class User
    {
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public bool IsApproved { get; set; }
        public bool IsLockedOut { get; set; }
        public DateTime LasLoginDateTime { get; set; }
        public string Comment { get; set; }
        public string[] Roles { get; set; }
        public string[] CountriesId { get; set; }
    }

    

    public class UserServices
    {
        public static IList<User> Users { get; set; } = new List<User>();
        
        public static Task<User> FindAsync(string email)
        {
            if (!Users.Any())
            {
                Users= GetUsers();
            } 
            return Task.FromResult(
                Users.FirstOrDefault(m => m.Email == email)
            );
        }

        public static async Task ChangeLastLoginDate(string email)
        {
            User user = await FindAsync(email);
            user.LasLoginDateTime = DateTime.UtcNow;
        }

        public static List<User> GetUsers()
        {
            return new List<User>()
            {
                new User()
                {
                    Email = "admin@i.com",
                    PasswordHash = "admin@i.com",
                    Roles = new[] {"admin"},
                    CountriesId = new[] {"ci", "sn"},
                },

                new User()
                {
                    Email = "manager@i.com",
                    PasswordHash = "manager@i.com",
                    Roles = new[] {"manager"},
                    CountriesId = new[] {"ci"},
                },
                
                new User()
                {
                    Email = "operator@i.com",
                    PasswordHash = "operator@i.com",
                    Roles = new[] {"operator"},
                    CountriesId = new[] {"sn"},
                }
            };
        }
    }
}