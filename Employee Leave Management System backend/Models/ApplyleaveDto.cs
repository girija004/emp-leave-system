using System.ComponentModel.DataAnnotations;

namespace Employee_Leave_Management_System_backend.Models
{
    public class ApplyleaveDto
    {
        
        
            [Required]
            public string LeaveType { get; set; }

            [Required]
            public DateTime FromDate { get; set; }

            [Required]
            public DateTime ToDate { get; set; }

            [Required]
            public string Reason { get; set; }
        
    }
}
