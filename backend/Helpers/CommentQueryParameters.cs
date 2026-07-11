using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Helpers
{
    public class CommentQueryParameters
    {
        public string Symbol { get; set; }
        public bool IsDescending { get; set; } = true;

    }
}