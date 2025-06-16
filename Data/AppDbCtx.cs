using Microsoft.EntityFrameworkCore;
using MobileAppBackend.Models;

namespace MobileAppBackend.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Department> Departments { get; set; }
        public DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<Department>().HasData(
                new Department { Id = -1, Name = "General" },
                new Department { Id = -2, Name = "Information Communications Technology" },
                new Department { Id = -3, Name = "Finance" },
                new Department { Id = -4, Name = "Marketing" },
                new Department { Id = -5, Name = "Human Resources" }
            );

            modelBuilder.Entity<Employee>().HasData(
                new Employee { Id = 1, Name = "John Smith", Phone = "02 9988 2211", DepartmentId = -2, Street = "1 Code Lane", City = "Javaville", State = "NSW", Zip = "0100", Country = "Australia" },
                new Employee { Id = 2, Name = "Sue White", Phone = "03 8899 2255", DepartmentId = -3, Street = "16 Bit Way", City = "Byte Cove", State = "QLD", Zip = "1101", Country = "Australia" },
                new Employee { Id = 3, Name = "Bob O'Bits", Phone = "05 7788 2255", DepartmentId = -4, Street = "8 Silicon Road", City = "Cloud Hills", State = "VIC", Zip = "1001", Country = "Australia" },
                new Employee { Id = 4, Name = "Mary Blue", Phone = "06 4455 9988", DepartmentId = -3, Street = "4 Processor Boulevard", City = "Appletson", State = "NT", Zip = "1010", Country = "Australia" },
                new Employee { Id = 5, Name = "Mick Green", Phone = "02 9988 1122", DepartmentId = -4, Street = "700 Bandwidth Street", City = "Bufferland", State = "NSW", Zip = "0110", Country = "Australia" }
            );
        }
    }
}