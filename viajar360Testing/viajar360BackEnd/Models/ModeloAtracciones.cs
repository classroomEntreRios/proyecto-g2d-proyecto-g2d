using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace viajar360BackEnd.Models
{
    public class crearAtracciones
    {
        public string nombre { get; set; }
        public string detalles { get; set; }
        public string ubicacion { get; set; }
        public int id_ciudad { get; set; }
        public string usuario { get; set; }
        public string sid { get; set; }
    }

    public class EditarAtracciones
    {
        public string nombre { get; set; }
        public string detalles { get; set; }
        public string ubicacion { get; set; }
        public int id_ciudad { get; set; }
        public string usuario { get; set; }
        public string sid { get; set; }
        public string id_atraccion { get; set; }
        public string foto { get; set; }
        public bool borrarfoto { get; set; }
    }

    public class BorrarAtracciones
    {
        public int id_atraccion { get; set; }
        public string nombre { get; set; }
        public string usuario { get; set; }
        public string sid { get; set; }
    }
}