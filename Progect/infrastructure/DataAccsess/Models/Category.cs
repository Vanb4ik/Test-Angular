using System;

namespace infrastructure.DataAccsess.Models
{
    public class Category
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ImageSrc { get; set; }
        public Guid UserId { get; set; }
    }
}