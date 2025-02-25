using DAL.Interfaces;
using DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.DataAccess
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly ElectronicStoreContext _context;
        private bool disposed = false;
        public IUserRepository UserRepository { get; private set; }
        public IOrderRepository OrderRepository { get; private set; }
        public IProductRepository ProductRepository { get; private set; }
        public ICategoryRepository CategoryRepository { get; private set; }
        public IPaymentRepository PaymentRepository { get; private set; }
        public IOrderItemRepository OrderItemRepository { get; private set; }
        public IProductSupplierRepository ProductSupplierRepository { get; private set; }
        public ISupplierRepository SupplierRepository { get; private set; }

        public UnitOfWork(ElectronicStoreContext context)
        {
            _context = context;

            UserRepository = new UserRepository(_context);
            OrderRepository = new OrderRepository(_context);
            ProductRepository = new ProductRepository(_context);
            CategoryRepository = new CategoryRepository(_context);
            PaymentRepository = new PaymentRepository(_context);
            OrderItemRepository = new OrderItemRepository(_context);
            ProductSupplierRepository = new ProductSupplierRepository(_context);
            SupplierRepository = new SupplierRepository(_context);
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
