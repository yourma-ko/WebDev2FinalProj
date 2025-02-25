using BLL.Interfaces;
using BLL.Utilities.Exceptions;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly IOrderService orderService;
        public UserController(IUserService userService, IOrderService orderService)
        {
            this.userService = userService;
            this.orderService = orderService;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetAllUsers([FromServices] IUserService userService)
        {
            var users = await userService.GetAllAsync();
            return Ok(users);
        }
        [HttpPost("register")]
        public async Task<ActionResult<User>> RegisterUser([FromServices] IUserService userService, User user)
        {
            try
            {
                 await userService.RegisterAsync(user);
                return Ok(user);
            }
            catch(UserAlreadyExistsException ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login([FromServices] IUserService userService, string email, string password)
        {
            try
            {
                var loggedInUser = await userService.LoginAsync(email, password);
                return Ok(loggedInUser);
            }
            catch(InvalidLoginException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (WrongPasswordException ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpGet("orders/{id}")]
        public async Task<ActionResult<List<Order>>> GetUserOrders([FromServices] IUserService userService, Guid id)
        {
            var orders = await orderService.GetUserOrdersAsync(id);
            return Ok(orders);
        }

    }
}
