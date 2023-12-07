using AutoMapper;
using MB.CityCenter.Dtos.Carts;
using MB.CityCenter.Entities;
using MB.CityCenter.EntityFrameworkCore;
using MB.CityCenter.Utils.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace MB.CityCenter.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        #region Data and Const

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CartController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #endregion

        [HttpGet]
        public async Task<ActionResult<CartDto>> GetCart()
        {
            var customerId = 2; // Hard coded because we do not have IdentityUser for now

            var order = await GetOrderWithProducts(customerId);

            if (order == null)
            {
                return NotFound();
            }

            var cartDto = GetCartDto(order);

            return cartDto;
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

        [HttpPost]
        public async Task<IActionResult> CheckOut(CartDto cartDto)
        {
            var order = await _context
                                .Orders
                                .Include(o => o.OrderProducts)
                                .SingleOrDefaultAsync(o => o.Id == cartDto.OrderId);

            if (order == null)
            {
                return NotFound();
            }

            order.OrderStatus = OrderStatus.Completed;

            //IncreseStock()
            foreach (var orderProduct in order.OrderProducts)
            {
                var product = await _context
                                          .Products
                                          .FindAsync(orderProduct.ProductId);
                if (product == null)
                {
                    return NotFound();
                }

                product.Quantity -= orderProduct.Quantity;

                _context.Update(product);
                await _context.SaveChangesAsync();

               
            }

            return Ok();

        }

        #region Private Methods

        private async Task<Order> GetOrder(int customerId)
        {
            var order = await _context
                                .Orders
                                .Where(o => o.OrderStatus == OrderStatus.Pending && o.CustomerId == customerId)
                                .SingleOrDefaultAsync();

            if (order != null)
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

        private async Task<Order?> GetOrderWithProducts(int customerId)
        {
            return await _context
                            .Orders

                            .Include(o => o.OrderProducts)
                                .ThenInclude(op => op.Product)
                                    .ThenInclude(p => p.Brand)

                            .Include(o => o.OrderProducts)
                                .ThenInclude(op => op.Product)
                                    .ThenInclude(p => p.ProductType)

                            .Where(o => o.CustomerId == customerId && o.OrderStatus == OrderStatus.Pending)
                            .SingleOrDefaultAsync();
        }

        private CartDto GetCartDto(Order order)
        {
            var orderProducts = order.OrderProducts.ToList();

            var cartItems = _mapper.Map<List<CartItemDto>>(orderProducts);

            var cartDto = new CartDto()
            {
                CartItems = cartItems,
                TotalPrice = order.TotalPrice,
                OrderId = order.Id
            };

            return cartDto;
        }

        #endregion
    }
}
