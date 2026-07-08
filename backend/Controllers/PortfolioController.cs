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
    }
}