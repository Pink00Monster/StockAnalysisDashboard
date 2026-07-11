using backend.Dtos.Comment;
using backend.Extensions;
using backend.Helpers;
using backend.Interfaces;
using backend.Mappers;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IStockRepository _stockRepository;
        private readonly UserManager<AppUser> _userManager;
        private readonly IFMPService _fmpService;
        public CommentController(ICommentRepository commentRepository, IStockRepository stockRepository, UserManager<AppUser> userManager, IFMPService fmpService)
        {
            _commentRepository = commentRepository;
            _stockRepository = stockRepository;
            _userManager = userManager;
            _fmpService = fmpService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllComments([FromQuery] CommentQueryParameters queryParameters)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var comments = await _commentRepository.GetAllCommentsAsync(queryParameters);
            var commentDtos = comments.Select(c => c.ToCommentDto()).ToList();
            return Ok(commentDtos);
        }
       
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetCommentById(int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var comment = await _commentRepository.GetCommentByIdAsync(id);
            if (comment == null) return NotFound();

            var commentDto = comment.ToCommentDto();
            return Ok(commentDto);
        }

        [HttpPost("{symbol:alpha}")]
        public async Task<IActionResult> CreateComment(string symbol, [FromBody] CreateCommentDto commentDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            
            var stock = await _stockRepository.GetStockBySymbolAsync(symbol);
            if (stock == null)
            {
                stock = await _fmpService.GetStockBySymbolAsync(symbol);
                if (stock == null)
                {
                    return NotFound($"Stock with symbol '{symbol}' not found.");
                }
                await _stockRepository.CreateStockAsync(stock);
            }
            
            var userName = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(userName);

            var comment = commentDto.ToCommentFromCreate(stock.Id);
            comment.AppUserId = appUser.Id;
            await _commentRepository.CreateCommentAsync(comment);
            return CreatedAtAction(nameof(GetCommentById), new { id = comment.Id }, comment.ToCommentDto());
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateComment(int id, [FromBody] UpdateCommentDto commentDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var comment = await _commentRepository.UpdateCommentAsync(id, commentDto);
            if (comment == null) return NotFound("Comment not found.");
            return Ok(comment.ToCommentDto());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteComment(int id)
        { 
            if (!ModelState.IsValid) return BadRequest(ModelState);  
            var comment = await _commentRepository.DeleteCommentAsync(id);
            if (comment == null) return NotFound("Comment not found.");
            return NoContent();
        }

    }
}