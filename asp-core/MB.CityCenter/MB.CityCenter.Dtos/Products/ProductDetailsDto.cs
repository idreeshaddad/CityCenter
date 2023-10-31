namespace MB.CityCenter.Dtos.Products
{
    public class ProductDetailsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }

        public int Quantity { get; set; }
        public bool IsInStock { get; set; }

        public string BrandName { get; set; }

        public string ProductTypeName { get; set; }
    }
}
