using System.Collections.Generic;

namespace NewsApi.Data
{
    public interface INewsRepository
    {
        News AddFavoriteNews(News news);
        void DeleteFavoriteNews(int id);
        List<News> GetFavoriteNews(string userId);
    }
}