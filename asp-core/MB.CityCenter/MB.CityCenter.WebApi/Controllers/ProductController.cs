using AutoMapper;
using MB.CityCenter.Dtos.Lookups;
using MB.CityCenter.Dtos.Products;
using MB.CityCenter.Entities;
using MB.CityCenter.EntityFrameworkCore;
using MB.CityCenter.Utils.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MB.CityCenter.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        #region Data and Const

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ProductsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #endregion

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {
            var products = await _context
                                    .Products
                                    .Include(p => p.Brand)
                                    .Include(p => p.ProductType)
                                    .ToListAsync();
            
            var productsDtos = _mapper.Map<List<ProductDto>>(products);

            return productsDtos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDetailsDto>> GetProduct(int id)
        {
            var product = await _context
                                    .Products
                                    .Include(p => p.Brand)
                                    .Include(p => p.ProductType)
                                    .Where(p => p.Id == id)
                                    .SingleOrDefaultAsync();

            if (product == null)
            {
                return NotFound();
            }

            var productDto = _mapper.Map<ProductDetailsDto>(product);

            return productDto;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CreateUpdateProductDto>> GetProductForEdit(int id)
        {
            var product = await _context
                                    .Products
                                    .Where(p => p.Id == id)
                                    .SingleOrDefaultAsync();

            if (product == null)
            {
                return NotFound();
            }

            var productDto = _mapper.Map<CreateUpdateProductDto>(product);

            return productDto;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProduct(int id, CreateUpdateProductDto productDto)
        {
            if (id != productDto.Id)
            {
                return BadRequest();
            }

            var product = _mapper.Map<Product>(productDto);

            _context.Update(product);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(CreateUpdateProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var Product = await _context.Products.FindAsync(id);

            if (Product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(Product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LookupDto>>> GetProductLookup()
        {
            var productLookup = await _context
                                    .Products
                                    .Select(product => new LookupDto()
                                    {
                                        Id = product.Id,
                                        Name = product.Name
                                    })
                                    .ToListAsync();


            return productLookup;
        }

        [HttpPost]
        public async Task<IActionResult> AddToCart(AddToCartDto addToCartDto)
        {
            // Assume that the user is logged in and the userId is brought from the logging session
            var customerId = 2; // Has to be a user in the database

            var order = await GetOrder(customerId);

            var product = await GetProductToAddToCart(addToCartDto.ProductId);

            if (product == null)
            {
                return NotFound();
            }

            var orderProduct = await UpdateCart(order.Id, addToCartDto);

            UpdatePrice(addToCartDto, order, product);

            order.OrderProducts.Add(orderProduct);
            _context.Update(order);
            await _context.SaveChangesAsync();

            return Ok();
        }

        #region Private Methods

        private bool ProductExists(int id)
        {
            return (_context.Products?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        private async Task<Order> GetOrder(int customerId)
        {
            var order = await _context
                                .Orders
                                .Where(o => o.OrderStatus == OrderStatus.Pending && o.CustomerId == customerId)
                                .SingleOrDefaultAsync();

            if(order != null)
            {
                return order;
            }
            else
            {
                var newOrder = new Order(customerId);
                _context.Orders.Add(newOrder);
                await _context.SaveChangesAsync();
                return newOrder;
            }
        }

        private async Task<Product> GetProductToAddToCart(int productId)
        {
            var product = await _context
                                    .Products
                                    .Where(product => product.Id == productId && product.Quantity > 0)
                                    .SingleOrDefaultAsync();

            return product;
        }

        private async Task<OrderProduct> UpdateCart(int orderId, AddToCartDto addToCartDto)
        {
            var orderProduct = await GetOrderProduct(orderId, addToCartDto.ProductId);

            if (orderProduct == null)
            {
                orderProduct = new OrderProduct()
                {
                    OrderId = orderId,
                    ProductId = addToCartDto.ProductId,
                    Quantity = addToCartDto.Quantity,
                    CreationDate = DateTime.Now
                };
            }
            else
            {
                orderProduct.Quantity += addToCartDto.Quantity;
            }

            return orderProduct;

        }

        private async Task<OrderProduct?> GetOrderProduct(int orderId, int productId)
        {
            var orderProduct = await _context
                                    .OrderProducts
                                    .Where(op => op.OrderId == orderId && op.ProductId == productId)
                                    .SingleOrDefaultAsync();

            return orderProduct;
        }

        private static void UpdatePrice(AddToCartDto addToCartDto, Order order, Product product)
        {
            order.TotalPrice += product.Price * addToCartDto.Quantity;
        }

        #endregion
    }
}
