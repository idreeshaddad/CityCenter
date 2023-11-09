using MB.CityCenter.AutoMapper;
using MB.CityCenter.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MB.CityCenter.WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddAutoMapper(typeof(BrandAutoMapperProfile));

            builder.Services.AddControllers().AddNewtonsoftJson();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


            var allowCors = "allowCors";
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: allowCors,
                                  policy =>
                                  {
                                      policy.WithOrigins("http://localhost:4200")
                                              .AllowAnyMethod()
                                              .AllowAnyHeader();
                                  });
            });


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors(allowCors);

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}