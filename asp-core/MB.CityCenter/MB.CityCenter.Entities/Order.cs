using MB.CityCenter.Utils.Enums;

namespace MB.CityCenter.Entities
{
    public class Order
    {
        public Order()
        {
            
        }

        public Order(int customerId)
        {
            CustomerId = customerId;
        }

        public int Id { get; set; }
        public DateTime? Date { get; set; }
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
        public decimal TotalPrice { get; set; }
        public PaymentMethod PaymentMethod { get; set; } = PaymentMethod.Cash;
        
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }


        public List<OrderProduct> OrderProducts { get; set; } = new List<OrderProduct>();
    }
}
