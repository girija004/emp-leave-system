using Employee_Leave_Management_System_backend.Data;
using Employee_Leave_Management_System_backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Employee_Leave_Management_System_backend.Controllers
{
    [Route("api/employee")]
    [ApiController]
    [Authorize] // 🔐 JWT REQUIRED
    public class LeaveController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LeaveController(AppDbContext context)
        {
            _context = context;
        }

        // 🔹 1. LEAVE BALANCES (DASHBOARD)
        
        [HttpGet("leave-balances")]
        public async Task<IActionResult> GetLeaveBalances()
        {
            int userId = int.Parse(User.FindFirst("id")!.Value);

            var balance = await _context.LeaveBalances
                .FirstOrDefaultAsync(x => x.UserId == userId);

            if (balance == null)
                return NotFound();

            // 🔥 TRANSFORM FOR FRONTEND
            var result = new[]
            {
                new { type = "Sick", remaining = balance.Sick, total = 10 },
                new { type = "Casual", remaining = balance.Casual, total = 10 },
                new { type = "Earned", remaining = balance.Earned, total = 15 },
                new { type = "Comp Off", remaining = balance.CompOff, total = 5 },
                new { type = "Work From Home", remaining = balance.Annual, total = 20 }
            };

            return Ok(result);
        }

        // 🔹 2. APPLY LEAVE
        [HttpPost("apply")]
        public async Task<IActionResult> ApplyLeave([FromBody] ApplyleaveDto dto )
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            int userId = int.Parse(User.FindFirst("id")!.Value);

            // 🔥 GET EMPLOYEE WITH MANAGER
            var employee = await _context.Users
                .Where(u => u.Id == userId)
                .Select(u => new { u.Id, u.ManagerId })
                .FirstOrDefaultAsync();

            if (employee == null || employee.ManagerId == null)
                return BadRequest("Manager not assigned to employee");

            var leave = new LeaveRequest
            {
                UserId = employee.Id,
                ManagerId = employee.ManagerId.Value, // ✅ FIX
                LeaveType = dto.LeaveType,
                FromDate = dto.FromDate,
                ToDate = dto.ToDate,
                Reason = dto.Reason,
                Status = "Pending"
            };

            _context.LeaveRequests.Add(leave);
            await _context.SaveChangesAsync();

            return Ok("Leave applied successfully");
        }

        // 🔹 3. LEAVE CALENDAR
        [Authorize]
        [HttpGet("calendar")]
        public async Task<IActionResult> GetLeaveCalendar()
        {
            int userId = int.Parse(User.FindFirst("id")!.Value);

            var leaveRequests = await _context.LeaveRequests
                .Where(l => l.UserId == userId)
                .Select(l => new
                {
                    l.FromDate,
                    l.ToDate,
                    l.LeaveType,
                    l.Status
                })
                .ToListAsync();

            var calendarLeaves = new List<object>();

            foreach (var leave in leaveRequests)
            {
                for (var date = leave.FromDate.Date; date <= leave.ToDate.Date; date = date.AddDays(1))
                {
                    calendarLeaves.Add(new
                    {
                        date,
                        type = leave.LeaveType.ToUpper(),     // SICK, CASUAL, etc
                        status = leave.Status.ToUpper()       // APPROVED, PENDING
                    });
                }
            }

            return Ok(calendarLeaves);
        }
        [HttpGet("my-leaves")]
        public async Task<IActionResult> GetMyLeaves()
        {
            int userId = int.Parse(User.FindFirst("id")!.Value);

            var leaves = await _context.LeaveRequests
                .Where(l => l.UserId == userId)
                .Select(l => new
                {
                    l.Id,
                    l.LeaveType,
                    l.FromDate,
                    l.ToDate,
                    l.Status
                })
                .OrderByDescending(l => l.FromDate)
                .ToListAsync();

            return Ok(leaves);
        }


        [Authorize(Roles = "MANAGER")]
        [HttpGet("manager/pending-requests")]
        public async Task<IActionResult> GetPendingRequests()
        {
            int managerId = int.Parse(User.FindFirst("id")!.Value);

            var requests = await _context.LeaveRequests
                .Where(l => l.ManagerId == managerId && l.Status == "Pending")
                .Select(l => new
                {
                    l.Id,
                    l.LeaveType,
                    l.FromDate,
                    l.ToDate,
                    l.Reason,
                    EmployeeEmail = l.User.Email
                })
                .ToListAsync();

            return Ok(requests);
        }
        [Authorize(Roles = "MANAGER")]
        [HttpPost("manager/decision/{id}")]
        public async Task<IActionResult> DecideLeave(int id, [FromQuery] string decision)
        {
            var leave = await _context.LeaveRequests
        .FirstOrDefaultAsync(l => l.Id == id);

            if (leave == null)
                return NotFound();

            // 🚫 prevent double approval
            if (leave.Status != "Pending")
                return BadRequest("Leave already processed");

            if (decision != "Approved" && decision != "Rejected")
                return BadRequest("Invalid decision");

            var balance = await _context.LeaveBalances
                .FirstOrDefaultAsync(b => b.UserId == leave.UserId);

            if (balance == null)
                return BadRequest("Leave balance not found");

            int days = (leave.ToDate.Date - leave.FromDate.Date).Days + 1;

            if (days <= 0)
                return BadRequest("Invalid leave dates");

            // 🔐 CHECK & DEDUCT
            if (decision == "Approved")
            {
                switch (leave.LeaveType)
                {
                    case "Sick":
                        if (balance.Sick < days)
                            return BadRequest("Insufficient Sick Leave");
                        balance.Sick -= days;
                        break;

                    case "Casual":
                        if (balance.Casual < days)
                            return BadRequest("Insufficient Casual Leave");
                        balance.Casual -= days;
                        break;

                    case "Earned":
                        if (balance.Earned < days)
                            return BadRequest("Insufficient Earned Leave");
                        balance.Earned -= days;
                        break;

                    case "Comp Off":
                        if (balance.CompOff < days)
                            return BadRequest("Insufficient Comp Off Leave");
                        balance.CompOff -= days;
                        break;

                    case "Annual":
                        if (balance.Annual < days)
                            return BadRequest("Insufficient Annual Leave");
                        balance.Annual -= days;
                        break;

                    default:
                        return BadRequest("Invalid leave type");
                }
            }

            leave.Status = decision;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Decision saved successfully" });
        }

    }
}
