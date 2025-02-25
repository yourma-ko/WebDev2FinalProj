using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface IProductSupplierRepository : IRepository<ProductSupplier>
    {
        public Task<ICollection<ProductSupplier>> GetAllWithDetailsAsync();
        public Task<ProductSupplier> GetWithDetailsByIdAsync(Guid id);
    }
}
