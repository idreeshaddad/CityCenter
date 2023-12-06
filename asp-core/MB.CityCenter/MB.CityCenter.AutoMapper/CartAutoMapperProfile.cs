using AutoMapper;
using MB.CityCenter.Dtos.Carts;
using MB.CityCenter.Entities;

namespace MB.CityCenter.AutoMapper
{
    public class CartAutoMapperProfile : Profile
    {
        public CartAutoMapperProfile()
        {
            CreateMap<OrderProduct, CartItemDto>();
        }
    }
}
