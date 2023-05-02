using AutoMapper;
using backend.pragma.Insfraestructura.Repositorios.EF.Usuario;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using pragma.backend.Aplicacion.Integracion;
using pragma.backend.Aplicacion.Modelos.Consulta.Usuarios;
using pragma.backend.Aplicacion.Modelos.Negocio.Usuarios;

namespace lakarta.backend.Infraestructura.EF.Usuarios
{
    public class RepositorioUsuarioEF : IRepositorioUsuario
    {
        private readonly string _cadenaConexion;
        private readonly IConfiguration _configuracion;
        private DBContextPragma _dataBaseDBContext;
        private Mapper _mapper;

        public RepositorioUsuarioEF(IConfiguration configuracion)
        {

            _configuracion = configuracion;
            _cadenaConexion = _configuracion.GetConnectionString("cadenaConexionPragma");

            var opcionesDBContext = new DbContextOptionsBuilder<DBContextPragma>();
            opcionesDBContext.UseSqlServer(_cadenaConexion);

            _dataBaseDBContext = new DBContextPragma(opcionesDBContext.Options);
           
            MapperConfiguration config = new MapperConfiguration(cfg => cfg.CreateMap<UsuarioEF, Usuario>()
                                                                         .ReverseMap());

            _mapper = new Mapper(config);

        }
        public async Task<bool> CrearUsuario(ArgumentosCrearUsuario argumentos)
        {
            bool resultado = false;

            UsuarioEF usuarioBD = new UsuarioEF
            {
                Nombre = argumentos.Nombre,
                Correo = argumentos.Correo,
                FechaNacimiento = argumentos.FechaNacimiento,
                Rut = argumentos.Rut
            };
            _dataBaseDBContext.Usuario.Add(usuarioBD);
            resultado = await _dataBaseDBContext.SaveChangesAsync() > 0;

            return resultado;
        }
        public async Task<bool> ModificarUsuario(ArgumentosModificarUsuario argumentos)
        {
            bool resultado = false;

            UsuarioEF? usuarioBD = await _dataBaseDBContext.Usuario.FirstOrDefaultAsync(m => m.Id == argumentos.IdUsuario);
            {
                usuarioBD.Nombre = argumentos.Nombre;
                usuarioBD.Correo = argumentos.Correo;
                usuarioBD.FechaNacimiento = argumentos.FechaNacimiento;
            }
            _dataBaseDBContext.Update(usuarioBD);
            resultado = await _dataBaseDBContext.SaveChangesAsync() > 0;

            return resultado;
        }
        public async Task<bool> BorrarUsuario(ArgumentosBorrarUsuario argumentos)
        {
            bool resultado = false;

            UsuarioEF? usuarioBD = await _dataBaseDBContext.Usuario.FirstOrDefaultAsync(m => m.Id == argumentos.UsuarioId);

            _ = _dataBaseDBContext.Remove(usuarioBD);
            resultado = await _dataBaseDBContext.SaveChangesAsync() > 0;

            return resultado;
        }
        public async Task<List<Usuario>> ObtenerListaUsuarios()
        {
            List<Usuario> resultado;

            List<UsuarioEF>? usuarioBD = await _dataBaseDBContext.Usuario.ToListAsync();

            resultado = _mapper.Map<List<Usuario>>(usuarioBD);

            return resultado;
        }
        public async Task<bool> ObtenerUsuarioPorRut(string rut)
        {
            bool resultado = false;

            UsuarioEF? usuarioBD = await _dataBaseDBContext.Usuario.FirstOrDefaultAsync(m => m.Rut == rut);
            if(usuarioBD != null)
                resultado = true;

            return resultado;
        }
    }
}
