using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using viajar360BackEnd.Models;

namespace viajar360BackEnd.Controllers
{
    public class crearciudadController : ApiController
    {
        [HttpPost]
        public IHttpActionResult crear(CreacionCiudad ciudad) {
            CiudadesEntities db = new CiudadesEntities();
            TokenEntities Tdb = new TokenEntities();
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""}
            };
            // implementar control de tokens y terminar
            try {
                if (Tdb.Token.Any(j=> j.usuario == ciudad.usuario)) {
                    var user = Tdb.Token.First(i => i.usuario == ciudad.usuario);
                    if (user.token1 == ciudad.sid && (DateTime.Compare(DateTime.Today, user.vencimiento) <= 0))
                    {
                        if (!db.Ciudades.Any(i => i.nombre == ciudad.nombre))
                        {
                            var Nciudad = new Ciudades
                            {
                                nombre = ciudad.nombre,
                            };
                            db.Ciudades.Add(Nciudad);
                            db.SaveChanges();
                            respuesta["estado"] = true;
                            respuesta["reporte"] = "La ciudad '" + ciudad.nombre + "' se a creado con exito";
                            return Ok(respuesta);
                        }
                        else
                        {
                            respuesta["reporte"] = "La ciudad '" + ciudad.nombre + "' ya existe en la base de datos";
                            return Ok(respuesta);
                        }
                    }
                    else
                    {
                        respuesta["reporte"] = "El token de inicio de sesion es invalido por favor inicie sesion nuevamente e intente de nuevo";
                        return Ok(respuesta);
                    }
                }
                else
                {
                    respuesta["reporte"] = "El usuario no esta registrado, por favor inicie sesion nuevamente";
                    return Ok(respuesta);
                }
            }
            catch
            {
                respuesta["reporte"] = "Ha ocurrido un error, vuelva a intentarlo mas tarde";
                return Ok(respuesta);
            }
        }
    }
}
