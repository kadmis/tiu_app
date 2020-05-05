using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Infrastructure.DTO;
using WebApi.Infrastructure.Entities;

namespace WebApi.Infrastructure.Mapping
{
  public class PlanetMapping : Profile
  {
    public PlanetMapping()
    {
      CreateMap<Planet, PlanetDTO>();
      CreateMap<PlanetDTO, Planet>();
    }
  }
}
