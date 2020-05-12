using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WebApi.Infrastructure.DTO;
using WebApi.Infrastructure.Services;

namespace WebApi.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class PlanetsController : ControllerBase
  {
    private readonly IPlanetsService service;

    public PlanetsController(IPlanetsService service)
    {
      this.service = service;
    }

    [HttpGet]
    public async Task<IEnumerable<PlanetDTO>> GetPlanets()
    {
      return await service.GetPlanets();
    }

    [HttpGet("{id}")]
    public async Task<PlanetDTO> GetPlanet(int id)
    {
      return await service.GetPlanet(id);
    }

    [HttpPost("add")]
    public async Task<int> AddPlanet([FromBody]PlanetDTO planet)
    {
      return await service.AddPlanet(planet);
    }

    [HttpPut("update")]
    public PlanetDTO UpdatePlanet([FromBody]PlanetDTO planet)
    {
      return service.UpdatePlanet(planet);
    }

    [HttpDelete("delete/{id}")]
    public bool DeletePlanet(int id)
    {
      return service.DeletePlanet(id);
    }
	
    [HttpPost("upload-image"), DisableRequestSizeLimit]
    public UploadResult Upload()
    {
      try
      {
        var file = Request.Form.Files[0];
        var folderName = "assets";
        var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
 
        if (file.Length > 0)
        {
            var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            var fullPath = Path.Combine(pathToSave, fileName);
 
            using (var stream = new FileStream(fullPath, FileMode.CreateNew))
            {
                file.CopyTo(stream);
            }

            var filePath = Path.Combine(folderName,fileName);
 
            return new UploadResult() { Success = true, FilePath = filePath};
        }
        else
        {
            return new UploadResult() { Success = false, FilePath = string.Empty};
        }
      }
      catch (Exception)
      {
          return new UploadResult() { Success = false, FilePath = string.Empty};
      }
    }
  }
}
