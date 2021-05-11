using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace viajar360BackEnd.Models
{
    public class CrearTema
    {
        public string titulo { get; set; }
        public string usuario { get; set; }
        public string sid { get; set; }
    }

    public class CrearComentario
    {
        public string mensaje { get; set; }
        public string usuario { get; set; }
        public string sid { get; set; }
        public int tema { get; set; }

    }

    public class reportarComentario
    {
        public string sid { get; set; }
        public string usuario { get; set; }
        public int id_comentario { get; set; }
    }

    public class BorrarHilos
    {
        public string sid { get; set; }
        public string usuario { get; set; }
        public int id_hilo { get; set; }
    }

    public class getUID
    {
        public string sid { get; set; }
        public string usuario { get; set; }
    }
}