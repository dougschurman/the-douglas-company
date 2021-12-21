using API.Enums;
using System.ComponentModel.DataAnnotations;

namespace API.Projections
{
    public class Order
    {

        public Order(){
            
        }
        public Order(Models.Order o)
        {
            OrderID = o.OrderID;
            CreatedByUserName = o.CreatedByUserName;
            CustomerName = o.CustomerName;
            CreatedDate = o.CreatedDate.ToShortDateString();
            OrderType = ((OrderType)o.OrderType).ToString();
        }

        public int? OrderID { get; set; }
        [Required]
        public string OrderType { get; set; }
        [Required]
        public string CustomerName { get; set; }
        public string CreatedDate { get; set; }
        public string CreatedByUserName { get; set; }
    }
}