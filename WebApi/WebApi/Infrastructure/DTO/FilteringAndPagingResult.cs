using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Infrastructure.DTO
{
  public class FilteringAndPagingResult
  {
    public int TotalItems { get; set; }
    public IEnumerable<PlanetDTO> Planets { get; set; }
  }
}
