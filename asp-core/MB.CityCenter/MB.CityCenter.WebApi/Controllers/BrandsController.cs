using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MB.CityCenter.Entities;
using MB.CityCenter.EntityFrameworkCore;
using AutoMapper;
using MB.CityCenter.Dtos.Brands;

namespace MB.CityCenter.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        #region Data and Constructors

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public BrandsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #endregion

        #region Actions

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BrandDto>>> GetBrands()
        {
            var brands = await _context.Brands.ToListAsync();

            var brandsDtos = _mapper.Map<List<BrandDto>>(brands);

            return brandsDtos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BrandDto>> GetBrand(int? id)
        {
            if(id == null)
            {
                return BadRequest();
            }

            var brand = await _context.Brands.FindAsync(id);

            if (brand == null)
            {
                return NotFound();
            }

            var brandDto = _mapper.Map<BrandDto>(brand);

            return brandDto;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditBrand(int id, BrandDto brandDto)
        {
            if (id != brandDto.Id)
            {
                return BadRequest();
            }

            var brand = _mapper.Map<Brand>(brandDto);

            //_context.Entry(brand).State = EntityState.Modified;
            _context.Update(brand);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BrandExists(id))
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
        public async Task<IActionResult> CreateBrand(BrandDto brandDto)
        {
            var brand = _mapper.Map<Brand>(brandDto);

            _context.Brands.Add(brand);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBrand(int id)
        {
            var brand = await _context.Brands.FindAsync(id);

            if (brand == null)
            {
                return NotFound();
            }

            _context.Brands.Remove(brand);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        #endregion

        #region Private Methods

        private bool BrandExists(int id)
        {
            return (_context.Brands?.Any(e => e.Id == id)).GetValueOrDefault();
        } 

        #endregion
    }
}
