using Microsoft.AspNetCore.Mvc;
using pragma.backend.Aplicacion.Modelos.Consulta.Usuarios;
using pragma.backend.Aplicacion.Modelos.Negocio.Usuarios;
using pragma.backend.Aplicacion.Servicios.Usuarios;
using pruebaPragma.Models;

namespace pruebaPragma.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : Controller
    {
        private Error err = new Error
        {
            Codigo = StatusCodes.Status400BadRequest
        };
        private readonly IServicioUsuario _servicioUsuario;

        public UsuarioController(IServicioUsuario servicioUsuario)
        {
            _servicioUsuario = servicioUsuario;

        }

        [HttpPost]
        [Route("Crear")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Crear([FromBody] ArgumentosCrearUsuario argumentos)
        {
            try
            {
                bool resultado = false;
                resultado = await _servicioUsuario.CrearUsuario(argumentos);

                return Ok(resultado);


            }
            catch (ArgumentException arEx)
            {
                err.Codigo = StatusCodes.Status206PartialContent;
                err.Mensaje = arEx.Message;
                err.InformacionAdicional = arEx.ParamName;
                return StatusCode(StatusCodes.Status206PartialContent, err);
            }
            catch (Exception ex)
            {
                err.Mensaje = ex.Message;
                err.InformacionAdicional = ex.GetBaseException().Message;
                return BadRequest(err);
            }
        }

        [HttpPost]
        [Route("Modificar")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Modificar([FromBody] ArgumentosModificarUsuario argumentos)
        {
            try
            {
                bool resultado = false;
                resultado = await _servicioUsuario.ModificarUsuario(argumentos);

                return Ok(resultado);


            }
            catch (ArgumentException arEx)
            {
                err.Codigo = StatusCodes.Status206PartialContent;
                err.Mensaje = arEx.Message;
                err.InformacionAdicional = arEx.ParamName;
                return StatusCode(StatusCodes.Status206PartialContent, err);
            }
            catch (Exception ex)
            {
                err.Mensaje = ex.Message;
                err.InformacionAdicional = ex.GetBaseException().Message;
                return BadRequest(err);
            }
        }
        [HttpPost]
        [Route("Borrar")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Borrar([FromBody] ArgumentosBorrarUsuario argumentos)
        {
            try
            {
                bool resultado = false;
                resultado = await _servicioUsuario.BorrarUsuario(argumentos);

                return Ok(resultado);


            }
            catch (ArgumentException arEx)
            {
                err.Codigo = StatusCodes.Status206PartialContent;
                err.Mensaje = arEx.Message;
                err.InformacionAdicional = arEx.ParamName;
                return StatusCode(StatusCodes.Status206PartialContent, err);
            }
            catch (Exception ex)
            {
                err.Mensaje = ex.Message;
                err.InformacionAdicional = ex.GetBaseException().Message;
                return BadRequest(err);
            }
        }
        [HttpPost]
        [Route("ListaUsuarios")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> ListaUsuarios([FromBody] ArgumentosListaUsuarios argumentos)
        {
            try
            {
                if (argumentos.Exportar)
                {
                    string export = await _servicioUsuario.ObtenerListaUsuariosExcel();
                    return Ok(export);
                }
                else
                {
                    List<Usuario> resultado = await _servicioUsuario.ObtenerListaUsuarios();
                    return Ok(resultado);

                }


            }
            catch (ArgumentException arEx)
            {
                err.Codigo = StatusCodes.Status206PartialContent;
                err.Mensaje = arEx.Message;
                err.InformacionAdicional = arEx.ParamName;
                return StatusCode(StatusCodes.Status206PartialContent, err);
            }
            catch (Exception ex)
            {
                err.Mensaje = ex.Message;
                err.InformacionAdicional = ex.GetBaseException().Message;
                return BadRequest(err);
            }
        }
    }
}
