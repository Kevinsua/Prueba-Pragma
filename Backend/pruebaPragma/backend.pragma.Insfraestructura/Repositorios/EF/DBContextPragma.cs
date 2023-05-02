using backend.pragma.Insfraestructura.Repositorios.EF.Usuario;
using Microsoft.EntityFrameworkCore;

namespace lakarta.backend.Infraestructura.EF
{
    internal class DBContextPragma : DbContext
    {
        private string _cadenaConexion;
        public DbSet<UsuarioEF> Usuario { get; set; }


        private DBContextPragma()
        {
            _cadenaConexion = String.Empty;
        }

        public DBContextPragma(string cadenaConexion)
        {
            _cadenaConexion = cadenaConexion;
        }
        public DBContextPragma(DbContextOptions opciones) : base(opciones)
        {

            _cadenaConexion = Database.GetDbConnection().ConnectionString ?? String.Empty;

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(_cadenaConexion);

            }
        }

    }
}
