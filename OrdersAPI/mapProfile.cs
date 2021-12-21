using AutoMapper;

namespace API.Map
{
    public class mapProfile : Profile
    {
        public mapProfile()
        {
            CreateMap<Models.Order, Projections.Order>().ConstructUsing(x => new Projections.Order(x));
        }
    }
}