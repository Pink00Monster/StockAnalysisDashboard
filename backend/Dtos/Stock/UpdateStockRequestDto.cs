using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Stock
{
    public class UpdateStockRequestDto
    {
        [Required]
        [MaxLength(10, ErrorMessage = "Symbol must be at most 10 characters long.")]
        public string Symbol { get; set; } = string.Empty;
        [Required]
        [MaxLength(10, ErrorMessage = "Company name must be at most 10 characters long.")]
        public string CompanyName { get; set; } = string.Empty;
        [Required]
        [Range(1, double.MaxValue, ErrorMessage = "Purchase price must be greater than 0.")]
        public decimal Purchase { get; set; }
        [Required]
        [Range(0.01, 100, ErrorMessage = "Current price must be greater than 0.")]
        public decimal LastDividend { get; set; }
        [Required]
        [MaxLength(100, ErrorMessage = "Industry must be at most 100 characters long.")]
        public string Industry { get; set; } = string.Empty;
        [Range(1, long.MaxValue, ErrorMessage = "Market cap must be greater than 0.")]
        public long MarketCap { get; set; }
    }
}