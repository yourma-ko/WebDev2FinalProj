﻿
using BLL.Interfaces;
using BLL.Utilities;
using DAL.Interfaces;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository productRepository;
        private readonly IOrderRepository orderRepository;
        public ProductService(IUnitOfWork unitOfWork)
        {
            productRepository = unitOfWork.ProductRepository;
            orderRepository = unitOfWork.OrderRepository;
        }
        public async Task AddAsync(Product entity)
        {
            await productRepository.AddAsync(entity);

        }

        public async Task DeleteAsync(Guid id)
        {
            await productRepository.DeleteAsync(id);
        }

        public async Task<List<Product>> GetAllAsync()
        {
            return await productRepository.GetAllAsync();
        }

        public async Task<Product> GetByIdAsync(Guid id)
        {
            return await productRepository.GetByIdAsync(id);
        }

        public async Task InstantCheckout(Guid customerId, Product product, int quantity)
        {
            var order = new Order
            {
                Id = Guid.NewGuid(),
                CustomerId = customerId,
                OrderDateTime = DateTime.Now,
                Status = OrderStatus.Pending,
                OrderItems = new List<OrderItem>
                {
                    new OrderItem
                    {
                        ProductId = product.Id,
                        Quantity = quantity
                    }
                },
                Total = product.Price * quantity

            };
            await orderRepository.AddAsync(order);
            product.Quantity -= quantity;
            await productRepository.UpdateAsync(product);
        }

        public async Task UpdateAsync(Product entity)
        {
            await productRepository.UpdateAsync(entity);
        }
        public async Task<List<Product>> GetByCategoryAsync(string category)
        {
            var products = await productRepository.GetAllAsync();
            var filteredProducts = products.Where(x => x.Category == category).ToList();
            return filteredProducts;
        }

    }
}
