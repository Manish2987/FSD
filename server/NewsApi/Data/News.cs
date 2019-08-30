using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NewsApi.Data
{   
    public class News
    {
        public int id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string urlToImage { get; set; }
        public string user { get; set; }
    }
}