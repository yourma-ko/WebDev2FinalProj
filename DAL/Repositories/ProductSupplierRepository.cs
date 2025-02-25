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
    public class ProductSupplierRepository : AbstractRepository, IProductSupplierRepository
    {
        private readonly DbSet<ProductSupplier> _dbSet;
        public ProductSupplierRepository(ElectronicStoreContext context) : base(context)
        {
            _dbSet = context.Set<ProductSupplier>();
        }
        public async Task AddAsync(ProductSupplier entity)
        {
            await _dbSet.AddAsync(entity);
            await context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var x = await _dbSet.FindAsync(id);
            _dbSet.Remove(x);
            await context.SaveChangesAsync();
        }

        public async Task<List<ProductSupplier>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<ICollection<ProductSupplier>> GetAllWithDetailsAsync()
        {
            return await _dbSet.Include(x => x.Product).ToListAsync();
        }

        public async Task<ProductSupplier> GetByIdAsync(Guid id)
        {
            return await _dbSet.FindAsync(id).AsTask();
        }

        public async Task<ProductSupplier> GetWithDetailsByIdAsync(Guid id)
        {
            return await _dbSet.Include(x => x.Product).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task UpdateAsync(ProductSupplier entity)
        {
            var existing = await _dbSet.FindAsync(entity.Id);
            if (existing != null)
            {
                context.Entry(existing).CurrentValues.SetValues(entity);
                await context.SaveChangesAsync();
            }
        }
    }
}
