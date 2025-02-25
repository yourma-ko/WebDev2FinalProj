using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    [Table("OrderItems")]
    public class OrderItem : BaseEntity
    {
        [Column("OrderId")]
        public Guid OrderId { get; set; }
        [ForeignKey("OrderId")]
        public virtual Order Order { get; set; }
        [Column("ProductId")]
        public Guid ProductId { get; set; }
        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }
        [Column("Quantity")]
        public int Quantity { get; set; }
        [Column("Price")]
        public decimal Price { get; set; }
        [Column("Title")]
        public string Title { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}
