using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;
using Moq;
using NewsApi.Services;
using NewsApi.Services.Models;
using NewsApi.Data;
using NewsApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Http;
using System.Data.SqlClient;

namespace test
{
    public class NewsControllerTests
    {
        private Mock<INewsService> mockNewsService;

        public NewsControllerTests()
        {
            mockNewsService = new Mock<INewsService>();
        }

        #region Tests

        [Fact]
        public void GetHeadlines_Test()
        {
            mockNewsService.Setup(fk => fk.GetNewsList(It.IsAny<string>())).Returns(getMockNewsList());
            var newsController = new NewsController(this.mockNewsService.Object);
            var result = newsController.GetHeadlines() as ObjectResult;

            var headlines = Assert.IsType<List<Article>>(result.Value);
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(2, headlines.Count);
        }

        [Fact]
        public void GetHeadlines_NotFound_Test()
        {
            mockNewsService.Setup(fk => fk.GetNewsList(It.IsAny<string>())).Returns(new List<Article>());
            var newsController = new NewsController(this.mockNewsService.Object);            

            var result = newsController.GetHeadlines() as StatusCodeResult;

            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
        }

        [Fact]
        public void GetHeadlines_HttpRequestException_Test()
        {
            mockNewsService.Setup(fk => fk.GetNewsList(It.IsAny<string>())).Throws(new HttpRequestException());
            var newsController = new NewsController(this.mockNewsService.Object);

            var result = newsController.GetHeadlines() as StatusCodeResult;

            Assert.Equal((int)HttpStatusCode.ServiceUnavailable, result.StatusCode);
        }

        [Fact]
        public void GetCategoryNews_Test()
        {
            mockNewsService.Setup(fk => fk.GetNewsList(It.IsAny<string>())).Returns(getMockNewsList());
            var newsController = new NewsController(this.mockNewsService.Object);            

            var result = newsController.GetCategoryNews("general") as ObjectResult;

            var categoryNews = Assert.IsType<List<Article>>(result.Value);
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(2, categoryNews.Count);
        }

        [Fact]
        public void GetCategoryNews_NotFound_Test()
        {
            mockNewsService.Setup(fk => fk.GetNewsList(It.IsAny<string>())).Returns(new List<Article>());
            var newsController = new NewsController(this.mockNewsService.Object);

            var result = newsController.GetCategoryNews("general") as StatusCodeResult;
                        
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);           
        }

        [Fact]
        public void GetCategoryNews_HttpRequestException_Test()
        {
            mockNewsService.Setup(fk => fk.GetNewsList(It.IsAny<string>())).Throws(new HttpRequestException());
            var newsController = new NewsController(this.mockNewsService.Object);

            var result = newsController.GetCategoryNews("general") as StatusCodeResult;

            Assert.Equal((int)HttpStatusCode.ServiceUnavailable, result.StatusCode);
        }

        [Fact]
        public void GetCategoryNews_InvalidCategory_Test()
        {
            mockNewsService.Setup(fk => fk.GetNewsList(It.IsAny<string>())).Returns(getMockNewsList());
            var newsController = new NewsController(this.mockNewsService.Object);

            var result = newsController.GetCategoryNews("invalidCategory") as ObjectResult;

            Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);
        }

        [Fact]
        public void GetSearchedNews_Test()
        {
            mockNewsService.Setup(fk => fk.GetNewsList(It.IsAny<string>())).Returns(getMockNewsList());
            var newsController = new NewsController(this.mockNewsService.Object);            

            var result = newsController.GetSearchedNews("searchText") as ObjectResult;

            var searchedNews = Assert.IsType<List<Article>>(result.Value);
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(2, searchedNews.Count);
        }

        [Fact]
        public void GetSearchedNews_NotFound_Test()
        {
            mockNewsService.Setup(fk => fk.GetNewsList(It.IsAny<string>())).Returns(new List<Article>());
            var newsController = new NewsController(this.mockNewsService.Object);

            var result = newsController.GetSearchedNews("searchText") as StatusCodeResult;
                        
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);            
        }

        [Fact]
        public void GetSearchedNews_HttpRequestException_Test()
        {
            mockNewsService.Setup(fk => fk.GetNewsList(It.IsAny<string>())).Throws(new HttpRequestException());
            var newsController = new NewsController(this.mockNewsService.Object);

            var result = newsController.GetSearchedNews("searchText") as StatusCodeResult;

            Assert.Equal((int)HttpStatusCode.ServiceUnavailable, result.StatusCode);
        }

        [Fact]
        public void GetFavoriteNews_Test()
        {
            var newsController = new NewsController(this.mockNewsService.Object);
            mockNewsService.Setup(fk => fk.GetFavoriteNews("user1")).Returns(getMockFavoriteNewsList("user1"));
            mockNewsService.Setup(fk => fk.GetFavoriteNews("user2")).Returns(getMockFavoriteNewsList("user2"));

            // Test for user1
            var result = newsController.GetFavoriteNews("user1") as ObjectResult;
            var favoriteNews = Assert.IsType<List<News>>(result.Value);
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(2, favoriteNews.Count);

            // Test for user2 
            result = newsController.GetFavoriteNews("user2") as ObjectResult;
            favoriteNews = Assert.IsType<List<News>>(result.Value);
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Single(favoriteNews);
        }

        [Fact]
        public void GetFavoriteNews_NotFound_Test()
        {
            var newsController = new NewsController(this.mockNewsService.Object);
            mockNewsService.Setup(fk => fk.GetFavoriteNews("user1")).Returns(new List<News>());            
                        
            var result = newsController.GetFavoriteNews("user1") as ObjectResult;
            var favoriteNews = Assert.IsType<List<News>>(result.Value);
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Empty(favoriteNews);
        }

        [Fact]
        public void GetFavoriteNews_UserInvalid_Test()
        {
            var newsController = new NewsController(this.mockNewsService.Object);
            mockNewsService.Setup(fk => fk.GetFavoriteNews("user1")).Returns(new List<News>());

            var result = newsController.GetFavoriteNews("") as ObjectResult;
            var errorMessage = Assert.IsType<string>(result.Value);
            Assert.Equal("User id is invalid!", errorMessage);
            Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);
        }

        [Fact]
        public void GetFavoriteNews_DBException_Test()
        {
            var newsController = new NewsController(this.mockNewsService.Object);
            mockNewsService.Setup(fk => fk.GetFavoriteNews("user1")).Throws(new Exception());

            var result = newsController.GetFavoriteNews("user1") as ObjectResult;
            var errorMessage = Assert.IsType<string>(result.Value);
            Assert.Equal("Failed to get Favorite news", errorMessage);
            Assert.Equal((int)HttpStatusCode.InternalServerError, result.StatusCode);
        }

        [Fact]
        public void PostFavoriteNews_Test()
        {
            var mockNews = getMockNews();
            mockNewsService.Setup(fk => fk.AddFavoriteNews(mockNews)).Returns(mockNews);
            var newsController = new NewsController(this.mockNewsService.Object);

            var result = newsController.PostFavoriteNews(mockNews) as ObjectResult;

            var postedNews = Assert.IsType<News>(result.Value);
            Assert.Equal((int)HttpStatusCode.Created, result.StatusCode);
            Assert.Equal(1, postedNews.id);
        }

        [Fact]
        public void PostFavoriteNews_InvalidNews_Test()
        {
            var mockNews = getMockNews();

            mockNewsService.Setup(fk => fk.AddFavoriteNews(new News())).Returns(mockNews);
            var newsController = new NewsController(this.mockNewsService.Object);

            var result = newsController.PostFavoriteNews(new News()) as StatusCodeResult;
                        
            Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);            
        }

        [Fact]
        public void PostFavoriteNews_DBException_Test()
        {
            var mockNews = getMockNews();

            mockNewsService.Setup(fk => fk.AddFavoriteNews(mockNews)).Throws(new Exception());
            var newsController = new NewsController(this.mockNewsService.Object);

            var result = newsController.PostFavoriteNews(mockNews) as ObjectResult;
            var errorMessage = Assert.IsType<string>(result.Value);
            Assert.Equal("Failed to Add News to Favorite", errorMessage);
            Assert.Equal((int)HttpStatusCode.InternalServerError, result.StatusCode);
        }

        [Fact]
        public void DeleteFavoriteNews_Test()
        {
            var mockNews = getMockNews();
            mockNewsService.Setup(fk => fk.DeleteFavoriteNews(It.IsAny<int>()));
            var newsController = new NewsController(this.mockNewsService.Object);

            var result = newsController.Delete(1) as ObjectResult;

            var postedNews = Assert.IsType<bool>(result.Value);
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.True(postedNews);
        }

        [Fact]
        public void DeleteFavoriteNews_BadRequest_Test()
        {            
            mockNewsService.Setup(fk => fk.DeleteFavoriteNews(It.IsAny<int>()));
            var newsController = new NewsController(this.mockNewsService.Object);

            var result = newsController.Delete(0) as StatusCodeResult;
            
            Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);            
        }

        [Fact]
        public void DeleteFavoriteNews_DBException_Test()
        {
            mockNewsService.Setup(fk => fk.DeleteFavoriteNews(It.IsAny<int>())).Throws(new Exception());
            var newsController = new NewsController(this.mockNewsService.Object);

            var result = newsController.Delete(1) as ObjectResult;
            var errorMessage = Assert.IsType<string>(result.Value);
            Assert.Equal("Failed to Remove News from Favorite", errorMessage);            
            Assert.Equal((int)HttpStatusCode.InternalServerError, result.StatusCode);
        }

        #endregion

        #region Mock Data

        private News getMockNews()
        {
            return new News()
            {
                id = 1,
                title = "New Canon DSLR incoming? Mysterious camera gets teased on social media - TechRadar",
                description = "Or could it be a new pro-level EOS R mirrorless snapper?",
                urlToImage = "https://cdn.mos.cms.futurecdn.net/58JntMbF2dWJzqRwsaksAm-1200-80.jpg"
            };
        }

        private List<Article> getMockNewsList()
        {
            List<Article> newsList = new List<Article>();
            newsList.Add(new Article()
            {
                title = "New Canon DSLR incoming? Mysterious camera gets teased on social media - TechRadar",
                description = "Or could it be a new pro-level EOS R mirrorless snapper?",
                urlToImage = "https://cdn.mos.cms.futurecdn.net/58JntMbF2dWJzqRwsaksAm-1200-80.jpg"
            });

            newsList.Add(new Article()
            {
                title = "Here’s how much coffee is too much - Pune Mirror",
                description = "New research studies association of coffee consumption and heart disease",
                urlToImage = "https://static.toiimg.com/photo/imgsize-378899,msid-69312513/69312513.jpg"
            });
            return newsList;
        }

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
