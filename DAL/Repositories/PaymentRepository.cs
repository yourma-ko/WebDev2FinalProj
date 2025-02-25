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
    public class PaymentRepository : AbstractRepository, IPaymentRepository
    {
        private readonly DbSet<Payment> dbSet;
        public PaymentRepository(ElectronicStoreContext context) : base(context)
        {
            dbSet = context.Set<Payment>();

        }
        public async Task AddAsync(Payment entity)
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

        public async Task<List<Payment>> GetAllAsync()
        {
            return await dbSet.ToListAsync();
        }

        public async Task<Payment> GetByIdAsync(Guid id)
        {
            return await dbSet.FindAsync(id).AsTask();
        }

        public async Task UpdateAsync(Payment entity)
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
