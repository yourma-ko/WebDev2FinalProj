using DAL.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    [Table("Categories")]
    public class Category : BaseEntity
    {
        [Column("CategoryName")]
        [Required]
        public string CategoryName { get; set; }
        [Column("Description")]
        public string? Description { get; set; }
        public ICollection<Product> Products { get; set; } = new List<Product>();

    }
}