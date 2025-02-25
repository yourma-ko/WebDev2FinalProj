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
    public class ProductRepository : AbstractRepository, IProductRepository
    {
        private readonly DbSet<Product> dbSet;
        public ProductRepository(ElectronicStoreContext context) : base(context)
        {
            dbSet = context.Set<Product>();

        }
        public async Task AddAsync(Product entity)
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

        public async Task<List<Product>> GetAllAsync()
        {
            var x = await dbSet.ToListAsync();
            Console.WriteLine(x);
            return x;
        }

        public async Task<Product> GetByIdAsync(Guid id)
        {
            return await dbSet.FindAsync(id).AsTask();
        }

        public async Task UpdateAsync(Product entity)
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
