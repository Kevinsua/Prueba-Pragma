using pragma.backend.Aplicacion.Modelos.Consulta.Usuarios;
using pragma.backend.Aplicacion.Modelos.Negocio.Usuarios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pragma.backend.Aplicacion.Servicios.Usuarios
{
    public interface IServicioUsuario
    {
        Task<bool> CrearUsuario(ArgumentosCrearUsuario argumentos);
        Task<bool> ModificarUsuario(ArgumentosModificarUsuario argumentos);
        Task<bool> BorrarUsuario(ArgumentosBorrarUsuario argumentos);
        Task<List<Usuario>> ObtenerListaUsuarios();
        Task<string> ObtenerListaUsuariosExcel();


    }
}
