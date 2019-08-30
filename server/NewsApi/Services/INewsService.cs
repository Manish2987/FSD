using System.Collections.Generic;
using NewsApi.Data;
using NewsApi.Services.Models;

namespace NewsApi.Services
{
    public interface INewsService
    {
        IEnumerable<Article> GetNewsList(string url);
        News AddFavoriteNews(News news);
        void DeleteFavoriteNews(int id);
        List<News> GetFavoriteNews(string userId);
    }
}