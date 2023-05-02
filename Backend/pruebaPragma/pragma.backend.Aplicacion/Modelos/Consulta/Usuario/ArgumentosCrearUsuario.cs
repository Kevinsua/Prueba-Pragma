using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pragma.backend.Aplicacion.Modelos.Consulta.Usuarios
{
    public class ArgumentosCrearUsuario
    {
        [Required(ErrorMessage = "El nombre es requerido")]
        public string Nombre { get; set; }
        [Required(ErrorMessage = "El rut es requerido")]
        public string Rut { get; set; }
        [EmailAddress(ErrorMessage = "El formato del email es incorrecto, por favor ingreselo nuevamente.")]
        public string? Correo { get; set; }
        [Required(ErrorMessage = "La fecha de nacimiento es requerida")]
        public DateTime FechaNacimiento { get; set; }
    }
}
