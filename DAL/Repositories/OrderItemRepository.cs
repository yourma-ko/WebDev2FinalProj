using DAL.DataAccess;
using DAL.Interfaces;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class OrderItemRepository : AbstractRepository, IOrderItemRepository
    {
        private readonly DbSet<OrderItem> dbSet;
        public OrderItemRepository(ElectronicStoreContext context) : base(context)
        {
            dbSet = context.Set<OrderItem>();

        }
        public async Task AddAsync(OrderItem entity)
        {
            await dbSet.AddAsync(entity);
            await context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var x = await dbSet.FindAsync(id);
            dbSet.Remove(x);
            await context.SaveChangesAsync();
        }

        public async Task<List<OrderItem>> GetAllAsync()
        {
            return await dbSet.ToListAsync();
        }

        public async Task<ICollection<OrderItem>> GetAllWithDetailsAsync()
        {
            return await dbSet.Include(x => x.Product).ToListAsync();
        }

        public async Task<OrderItem> GetByIdAsync(Guid id)
        {
            return await dbSet.FindAsync(id).AsTask();
        }

        public async Task<OrderItem> GetWithDetailsByIdAsync(Guid id)
        {
            return await dbSet.Include(x => x.Product).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task UpdateAsync(OrderItem entity)
        {
            var existing = await dbSet.FindAsync(entity.Id);
            if (existing != null)
            {
                context.Entry(existing).CurrentValues.SetValues(entity);
                await context.SaveChangesAsync();
            }
        }

    }
}
