﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace viajar360BackEnd.Models
{
    public class CreacionCiudad
    {
        public string nombre { get; set; }
        public string usuario { get; set; }
        public string sid { get; set; }
    }

    public class BorrarCiudad
    {
        public string nombre { get; set; }
        public string usuario { get; set; }
        public string sid { get; set; }
        public int id { get; set; }
    }

    public class EdicionCiudad
    {
        public string nombre { get; set; }
        public string usuario { get; set; }
        public string sid { get; set; }
        public int id { get; set; }
        public string nuevo { get; set; }
    }
}