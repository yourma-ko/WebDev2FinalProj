
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface ICartService
    {
        public Task<Cart> getCartByCustomerIdAsync(Guid customerId);
        public Task AddItemToCartAsync(Guid customerId, CartItem item);
        public Task RemoveItemFromCartAsync(Guid customerId, CartItem item);
        public Task<Order> CheckoutFromCartAsync(Guid customerId);
        public Task ClearCartAsync(Guid customerId);
        public Task<Decimal> CalculateTotal(Guid customerId);
        public Task ChangeQuantityAsync(Guid customerId, CartItem item, int delta);
        public Task CheckItemAsync(Guid customerId, Guid productId, bool isChecked);


    }
}
