using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {

        private readonly IProductRepository _productRepository;

        public ProductsController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Product>))]
        public IActionResult GetProducts()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(_productRepository.GetProducts());
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Product>))]
        public IActionResult GetProduct(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if (!_productRepository.ProductExists(id))
                return NotFound();

            return Ok(_productRepository.GetProduct(id));
        }
    }
}