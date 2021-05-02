using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using viajar360BackEnd.Models;

namespace viajar360BackEnd.Controllers
{
    public class temasController : ApiController
    {
        ForoEntities db = new ForoEntities();
        [HttpGet]
        public IHttpActionResult temas()
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", "" },
                { "objeto", null }
            };
            try { 
                respuesta["objeto"] = db.Temas.ToList();
                respuesta["estado"] = true;
                return Ok(respuesta);
            }
            catch
            {
                respuesta["reporte"] = "Ha ocurrido un error vuelva a intentarlo mas tarde";
                return Ok(respuesta);
            }
        }
    }

    public class creartemasController : ApiController
    {
        ForoEntities db = new ForoEntities();
        TokenEntities Tdb = new TokenEntities();
        [HttpPost]
        public IHttpActionResult creartema(CrearTema nuevo)
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "id_tema", -1 },
                { "reporte", ""},
                { "error", "" },
            };
            try
            {
                if(Tdb.Token.Any(i=> i.usuario == nuevo.usuario))
                {
                    var user = Tdb.Token.First(i => i.usuario == nuevo.usuario);
                    if (user.token1 == nuevo.sid && (DateTime.Compare(DateTime.Today, user.vencimiento) <= 0))
                    {
                        if(!db.Temas.Any(j=> j.titulo == nuevo.titulo))
                        {
                            var NuevoTema = new Temas
                            {
                                titulo = nuevo.titulo
                            };
                            NuevoTema.estado = 0;
                            db.Temas.Add(NuevoTema);
                            db.SaveChanges();
                            respuesta["id_tema"] = db.Temas.Where(j => j.titulo == nuevo.titulo).First().id_tema;
                            respuesta["reporte"] = "Se creo con exito el tema '"+nuevo.titulo+"'";
                            respuesta["estado"] = true;
                            return Ok(respuesta);
                        }
                        else
                        {
                            respuesta["reporte"] = "Un tema con ese nombre ya existe";
                            return Ok(respuesta);
                        }
                    }
                    else
                    {
                        respuesta["reporte"] = "El token de autenticacion es invalido, porfavor vuelva a iniciar sesion e intentelo de nuevo";
                        return Ok(respuesta);
                    }
                }
                else
                {
                    respuesta["reporte"] = "El token de autenticacion es invalido, porfavor vuelva a iniciar sesion e intentelo de nuevo";
                    return Ok(respuesta);
                }
            }
            catch(Exception ex)
            {
                respuesta["reporte"] = "Ha ocurrido un error vuelva a intentarlo mas tarde";
                respuesta["error"] = ex;
                return Ok(respuesta);
            }
        }
    }
}
