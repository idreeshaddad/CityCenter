using MB.CityCenter.Utils.Enums;

namespace MB.CityCenter.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime? Date { get; set; }
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
        public decimal TotalPrice { get; set; }
        public PaymentMethod PaymentMethod { get; set; } = PaymentMethod.Cash;

        public List<Product> Products { get; set; } = new List<Product>();
        
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
    }
}
