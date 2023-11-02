using AutoMapper;
using MB.CityCenter.Dtos.Orders;
using MB.CityCenter.Entities;

namespace MB.CityCenter.AutoMapper
{
    public class OrderAutoMapperProfile : Profile
    {
        public OrderAutoMapperProfile()
        {
            CreateMap<Order, OrderDto>();
            CreateMap<Order, OrderDetailsDto>();
            CreateMap<Order, CreateUpdateOrderDto>().ReverseMap();
        }
    }
}
