using Microsoft.AspNetCore.Mvc;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IDataProvider _dataProvider;
        //DI for data provider

        public OrderController(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        [HttpGet]
        [Route("GetOrders")]
        public IActionResult Get()
        {
            // rewrite to use IDataProvider using dependency injection
            var data = _dataProvider.GetData();
            return Ok(data); //returning JSON
            
        }
        

        // Add a Search endpoint
        [HttpGet]//("{id}")
        public IActionResult Find(string searchValue)
        {
            var data = _dataProvider.FindData(searchValue);

            if(data == null)
            {
                return BadRequest("No Data Found");
            }
            
            return Ok(data);
        }

        [HttpPost]
        // Add a Create endpoint
        public IActionResult Create(Projections.Order order)
        {
            try
            {
                if(ModelState.IsValid)
                {
                    var data = _dataProvider.CreateOrder(order);
                    return Ok(data);
                }
                else
                {
                    return BadRequest(ModelState.ValidationState);
                }
            }
            catch(DbUpdateException)
            {
                return BadRequest("Inputs were not correct");
            }
            
        }

        [HttpDelete]
        // Add a Delete endpoint
        public IActionResult Delete([FromBody] List<int> OrderIDs)
        {
            try{
                var response = _dataProvider.DeleteOrders(OrderIDs);
                if(response == 0){
                    return BadRequest("No data was deleted");
                }
            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }
            return Ok();
        }
    }
}