using System;
using infrastructure.DataAccess.Models.Interface;

namespace infrastructure.DataAccess.Models
{
    public class User : IIdentifiable
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public bool IsApproved { get; set; }
        public bool IsLockedOut { get; set; }
        public DateTime CreationDate { get; set; } = DateTime.UtcNow;
        public DateTime LasLoginDateTime { get; set; }
        public string Comment { get; set; }
        public string Role { get; set; }
    }
}