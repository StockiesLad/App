using System.ComponentModel.DataAnnotations;

namespace MobileAppBackend.Models;

public class Employee
{
    public int Id { get; set; }

    public string Name         { get; set; }
    
    public int DepartmentId       { get; set; }
    
    public string Email { get; set; }
    public string Phone  { get; set; }
    
    public string? Street        { get; set; }
    public string? City        { get; set; }
    public string? State        { get; set; }
    public string? Zip        { get; set; }
    public string? Country    { get; set; }
}