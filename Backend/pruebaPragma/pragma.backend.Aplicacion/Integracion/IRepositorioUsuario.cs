using pragma.backend.Aplicacion.Modelos.Consulta.Usuarios;
using pragma.backend.Aplicacion.Modelos.Negocio.Usuarios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pragma.backend.Aplicacion.Integracion
{
    public interface IRepositorioUsuario
    {
        public Task<bool> CrearUsuario(ArgumentosCrearUsuario argumentos);
        public Task<bool> ModificarUsuario(ArgumentosModificarUsuario argumentos);
        public Task<bool> BorrarUsuario(ArgumentosBorrarUsuario argumentos);
        public Task<List<Usuario>> ObtenerListaUsuarios();
        public Task<bool> ObtenerUsuarioPorRut(string rut);
    }
}
