
using BLL.Interfaces;
using DAL.Interfaces;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository orderRepository;
        private readonly IOrderItemRepository orderItemRepository;
        public OrderService(IUnitOfWork unitOfWork)
        {
            this.orderRepository = unitOfWork.OrderRepository;
            this.orderItemRepository = unitOfWork.OrderItemRepository;
        }
        public async Task AddAsync(Order entity)
        {
            await orderRepository.AddAsync(entity);
        }

        public async Task DeleteAsync(Guid id)
        {
            await orderRepository.DeleteAsync(id);
        }

        public async Task<List<Order>> GetAllAsync()
        {
            return await orderRepository.GetAllAsync();
        }

        public async Task<Order> GetByIdAsync(Guid id)
        {
            return await orderRepository.GetByIdAsync(id);
        }

        public async Task UpdateAsync(Order entity)
        {
            await orderRepository.UpdateAsync(entity);
        }
        public async Task<ICollection<Order>> GetUserOrdersAsync(Guid id)
        {
            var orders = await orderRepository.GetAllAsync();
            var filteredOrders = orders.Where(orders => orders.CustomerId == id).ToList();
            var orderItems = await orderItemRepository.GetAllAsync();
            foreach (var order in filteredOrders)
            {
                order.OrderItems = orderItems.Where(oi => oi.OrderId == order.Id).ToList();
            }
            return filteredOrders;
        }
    }
}
