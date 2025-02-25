using BLL.Interfaces;
using BLL.Services;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService productService;
        public ProductController(IProductService productService)
        {
            this.productService = productService;
        }
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts([FromQuery] string? category)
        {
            var products = await productService.GetAllAsync();

            if (!string.IsNullOrEmpty(category))
            {
                products = await productService.GetByCategoryAsync(category);
            }

            return Ok(products);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(Guid id)
        {
            var product = await productService.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound($"Продукт с ID {id} не найден.");
            }
            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult> AddProduct([FromServices] IProductService productService, Product product)
        {
            await productService.AddAsync(product);
            return Ok();
        }
        [HttpPut]
        public async Task<ActionResult> UpdateProduct([FromServices] IProductService productService, Product product)
        {
            await productService.UpdateAsync(product);
            return Ok();
        }
        [HttpDelete]
        public async Task<ActionResult> DeleteProduct([FromServices] IProductService productService, Guid id)
        {
            await productService.DeleteAsync(id);
            return Ok();
        }
    }
}
