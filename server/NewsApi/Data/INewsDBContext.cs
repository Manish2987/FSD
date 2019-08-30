using Microsoft.EntityFrameworkCore;

namespace NewsApi.Data
{
    public interface INewsDBContext
    {
        DbSet<News> FavoriteNews { get; set; }
    }
}