namespace Employee_Leave_Management_System_backend.Models
{
    public class LeaveBalance
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int Sick { get; set; }
        public int Casual { get; set; }
        public int Earned { get; set; }
        public int CompOff { get; set; }
        public int Annual { get; set; }
    }
}
