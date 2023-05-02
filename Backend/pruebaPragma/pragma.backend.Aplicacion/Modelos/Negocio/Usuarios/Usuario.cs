using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pragma.backend.Aplicacion.Modelos.Negocio.Usuarios
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Rut { get; set; }
        public string? Correo { get; set; }
        public DateTime FechaNacimiento { get; set; }
    }
}
