using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using viajar360BackEnd.Models;

namespace viajar360BackEnd.Controllers
{
    public class obteneratraccionesController : ApiController
    {
        AtraccionesEntities db = new AtraccionesEntities();
        [HttpGet]
        public IHttpActionResult respuesta(int id)
        {
            var salida = db.Atracciones.Where(h => h.id_ciudad == id).OrderBy(n => n.nombre).ToList();
            return Ok(salida);
        }
    }

    public class listaratraccionesController : ApiController
    {
        AtraccionesEntities db = new AtraccionesEntities();
        [HttpGet]
        public IHttpActionResult respuesta()
        {
            return Ok(db.Atracciones.OrderBy(n => n.nombre).ToList());
        }
    }
}
