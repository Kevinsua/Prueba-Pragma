using CsvHelper;
using Newtonsoft.Json;
using pragma.backend.Aplicacion.Integracion;
using pragma.backend.Aplicacion.Modelos.Consulta.Usuarios;
using pragma.backend.Aplicacion.Modelos.Negocio.Usuarios;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;


namespace pragma.backend.Aplicacion.Servicios.Usuarios
{
    public class ServicioUsuario : IServicioUsuario
    {
        private IRepositorioUsuario _repositorioUsuario;
        public ServicioUsuario(IRepositorioUsuario repositorioUsuario)
        {
            _repositorioUsuario = repositorioUsuario;
        }
        public async Task<bool> CrearUsuario(ArgumentosCrearUsuario argumentos)
        {
            bool resultado = false;
            var validarUsuario = await _repositorioUsuario.ObtenerUsuarioPorRut(argumentos.Rut);
            if(validarUsuario)
                throw new ArgumentException("El usuario ya existe");

            resultado = await _repositorioUsuario.CrearUsuario(argumentos);
            if (!resultado)
                throw new ArgumentException("No se pudo crear el usuario, intente nuevamente");

            return resultado;
        }
        public async Task<bool> ModificarUsuario(ArgumentosModificarUsuario argumentos)
        {
            bool resultado = false;

            resultado = await _repositorioUsuario.ModificarUsuario(argumentos);
            if (!resultado)
                throw new ArgumentException("No se pudo modificar el usuario, intente nuevamente");

            return resultado;
        }
        public async Task<bool> BorrarUsuario(ArgumentosBorrarUsuario argumentos)
        {
            bool resultado = false;

            resultado = await _repositorioUsuario.BorrarUsuario(argumentos);
            if (!resultado)
                throw new ArgumentException("No se pudo borrar el usuario, intente nuevamente");

            return resultado;
        }
        public async Task<List<Usuario>> ObtenerListaUsuarios()
        {

            List<Usuario> resultado = await _repositorioUsuario.ObtenerListaUsuarios();
            if (resultado.Count == 0 || resultado == null)
                throw new ArgumentException("No se encontraron resultados.");

            return resultado;
        }
        public async Task<string> ObtenerListaUsuariosExcel()
        {

            List<Usuario> resultado = await _repositorioUsuario.ObtenerListaUsuarios();
            if (resultado.Count == 0 || resultado == null)
                throw new ArgumentException("No se encontraron resultados.");

            string jsonString = System.Text.Json.JsonSerializer.Serialize(resultado);

            return ConversionToCSV(jsonString);
        }
        #region Metodos Privados
        private static string ConversionToCSV(string jsonContent)
        {

            var conversion = JsonConvert.DeserializeObject<ExpandoObject[]>(jsonContent);
            StringBuilder st = new StringBuilder();
            using (TextWriter writer = new StringWriter(st))
            {
                using (var csv = new CsvWriter(writer, System.Globalization.CultureInfo.CurrentCulture))
                {
                    csv.WriteRecords((conversion as IEnumerable<dynamic>));
                }

                byte[] bytes = Encoding.Unicode.GetBytes(st.ToString());
                return Convert.ToBase64String(bytes);

            }

        }
        #endregion Metodos Privados
    }
}
