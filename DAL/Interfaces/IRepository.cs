using DAL.Models;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    namespace DAL.Interfaces
    {
        public interface IRepository<TEntity> where TEntity : BaseEntity
        {
            public Task<TEntity> GetByIdAsync(Guid id);
            public Task<List<TEntity>> GetAllAsync();
            public Task AddAsync(TEntity entity);
            public Task UpdateAsync(TEntity entity);
            public Task DeleteAsync(Guid id);
        }
    }
