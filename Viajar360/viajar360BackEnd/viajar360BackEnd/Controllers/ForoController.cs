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

    public class crearcomentarioController : ApiController
    {
        ForoEntities Fdb = new ForoEntities();
        TokenEntities Tdb = new TokenEntities();
        UsuariosEntities Udb = new UsuariosEntities();
        public IHttpActionResult Ccomentario(CrearComentario coment)
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""},
                { "error", "" },
            };
            try
            {
                if (Tdb.Token.Any(i => i.usuario == coment.usuario))
                {
                    var user = Tdb.Token.First(i => i.usuario == coment.usuario);
                    if (user.token1 == coment.sid && (DateTime.Compare(DateTime.Today, user.vencimiento) <= 0))
                    {
                        if (Fdb.Temas.Where(H => H.id_tema == coment.tema).First().estado == 0) { 
                            int uid = Udb.Usuario.Where(U => U.username == coment.usuario).First().id_usuario;
                            Comentarios nuevo = new Comentarios();
                            nuevo.id_tema = coment.tema;
                            nuevo.mensaje = coment.mensaje;
                            nuevo.fecha_hora = DateTime.Now;
                            nuevo.id_usuario = uid;
                            nuevo.reportes = 0;
                            Fdb.Comentarios.Add(nuevo);
                            Fdb.SaveChanges();
                            respuesta["estado"] = true;
                            respuesta["reporte"] = "Se creo el comentario con exito";
                            return Ok(respuesta);
                        }
                        else
                        {
                            respuesta["reporte"] = "El tema esta cerrado ya no puede comentarse en el";
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
            catch (Exception ex)
            {
                respuesta["reporte"] = "Ha ocurrido un error vuelva a intentarlo mas tarde";
                respuesta["error"] = ex;
                return Ok(respuesta);
            }
        }
    }

    public class listarcomentariosController : ApiController
    {
        ForoEntities db = new ForoEntities();
        UsuariosEntities Udb = new UsuariosEntities();
        [HttpGet]
        public IHttpActionResult hilos(int id)
        {
            int aux = 0;
            string taux = "";
            Dictionary<string, dynamic> info = new Dictionary<string, dynamic> { 

            };

            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", "" },
                { "total", 0 },
                { "listado", null },
                { "objeto", null },
                { "error", "" }
            };
            try
            {
                respuesta["objeto"] = db.Comentarios.Where(C => C.id_tema == id).ToList();
                foreach(Comentarios coment in respuesta["objeto"])
                {
                    var tmp = Udb.Usuario.Where(U => U.id_usuario == coment.id_usuario).First();
                    taux = "A"+aux.ToString();
                    info.Add(taux, new Tuple<int, string, string>(tmp.id_usuario, tmp.username, tmp.foto));
                    aux = aux + 1;
                }
                respuesta["listado"] = info;
                respuesta["total"] = aux - 1;
                respuesta["estado"] = true;
                return Ok(respuesta);
            }
            catch (Exception e)
            {
                respuesta["error"] = e;
                respuesta["reporte"] = "Ha ocurrido un error vuelva a intentarlo mas tarde";
                return Ok(respuesta);
            }
        }
    }

    public class lscomreportController : ApiController
    {
        ForoEntities db = new ForoEntities();
        [HttpGet]
        public IHttpActionResult hilos()
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", "" },
                { "objeto", null }
            };
            try
            {
                respuesta["objeto"] = db.Comentarios.Where(C => C.reportes > 0).OrderByDescending(U=> U.reportes).ToList();
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

    public class reportarcomentarioController : ApiController
    {
        ForoEntities Fdb = new ForoEntities();
        TokenEntities Tdb = new TokenEntities();
        [HttpPost]
        public IHttpActionResult Ccomentario(reportarComentario coment)
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""},
                { "error", "" },
            };
            try
            {
                if (Tdb.Token.Any(i => i.usuario == coment.usuario))
                {
                    var user = Tdb.Token.First(i => i.usuario == coment.usuario);
                    if (user.token1 == coment.sid && (DateTime.Compare(DateTime.Today, user.vencimiento) <= 0))
                    {
                        var com = Fdb.Comentarios.Where(C => C.id_comentario == coment.id_comentario).First();
                        com.reportes = com.reportes + 1;
                        Fdb.SaveChanges();
                        respuesta["estado"] = true;
                        respuesta["reporte"] = "comentario reportado con exito";
                        return Ok(respuesta);
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
            catch (Exception ex)
            {
                respuesta["reporte"] = "Ha ocurrido un error vuelva a intentarlo mas tarde";
                respuesta["error"] = ex;
                return Ok(respuesta);
            }
        }
    }

    public class borrarhiloController : ApiController
    {
        ForoEntities Fdb = new ForoEntities();
        TokenEntities Tdb = new TokenEntities();
        UsuariosEntities Udb = new UsuariosEntities();
        [HttpPost]
        public IHttpActionResult BHilo(BorrarHilos hilo)
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""},
                { "error", "" },
            };
            try
            {
                if (Tdb.Token.Any(i => i.usuario == hilo.usuario))
                {
                    var user = Tdb.Token.First(i => i.usuario == hilo.usuario);
                    if (user.token1 == hilo.sid && (DateTime.Compare(DateTime.Today, user.vencimiento) <= 0) && Udb.Usuario.Where( U => U.username == hilo.usuario).First().modificaciones == "admin")
                    {
                        var Hilo = Fdb.Temas.Where(T => T.id_tema == hilo.id_hilo).First();
                        Fdb.Temas.Remove(Hilo);
                        var Comen = Fdb.Comentarios.Where(C => C.id_tema == hilo.id_hilo).ToList();
                        foreach(var com in Comen){
                            Fdb.Comentarios.Remove(com);
                        }
                        Fdb.SaveChanges();
                        respuesta["estado"] = true;
                        respuesta["reporte"] = "Se borro el tema con exito";
                        return Ok(respuesta);
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
            catch (Exception ex)
            {
                respuesta["reporte"] = "Ha ocurrido un error vuelva a intentarlo mas tarde";
                respuesta["error"] = ex;
                return Ok(respuesta);
            }
        }
    }

    public class cerrarhiloController : ApiController
    {
        ForoEntities Fdb = new ForoEntities();
        TokenEntities Tdb = new TokenEntities();
        UsuariosEntities Udb = new UsuariosEntities();
        [HttpPost]
        public IHttpActionResult BHilo(BorrarHilos hilo)
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""},
                { "error", "" },
            };
            try
            {
                if (Tdb.Token.Any(i => i.usuario == hilo.usuario))
                {
                    var user = Tdb.Token.First(i => i.usuario == hilo.usuario);
                    if (user.token1 == hilo.sid && (DateTime.Compare(DateTime.Today, user.vencimiento) <= 0) && Udb.Usuario.Where(U => U.username == hilo.usuario).First().modificaciones == "admin")
                    {
                        var Hilo = Fdb.Temas.Where(T => T.id_tema == hilo.id_hilo).First();
                        Hilo.estado = 1;
                        Fdb.SaveChanges();
                        respuesta["estado"] = true;
                        respuesta["reporte"] = "Se cerro el tema con exito";
                        return Ok(respuesta);
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
            catch (Exception ex)
            {
                respuesta["reporte"] = "Ha ocurrido un error vuelva a intentarlo mas tarde";
                respuesta["error"] = ex;
                return Ok(respuesta);
            }
        }
    }

    public class borrarcomentarioController : ApiController
    {
        ForoEntities Fdb = new ForoEntities();
        TokenEntities Tdb = new TokenEntities();
        UsuariosEntities Udb = new UsuariosEntities();
        [HttpPost]
        public IHttpActionResult Ccomentario(reportarComentario coment)
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""},
                { "error", "" },
            };
            try
            {
                if (Tdb.Token.Any(i => i.usuario == coment.usuario))
                {
                    var user = Tdb.Token.First(i => i.usuario == coment.usuario);
                    if (user.token1 == coment.sid && (DateTime.Compare(DateTime.Today, user.vencimiento) <= 0))
                    {
                        var com = Fdb.Comentarios.Where(C => C.id_comentario == coment.id_comentario).First();
                        var us = Udb.Usuario.Where(U => U.username == coment.usuario).First();
                        if ((com.id_usuario == us.id_usuario) || (us.modificaciones == "admin"))
                        {
                            Fdb.Comentarios.Remove(com);
                            Fdb.SaveChanges();
                            respuesta["estado"] = true;
                            respuesta["reporte"] = "Comentario borrado con exito";
                            return Ok(respuesta);
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
                else
                {
                    respuesta["reporte"] = "El token de autenticacion es invalido, porfavor vuelva a iniciar sesion e intentelo de nuevo";
                    return Ok(respuesta);
                }
            }
            catch (Exception ex)
            {
                respuesta["reporte"] = "Ha ocurrido un error vuelva a intentarlo mas tarde";
                respuesta["error"] = ex;
                return Ok(respuesta);
            }
        }
    }

    public class perdonarcomentarioController : ApiController
    {
        ForoEntities Fdb = new ForoEntities();
        TokenEntities Tdb = new TokenEntities();
        UsuariosEntities Udb = new UsuariosEntities();
        [HttpPost]
        public IHttpActionResult Ccomentario(reportarComentario coment)
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""},
                { "error", "" },
            };
            try
            {
                if (Tdb.Token.Any(i => i.usuario == coment.usuario))
                {
                    var user = Tdb.Token.First(i => i.usuario == coment.usuario);
                    if (user.token1 == coment.sid && (DateTime.Compare(DateTime.Today, user.vencimiento) <= 0))
                    {
                        var com = Fdb.Comentarios.Where(C => C.id_comentario == coment.id_comentario).First();
                        var us = Udb.Usuario.Where(U => U.username == coment.usuario).First();
                        if ((com.id_usuario == us.id_usuario) || (us.modificaciones == "admin"))
                        {
                            com.reportes = 0;
                            Fdb.SaveChanges();
                            respuesta["estado"] = true;
                            respuesta["reporte"] = "Comentario fue perdonado con exito";
                            return Ok(respuesta);
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
                else
                {
                    respuesta["reporte"] = "El token de autenticacion es invalido, porfavor vuelva a iniciar sesion e intentelo de nuevo";
                    return Ok(respuesta);
                }
            }
            catch (Exception ex)
            {
                respuesta["reporte"] = "Ha ocurrido un error vuelva a intentarlo mas tarde";
                respuesta["error"] = ex;
                return Ok(respuesta);
            }
        }
    }

    public class reabrirhiloController : ApiController
    {
        ForoEntities Fdb = new ForoEntities();
        TokenEntities Tdb = new TokenEntities();
        UsuariosEntities Udb = new UsuariosEntities();
        [HttpPost]
        public IHttpActionResult BHilo(BorrarHilos hilo)
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""},
                { "error", "" },
            };
            try
            {
                if (Tdb.Token.Any(i => i.usuario == hilo.usuario))
                {
                    var user = Tdb.Token.First(i => i.usuario == hilo.usuario);
                    if (user.token1 == hilo.sid && (DateTime.Compare(DateTime.Today, user.vencimiento) <= 0) && Udb.Usuario.Where(U => U.username == hilo.usuario).First().modificaciones == "admin")
                    {
                        var Hilo = Fdb.Temas.Where(T => T.id_tema == hilo.id_hilo).First();
                        Hilo.estado = 0;
                        Fdb.SaveChanges();
                        respuesta["estado"] = true;
                        respuesta["reporte"] = "Se abrio el tema con exito";
                        return Ok(respuesta);
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
            catch (Exception ex)
            {
                respuesta["reporte"] = "Ha ocurrido un error vuelva a intentarlo mas tarde";
                respuesta["error"] = ex;
                return Ok(respuesta);
            }
        }
    }
    
    public class getuidController : ApiController
    {
        TokenEntities Tdb = new TokenEntities();
        UsuariosEntities Udb = new UsuariosEntities();
        [HttpPost]
        public IHttpActionResult resultado(getUID entrada)
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""},
                { "error", "" },
            };
            try
            {
                if (Tdb.Token.Any(i => i.usuario == entrada.usuario))
                {
                    var user = Tdb.Token.First(i => i.usuario == entrada.usuario);
                    if (user.token1 == entrada.sid && (DateTime.Compare(DateTime.Today, user.vencimiento) <= 0))
                    {
                        int Uid = Udb.Usuario.Where(U => U.username == entrada.usuario).First().id_usuario;
                        respuesta["estado"] = true;
                        respuesta["reporte"] = Uid;
                        return Ok(respuesta);
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
            catch (Exception ex)
            {
                respuesta["reporte"] = "Ha ocurrido un error vuelva a intentarlo mas tarde";
                respuesta["error"] = ex;
                return Ok(respuesta);
            }
        }
    }
}
