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
            var salida = db.Atracciones.Where(h => h.id_ciudad == id).OrderBy(n => n.nombre).First();
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

    public class editaratraccionController : ApiController
    {
        AtraccionesEntities db = new AtraccionesEntities();
        TokenEntities Tdb = new TokenEntities();
        UsuariosEntities Udb = new UsuariosEntities();
        [HttpPost]
        public IHttpActionResult respuesta(EditarAtracciones objeto)
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""}
            };
            try {
                int id = int.Parse(objeto.id_atraccion);
                if (Tdb.Token.Any(d=> d.usuario == objeto.usuario))
                {
                    var TokUs = Tdb.Token.Where(d => d.usuario == objeto.usuario).First();
                    if(TokUs.token1 == objeto.sid && (DateTime.Compare(DateTime.Today, TokUs.vencimiento) <= 0) && (Udb.Usuario.Where(d => d.username == objeto.usuario).First().modificaciones == "admin")){
                        if (db.Atracciones.Any(d => d.id_atraccion == id) && !( db.Atracciones.Any(d => d.nombre == objeto.nombre) ) )
                        {
                            var atracc = db.Atracciones.Where(d => d.id_atraccion == id).First();
                            atracc.id_ciudad = objeto.id_ciudad;
                            atracc.nombre = objeto.nombre;
                            atracc.ubicacion = objeto.ubicacion;
                            atracc.detalles = objeto.detalles;
                            db.SaveChanges();
                            respuesta["estado"] = true;
                            respuesta["reporte"] = "se edito la atraccion "+objeto.nombre+" con exito";
                            return Ok(respuesta);
                        }
                        else
                        {
                            respuesta["reporte"] = "No existe esa atraccion en la base de datos";
                            return Ok(respuesta);
                        }
                    }
                    else
                    {
                        respuesta["reporte"] = "Token Invalido inicie sesion nuevamente";
                        return Ok(respuesta);
                    }
                }
                else
                {
                    respuesta["reporte"] = "Token Invalido inicie sesion nuevamente";
                    return Ok(respuesta);
                }
            }
            catch
            {
                respuesta["reporte"] = "Ha ocurrido un error vuelva a intentarlo mas tarde";
                return Ok(respuesta);
            }
        }
    }

    public class borraratraccionController : ApiController
    {
        AtraccionesEntities db = new AtraccionesEntities();
        TokenEntities Tdb = new TokenEntities();
        UsuariosEntities Udb = new UsuariosEntities();
        [HttpPost]
        public IHttpActionResult respuesta(BorrarAtracciones objeto)
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""}
            };
            try
            {
                if (Tdb.Token.Any(d => d.usuario == objeto.usuario))
                {
                    var TokUs = Tdb.Token.Where(d => d.usuario == objeto.usuario).First();
                    if (TokUs.token1 == objeto.sid && (DateTime.Compare(DateTime.Today, TokUs.vencimiento) <= 0) && (Udb.Usuario.Where(d => d.username == objeto.usuario).First().modificaciones == "admin"))
                    {
                        if ( db.Atracciones.Any(d => d.id_atraccion == objeto.id_atraccion) )
                        {
                            var atracc = db.Atracciones.Where(d => d.id_atraccion == objeto.id_atraccion).First();
                            db.Atracciones.Remove(atracc);
                            db.SaveChanges();
                            respuesta["estado"] = true;
                            respuesta["reporte"] = "se borro la atraccion " + objeto.nombre + " con exito";
                            return Ok(respuesta);
                        }
                        else
                        {
                            respuesta["reporte"] = "No existe esa atraccion en la base de datos";
                            return Ok(respuesta);
                        }
                    }
                    else
                    {
                        respuesta["reporte"] = "Token Invalido inicie sesion nuevamente";
                        return Ok(respuesta);
                    }
                }
                else
                {
                    respuesta["reporte"] = "Token Invalido inicie sesion nuevamente";
                    return Ok(respuesta);
                }
            }
            catch
            {
                respuesta["reporte"] = "Ha ocurrido un error vuelva a intentarlo mas tarde";
                return Ok(respuesta);
            }
        }
    }

    public class crearatraccionController : ApiController
    {
        AtraccionesEntities db = new AtraccionesEntities();
        TokenEntities Tdb = new TokenEntities();
        UsuariosEntities Udb = new UsuariosEntities();
        CiudadesEntities Cdb = new CiudadesEntities();
        [HttpPost]
        public IHttpActionResult respuesta(crearAtracciones objeto)
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""}
            };
            try
            {
                if (Tdb.Token.Any(d => d.usuario == objeto.usuario))
                {
                    var TokUs = Tdb.Token.Where(d => d.usuario == objeto.usuario).First();
                    string nivel = Udb.Usuario.Where(d => d.username == objeto.usuario).First().modificaciones;
                    if ( (TokUs.token1 == objeto.sid) && (DateTime.Compare(DateTime.Today, TokUs.vencimiento) <= 0) && ( nivel == "admin"))
                    {
                        if(!db.Atracciones.Any( d => (d.nombre == objeto.nombre) && (d.id_ciudad == objeto.id_ciudad) ) )
                        {
                            Atracciones nuevo = new Atracciones();
                            if(Cdb.Ciudades.Any(d => d.id_ciudad == objeto.id_ciudad)) {
                                nuevo.id_ciudad = objeto.id_ciudad;
                                nuevo.nombre = objeto.nombre;
                                nuevo.ubicacion = objeto.ubicacion;
                                nuevo.detalles = objeto.detalles;
                                db.Atracciones.Add(nuevo);
                                db.SaveChanges();
                                respuesta["reporte"] = "La atraccion "+objeto.nombre+" fue creada con exito";
                                respuesta["estado"] = true;
                                return Ok(respuesta);
                            }
                            else
                            {
                                respuesta["reporte"] = "Esa ciudad no existe";
                                return Ok(respuesta);
                            }
                        }
                        else
                        {
                            respuesta["reporte"] = "Ya existe una atraccion asi";
                            return Ok(respuesta);
                        }
                    }
                    else
                    {
                        respuesta["reporte"] = "Token Invalido inicie sesion nuevamente";
                        return Ok(respuesta);
                    }
                }
                else
                {
                    respuesta["reporte"] = "Token Invalido inicie sesion nuevamente";
                    return Ok(respuesta);
                }
            }
            catch
            {
                respuesta["reporte"] = "Ha ocurrido un error vuelva a intentarlo mas tarde";
                return Ok(respuesta);
            }
        }
    }
}
