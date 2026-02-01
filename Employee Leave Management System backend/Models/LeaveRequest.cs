namespace Employee_Leave_Management_System_backend.Models
{
    public class LeaveRequest
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int ManagerId { get; set; }
        public User Manager { get; set; }
        public string LeaveType { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }

        public string Reason { get; set; }
        public string Status { get; set; }
    }
}
