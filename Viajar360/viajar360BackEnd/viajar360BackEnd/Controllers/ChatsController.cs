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
    }

    public class contestarController : ApiController
    {
        [HttpGet]
        public IHttpActionResult listarMensajes()
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""},
                { "listado", null },
                { "respondido", false},
            };
            ChatEntities db = new ChatEntities();

            try
            {
                var listado = db.Chat.Where(n => n.respondido == false).ToList();
                respuesta["estado"] = true;
                respuesta["listado"] = listado;
                return Ok(respuesta);
            }
            catch
            {
                respuesta["reporte"] = "Ha ocurrido un error";
                return Ok(respuesta);
            }
        }
    }
    public class modificar_respondidoController : ApiController
    {
        [HttpPost]
        public IHttpActionResult editar(Chat mensaje)
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""}
            };
            ChatEntities db = new ChatEntities();
            try
            {

                if (db.Chat.Any(j => (j.id_chat == mensaje.id_chat) && (j.respondido == false)))
                {
                    var dato = db.Chat.Where(k => k.id_chat == mensaje.id_chat).First();
                    dato.respondido = true;
                    db.SaveChanges();
                    respuesta["estado"] = true;
                    respuesta["reporte"] = "Se respondió el mensaje '" + mensaje.nombre + mensaje.apellido + "' con éxito'";
                    return Ok(respuesta);
                }
                else
                {
                    respuesta["reporte"] = "La ciudad no existe en la base de datos, reinicie la pagina y revise si la misma existe";
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
        
    





    
