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
    public class CategoryRepository : AbstractRepository, ICategoryRepository
    {
        private readonly DbSet<Category> dbSet;
        public CategoryRepository(ElectronicStoreContext context) : base(context)
        {
            dbSet = context.Set<Category>();

        }
        public async Task AddAsync(Category entity)
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

        public async Task<List<Category>> GetAllAsync()
        {
            return await dbSet.ToListAsync();
        }

        public async Task<Category> GetByIdAsync(Guid id)
        {
            return await dbSet.FindAsync(id).AsTask();
        }

        public async Task UpdateAsync(Category entity)
        {
            var existing = dbSet.Find(entity.Id);
            if (existing != null)
            {
                context.Entry(existing).CurrentValues.SetValues(entity);
                await context.SaveChangesAsync();
            }
        }
    }
}
