using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using NewsApi.Services.Models;
using NewsApi.Data;

namespace NewsApi.Services
{
    public class NewsService : INewsService
    {
        private INewsRepository _newsRepository;
        public NewsService(INewsRepository newsRepository)
        {
            _newsRepository = newsRepository;
        }
        public IEnumerable<Article> GetNewsList(string url)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    var responseTask = client.GetAsync(url);
                    responseTask.Wait();

                    var result = responseTask.Result;
                    if (result.IsSuccessStatusCode)
                    {
                        var readTask = result.Content.ReadAsStringAsync();
                        readTask.Wait();
                        ArticlesResult jsonResult = JsonConvert.DeserializeObject<ArticlesResult>(readTask.Result);
                        return jsonResult.articles;
                    }
                    else
                    {
                        return new List<Article>();
                    }
                }
            }
            catch (Exception)
            {

                throw new HttpRequestException("News API not working");
            }
        }

        public News AddFavoriteNews(News news)
        {
            return _newsRepository.AddFavoriteNews(news);
        }

        public void DeleteFavoriteNews(int id)
        {
            _newsRepository.DeleteFavoriteNews(id);
        }
        public List<News> GetFavoriteNews(string userId)
        {
            return _newsRepository.GetFavoriteNews(userId);
        }
    }
}