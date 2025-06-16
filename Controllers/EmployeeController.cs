using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MobileAppBackend.Data;
using MobileAppBackend.Models;

namespace MobileAppBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController(AppDbContext ctx) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<Employee>>> GetAll()
            => await ctx.Employees.ToListAsync();

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Employee>> GetById(int id)
        {
            var e = await ctx.Employees.FindAsync(id);
            return e is null ? NotFound() : e;
        }

        [HttpPost]
        public async Task<ActionResult<Employee>> Create([FromBody] Employee e)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            ctx.Employees.Add(e);
            await ctx.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = e.Id }, e);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] Employee e)
        {
            if (id != e.Id) return BadRequest("ID mismatch");
            if (!ModelState.IsValid) return BadRequest(ModelState);

            ctx.Entry(e).State = EntityState.Modified;
            try
            {
                await ctx.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (! await ctx.Employees.AnyAsync(x => x.Id == id))
                    return NotFound();
                throw;
            }
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var e = await ctx.Employees.FindAsync(id);
            if (e is null) return NotFound();
            ctx.Employees.Remove(e);
            await ctx.SaveChangesAsync();
            return NoContent();
        }
    }
}