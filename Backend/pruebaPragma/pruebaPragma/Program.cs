using lakarta.backend.Infraestructura.EF.Usuarios;
using pragma.backend.Aplicacion.Integracion;
using pragma.backend.Aplicacion.Servicios.Usuarios;
using System.Globalization;

namespace RutaLoa.SICNS.Backend.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddScoped<IServicioUsuario, ServicioUsuario>();
            builder.Services.AddScoped<IRepositorioUsuario, RepositorioUsuarioEF>();

            builder.Services.AddCors();
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // establecer cultura en español CL
            var cultureInfo = new CultureInfo("es-CL");
            app.UseRequestLocalization(new RequestLocalizationOptions
            {
                DefaultRequestCulture = new Microsoft.AspNetCore.Localization.RequestCulture(cultureInfo),
                SupportedCultures = new List<CultureInfo>
                {
                    cultureInfo,
                },
                SupportedUICultures = new List<CultureInfo>
                {
                    cultureInfo,
                }
            });

            app.UseCors(option =>
            {
                option.WithOrigins("http://localhost:5173");
                option.AllowAnyMethod();
                option.AllowAnyHeader();
            });
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}