using Microsoft.AspNetCore.Mvc;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System;
using System.Linq;

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
        public IActionResult Get(string filterValue)
        {
            var data = _dataProvider.GetData(filterValue);
            return Ok(data);

        }


        [HttpGet]//("{id}")
        public IActionResult Find(string searchValue)
        {
            var data = _dataProvider.FindData(searchValue);

            if (data == null)
            {
                return BadRequest("No Data Found");
            }

            return Ok(data);
        }

        [HttpGet]
        [Route("GetGraphData")]
        public IActionResult GetGraphData()
        {
            var data = _dataProvider.GetGraphData();
            return Ok(data);
        }

        [HttpPost]
        public IActionResult Create(Projections.Order order)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var data = _dataProvider.CreateOrder(order);
                    return Ok(data);
                }
                else
                {
                    return BadRequest(ModelState.ValidationState);
                }
            }
            catch (DbUpdateException)
            {
                return BadRequest("Inputs were not correct");
            }

        }

        [HttpDelete]
        public IActionResult Delete([FromBody] List<int> OrderIDs)
        {
            try
            {
                var response = _dataProvider.DeleteOrders(OrderIDs);
                if (response == 0)
                {
                    return BadRequest("No data was deleted");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok();
        }
    }
}