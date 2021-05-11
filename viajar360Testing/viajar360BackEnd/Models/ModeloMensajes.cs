using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace viajar360BackEnd.Models
{
    public class AuthMensajes
    {
        public string sid { get; set; }
        public string usuario { get; set; }
    }
    
    public class CloseMensaje : AuthMensajes
    {
        public int id_chat { get; set; }
    }
}