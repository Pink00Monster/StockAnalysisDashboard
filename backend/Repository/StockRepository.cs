using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.Stock;
using backend.Helpers;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class StockRepository : IStockRepository
    {
        private readonly ApplicationDBContext _context;
        public StockRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Stock> CreateStockAsync(Stock stock)
        {
            await _context.Stocks.AddAsync(stock);
            await _context.SaveChangesAsync();
            return stock;
        }

        public async Task<Stock?> DeleteStockAsync(int id)
        {
            var stock = await _context.Stocks.FindAsync(id);
            if (stock == null) return null;
            _context.Stocks.Remove(stock);
            await _context.SaveChangesAsync();
            return stock;
        }

        public Task<List<Stock>> GetAllStocksAsync(QueryObject query)
        {
            var stocks = _context.Stocks.Include(s => s.Comments).AsQueryable();

            if (!string.IsNullOrEmpty(query.symbol))
            {
                stocks = stocks.Where(s => s.Symbol.Contains(query.symbol));
            }

            if (!string.IsNullOrEmpty(query.companyName))
            {
                stocks = stocks.Where(s => s.CompanyName.Contains(query.companyName));
            }

            return stocks.ToListAsync();
        }

        public Task<Stock?> GetStockByIdAsync(int id)
        {
            return _context.Stocks.Include(s => s.Comments).FirstOrDefaultAsync(s => s.Id == id);
        }

        public Task<bool> StockExistsAsync(int id)
        {
            return _context.Stocks.AnyAsync(s => s.Id == id);
        }

        public async Task<Stock?> UpdateStockAsync(int id, UpdateStockRequestDto stockDto)
        {
            var stock = await _context.Stocks.FindAsync(id);
            if (stock == null) return null;
            
            stock.Symbol = stockDto.Symbol;
            stock.CompanyName = stockDto.CompanyName;
            stock.Purchase = stockDto.Purchase;
            stock.LastDividend = stockDto.LastDividend;
            stock.Industry = stockDto.Industry;
            stock.MarketCap = stockDto.MarketCap;

            await _context.SaveChangesAsync();
            return stock;
        }
    }
}