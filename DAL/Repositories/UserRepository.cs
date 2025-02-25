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
    public class UserRepository : AbstractRepository, IUserRepository
    {
        private readonly DbSet<User> dbSet;
        public UserRepository(ElectronicStoreContext context) : base(context)
        {
            dbSet = context.Set<User>();

        }
        public async Task AddAsync(User entity)
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

        public async Task<List<User>> GetAllAsync()
        {
            var x = await dbSet.ToListAsync();
            Console.WriteLine(x);
            return x;
        }

        public async Task<User> GetByIdAsync(Guid id)
        {
            return await dbSet.FindAsync(id).AsTask();
        }

        public async Task UpdateAsync(User entity)
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
