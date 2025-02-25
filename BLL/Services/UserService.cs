
using BLL.Interfaces;
using BLL.Utilities;
using BLL.Utilities.Exceptions;
using DAL.Interfaces;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        public UserService(IUnitOfWork unitOfWork)
        {
            userRepository = unitOfWork.UserRepository;
        }
        public async Task AddAsync(User entity)
        {
            await userRepository?.AddAsync(entity);
        }

        public async Task DeleteAsync(Guid id)
        {
            await userRepository?.DeleteAsync(id);
        }

        public async Task<List<User>> GetAllAsync()
        {
           return await userRepository.GetAllAsync();
        }



        public async Task<User> GetByIdAsync(Guid id)
        {
            return await userRepository.GetByIdAsync(id);
        }



        public async Task UpdateAsync(User entity)
        {
            await userRepository.UpdateAsync(entity);
        }
        public async Task<User> LoginAsync (string email, string password)
        {
                var users = await userRepository.GetAllAsync();
                var customer = users.Where(u => u.Email == email).FirstOrDefault();
                if (customer == null)
                {
                    throw new InvalidLoginException();
            }
                var hashedPassword = PasswordHasher1.HashPassword(password);
                if (customer.HashedPassword != hashedPassword)
                {
                    throw new WrongPasswordException();
            }
                return customer;
        }
        public async Task<User> RegisterAsync(User entity)
        {
            var users = await userRepository.GetAllAsync();
            var customer = users.Where(u => u.Email == entity.Email).FirstOrDefault();
            if (customer != null)
            {
                throw new UserAlreadyExistsException();
            }
            entity.HashedPassword = PasswordHasher1.HashPassword(entity.HashedPassword);
            await userRepository.AddAsync(entity);
            return entity;
        }
    }
}
