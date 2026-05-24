using backend.Data;
using backend.Dtos.Stock;
using backend.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/stock")]
    public class StockController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public StockController(ApplicationDBContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetStocks()
        {
            var stocks = (await _context.Stocks.ToListAsync()).Select(s => s.ToStockDto());
            return Ok(stocks);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetStockById([FromRoute] int id)
        {
            var stock = await _context.Stocks.FindAsync(id);
            if (stock == null)
            {
                return NotFound();
            }
            return Ok(stock.ToStockDto());
        }

        [HttpPost]
        public async Task<IActionResult> CreateStock([FromBody] CreateStockRequestDto stockDto)
        {
            var stock = stockDto.ToStockFromCreateDTO();
            await _context.Stocks.AddAsync(stock);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetStockById), new { id = stock.Id }, stock.ToStockDto());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStock([FromRoute] int id, [FromBody] UpdateStockRequestDto updateDto)
        {
            var stock = await _context.Stocks.FindAsync(id);
            if (stock == null)
            {
                return NotFound();
            }

            stock.Symbol = updateDto.Symbol;
            stock.CompanyName = updateDto.CompanyName;
            stock.Purchase = updateDto.Purchase;
            stock.LastDividend = updateDto.LastDividend;
            stock.Industry = updateDto.Industry;
            stock.MarletCap = updateDto.MarletCap;

            await _context.SaveChangesAsync();
            return Ok(stock.ToStockDto());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStock([FromRoute] int id)
        {
            var stock = await _context.Stocks.FindAsync(id);
            if (stock == null)
            {
                return NotFound();
            }

            _context.Stocks.Remove(stock);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}