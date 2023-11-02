using AutoMapper;
using MB.CityCenter.Dtos.Products;
using MB.CityCenter.Entities;

namespace MB.CityCenter.AutoMapper
{
    public class ProductAutoMapperProfile : Profile
    {
        public ProductAutoMapperProfile()
        {
            CreateMap<Product, ProductDto>();
            CreateMap<Product, ProductDetailsDto>();
            CreateMap<Product, CreateUpdateProductDto>().ReverseMap();
        }
    }
}
