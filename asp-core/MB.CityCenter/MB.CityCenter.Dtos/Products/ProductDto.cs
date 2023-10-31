namespace MB.CityCenter.Dtos.Products
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public bool IsInStock { get; set; }

        public string BrandName { get; set; }
        public string ProductTypeName { get; set; }
    }
}
