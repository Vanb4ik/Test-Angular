using System;

namespace infrastructure.DataAccsess.Models
{
    public class Position
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Cost { get; set; }
        public Guid CategoryId { get; set; }
        public Guid UserId { get; set; }
    }
}