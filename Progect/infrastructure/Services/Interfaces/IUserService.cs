using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using infrastructure.DataAccess.Models;

namespace infrastructure.Services.Interfaces
{
    public interface IUserService: IBaseService<User>
    {
        Task<User> FindByEmail(string email);
        Task ChangeLastLoginDate(string email);
    }
}