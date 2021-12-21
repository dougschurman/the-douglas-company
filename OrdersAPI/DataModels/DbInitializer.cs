using API.Models;
using System;
using System.Linq;
using API.Enums;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(OrderContext context)
        {
            context.Database.EnsureCreated();

            // Look for any students.
            if (context.Orders.Any())
            {
                return;   // DB has been seeded
            }

            var orders = new Order[]
            {
            new Order{OrderType = OrderType.Standard, CustomerName = "Kroger", CreatedDate = DateTime.Parse("9/30/2020"), CreatedByUserName = "Matt"},
            new Order{OrderType = OrderType.PurchaseOrder, CustomerName = "Target", CreatedDate = DateTime.Parse("11/1/2020"), CreatedByUserName = "Shay"},
            new Order{OrderType = OrderType.ReturnOrder, CustomerName = "Walmart", CreatedDate = DateTime.Parse("10/19/2020"), CreatedByUserName = "David"},
            new Order{OrderType = OrderType.SaleOrder, CustomerName = "Aldi", CreatedDate = DateTime.Parse("5/15/2020"), CreatedByUserName = "Josh"},
            new Order{OrderType = OrderType.TransferOrder, CustomerName = "Meijer", CreatedDate = DateTime.Parse("12/12/2020"), CreatedByUserName = "Alex"}};
            context.SaveChanges();

            foreach (Order e in orders)
            {
                context.Orders.Add(e);
            }
            context.SaveChanges();
        }
    }
}