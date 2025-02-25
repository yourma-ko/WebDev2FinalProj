using DAL.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class AbstractRepository
    {
        protected readonly ElectronicStoreContext context;
        public AbstractRepository(ElectronicStoreContext context)
        {
            this.context = context;
        }
    }
}
