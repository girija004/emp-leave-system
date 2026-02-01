using Employee_Leave_Management_System_backend.Data;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Employee_Leave_Management_System_backend.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class EmpController : ControllerBase
    {

        private readonly AppDbContext _context;
        private readonly Jwtservice _jwtService;

        public EmpController(AppDbContext context, Jwtservice jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            // 1️⃣ Find user by email
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
                return Unauthorized("Invalid email or password");

            // 2️⃣ Validate password (simple comparison)
            if (user.Password != request.Password)
                return Unauthorized("Invalid email or password");

            // 3️⃣ Generate JWT
            var token = _jwtService.GenerateToken(user);

            // 4️⃣ Return token
            return Ok(token);
        }

    }
}
