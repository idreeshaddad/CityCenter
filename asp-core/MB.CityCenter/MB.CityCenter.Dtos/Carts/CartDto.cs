using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MB.CityCenter.Dtos.Carts
{
    public class CartDto
    {
        public List<CartItemDto> CartItems { get; set; }
        public decimal TotalPrice { get; set; }
        public int OrderId { get; set; }
    }
}
