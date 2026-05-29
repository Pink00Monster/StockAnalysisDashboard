using backend.Dtos.Comment;
using backend.Interfaces;
using backend.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IStockRepository _stockRepository;
        public CommentController(ICommentRepository commentRepository, IStockRepository stockRepository)
        {
            _commentRepository = commentRepository;
            _stockRepository = stockRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllComments()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var comments = await _commentRepository.GetAllCommentsAsync();
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

        [HttpPost("{stockId:int}")]
        public async Task<IActionResult> CreateComment(int stockId, [FromBody] CreateCommentDto commentDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (!await _stockRepository.StockExistsAsync(stockId)) return BadRequest($"Stock with ID {stockId} does not exist.");
            var comment = commentDto.ToCommentFromCreate(stockId);
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