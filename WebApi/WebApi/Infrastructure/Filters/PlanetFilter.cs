using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Infrastructure.Filters
{
  public class PlanetFilter
  {
    public string PlanetName { get; set; }
    public int PlanetNumberFrom { get; set; }
    public int PlanetNumberTo{ get; set; }
    public int PageSize { get; set; }
    public int PageNumber { get; set; }
    public string OrderBy { get; set; }
    public string Order { get; set; }
  }
}
