using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NewsApi.Services.Models
{
    public static class Constants
    {        
        public const string Headlines = "https://newsapi.org/v2/top-headlines?country=in&apiKey=7227de048f734e3793b9dd89dc87af57";
        public const string Category = "https://newsapi.org/v2/top-headlines?country=in&category={0}&apiKey=7227de048f734e3793b9dd89dc87af57";
        public const string Search = "https://newsapi.org/v2/everything?q={0}&apiKey=7227de048f734e3793b9dd89dc87af57";
        public static string[] Categories = new string[]{ "business", "entertainment", "general", "health", "science", "sports", "technology" };
    }
}