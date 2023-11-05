using AutoMapper;
using MB.CityCenter.Dtos.Orders;
using MB.CityCenter.Dtos.Products;
using MB.CityCenter.Entities;

namespace MB.CityCenter.AutoMapper
{
    public class OrderAutoMapperProfile : Profile
    {
        public OrderAutoMapperProfile()
        {
            CreateMap<Order, OrderDto>();

            CreateMap<Order, OrderDetailsDto>()
                .ForMember(dest => dest.Products, opts => opts.MapFrom(src =>
                            src.OrderProducts.Select(op => new SimpleProductDto
                            {
                                Id = op.ProductId,
                                Name = op.Product.Name,
                                Quantity = op.Quantity,
                                SubPrice = op.Product.Price * op.Quantity
                            })));

            CreateMap<Order, CreateUpdateOrderDto>().ReverseMap();
        }
    }
}
