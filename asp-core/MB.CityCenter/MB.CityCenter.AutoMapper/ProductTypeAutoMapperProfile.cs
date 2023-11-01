using AutoMapper;
using MB.CityCenter.Dtos.ProductTypes;
using MB.CityCenter.Entities;

namespace MB.CityCenter.AutoMapper
{
    public class ProductTypeAutoMapperProfile : Profile
    {
        public ProductTypeAutoMapperProfile()
        {
            CreateMap<ProductType, ProductTypeDto>().ReverseMap();
        }
    }
}
