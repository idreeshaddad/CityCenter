using MB.CityCenter.Utils.Enums;

namespace MB.CityCenter.Dtos.Orders
{
    public class CreateUpdateOrderDto
    {
        public int Id { get; set; }
        public PaymentMethod PaymentMethod { get; set; } = PaymentMethod.Cash;
        public int CustomerId { get; set; }
        public List<OrderProductDto> Products { get; set; } = new List<OrderProductDto>();
    }
}
