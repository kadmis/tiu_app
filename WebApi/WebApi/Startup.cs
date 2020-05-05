using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WebApi.Infrastructure;
using WebApi.Infrastructure.Mapping;
using WebApi.Infrastructure.Repositories;
using WebApi.Infrastructure.Services;

namespace WebApi
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddControllers();

      string connectionString = Configuration.GetConnectionString("Sqlite");
      services.AddDbContext<PlanetsContext>(c => c.UseSqlite(connectionString));
      services.AddTransient<IPlanetsRepository, PlanetsRepository>();
      services.AddTransient<IPlanetsService, PlanetsService>();

      var mappingConfig = new MapperConfiguration(
        mc =>
        {
          mc.AddProfile(new PlanetMapping());
        });
      var mapper = mappingConfig.CreateMapper();
      services.AddSingleton(mapper);
      services.AddCors();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseCors(builder=>builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

      app.UseHttpsRedirection();

      app.UseRouting();

      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}
