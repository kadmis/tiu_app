using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Infrastructure.DTO
{
  public class PlanetDTO
  {
    public int Id { get; set; }
    public int PlanetNumber { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
  }
}
