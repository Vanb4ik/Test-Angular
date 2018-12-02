using System;
using infrastructure.DataAccess.Models.Interface;

namespace infrastructure.DataAccess.Models
{
    public class User : IIdentifiable
    {
        public Guid Id { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}