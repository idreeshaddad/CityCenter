namespace MB.CityCenter.Dtos.Products
{
    public class CreateUpdateProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }

        public int Quantity { get; set; }
        public int BrandId { get; set; }
        public int ProductTypeId { get; set; }
    }
}
