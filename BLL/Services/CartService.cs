using BLL.Interfaces;
using BLL.Utilities;
using BLL.Utilities.Exceptions;
using DAL.Interfaces;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class CartService : ICartService
    {
        private readonly ICartRepository cartRepository;
        private readonly IOrderRepository orderRepository;
        private readonly IProductRepository productRepository;

        public CartService(ICartRepository cartRepository, IOrderRepository orderRepository, IProductRepository productRepository)
        {
            this.cartRepository = cartRepository;
            this.orderRepository = orderRepository;
            this.productRepository = productRepository;
        }
        public async Task AddItemToCartAsync(Guid customerId, CartItem item)
        {
            var cart = await cartRepository.GetCartByCustomerIdAsync(customerId);
            if (cart == null)
            {
                cart = new Cart
                {
                    CustomerId = customerId,
                    CartItems = new List<CartItem> { item }
                };
                await cartRepository.AddCartAsync(cart);
            }
            else
            {
                cart.CartItems.Add(item);
                await cartRepository.UpdateCartAsync(cart);
            }
        }

        public async Task<decimal> CalculateTotal(Guid customerId)
        {
            var cart = await cartRepository.GetCartByCustomerIdAsync(customerId);
            return cart.CartItems.Sum(item => item.Quantity * item.Price);
        }

        public async Task<Order> CheckoutFromCartAsync(Guid customerId)
        {
            var cart = await cartRepository.GetCartByCustomerIdAsync(customerId);
            var checkedItems = cart.CartItems.Where(ci => ci.Checked == true).ToList();
            var order = new Order
            {
                Id = new Guid(),
                CustomerId = customerId,
                OrderDateTime = DateTime.Now,
                Status = OrderStatus.Pending,
                OrderItems = checkedItems.Select(item => new OrderItem
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    Price = item.Price,
                    Title = item.Title
                }).ToList(),
                Total = checkedItems.Sum(item => item.Quantity * item.Price)
            };

            await orderRepository.AddAsync(order);
            foreach (var item in checkedItems)
            {
                var product = await productRepository.GetByIdAsync(item.ProductId);

                if (product == null)
                {
                    throw new ProductNotFoundException($"Продукт с ID {item.ProductId} не найден.");
                }

                if (product.Quantity < item.Quantity)
                {
                    throw new NotEnoughQuantityException($"Недостаточно товара '{product.Title}' на складе. Доступно: {product.Quantity}, требуется: {item.Quantity}.");
                }

                product.Quantity -= item.Quantity;
                await productRepository.UpdateAsync(product);
                var orderItem = new OrderItem
                {
                    OrderId = order.Id,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    Price = item.Price,
                    Title = item.Title
                };

            }

            var uncheckedItems = cart.CartItems.Where(ci => ci.Checked == false).ToList();
            cart.CartItems = uncheckedItems;
            cart.LastUpdated = DateTime.Now;
            await cartRepository.UpdateCartAsync(cart);
            return order;
        }

        public async Task ClearCartAsync(Guid customerId)
        {
            var cart = await cartRepository.GetCartByCustomerIdAsync(customerId);
            cart.CartItems.Clear();
            await cartRepository.UpdateCartAsync(cart);
        }

        public async Task<Cart> getCartByCustomerIdAsync(Guid customerId)
        {
            var cart = await cartRepository.GetCartByCustomerIdAsync(customerId);
            if (cart == null)
            {
                cart = new Cart
                {
                    CustomerId = customerId,
                    CartItems = new List<CartItem>()
                };
            }
            return cart;
        }

        public async Task RemoveItemFromCartAsync(Guid customerId, CartItem item)
        {
            var cart = await cartRepository.GetCartByCustomerIdAsync(customerId);

            var itemToRemove = cart.CartItems.FirstOrDefault(ci => ci.ProductId == item.ProductId);

            if (itemToRemove != null)
            {
                cart.CartItems.Remove(itemToRemove);
                await cartRepository.UpdateCartAsync(cart);
            }
        }
        public async Task ChangeQuantityAsync(Guid customerId, CartItem item, int delta)
        {
            var cart = await cartRepository.GetCartByCustomerIdAsync(customerId);
            var cartItem = cart.CartItems.FirstOrDefault(i => i.ProductId == item.ProductId);
            if (cartItem != null)
            {
                cartItem.Quantity += delta;
                if (cartItem.Quantity <= 0)
                {
                    cart.CartItems.Remove(cartItem);
                }
                cart.LastUpdated = DateTime.UtcNow;
                await cartRepository.UpdateCartAsync(cart);
            }
        }

        public async Task CheckItemAsync(Guid customer, Guid productId, bool isChecked)
        {
            var cart = await cartRepository.GetCartByCustomerIdAsync(customer);
            var item = cart.CartItems.FirstOrDefault(i => i.ProductId == productId);
            item.Checked = isChecked;
            cart.LastUpdated = DateTime.UtcNow;
            await cartRepository.UpdateCartAsync(cart);
        }
    }
}