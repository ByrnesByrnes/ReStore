using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http;

namespace API.Interfaces
{
    public interface IBasketRepository
    {
        Task<Basket> GetBasket(HttpRequest request);
        Task<Basket> CreateBasket(HttpResponse response);
    }
}