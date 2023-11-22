using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MB.CityCenter.Entities;
using MB.CityCenter.EntityFrameworkCore;
using AutoMapper;
using MB.CityCenter.Dtos.ProductTypes;
using MB.CityCenter.Dtos.Lookups;

namespace MB.CityCenter.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductTypesController : ControllerBase
    {
        #region Data and constructors

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ProductTypesController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #endregion

        #region Actions

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductTypeDto>>> GetProductTypes()
        {
            var productTypes = await _context.ProductTypes.ToListAsync();

            var productTypesDtos = _mapper.Map<List<ProductTypeDto>>(productTypes);

            return productTypesDtos;

            // NOTE: you can return the list in one statement.
            // But it is harder to debug
            //return await _context
            //                .ProductTypes
            //                .Select(pt => _mapper.Map<ProductTypeDto>(pt))
            //                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductTypeDto>> GetProductType(int id)
        {
            var productType = await _context.ProductTypes.FindAsync(id);

            if (productType == null)
            {
                return NotFound();
            }

            var productTypeDto = _mapper.Map<ProductTypeDto>(productType);

            return productTypeDto;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProductType(int id, ProductTypeDto productTypeDto)
        {
            if (id != productTypeDto.Id)
            {
                return BadRequest();
            }

            var productType = _mapper.Map<ProductType>(productTypeDto);

            _context.Update(productType);
            //_context.Entry(productType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductTypeExists(id))
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
        public async Task<IActionResult> CreateProductType(ProductTypeDto productTypeDto)
        {
            var productType = _mapper.Map<ProductType>(productTypeDto);

            _context.ProductTypes.Add(productType);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductType(int id)
        {
            var productType = await _context.ProductTypes.FindAsync(id);

            if (productType == null)
            {
                return NotFound();
            }

            _context.ProductTypes.Remove(productType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet]
        public async Task<ActionResult<List<LookupDto>>> GetProductTypeLookup()
        {
            var productTypeLookupDtos = await _context
                                    .ProductTypes
                                    .Select(b => new LookupDto()
                                    {
                                        Id = b.Id,
                                        Name = b.Name
                                    })
                                    .ToListAsync();

            return productTypeLookupDtos;
        }

        #endregion

        #region Private Methods

        private bool ProductTypeExists(int id)
        {
            return (_context.ProductTypes?.Any(e => e.Id == id)).GetValueOrDefault();
        } 

        #endregion
    }
}
