using System.Collections.Generic;
using API.Projections;

namespace API.Interfaces
{
    public interface IDataProvider
    {
        public IEnumerable<Projections.Order> GetData();

        public IEnumerable<Projections.Order> FindData(string searchValue);

        public Projections.Order CreateOrder(Order order); // fill in inputs

        public int DeleteOrders(List<int> OrderIDs);
    }
}