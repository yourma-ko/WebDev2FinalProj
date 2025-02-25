using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IOrderRepository OrderRepository { get; }
        IProductRepository ProductRepository { get; }
        ICategoryRepository CategoryRepository { get; }
        IPaymentRepository PaymentRepository { get; }
        IOrderItemRepository OrderItemRepository { get; }
        IProductSupplierRepository ProductSupplierRepository { get; }
        ISupplierRepository SupplierRepository { get; }


        Task SaveAsync();
    }
}
