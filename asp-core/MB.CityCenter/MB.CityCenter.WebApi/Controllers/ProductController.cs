using AutoMapper;
using MB.CityCenter.Dtos.Lookups;
using MB.CityCenter.Dtos.Products;
using MB.CityCenter.Entities;
using MB.CityCenter.EntityFrameworkCore;
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

        #region Private Methods

        private bool ProductExists(int id)
        {
            return (_context.Products?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        #endregion
    }
}
