using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace BLL.Utilities.Exceptions
{
    public class InvalidLoginException : Exception
    {
        public InvalidLoginException() : base("wrong email") { }
        public InvalidLoginException(string message) : base(message) { }
    }

    public class WrongPasswordException : Exception
    {
        public WrongPasswordException() : base("wrong password") { }
        public WrongPasswordException(string message) : base(message) { }
    }

    public class UserAlreadyExistsException : Exception
    {
        public UserAlreadyExistsException() : base("user already exist") { }
        public UserAlreadyExistsException(string message) : base(message) { }
    }
    public class ProductNotFoundException : Exception
    {
        public ProductNotFoundException(string message = "Product not found")
            : base(message) { }

        public ProductNotFoundException(string message, Exception innerException)
            : base(message, innerException) { }
    }

    public class NotEnoughQuantityException : Exception
    {
        public NotEnoughQuantityException(string message = "Not enough quantity")
            : base(message) { }

        public NotEnoughQuantityException(string message, Exception innerException)
            : base(message, innerException) { }
    }
}
