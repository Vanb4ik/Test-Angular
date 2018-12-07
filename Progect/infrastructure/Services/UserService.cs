using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using infrastructure.DataAccess;
using infrastructure.DataAccess.Models;
using infrastructure.Services.Interfaces;

namespace infrastructure.Services
{
    public class UserService : BaseService<User>, IUserService
    {
        public UserService(PostgresDbContext context)
            : base(context)
        {
        }

        public async Task<User> FindByEmail(string email)
        {
           User  user = Context.Set<User>().SingleOrDefault(m => m.Email == email);
            return user;
        }
        
        public async Task ChangeLastLoginDate(string email)
        {
            User user = await FindByEmail(email);
            if (user == null)
            {
                throw new ArgumentException($"Undefined user by email = {email}");
            }

            Context.Users.Update(user);
        }
    }
}