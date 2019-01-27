using System;
using System.ComponentModel.DataAnnotations.Schema;
using infrastructure.DataAccess.Models.Interface;

namespace infrastructure.DataAccess.Models
{
    public class Category : IIdentifiable
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        
        [Column(TypeName = "text")] 
        public string ImageSrc { get; set; }
        
        public Guid UserId { get; set; }
    }
}