using System;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;


namespace API.Repository
{
    public class BasketRepository : IBasketRepository
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;

        public BasketRepository(StoreContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Basket> CreateBasket(HttpResponse response)
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };

            response.Cookies.Append("buyerId", buyerId, cookieOptions);

            var basket = new Basket { BuyerId = buyerId };

            await _context.Baskets.AddAsync(basket);

            return basket;
        }

        public async Task<Basket> GetBasket(HttpRequest request)
        {
            var basket = await _context.Baskets
            .Include(i => i.Items).ThenInclude(p => p.Product).FirstOrDefaultAsync(x => x.BuyerId == request.Cookies["buyerId"]);
        
            return basket;
        }
    }
}