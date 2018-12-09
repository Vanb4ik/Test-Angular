using System;
using infrastructure.DataAccess.Models;
using infrastructure.DataAccess.Models.Interface;
using infrastructure.Enums;

namespace infrastructure.DataAccess.DTO
{
    public class Owner: IIdentifiable
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }

        public User ToUser()
        {
            return  new User()
            {
                Id = Id,
                Email = Email,
                PasswordHash = PasswordHash,
                IsApproved = true,
                Role = Enum.GetName(typeof(Role), Role.owner),
            };
        }
    }
}