namespace MB.CityCenter.Dtos.Customers
{
    public class CustomerDetailsDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public int Age { get; set; }
        public string PhoneNumber { get; set; }

        public List<OrderDto> Orders { get; set; } = new List<OrderDto>();
    }
}
