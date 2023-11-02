using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MB.CityCenter.Entities;
using MB.CityCenter.EntityFrameworkCore;
using AutoMapper;
using MB.CityCenter.Dtos.Orders;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System.Linq;

namespace MB.CityCenter.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        #region Data and Const

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public OrdersController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #endregion

        #region Actions

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrders()
        {
            var orders = await _context
                                    .Orders
                                    .Include(o => o.Customer)
                                    .ToListAsync();

            var ordersDtos = _mapper.Map<List<OrderDto>>(orders);

            return Ok(ordersDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDetailsDto>> GetOrder(int id)
        {
            var order = await _context
                                .Orders
                                .Include(o => o.Customer)
                                .Include(o => o.OrderProducts)
                                    .ThenInclude(op => op.Product)
                                .Where(o => o.Id == id)
                                .SingleOrDefaultAsync();

            if (order == null)
            {
                return NotFound();
            }

            var orderDto = _mapper.Map<OrderDetailsDto>(order);

            return orderDto;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditOrder(int id, CreateUpdateOrderDto orderDto)
        {
            if (id != orderDto.Id)
            {
                return BadRequest();
            }

            var order = _mapper.Map<Order>(orderDto);

            _context.Update(order);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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
        public async Task<IActionResult> CreateOrder(CreateUpdateOrderDto orderDto)
        {
            var order = _mapper.Map<Order>(orderDto);

            order.Date = DateTime.Now;

            order.TotalPrice = await GetOrderTotalPrice(orderDto);

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        #endregion

        #region Private Methods
        private bool OrderExists(int id)
        {
            return (_context.Orders?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        private async Task<decimal> GetOrderTotalPrice(CreateUpdateOrderDto orderDto)
        {
            var productIds = orderDto.Products.Select(p => p.Id).ToList();
            var products = await _context.Products.Where(p => productIds.Contains(p.Id)).ToListAsync();

            decimal totalPrice = products.Sum(p => p.Price * orderDto.Products.First(op => op.Id == p.Id).Quantity);
            return totalPrice;
        }

        #endregion
    }
}
