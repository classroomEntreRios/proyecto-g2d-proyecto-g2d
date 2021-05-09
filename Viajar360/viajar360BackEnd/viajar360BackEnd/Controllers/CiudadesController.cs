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
        public IHttpActionResult crear(CreacionCiudad ciudad)
        {
            CiudadesEntities db = new CiudadesEntities();
            TokenEntities Tdb = new TokenEntities();
            UsuariosEntities Udb = new UsuariosEntities();
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""}
            };
            // implementar control de tokens y terminar
            try
            {
                if (Tdb.Token.Any(j => j.usuario == ciudad.usuario))
                {
                    var user = Tdb.Token.First(i => i.usuario == ciudad.usuario);
                    if (user.token1 == ciudad.sid && (DateTime.Compare(DateTime.Today, user.vencimiento) <= 0) && (Udb.Usuario.Where(d=> d.username == ciudad.usuario).First().modificaciones == "admin") )
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

    public class listarciudadesController : ApiController
    {
        
        [HttpGet]
        public IHttpActionResult listar()
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", "" },
                { "listado", null }
            };
            try
            {
                CiudadesEntities db = new CiudadesEntities();
                var listado = db.Ciudades.OrderBy(n => n.nombre).ToList();
                respuesta["estado"] = true;
                respuesta["listado"] = listado;
                return Ok(respuesta);
            }
            catch
            {
                respuesta["reporte"] = "ha ocurrido un error, vuelva a intentarlo mas tarde";
                return Ok(respuesta);
            }
        }
    }

    public class obtenerciudadController : ApiController
    {
        [HttpGet]
        public IHttpActionResult obtener(int id)
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", "" },
                { "objeto", null }
            };
            try
            {
                CiudadesEntities db = new CiudadesEntities();
                if(db.Ciudades.Any(i=> i.id_ciudad == id))
                {
                    respuesta["objeto"] = db.Ciudades.Where(j => j.id_ciudad == id).First();
                    respuesta["estado"] = true;
                    return Ok(respuesta);
                }
                else
                {
                    respuesta["reporte"] = "id invalido porfavor revise o ingrese otro";
                    return Ok(respuesta);
                }
            }
            catch
            {
                respuesta["reporte"] = "Ha ocurrido un error";
                return Ok(respuesta);
            }
        }
    }

    public class borrarciudadController : ApiController
    {
        [HttpPost]
        public IHttpActionResult borrar(BorrarCiudad ciudad)
        {
            CiudadesEntities db = new CiudadesEntities();
            TokenEntities Tdb = new TokenEntities();
            UsuariosEntities Udb = new UsuariosEntities();
            AtraccionesEntities Adb = new AtraccionesEntities();
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""}
            };
            try
            {
                if (Tdb.Token.Any(j => j.usuario == ciudad.usuario))
                {
                    var user = Tdb.Token.First(i => i.usuario == ciudad.usuario);
                    if (user.token1 == ciudad.sid && (DateTime.Compare(DateTime.Today, user.vencimiento) <= 0) && (Udb.Usuario.Where(d => d.username == ciudad.usuario).First().modificaciones == "admin") )
                    {
                        if (db.Ciudades.Any(j => (j.id_ciudad == ciudad.id) && (j.nombre == ciudad.nombre)))
                        {
                            var dato = db.Ciudades.Where(k => k.id_ciudad == ciudad.id).First();
                            var aDatos = Adb.Atracciones.Where(d => d.id_ciudad == dato.id_ciudad);
                            foreach(var linea in aDatos)
                            {
                                Adb.Atracciones.Remove(linea);
                            }
                            db.Ciudades.Remove(dato);
                            Adb.SaveChanges();
                            db.SaveChanges();
                            respuesta["estado"] = true;
                            respuesta["reporte"] = "Se borro con exito la ciudad" + ciudad.nombre;
                            return Ok(respuesta);
                        }
                        else
                        {
                            respuesta["reporte"] = "La ciudad no existe en la base de datos, reinicie la pagina y revise si la misma existe";
                            return Ok(respuesta);
                        }
                    }
                    else
                    {
                        respuesta["reporte"] = "El token de autorizacion es invalido vuelva a iniciar sesion e intente de nuevo";
                        return Ok(respuesta);
                    }
                }
                else
                {
                    respuesta["reporte"] = "El token de autorizacion es invalido vuelva a iniciar sesion e intente de nuevo";
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

    public class editarciudadController : ApiController
    {
        [HttpPost]
        public IHttpActionResult editar(EdicionCiudad ciudad)
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""}
            };
            CiudadesEntities db = new CiudadesEntities();
            TokenEntities Tdb = new TokenEntities();
            UsuariosEntities Udb = new UsuariosEntities();
            try
            {
                if (Tdb.Token.Any(j => j.usuario == ciudad.usuario))
                {
                    var user = Tdb.Token.First(i => i.usuario == ciudad.usuario);
                    if (user.token1 == ciudad.sid && (DateTime.Compare(DateTime.Today, user.vencimiento) <= 0) && (Udb.Usuario.Where(d=> d.username == ciudad.usuario).First().modificaciones == "admin") )
                    {
                        if (db.Ciudades.Any(j => (j.id_ciudad == ciudad.id) && (j.nombre == ciudad.nombre)))
                        {
                            var dato = db.Ciudades.Where(k => k.id_ciudad == ciudad.id).First();
                            dato.nombre = ciudad.nuevo;
                            db.SaveChanges();
                            respuesta["estado"] = true;
                            respuesta["reporte"] = "Se renombro la ciudad '"+ciudad.nombre+"' con exito su nombre actual es '"+ciudad.nuevo+"'";
                            return Ok(respuesta);
                        }
                        else
                        {
                            respuesta["reporte"] = "La ciudad no existe en la base de datos, reinicie la pagina y revise si la misma existe";
                            return Ok(respuesta);
                        }
                    }
                    else
                    {
                        respuesta["reporte"] = "El token de autorizacion es invalido vuelva a iniciar sesion e intente de nuevo";
                        return Ok(respuesta);
                    }
                }
                else
                {
                    respuesta["reporte"]= "El token de autorizacion es invalido vuelva a iniciar sesion e intente de nuevo";
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
