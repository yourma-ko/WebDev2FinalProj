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
    public class SupplierRepository : AbstractRepository, ISupplierRepository
    {
        private readonly DbSet<Supplier> _dbSet;
        public SupplierRepository(ElectronicStoreContext context) : base(context)
        {
            _dbSet = context.Set<Supplier>();
        }
        public async Task AddAsync(Supplier entity)
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

        public async Task<List<Supplier>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<Supplier> GetByIdAsync(Guid id)
        {
            return await _dbSet.FindAsync(id).AsTask();
        }

        public async Task UpdateAsync(Supplier entity)
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
