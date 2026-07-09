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
            var stocks = _context.Stocks.Include(s => s.Comments).ThenInclude(c => c.AppUser).AsQueryable();

            if (!string.IsNullOrEmpty(query.symbol))
            {
                stocks = stocks.Where(s => s.Symbol.Contains(query.symbol));
            }

            if (!string.IsNullOrEmpty(query.companyName))
            {
                stocks = stocks.Where(s => s.CompanyName.Contains(query.companyName));
            }
    
            if (!string.IsNullOrEmpty(query.SortBy))
            {
                stocks = query.SortBy switch
                {
                    "symbol" => query.IsDescending ? stocks.OrderByDescending(s => s.Symbol) : stocks.OrderBy(s => s.Symbol),
                    "companyName" => query.IsDescending ? stocks.OrderByDescending(s => s.CompanyName) : stocks.OrderBy(s => s.CompanyName),
                    "purchase" => query.IsDescending ? stocks.OrderByDescending(s => s.Purchase) : stocks.OrderBy(s => s.Purchase),
                    "lastDividend" => query.IsDescending ? stocks.OrderByDescending(s => s.LastDividend) : stocks.OrderBy(s => s.LastDividend),
                    "industry" => query.IsDescending ? stocks.OrderByDescending(s => s.Industry) : stocks.OrderBy(s => s.Industry),
                    "marketCap" => query.IsDescending ? stocks.OrderByDescending(s => s.MarketCap) : stocks.OrderBy(s => s.MarketCap),
                    _ => stocks
                };
            }

            var skipNumber = (query.Page - 1) * query.PageSize;
            return stocks.Skip(skipNumber).Take(query.PageSize).ToListAsync();
        }

        public Task<Stock?> GetStockByIdAsync(int id)
        {
            return _context.Stocks.Include(s => s.Comments).FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<Stock?> GetStockBySymbolAsync(string symbol)
        {
            return await _context.Stocks.FirstOrDefaultAsync(s => s.Symbol == symbol);
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