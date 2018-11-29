using System;

namespace infrastructure.DataAccsess.Models
{
    public class Order
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public  Guid UserId { get; set; }
    }
}