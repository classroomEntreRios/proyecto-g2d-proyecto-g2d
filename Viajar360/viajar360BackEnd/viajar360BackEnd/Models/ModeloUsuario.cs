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
}