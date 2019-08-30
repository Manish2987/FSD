using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace NewsApi.Data
{
    public class NewsRepository : INewsRepository
    {
        private NewsDBContext _newsDBContext;
        public NewsRepository(NewsDBContext newsDBContext)
        {
            _newsDBContext = newsDBContext;
        }

        public List<News> GetFavoriteNews(string userId)
        {
            try
            {
                return _newsDBContext.FavoriteNews.Where(x => x.user != null && x.user.Equals(userId)).ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public News AddFavoriteNews(News news)
        {
            try
            {
                var favNews = _newsDBContext.FavoriteNews.FirstOrDefault(x => x.urlToImage.Equals(news.urlToImage));
                if (favNews == null)
                {
                    _newsDBContext.FavoriteNews.Add(news);
                    _newsDBContext.SaveChanges();
                    return news;
                }
                else
                {
                    return favNews;
                }
            }            
            catch (Exception ex)
            {
                throw;
            }
        }

        public void DeleteFavoriteNews(int id)
        {
            try
            {
                var newsToRemove = _newsDBContext.FavoriteNews.SingleOrDefault(x => x.id == id);

                if (newsToRemove != null)
                {
                    _newsDBContext.FavoriteNews.Remove(newsToRemove);
                    _newsDBContext.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}