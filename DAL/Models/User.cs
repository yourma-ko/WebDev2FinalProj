using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public enum Role
    {
        Admin,
        Customer,
        Guest
    }
    [Table("Users")]
    public class User : BaseEntity
    {
        [Column("FirstName")]
        [Required]
        public string FirstName { get; set; }
        [Column("LastName")]
        [Required]
        public string LastName { get; set; }
        [Column("Email")]
        [Required]
        public string Email { get; set; }
        [Column("Phone")]
        [Required]
        public string Phone { get; set; }
        [Column("HashedPassword")]
        [Required]
        public string HashedPassword { get; set; }
        [Column("Role")]
        [Required]
        public Role Role { get; set; }
        [Column("CreatedAt")]
        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

    }
}
