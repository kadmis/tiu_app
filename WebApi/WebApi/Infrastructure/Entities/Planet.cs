using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Infrastructure.Entities
{
  public class Planet
  {
    public int Id { get; set; }
    public int PlanetNumber { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string ImagePath { get; set; }
  }
}
