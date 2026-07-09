using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class PortfolioRepository : IPortfolioRepository
    {
        private readonly ApplicationDBContext _context;
        public PortfolioRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Portfolio> AddPortfolioAsync(Portfolio portfolio)
        {
            await _context.Portfolios.AddAsync(portfolio);
            await _context.SaveChangesAsync();
            return portfolio;
        }

        public async Task<Portfolio> DeletePortfolioBySymbolAsync(AppUser appUser, string symbol)
        {
            var portfolioEntry = await _context.Portfolios.FirstOrDefaultAsync(p => p.AppUserId == appUser.Id && p.Stock.Symbol.ToLower() == symbol.ToLower());
            if (portfolioEntry == null)
            {
                throw new InvalidOperationException("Stock not found in the portfolio!");
            }

            _context.Portfolios.Remove(portfolioEntry);
            await _context.SaveChangesAsync();
            return portfolioEntry;
        }

        public async Task<List<Stock>> GetUserPortfolioAsync(AppUser user)
        {
            return await _context.Portfolios
                .Where(p => p.AppUserId == user.Id)
                .Select(stock => new Stock
                {
                    Id = stock.Stock.Id,
                    Symbol = stock.Stock.Symbol,
                    CompanyName = stock.Stock.CompanyName,
                    Purchase = stock.Stock.Purchase,
                    LastDividend = stock.Stock.LastDividend,
                    Industry = stock.Stock.Industry,
                    MarketCap = stock.Stock.MarketCap,              
                })
                .ToListAsync();
        }
    }
}