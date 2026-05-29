using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Comment
{
    public class UpdateCommentDto
    {
        [Required]
        [MinLength(5, ErrorMessage = "Title must be at least 5 characters long.")]
        [MaxLength(50, ErrorMessage = "Title cannot exceed 50 characters.")]
        public string Title { get; set; } = String.Empty;
        [Required]
        [MinLength(2, ErrorMessage = "Content must be at least 2 characters long.")]
        [MaxLength(200, ErrorMessage = "Content cannot exceed 200 characters.")]
        public string Content { get; set; } = String.Empty;
    }
}