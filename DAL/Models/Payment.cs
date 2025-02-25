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
    public enum PaymentMethod
    {
        CreditCard,
        DebitCard,
        PayPal
    }
    [Table("Payments")]
    public class Payment : BaseEntity
    {
        [Column("OrderId")]
        [Required]
        public Guid OrderId { get; set; }
        [ForeignKey("OrderId")]
        public Order Order { get; set; }
        [Column("PaymentDate")]
        [Required]
        public DateTime PaymentDate { get; set; } = DateTime.Now;
        [Column("Amount")]
        [Required]
        public decimal Amount { get; set; }
        [Column("PaymentMethod")]
        [Required]
        public PaymentMethod PaymentMethod { get; set; }

    }
}