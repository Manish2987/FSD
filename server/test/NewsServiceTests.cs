using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;
using Moq;
using NewsApi.Services;
using NewsApi.Services.Models;
using NewsApi.Data;

namespace test
{
    public class NewsServiceTests
    {
        private Mock<INewsRepository> mockNewsRepository;        
        public NewsServiceTests()
        {
            mockNewsRepository = new Mock<INewsRepository>();
            mockNewsRepository.Setup(fk => fk.GetFavoriteNews("user1")).Returns(getMockFavoriteNewsList("user1"));
            mockNewsRepository.Setup(fk => fk.GetFavoriteNews("user2")).Returns(getMockFavoriteNewsList("user2"));
        }

        #region Tests

        [Fact]
        public void NewsService_GetFavoriteNewsTest()
        {
            var newsService = new NewsService(mockNewsRepository.Object);
            // Test for user1
            IEnumerable<News> result = newsService.GetFavoriteNews("user1");
            var favoriteNews = Assert.IsType<List<News>>(result);
            Assert.Equal(2, favoriteNews.Count);

            // Test for user2 
            result = newsService.GetFavoriteNews("user2");
            favoriteNews = Assert.IsType<List<News>>(result);
            Assert.Single(favoriteNews);
        }

        #endregion

        #region Mock Data

        private List<News> getMockFavoriteNewsList(string userId)
        {
            List<News> newsList = new List<News>();
            newsList.Add(new News()
            {
                user = "user1",
                title = "New Canon DSLR incoming? Mysterious camera gets teased on social media - TechRadar",
                description = "Or could it be a new pro-level EOS R mirrorless snapper?",
                urlToImage = "https://cdn.mos.cms.futurecdn.net/58JntMbF2dWJzqRwsaksAm-1200-80.jpg"
            });

            newsList.Add(new News()
            {
                user = "user1",
                title = "Here’s how much coffee is too much - Pune Mirror",
                description = "New research studies association of coffee consumption and heart disease",
                urlToImage = "https://static.toiimg.com/photo/imgsize-378899,msid-69312513/69312513.jpg"
            });

            newsList.Add(new News()
            {
                user = "user2",
                title = "Here’s how much coffee is too much - Pune Mirror",
                description = "New research studies association of coffee consumption and heart disease",
                urlToImage = "https://static.toiimg.com/photo/imgsize-378899,msid-69312513/69312513.jpg"
            });
            return newsList.Where(x => x.user.Equals(userId)).ToList();
        }

        #endregion

    }
}
