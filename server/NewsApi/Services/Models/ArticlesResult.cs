using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NewsApi.Services.Models
{
    public class ArticlesResult
    {        
        public string status { get; set; }
        public string error { get; set; }
        public int totalResults { get; set; }
        public List<Article> articles { get; set; }

    }
}