using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NewsApi.Data;
using NewsApi.Services;
using NewsApi.Services.Models;


namespace NewsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class NewsController : ControllerBase
    {
        private INewsService _newsService;

        public NewsController(INewsService newsService)
        {
            _newsService = newsService;
        }

        [Route("headlines")]
        [HttpGet]
        public IActionResult GetHeadlines()
        {
            try
            {
                var news = _newsService.GetNewsList(Constants.Headlines);
                if (news != null && news.Any())
                {
                    return StatusCode((int)HttpStatusCode.OK, news); // OK
                }
                else
                {
                    return StatusCode((int)HttpStatusCode.NotFound); // Not Found
                }
            }
            catch(HttpRequestException)
            {
                return StatusCode((int)HttpStatusCode.ServiceUnavailable); // Service Unavailable
            }
            catch (Exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError); 
            }
        }

        [Route("category/{category}")]
        [HttpGet]
        public IActionResult GetCategoryNews(string category)
        {
            try
            {
                if ( !string.IsNullOrEmpty(category) && Constants.Categories.Contains(category.ToLower()))
                {
                    string url = String.Format(Constants.Category, category);
                    var news = _newsService.GetNewsList(url);
                    if (news != null && news.Any())
                    {
                        return StatusCode((int)HttpStatusCode.OK, news);
                    }
                    else
                    {
                        return StatusCode((int)HttpStatusCode.NotFound); // Not Found
                    }
                }
                else
                {
                    return StatusCode((int)HttpStatusCode.BadRequest, "This category does not exist!"); 
                }
            }
            catch (HttpRequestException)
            {
                return StatusCode((int)HttpStatusCode.ServiceUnavailable); // Service Unavailable
            }
            catch (Exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError); 
            }
        }

        [Route("search/{searchText}")]
        [HttpGet]
        public IActionResult GetSearchedNews(string searchText)
        {
            try
            {
                if (!string.IsNullOrEmpty(searchText))
                {
                    string url = String.Format(Constants.Search, searchText);
                    var news = _newsService.GetNewsList(url);
                    if (news != null && news.Any())
                    {
                        return StatusCode((int)HttpStatusCode.OK, news); 
                    }
                    else
                    {
                        return StatusCode((int)HttpStatusCode.NotFound); // Not Found
                    }
                }
                else
                {
                    return GetHeadlines(); // Redirect to get all headlines
                }
            }
            catch (HttpRequestException)
            {
                return StatusCode((int)HttpStatusCode.ServiceUnavailable); // Service Unavailable
            }
            catch (Exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError); 
            }
        }

        [Route("favorite/{userId}")]
        [HttpGet]
        public IActionResult GetFavoriteNews(string userId)
        {
            try
            {
                if (!string.IsNullOrEmpty(userId))
                {                
                    var news = _newsService.GetFavoriteNews(userId);
                    if (news != null && news.Any())
                    {
                        return StatusCode((int)HttpStatusCode.OK, news); 
                    }
                    else
                    {
                        return StatusCode((int)HttpStatusCode.OK, new List<News>()); // Not Found
                    }
                }
                else
                {
                    return StatusCode((int)HttpStatusCode.BadRequest, "User id is invalid!"); 
                }
            }
            catch (SqlException)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, "DB Error: Failed to get Favorite news"); 
            }
            catch (Exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, "Failed to get Favorite news"); 
            }
        }

        [Route("favorite/add")]        
        [AcceptVerbs("POST", "OPTIONS")]
        public IActionResult PostFavoriteNews([FromBody]News news)
        {
            if(Request!= null && Request.Method == HttpMethods.Options)
            {
                return StatusCode((int)HttpStatusCode.OK, true);
            }
            try
            {
                if (news != null && !String.IsNullOrEmpty(news.title))
                {
                    var item = _newsService.AddFavoriteNews(news);
                    return StatusCode((int)HttpStatusCode.Created, item);
                }
                else
                {
                    return StatusCode((int)HttpStatusCode.BadRequest); 
                }
            }
            catch (SqlException)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, "DB Error: Failed to Add News to Favorite"); 
            }
            catch (Exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, "Failed to Add News to Favorite"); 
            }
        }


        [Route("favorite/delete/{id}")]        
        [AcceptVerbs("DELETE", "OPTIONS")]
        public IActionResult Delete(int id)
        {
            if (Request!= null && Request.Method == HttpMethods.Options)
            {
                return StatusCode((int)HttpStatusCode.OK, true);
            }
            try
            {
                if (id != 0)
                {
                    _newsService.DeleteFavoriteNews(id);
                    return StatusCode((int)HttpStatusCode.OK, true);
                }
                else
                {
                    return StatusCode((int)HttpStatusCode.BadRequest); 
                }
            }
            catch (SqlException)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, "DB Error: Failed to Remove News from Favorite"); 
            }
            catch (Exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, "Failed to Remove News from Favorite");
            }
        }
    }
}