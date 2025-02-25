using DAL.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    [Table("ProductSuppliers")]
    public class ProductSupplier : BaseEntity
    {
        [Column("ProductId")]
        [Required]
        public Guid ProductId { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }
        [Column("SupplierId")]
        [Required]
        public Guid SupplierId { get; set; }
        [ForeignKey("SupplierId")]
        [Required]
        public Supplier Supplier { get; set; }
        [Column("PurchasePrice")]
        [Required]
        public decimal PurchasePrice { get; set; }
        [Column("LastRestock")]
        [Required]
        public DateTime LastRestock { get; set; }

        public Collection<Product> Products { get; set; }
    }
}