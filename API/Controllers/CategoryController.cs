//using Microsoft.AspNetCore.Mvc;
//using BLL.Interfaces;
//using DAL.Models;
//using System;
//using System.Collections.Generic;
//using System.Threading.Tasks;

//namespace API.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class CategoryController : ControllerBase
//    {
//        private readonly ICategoryService _categoryService;

//        public CategoryController(ICategoryService categoryService)
//        {
//            _categoryService = categoryService;
//        }

//        [HttpGet]
//        public async Task<ActionResult<List<Category>>> GetAll()
//        {
//            var categories = await _categoryService.GetAllAsync();
//            return Ok(categories);
//        }

//        [HttpGet("{id}")]
//        public async Task<ActionResult<Category>> GetById(Guid id)
//        {
//            var category = await _categoryService.GetByIdAsync(id);
//            if (category == null)
//                return NotFound();

//            return Ok(category);
//        }

//        [HttpPost]
//        public async Task<ActionResult> Create(Category category)
//        {
//            if (category == null)
//                return BadRequest("Invalid category data.");

//            await _categoryService.AddAsync(category);
//            return CreatedAtAction(nameof(GetById), new { id = category.Id }, category);
//        }

//        [HttpPut("{id}")]
//        public async Task<ActionResult> Update(Guid id, Category category)
//        {
//            if (id != category.Id)
//                return BadRequest("ID mismatch.");

//            var existingCategory = await _categoryService.GetByIdAsync(id);
//            if (existingCategory == null)
//                return NotFound();

//            await _categoryService.UpdateAsync(category);
//            return NoContent();
//        }

//        [HttpDelete("{id}")]
//        public async Task<ActionResult> Delete(Guid id)
//        {
//            var category = await _categoryService.GetByIdAsync(id);
//            if (category == null)
//                return NotFound();

//            await _categoryService.DeleteAsync(id);
//            return NoContent();
//        }
//    }
//}
