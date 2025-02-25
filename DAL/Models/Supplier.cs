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
    [Table("Suppliers")]
    public class Supplier : BaseEntity
    {
        [Column("SupplierName")]
        [Required]
        public string SupplierName { get; set; }
        [Column("ContactName")]
        [Required]
        public string ContactName { get; set; }
        [Column("Address")]
        [Required]
        public string Address { get; set; }
        [Column("Phone")]
        [Required]
        public string Phone { get; set; }
        [Column("Email")]
        [Required]
        public string Email { get; set; }
    }
}