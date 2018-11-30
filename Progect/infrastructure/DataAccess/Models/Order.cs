using System;
using infrastructure.DataAccess.Models.Interface;

namespace infrastructure.DataAccess.Models
{
    public class Order : IIdentifiable
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;  
        public  Guid UserId { get; set; }
        public int OrderNumber { get; set; }
        
    }
}