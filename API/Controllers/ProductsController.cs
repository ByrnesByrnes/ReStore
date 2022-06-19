using System.Collections.Generic;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{

    public class ProductsController : BaseApiController
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