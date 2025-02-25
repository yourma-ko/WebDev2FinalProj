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
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository categoryRepository;
        public CategoryService(IUnitOfWork unitOfWork)
        {
            this.categoryRepository = unitOfWork.CategoryRepository;
        }
        public async Task AddAsync(Category entity)
        {
            await categoryRepository.AddAsync(entity);
        }

        public async Task DeleteAsync(Guid id)
        {
            await categoryRepository.DeleteAsync(id);
        }

        public async Task<List<Category>> GetAllAsync()
        {
            return await categoryRepository.GetAllAsync();
        }

        public async Task<Category> GetByIdAsync(Guid id)
        {
            return await categoryRepository.GetByIdAsync(id);
        }

        public async Task UpdateAsync(Category entity)
        {
            await categoryRepository.UpdateAsync(entity);
        }
    }
}
