namespace MB.CityCenter.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }

        public int Quantity { get; set; }

        public bool IsInStock
        {
            get
            {
                return Quantity > 0;
            }
        }

        public int BrandId { get; set; }
        public Brand Brand { get; set; }


        public int ProductTypeId { get; set; }
        public ProductType ProductType { get; set; }

        public List<OrderProduct> OrderProducts { get; set; } = new List<OrderProduct>();
    }
}
