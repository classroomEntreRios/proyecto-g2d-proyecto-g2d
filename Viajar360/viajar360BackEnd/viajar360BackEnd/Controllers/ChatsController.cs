using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using viajar360BackEnd.Models;

namespace viajar360BackEnd.Controllers
{
    public class ChatsController : ApiController
    {



        [HttpPost]
        public IHttpActionResult Chat(Chat mensajeria)
        {
            ChatEntities db = new ChatEntities();
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
          {
                { "estado", false },
                { "reporte", ""}
            };


            try
            {


                var nuevoChat = new Chat
                {
                    mail = mensajeria.mail,
                    nombre = mensajeria.nombre,
                    apellido = mensajeria.apellido,
                    fecha_hora = DateTime.Now,
                    mensaje = mensajeria.mensaje,
                    respondido = false,

                };
                db.Chat.Add(nuevoChat);
                db.SaveChanges();
                respuesta["reporte"] = "Mensaje enviado";
                return Ok(respuesta);

            }
            catch
            {
                respuesta["reporte"] = "Ha ocurrido un error, vuelva a intentarlo mas tarde";
                return Ok(respuesta);
            }
        }

        public class contestarController : ApiController
        {
            TokenEntities Tdb = new TokenEntities();
            UsuariosEntities Udb = new UsuariosEntities();
            ChatEntities db = new ChatEntities();
            [HttpPost]
            public IHttpActionResult listarMensajes(AuthMensajes msg)
            {
                Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""},
                { "listado", null },
            };
                try
                {
                    if (Tdb.Token.Any(i => i.usuario == msg.usuario))
                    {
                        var user = Tdb.Token.First(i => i.usuario == msg.usuario);
                        if (user.token1 == msg.sid && (DateTime.Compare(DateTime.Today, user.vencimiento) <= 0) && Udb.Usuario.Where(U => U.username == msg.usuario).First().modificaciones == "admin")
                        {
                            var listado = db.Chat.Where(n => n.respondido == false).ToList();
                            respuesta["estado"] = true;
                            respuesta["listado"] = listado;
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
                catch
                {
                    respuesta["reporte"] = "Ha ocurrido un error";
                    return Ok(respuesta);
                }
            }
        }
        public class responderController : ApiController
        {
            TokenEntities Tdb = new TokenEntities();
            UsuariosEntities Udb = new UsuariosEntities();
            ChatEntities db = new ChatEntities();
            [HttpPost]
            public IHttpActionResult editar(CloseMensaje msg)
            {
                Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""}
            };

                try
                {
                    if (Tdb.Token.Any(i => i.usuario == msg.usuario))
                    {
                        var user = Tdb.Token.First(i => i.usuario == msg.usuario);
                        if (user.token1 == msg.sid && (DateTime.Compare(DateTime.Today, user.vencimiento) <= 0) && Udb.Usuario.Where(U => U.username == msg.usuario).First().modificaciones == "admin")
                        {
                            if (db.Chat.Any(j => (j.id_chat == msg.id_chat) && (j.respondido == false)))
                            {
                                var dato = db.Chat.Where(k => k.id_chat == msg.id_chat).First();
                                dato.respondido = true;
                                db.SaveChanges();
                                respuesta["estado"] = true;
                                respuesta["reporte"] = "Se respondió el mensaje '" + dato.nombre + dato.apellido + "' con éxito'";
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

                catch
                {
                    respuesta["reporte"] = "Ha ocurrido un error vuelva a intentarlo mas tarde";
                    return Ok(respuesta);
                }
            }
        }

    }
}



