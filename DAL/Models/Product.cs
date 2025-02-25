using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.Text.Json;

namespace DAL.Models
{
    [Table("Products")]
    public class Product : BaseEntity
    {
        [Column("Title")]
        [Required]
        public string Title { get; set; }
        [Column("Price")]
        [Required]
        public decimal Price { get; set; }
        [Column("Quantity")]
        [Required]
        public int Quantity { get; set; }
        [Column("ImageUrl")]
        [Required]
        public string ImageUrl { get; set; }
        [Column("CreatedAt")]
        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        [Column("Characteristics")]
        public List<string> Characteristics { get; set; } = new List<string>();
        [Column("Category")]
        public string Category { get; set; }
    }
}
