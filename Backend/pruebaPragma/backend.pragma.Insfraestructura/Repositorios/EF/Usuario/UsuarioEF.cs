using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.pragma.Insfraestructura.Repositorios.EF.Usuario
{
    public class UsuarioEF
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Rut { get; set; }
        public string? Correo { get; set; }
        public DateTime FechaNacimiento { get; set; }
    }
}
