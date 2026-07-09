using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Extensions;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PortfolioController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IStockRepository _stockRepository;
        private readonly IPortfolioRepository _portfolioRepository;
        public PortfolioController(UserManager<AppUser> userManager, IStockRepository stockRepository, IPortfolioRepository portfolioRepository)
        {
            _userManager = userManager;
            _stockRepository = stockRepository;
            _portfolioRepository = portfolioRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserPortfolio()
        {
            try
            {
                var username = User.GetUsername();
                var appUser = await _userManager.FindByNameAsync(username);
                if (appUser == null) return Unauthorized("User not found!");

                var userPortfolio = await _portfolioRepository.GetUserPortfolioAsync(appUser);
                if (userPortfolio == null) return NotFound("Portfolio not found!");
                return Ok(userPortfolio);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddStockToPortfolio(string symbol)
        {
            try
            {
                var username = User.GetUsername();
                var appUser = await _userManager.FindByNameAsync(username);
                var existingStock = await _stockRepository.GetStockBySymbolAsync(symbol);
                if (existingStock == null)
                {
                    return NotFound("Stock not found!");
                }

                var userPortfolio = await _portfolioRepository.GetUserPortfolioAsync(appUser);
                if(userPortfolio.Any(s => s.Symbol.ToLower() == symbol.ToLower()))
                {
                    return BadRequest("Stock already exists in the portfolio!");
                }

                var portfolioEntry = new Portfolio
                {
                    AppUserId = appUser.Id,
                    StockId = existingStock.Id
                };

                await _portfolioRepository.AddPortfolioAsync(portfolioEntry);
                if (userPortfolio == null)
                {
                    return StatusCode(500, "Can not create portfolio for the user!");
                }
                return Created();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> RemoveStockFromPortfolio(string symbol)
        {
            try
            {
                var username = User.GetUsername();
                var appUser = await _userManager.FindByNameAsync(username);

                var existingStock = await _stockRepository.GetStockBySymbolAsync(symbol);
                if (existingStock == null)
                {
                    return NotFound("Stock not found!");
                }

                var userPortfolio = await _portfolioRepository.GetUserPortfolioAsync(appUser);
                var portfolioEntry = userPortfolio.FirstOrDefault(s => s.Symbol.ToLower() == symbol.ToLower());
                if (portfolioEntry == null)
                {
                    return NotFound("Stock not found in the portfolio!");
                }

                await _portfolioRepository.DeletePortfolioBySymbolAsync(appUser, symbol);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}