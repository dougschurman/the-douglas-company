using System.Collections.Generic;
using API.Projections;

namespace API.Interfaces
{
    public interface IDataProvider
    {
        public IEnumerable<Projections.Order> GetData(string filterValue);

        public IEnumerable<Projections.Order> FindData(string searchValue);

        public IEnumerable<Projections.OrderCount> GetGraphData();

        public Projections.Order CreateOrder(Order order);

        public int DeleteOrders(List<int> OrderIDs);
    }
}