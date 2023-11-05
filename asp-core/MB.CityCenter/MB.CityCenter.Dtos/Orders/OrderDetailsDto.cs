using MB.CityCenter.Dtos.Products;
using MB.CityCenter.Utils.Enums;

namespace MB.CityCenter.Dtos.Orders
{
    public class OrderDetailsDto
    {
        public int Id { get; set; }
        public DateTime? Date { get; set; }
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
        public decimal TotalPrice { get; set; }
        public PaymentMethod PaymentMethod { get; set; } = PaymentMethod.Cash;
        public string CustomerFullName { get; set; }

        public List<SimpleProductDto> Products { get; set; } = new List<SimpleProductDto>();
    }
}
