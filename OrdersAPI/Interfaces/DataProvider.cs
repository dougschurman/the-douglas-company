using System.Linq;
using System.Collections.Generic;
using API.Data;
using System;
using API.Projections;
using API.Enums;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace API.Interfaces
{
    public class DataProvider : IDataProvider
    {
        private readonly OrderContext _context;
        private readonly IMapper _mapper;

        public DataProvider(OrderContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public IEnumerable<Projections.Order> GetData()
        {
            var modelData = _context.Orders.AsNoTracking().ToList();
            return _mapper.Map<List<Models.Order>, List<Projections.Order>>(modelData); //maps all DTO models to projection model via constructor

        }

        public IEnumerable<Projections.Order> FindData(string searchValue)
        {
            //add EF find by P
            try
            {
                int orderID = Int32.Parse(searchValue);
                var result = new List<Projections.Order>();
                result.Add(new Projections.Order(_context.Orders.Find(orderID)));
                return result;
            }
            catch
            {
                var result = _context.Set<Models.Order>().AsNoTracking()
                                            .Where(w => (w.OrderType + w.CustomerName + w.CreatedByUserName).ToLower().Contains(searchValue)).ToList();
                return _mapper.Map<List<Models.Order>, List<Projections.Order>>(result);
            }
        }

        public IEnumerable<Projections.OrderCount> GetGraphData()
        {
            var result = _context.Orders.GroupBy(g => g.CustomerName).Select(s => new OrderCount { CustomerName = s.Key, Count = s.Count() }).OrderByDescending(o => o.Count).ToList();
            return result;
        }

        public Projections.Order CreateOrder(Order order)
        {
            //add INSERT INTO EF
            _context.Add(new Models.Order
            {
                OrderType = (OrderType)Enum.Parse(typeof(OrderType), order.OrderType),
                CustomerName = order.CustomerName,
                CreatedDate = DateTime.Parse(order.CreatedDate),
                CreatedByUserName = order.CreatedByUserName
            });
            _context.SaveChanges();
            return order;
        }

        public int DeleteOrders(List<int> OrderIDs)
        {
            //add EF DELETE
            var orders = _context.Orders.Where(a => OrderIDs.Contains(a.OrderID));
            _context.Orders.RemoveRange(orders);
            return _context.SaveChanges();
        }
    }
}