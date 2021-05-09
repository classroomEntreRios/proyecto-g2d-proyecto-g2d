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
}



