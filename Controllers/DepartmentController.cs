using MobileAppBackend.Data;
using MobileAppBackend.Models;


using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MobileAppBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DepartmentController(AppDbContext ctx) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<Department>>> GetAll()
        {
            var list = await ctx.Departments.ToListAsync();
            return Ok(list);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Department>> GetById(int id)
        {
            var dept = await ctx.Departments.FindAsync(id);
            if (dept == null) return NotFound();
            return Ok(dept);
        }

        [HttpPost]
        public async Task<ActionResult<Department>> Create([FromBody] Department d)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            ctx.Departments.Add(d);
            await ctx.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetById),
                new { id = d.Id },
                d
            );
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] Department d)
        {
            if (id != d.Id) return BadRequest("ID in URL and payload must match.");
            if (!ModelState.IsValid) return BadRequest(ModelState);

            ctx.Entry(d).State = EntityState.Modified;
            try
            {
                await ctx.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await ctx.Departments.AnyAsync(x => x.Id == id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var dept = await ctx.Departments.FindAsync(id);
            if (dept == null) return NotFound();

            ctx.Departments.Remove(dept);
            await ctx.SaveChangesAsync();
            return NoContent();
        }
    }
}