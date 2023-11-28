using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MB.CityCenter.Entities;
using MB.CityCenter.EntityFrameworkCore;
using AutoMapper;
using MB.CityCenter.Dtos.Customers;
using MB.CityCenter.Dtos.Lookups;

namespace MB.CityCenter.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        #region Data and Const

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CustomersController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #endregion

        #region Actions

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerDto>>> GetCustomers()
        {
            var customers = await _context.Customers.ToListAsync();

            var customersDtos = _mapper.Map<List<CustomerDto>>(customers);

            return Ok(customersDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerDetailsDto>> GetCustomer(int id)
        {
            var customer = await _context
                                    .Customers
                                    .Include(c => c.Orders)
                                    .Where(c => c.Id == id)
                                    .SingleOrDefaultAsync();

            if (customer == null)
            {
                return NotFound();
            }

            var customerDetailsDto = _mapper.Map<CustomerDetailsDto>(customer); 

            return customerDetailsDto;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CreateUpdateCustomerDto>> GetCustomerForEdit(int id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            var customerDto = _mapper.Map<CreateUpdateCustomerDto>(customer);

            return customerDto;
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditCustomer(int id, CreateUpdateCustomerDto customerDto)
        {
            var customer = _mapper.Map<Customer>(customerDto);

            _context.Update(customer);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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
        public async Task<IActionResult> CreateCustomer(CreateUpdateCustomerDto customerDto)
        {
            var customer = _mapper.Map<Customer>(customerDto);

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LookupDto>>> GetCustomerLookup()
        {
            var customerLookup = await _context
                                    .Customers
                                    .Select(customer => new LookupDto()
                                    {
                                        Id = customer.Id,
                                        Name = customer.FullName
                                    })
                                    .ToListAsync();


            return customerLookup;
        }

        #endregion

        #region Private Methods

        private bool CustomerExists(int id)
        {
            return (_context.Customers?.Any(e => e.Id == id)).GetValueOrDefault();
        } 

        #endregion
    }
}
