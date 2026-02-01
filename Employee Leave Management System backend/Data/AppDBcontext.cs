namespace Employee_Leave_Management_System_backend.Data
{
    using Employee_Leave_Management_System_backend.Models;
    using Microsoft.EntityFrameworkCore;

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<LeaveBalance> LeaveBalances { get; set; }
        public DbSet<LeaveRequest> LeaveRequests { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ---------------- USERS ----------------
            modelBuilder.Entity<User>().HasData(

     // ================= MANAGERS =================
     new User
     {
         Id = 1,
         Email = "manager1@test.com",
         Password = "12345",
         Role = "MANAGER",
         ManagerId = null
     },
     new User
     {
         Id = 2,
         Email = "manager2@test.com",
         Password = "12345",
         Role = "MANAGER",
         ManagerId = null
     },
     new User
     {
         Id = 3,
         Email = "manager3@test.com",
         Password = "12345",
         Role = "MANAGER",
         ManagerId = null
     },

     // ================= EMPLOYEES (Manager 1) =================
     new User { Id = 4, Email = "emp1@test.com", Password = "12345", Role = "EMPLOYEE", ManagerId = 1 },
     new User { Id = 5, Email = "emp2@test.com", Password = "12345", Role = "EMPLOYEE", ManagerId = 1 },
     new User { Id = 6, Email = "emp3@test.com", Password = "12345", Role = "EMPLOYEE", ManagerId = 1 },

     // ================= EMPLOYEES (Manager 2) =================
     new User { Id = 7, Email = "emp4@test.com", Password = "12345", Role = "EMPLOYEE", ManagerId = 2 },
     new User { Id = 8, Email = "emp5@test.com", Password = "12345", Role = "EMPLOYEE", ManagerId = 2 },
     new User { Id = 9, Email = "emp6@test.com", Password = "12345", Role = "EMPLOYEE", ManagerId = 2 },

     // ================= EMPLOYEES (Manager 3) =================
     new User { Id = 10, Email = "emp7@test.com", Password = "12345", Role = "EMPLOYEE", ManagerId = 3 },
     new User { Id = 11, Email = "emp8@test.com", Password = "12345", Role = "EMPLOYEE", ManagerId = 3 },
     new User { Id = 12, Email = "emp9@test.com", Password = "12345", Role = "EMPLOYEE", ManagerId = 3 }
 );


            // ---------------- LEAVE BALANCES ----------------
            modelBuilder.Entity<LeaveBalance>().HasData(

     new LeaveBalance { Id = 1, UserId = 4, Sick = 8, Casual = 6, Earned = 10, CompOff = 4, Annual = 12 },
     new LeaveBalance { Id = 2, UserId = 5, Sick = 7, Casual = 5, Earned = 9, CompOff = 3, Annual = 11 },
     new LeaveBalance { Id = 3, UserId = 6, Sick = 6, Casual = 4, Earned = 8, CompOff = 2, Annual = 10 },

     new LeaveBalance { Id = 4, UserId = 7, Sick = 9, Casual = 7, Earned = 12, CompOff = 5, Annual = 14 },
     new LeaveBalance { Id = 5, UserId = 8, Sick = 8, Casual = 6, Earned = 10, CompOff = 3, Annual = 12 },
     new LeaveBalance { Id = 6, UserId = 9, Sick = 7, Casual = 5, Earned = 9, CompOff = 2, Annual = 11 },

     new LeaveBalance { Id = 7, UserId = 10, Sick = 6, Casual = 4, Earned = 8, CompOff = 1, Annual = 9 },
     new LeaveBalance { Id = 8, UserId = 11, Sick = 8, Casual = 6, Earned = 10, CompOff = 3, Annual = 12 },
     new LeaveBalance { Id = 9, UserId = 12, Sick = 7, Casual = 5, Earned = 9, CompOff = 2, Annual = 10 }
 );


            // ---------------- LEAVE REQUESTS ----------------
          
           
        }

    }
}
