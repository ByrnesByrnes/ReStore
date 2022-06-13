using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        Task<ICollection<Product>> GetProducts();
        Task<Product> GetProduct(int productId);
        bool ProductExists(int productId);
    }
}