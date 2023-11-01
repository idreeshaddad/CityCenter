using AutoMapper;
using MB.CityCenter.Dtos.Brands;
using MB.CityCenter.Entities;

namespace MB.CityCenter.AutoMapper
{
    public class BrandAutoMapperProfile : Profile
    {
        public BrandAutoMapperProfile()
        {
            CreateMap<Brand, BrandDto>().ReverseMap();

        }
    }
}
