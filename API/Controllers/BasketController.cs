using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using API.DTOs;
using System.Linq;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository _basketRepository;
        private readonly StoreContext _context;

        public BasketController(IBasketRepository basketRepository, StoreContext context)
        {
            _context = context;
            _basketRepository = basketRepository;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Basket>))]
        public async Task<IActionResult> GetBasket()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var basket = await _basketRepository.GetBasket(Request);

            if (basket == null)
            {
                return NotFound("basket NULL");
            }

            return Ok(MapBasketToDto(basket));
        }

        [HttpPost(Name = "GetBasket")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Basket>))]
        public async Task<IActionResult> AddItemToBasket(int productId, int quantity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var basket = await _basketRepository.GetBasket(Request);

            if (basket == null)
            {
                basket = await _basketRepository.CreateBasket(Response);
            }

            var product = await _context.Products.FindAsync(productId);

            if (product == null)
            {
                return NotFound();
            }

            basket.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                return CreatedAtRoute("GetBasket", MapBasketToDto(basket));
            }

            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
        }

        [HttpDelete]
        [ProducesResponseType(201, Type = typeof(IEnumerable<BasketDto>))]
        public async Task<IActionResult> RemoveItemFromBasket(int productId, int quantity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var basket = await _basketRepository.GetBasket(Request);


            basket.RemoveItem(productId, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                return StatusCode(201);
            }

            return BadRequest(new ProblemDetails { Title = "Could not remove or delete" });
        }

        private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    Type = item.Product.Brand,
                    Quantity = item.Quantity,
                    PictureUrl = item.Product.PictureUrl,
                    Brand = item.Product.Brand
                }).ToList()
            };
        }
    }
}