using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace viajar360BackEnd.Models
{
    public class AdminAuth
    {
        public string usuario { get; set; }
        public string sid { get; set; }
    }

    public class lockUs : AdminAuth
    {
        public int uid { get; set; }
        public string username { get; set; }
    }

    public class getUs : AdminAuth
    {
        public int uid { get; set; }
    }
    
    public class edUsr : AdminAuth
    {
        public bool apellido { get; set; }
        public bool nombre { get; set; }
        public bool direccion { get; set; }
        public bool telefono { get; set; }
        public bool localidad { get; set; }
        public bool provincia { get; set; }
        public bool foto { get; set; }
        public int uid { get; set; }
    }
}