using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace viajar360BackEnd.Models
{
    public class Login
    {
        public string usuario { get; set; }
        public string password { get; set; }
    }

    public class Registro
    {
        public string email { get; set; }
        public string usuario { get; set; }
        public string password { get; set; }
    }

    public class authToken
    { 
        public string usuario { get; set; }
        public string sid { get; set; }
    }

    public class EditarUsuario
    {
        public string usuario { get; set; }
        public string sid { get; set; }
        public string mail { get; set; }
        public string nombre { get; set; }
        public string apellido { get; set; }
        public string direccion { get; set; }
        public string localidad { get; set; }
        public string provincia { get; set; }
        public string telefono { get; set; }
        public string foto { get; set; }
    }

    public class BorrarUsuario
    {
        public string usuario { get; set; }
        public string sid { get; set; }
        public string removekey { get; set; }
    }

    public class obtID
    {
        public string name { get; set; }
    }
}