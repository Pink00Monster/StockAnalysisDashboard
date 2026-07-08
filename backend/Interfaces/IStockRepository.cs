using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Stock;
using backend.Helpers;
using backend.Models;

namespace backend.Interfaces
{
    public interface IStockRepository
    {
        Task<List<Stock>> GetAllStocksAsync(QueryObject query);
        Task<Stock?> GetStockByIdAsync(int id);
        Task<Stock?> GetStockBySymbolAsync(string symbol);
        Task<Stock> CreateStockAsync(Stock stock);
        Task<Stock?> UpdateStockAsync(int id, UpdateStockRequestDto stockDto);
        Task<Stock?> DeleteStockAsync(int id);
        Task<bool> StockExistsAsync(int id);
    }
}