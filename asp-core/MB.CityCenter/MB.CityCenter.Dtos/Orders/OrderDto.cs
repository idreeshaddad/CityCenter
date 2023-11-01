using MB.CityCenter.Utils.Enums;

namespace MB.CityCenter.Dtos.Orders
{
    public class OrderDto
    {
        public int Id { get; set; }
        public DateTime? Date { get; set; }
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
        public decimal TotalPrice { get; set; }
        public PaymentMethod PaymentMethod { get; set; } = PaymentMethod.Cash;
        public string CustomerFullName { get; set; }
    }
}
