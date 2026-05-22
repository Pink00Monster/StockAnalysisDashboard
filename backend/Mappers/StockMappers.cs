using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Stock;

namespace backend.Mappers
{
    public static class StockMappers
    {
        public static StockDto ToStockDto(this Models.Stock stock)
        {
            return new StockDto
            {
                Id = stock.Id,
                Symbol = stock.Symbol,
                CompanyName = stock.CompanyName,
                Price = stock.Price,
                LastDividend = stock.LastDividend,
                Industry = stock.Industry,
                MarletCap = stock.MarletCap
            };
        }
    }
}