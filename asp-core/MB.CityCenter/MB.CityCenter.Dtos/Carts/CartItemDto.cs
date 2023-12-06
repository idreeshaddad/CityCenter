using MB.CityCenter.Dtos.Products;

namespace MB.CityCenter.Dtos.Carts
{
    public class CartItemDto
    {
        public ProductDto Product { get; set; }

        public int Quantity { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
