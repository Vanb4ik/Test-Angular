using System;
using System.ComponentModel.DataAnnotations;
using infrastructure.DataAccess.Models.Interface;

namespace infrastructure.DataAccess.Models
{
    
    public class Position : IIdentifiable
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Cost { get; set; }
        public Guid CategoryId { get; set; }
        public Guid UserId { get; set; }
    }
}