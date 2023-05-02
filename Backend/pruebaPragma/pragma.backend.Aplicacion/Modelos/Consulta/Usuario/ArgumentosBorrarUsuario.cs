using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pragma.backend.Aplicacion.Modelos.Consulta.Usuarios
{
    public class ArgumentosBorrarUsuario
    {
        [Required(ErrorMessage = "El id es requerido")]
        [Range(minimum: 1, maximum: int.MaxValue, ErrorMessage = "El id del usuario debe ser mayor que 0")]
        public int UsuarioId { get; set; }
    }
}
