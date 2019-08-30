using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.EntityFrameworkCore;

namespace NewsApi.Data
{
    public class NewsDBContext : DbContext, INewsDBContext
    {
        public DbSet<News> FavoriteNews { get; set; }

        public NewsDBContext(DbContextOptions<NewsDBContext> options)
            : base(options)
        { }
    }
}