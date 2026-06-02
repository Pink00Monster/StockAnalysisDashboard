using backend.Data;
using backend.Dtos.Stock;
using backend.Helpers;
using backend.Interfaces;
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
        private readonly IStockRepository _stockRepository;
        public StockController(ApplicationDBContext context, IStockRepository stockRepository)
        {
            _context = context;
            _stockRepository = stockRepository;
        }
        [HttpGet]
        public async Task<IActionResult> GetStocks([FromQuery] QueryObject query)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var stocks = await _stockRepository.GetAllStocksAsync(query);
            return Ok(stocks.Select(s => s.ToStockDto()));
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetStockById([FromRoute] int id)
        {

            if (!ModelState.IsValid) return BadRequest(ModelState);
            var stock = await _stockRepository.GetStockByIdAsync(id);
            if (stock == null) return NotFound();

            return Ok(stock.ToStockDto());
        }

        [HttpPost]
        public async Task<IActionResult> CreateStock([FromBody] CreateStockRequestDto stockDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var stock = stockDto.ToStockFromCreateDTO();
            await _stockRepository.CreateStockAsync(stock);
            return CreatedAtAction(nameof(GetStockById), new { id = stock.Id }, stock.ToStockDto());
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateStock([FromRoute] int id, [FromBody] UpdateStockRequestDto updateDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var stock = await _stockRepository.UpdateStockAsync(id, updateDto);
            if (stock == null) return NotFound();
            
            return Ok(stock.ToStockDto());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteStock([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var stock = await _stockRepository.DeleteStockAsync(id);
            if (stock == null) return NotFound();
            return NoContent();
        }
    }
}