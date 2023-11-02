using AutoMapper;
using MB.CityCenter.Dtos.Customers;
using MB.CityCenter.Entities;

namespace MB.CityCenter.AutoMapper
{
    public class CustomerAutoMapperProfile : Profile
    {
        public CustomerAutoMapperProfile()
        {
            CreateMap<Customer, CustomerDto>();
            CreateMap<Customer, CustomerDetailsDto>();
            CreateMap<Customer, CreateUpdateCustomerDto>().ReverseMap();
        }
    }
}
