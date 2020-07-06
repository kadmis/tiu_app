using System.IO;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using WebApi.DbSeeder;
using WebApi.Infrastructure;
using WebApi.Infrastructure.Entities;
using WebApi.Infrastructure.Helpers;
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

      services.AddDbContext<ApplicationDbContext>(c => c.UseSqlite(connectionString));
      services.AddTransient<IPlanetsRepository, PlanetsRepository>();
      services.AddTransient<IPlanetsService, PlanetsService>();
      services.AddTransient<IUsersService, UsersService>();
      services.AddTransient<IAuthService, AuthService>();

      services
        .AddIdentityCore<ApplicationUser>()
        .AddRoles<ApplicationRole>()
        .AddSignInManager<SignInManager<ApplicationUser>>()
        .AddEntityFrameworkStores<ApplicationDbContext>();

      services.Configure<IdentityOptions>(options =>
      {
        options.Password.RequireDigit = false;
        options.Password.RequireLowercase = false;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireUppercase = false;
        options.Password.RequiredLength = 4;
        options.Password.RequiredUniqueChars = 1;
      });

      string secret = Configuration.GetSection("Secret").Value;
      services.AddSingleton(new AppSettingsHelper { Secret = secret });
      var key = Encoding.ASCII.GetBytes(secret);
      services.AddAuthentication(x =>
      {
        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
      })
      .AddJwtBearer(x =>
      {
        x.TokenValidationParameters = new TokenValidationParameters
        {
          IssuerSigningKey = new SymmetricSecurityKey(key),
          ValidateIssuer = true,
          ValidateAudience = true,
          ValidIssuer = "localhost",
          ValidAudience = "localhost"
        };
      })
      .AddIdentityCookies();

      var mappingConfig = new MapperConfiguration(
        mc =>
        {
          mc.AddProfile(new PlanetMapping());
        });
      var mapper = mappingConfig.CreateMapper();
      services.AddSingleton(mapper);
      services.AddCors();
      services.Configure<FormOptions>(o =>
      {
        o.ValueLengthLimit = int.MaxValue;
        o.MultipartBodyLengthLimit = int.MaxValue;
        o.MemoryBufferThreshold = int.MaxValue;
      });

      services.AddSwaggerGen(options =>
      {
        options.SwaggerDoc("v2", new OpenApiInfo
        {
          Title = "Planets API",
          Version = "v2"
        });
        options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
          In = ParameterLocation.Header,
          Description = "Please insert JWT with Bearer into field",
          Name = "Authorization",
          Type = SecuritySchemeType.ApiKey
        });
        options.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
          new OpenApiSecurityScheme
          {
            Reference = new OpenApiReference
            {
              Type = ReferenceType.SecurityScheme,
              Id = "Bearer"
            }
          },
          new string[] { }
        }
        });
      });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, UserManager<ApplicationUser> userManager, ApplicationDbContext context)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

      app.UseHttpsRedirection();

      app.UseRouting();

      app.UseAuthentication();
      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });

      app.UseStaticFiles();
      app.UseStaticFiles(new StaticFileOptions()
      {
        FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"assets")),
        RequestPath = new PathString("/assets")
      });

      app.UseSwagger();
      app.UseSwaggerUI(options => options.SwaggerEndpoint("/swagger/v2/swagger.json", "PlaceInfo Services"));

      AppDbSeeder.SeedUsers(userManager, context).Wait();
    }
  }
}
