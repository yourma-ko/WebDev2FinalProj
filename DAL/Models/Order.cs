using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public enum OrderStatus
    {
        Pending,
        Processing,
        Delivered,
        Cancelled
    }
    [Table("Orders")]
    public class Order : BaseEntity
    {
        [Column("CustomerId")]
        [ForeignKey("Users")]
        public Guid CustomerId { get; set; }
        public virtual User Customer { get; set; }

        [Column("TotalPrice")]
        public decimal TotalPrice { get; set; }
        [Column("OrderDateTime")]
        public DateTime OrderDateTime { get; set; } = DateTime.Now;
        [Column("Status")]
        public OrderStatus Status { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
        public decimal Total { get; set; }

    }
}
