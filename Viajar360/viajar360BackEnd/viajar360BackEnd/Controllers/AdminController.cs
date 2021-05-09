using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Web;
using System.Web.Http;
using viajar360BackEnd.Models;

namespace viajar360BackEnd.Controllers
{

    public class banuserController : ApiController
    {
        UsuariosEntities Udb = new UsuariosEntities();
        TokenEntities Tdb = new TokenEntities();
        [HttpPost]
        public IHttpActionResult respuesta(lockUs auth)
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""},
                { "error", "" },
            };
            try { 
                if (Tdb.Token.Any(T => T.usuario == auth.usuario))
                {
                    var TokUs = Tdb.Token.Where(d => d.usuario == auth.usuario).First();
                    if (TokUs.token1 == auth.sid && (DateTime.Compare(DateTime.Today, TokUs.vencimiento) <= 0) && (Udb.Usuario.Where(d => d.username == auth.usuario).First().modificaciones == "admin"))
                    {
                        var user = Udb.Usuario.Where(U => U.id_usuario == auth.uid).First();
                        var Tuser = Tdb.Token.Where(T => T.usuario == auth.username).First();
                        user.password = "";
                        user.salt = "";
                        user.estado = "B";
                        Tuser.token1 = "";
                        Tuser.vencimiento = DateTime.Today.AddDays(-10);
                        Udb.SaveChanges();
                        Tdb.SaveChanges();
                        respuesta["estado"] = true;
                        respuesta["reporte"] = "usuario '" + auth.username + "' Baneado con exito";
                        return Ok(respuesta);
                    }
                    else
                    {
                        respuesta["reporte"] = "usuario no autorizado";
                        return Ok(respuesta);
                    }
                }
                else
                {
                    respuesta["reporte"] = "usuario no autorizado";
                    return Ok(respuesta);
                }
            }
            catch(Exception e)
            {
                respuesta["reporte"] = "Ha ocurrido un error vuelva a intentarlo mas tarde";
                respuesta["error"] = e;
                return Ok(respuesta);
            }
        }

    }

    public class pardonuserController : ApiController
    {
        UsuariosEntities Udb = new UsuariosEntities();
        TokenEntities Tdb = new TokenEntities();
        [HttpPost]
        public IHttpActionResult Regeneracion(lockUs auth)
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""},
                { "pass", "" },
                { "error", "" },
            };
            string[] lista = { "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz", "0123456789" };
            var stringChars = new char[4];
            var random = new Random();
            try
            {
                if (Tdb.Token.Any(T => T.usuario == auth.usuario))
                {
                    var TokUs = Tdb.Token.Where(d => d.usuario == auth.usuario).First();
                    if (TokUs.token1 == auth.sid && (DateTime.Compare(DateTime.Today, TokUs.vencimiento) <= 0) && (Udb.Usuario.Where(d => d.username == auth.usuario).First().modificaciones == "admin"))
                    {
                        var user = Udb.Usuario.Where(U => U.id_usuario == auth.uid).First();
                        var Tuser = Tdb.Token.Where(T => T.usuario == auth.username).First();
                        Tuser.token1 = Guid.NewGuid().ToString();
                        Tuser.vencimiento = DateTime.Today.AddDays(5);
                        string salida = "";
                        //aca genero un nuevo pass aleatorio
                        for (int j = 0; j < lista.Length; j++)
                        {
                            for (int i = 0; i < stringChars.Length; i++)
                            {
                                stringChars[i] = lista[j][random.Next(lista[j].Length - 1)];
                            }
                            salida = salida + new String(stringChars);
                            stringChars = new char[4];
                        }
                        salida = salida.Replace(" ", "");
                        var hash = hasheo(salida);
                        user.salt = hash.Item1;
                        user.password = hash.Item2;
                        if(user.estado == "B")
                        {
                            user.estado = "N";
                        }
                        Udb.SaveChanges();
                        Tdb.SaveChanges();
                        respuesta["estado"] = true;
                        respuesta["pass"] = salida;
                        respuesta["reporte"] = "se reinicio/perdono el usuario '"+auth.username+"' con exito";
                        return Ok(respuesta);
                    }
                    else
                    {
                        respuesta["reporte"] = "usuario no autorizado";
                        return Ok(respuesta);
                    }
                }
                else
                {
                    respuesta["reporte"] = "usuario no autorizado";
                    return Ok(respuesta);
                }
            }
            catch (Exception e)
            {
                respuesta["reporte"] = "Ha ocurrido un error vuelva a intentarlo mas tarde";
                respuesta["error"] = e;
                return Ok(respuesta);
            }
        }
        public Tuple<string, string, string> hasheo(string pass)
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: pass,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA1,
            iterationCount: 10000,
            numBytesRequested: 256 / 8));
            string strsalt = Convert.ToBase64String(salt);
            return new Tuple<string, string, string>(strsalt, hashed, pass);
        }
    }

    public class userlistController : ApiController
    {
        UsuariosEntities Udb = new UsuariosEntities();
        TokenEntities Tdb = new TokenEntities();
        [HttpPost]
        public IHttpActionResult respuesta(AdminAuth auth)
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""},
                { "listado", null },
                { "error", "" },
            };
            
            try
            {
                if(Tdb.Token.Any(T => T.usuario == auth.usuario))
                {
                    var TokUs = Tdb.Token.Where(d => d.usuario == auth.usuario).First();
                    if (TokUs.token1 == auth.sid && (DateTime.Compare(DateTime.Today, TokUs.vencimiento) <= 0) && (Udb.Usuario.Where(d => d.username == auth.usuario).First().modificaciones == "admin"))
                    {
                        respuesta["listado"] = Udb.Usuario.Where(U => U.estado == "N").ToList();
                        respuesta["estado"] = true;
                        return Ok(respuesta);
                    }
                    else
                    {
                        respuesta["reporte"] = "usuario no autorizado";
                        return Ok(respuesta);
                    }
                }
                else
                {
                    respuesta["reporte"] = "usuario no autorizado";
                    return Ok(respuesta);
                }
            }
            catch(Exception e)
            {
                respuesta["reporte"] = "Ha ocurrido un error vuelva a intentarlo mas tarde";
                respuesta["error"] = e;
                return Ok(respuesta);
            }
        }
    }

    public class admineditarController : ApiController
    {
        UsuariosEntities Udb = new UsuariosEntities();
        TokenEntities Tdb = new TokenEntities();
        [HttpPost]
        public IHttpActionResult respuesta(edUsr auth)
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""},
                { "error", "" },
            };
            try
            {
                if (Tdb.Token.Any(T => T.usuario == auth.usuario))
                {
                    var TokUs = Tdb.Token.Where(d => d.usuario == auth.usuario).First();
                    if (TokUs.token1 == auth.sid && (DateTime.Compare(DateTime.Today, TokUs.vencimiento) <= 0) && (Udb.Usuario.Where(d => d.username == auth.usuario).First().modificaciones == "admin"))
                    {
                        var user = Udb.Usuario.Where(U => U.id_usuario == auth.uid).First();
                        if (auth.foto)
                        {
                            if (user.foto != "") { 
                                String path = HttpContext.Current.Server.MapPath("~"+user.foto);
                                File.Delete(path);
                                user.foto = "";
                            }

                        }
                        if (auth.nombre)
                        {
                            user.nombre = "";
                        }
                        if (auth.apellido)
                        {
                            user.apellido = "";
                        }
                        if (auth.direccion)
                        {
                            user.direccion = "";
                        }
                        if (auth.telefono)
                        {
                            user.telefono = "";
                        }
                        if (auth.localidad)
                        {
                            user.localidad = "";
                        }
                        if (auth.provincia)
                        {
                            user.provincia = "";
                        }
                        Udb.SaveChanges();
                        respuesta["estado"] = true;
                        respuesta["reporte"] = "Se borraron los datos marcados con exito";
                        return Ok(respuesta);
                    }
                    else
                    {
                        respuesta["reporte"] = "usuario no autorizado";
                        return Ok(respuesta);
                    }
                }
                else
                {
                    respuesta["reporte"] = "usuario no autorizado";
                    return Ok(respuesta);
                }
            }
            catch (Exception e)
            {
                respuesta["reporte"] = "Ha ocurrido un error vuelva a intentarlo mas tarde";
                respuesta["error"] = e;
                return Ok(respuesta);
            }
        }
    }

    public class delusrController : ApiController
    {
        UsuariosEntities Udb = new UsuariosEntities();
        TokenEntities Tdb = new TokenEntities();
        ForoEntities Fdb = new ForoEntities();
        [HttpPost]
        public IHttpActionResult respuesta(lockUs auth)
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""},
                { "error", "" },
            };
            try
            {
                if (Tdb.Token.Any(T => T.usuario == auth.usuario))
                {
                    var TokUs = Tdb.Token.Where(d => d.usuario == auth.usuario).First();
                    if (TokUs.token1 == auth.sid && (DateTime.Compare(DateTime.Today, TokUs.vencimiento) <= 0) && (Udb.Usuario.Where(d => d.username == auth.usuario).First().modificaciones == "admin"))
                    {
                        var user = Udb.Usuario.Where(U => U.username == auth.username).First();
                        var Token = Tdb.Token.Where(T => T.usuario == auth.username).First();
                        var comentarios = Fdb.Comentarios.Where(C => C.id_usuario == auth.uid);
                        if (user.foto != "")
                        {
                            String path = HttpContext.Current.Server.MapPath("~" + user.foto);
                            File.Delete(path);
                        }
                        Udb.Usuario.Remove(user);
                        Tdb.Token.Remove(Token);
                        foreach (var comentario in comentarios)
                        {
                            Fdb.Comentarios.Remove(comentario);
                        }
                        Udb.SaveChanges();
                        Tdb.SaveChanges();
                        Fdb.SaveChanges();
                        respuesta["estado"] = true;
                        respuesta["reporte"] = "Se borro con exito el usuario '"+auth.username+"'";
                        return Ok(respuesta);
                    }
                    else
                    {
                        respuesta["reporte"] = "usuario no autorizado";
                        return Ok(respuesta);
                    }
                }
                else
                {
                    respuesta["reporte"] = "usuario no autorizado";
                    return Ok(respuesta);
                }
            }
            catch (Exception e)
            {
                respuesta["reporte"] = "Ha ocurrido un error vuelva a intentarlo mas tarde";
                respuesta["error"] = e;
                return Ok(respuesta);
            }
        }
    }

    public class listbanusersController : ApiController
    {
        UsuariosEntities Udb = new UsuariosEntities();
        TokenEntities Tdb = new TokenEntities();
        [HttpPost]
        public IHttpActionResult respuesta(AdminAuth auth)
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""},
                { "listado", null },
                { "error", "" },
            };

            try
            {
                if (Tdb.Token.Any(T => T.usuario == auth.usuario))
                {
                    var TokUs = Tdb.Token.Where(d => d.usuario == auth.usuario).First();
                    if (TokUs.token1 == auth.sid && (DateTime.Compare(DateTime.Today, TokUs.vencimiento) <= 0) && (Udb.Usuario.Where(d => d.username == auth.usuario).First().modificaciones == "admin"))
                    {
                        respuesta["listado"] = Udb.Usuario.Where(U => U.estado == "B").ToList();
                        respuesta["estado"] = true;
                        return Ok(respuesta);
                    }
                    else
                    {
                        respuesta["reporte"] = "usuario no autorizado";
                        return Ok(respuesta);
                    }
                }
                else
                {
                    respuesta["reporte"] = "usuario no autorizado";
                    return Ok(respuesta);
                }
            }
            catch (Exception e)
            {
                respuesta["reporte"] = "Ha ocurrido un error vuelva a intentarlo mas tarde";
                respuesta["error"] = e;
                return Ok(respuesta);
            }
        }
    }

    public class obteneruserController : ApiController
    {
        UsuariosEntities Udb = new UsuariosEntities();
        TokenEntities Tdb = new TokenEntities();
        [HttpPost]
        public IHttpActionResult respuesta(getUs auth)
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""},
                { "objeto", null },
                { "error", "" },
            };

            try
            {
                if (Tdb.Token.Any(T => T.usuario == auth.usuario))
                {
                    var TokUs = Tdb.Token.Where(d => d.usuario == auth.usuario).First();
                    if (TokUs.token1 == auth.sid && (DateTime.Compare(DateTime.Today, TokUs.vencimiento) <= 0) && (Udb.Usuario.Where(d => d.username == auth.usuario).First().modificaciones == "admin"))
                    {
                        if (Udb.Usuario.Any(U => U.id_usuario == auth.uid)) { 
                            respuesta["objeto"] = Udb.Usuario.Where(U => U.id_usuario == auth.uid).First();
                            respuesta["estado"] = true;
                            return Ok(respuesta);
                        }
                        else
                        {
                            respuesta["reporte"] = "ese usuario no existe vuelva a la pagina anterior e intente de nuevo";
                            return Ok(respuesta);
                        }
                    }
                    else
                    {
                        respuesta["reporte"] = "usuario no autorizado";
                        return Ok(respuesta);
                    }
                }
                else
                {
                    respuesta["reporte"] = "usuario no autorizado";
                    return Ok(respuesta);
                }
            }
            catch (Exception e)
            {
                respuesta["reporte"] = "Ha ocurrido un error vuelva a intentarlo mas tarde";
                respuesta["error"] = e;
                return Ok(respuesta);
            }
        }
    }

    public class haceradminController : ApiController
    {
        UsuariosEntities Udb = new UsuariosEntities();
        TokenEntities Tdb = new TokenEntities();
        [HttpPost]
        public IHttpActionResult respuesta(lockUs auth)
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""},
                { "error", "" },
            };
            try
            {
                if (Tdb.Token.Any(T => T.usuario == auth.usuario))
                {
                    var TokUs = Tdb.Token.Where(d => d.usuario == auth.usuario).First();
                    if (TokUs.token1 == auth.sid && (DateTime.Compare(DateTime.Today, TokUs.vencimiento) <= 0) && (Udb.Usuario.Where(d => d.username == auth.usuario).First().modificaciones == "admin"))
                    {
                        var user = Udb.Usuario.Where(U => U.id_usuario == auth.uid).First();
                        var Tuser = Tdb.Token.Where(T => T.usuario == auth.username).First();
                        if(user.modificaciones == "0") {
                            user.modificaciones = "admin";
                            Tuser.token1 = "";
                            Tuser.vencimiento = DateTime.Today.AddDays(-10);
                            Tdb.SaveChanges();
                            respuesta["reporte"] = "usuario '" + auth.username + "' es ahora administrador";
                        } 
                        else
                        {
                            user.modificaciones = "0";
                            respuesta["reporte"] = "usuario '" + auth.username + "' ya no es administrador";
                        }
                        Udb.SaveChanges(); 
                        respuesta["estado"] = true;
                        return Ok(respuesta);
                    }
                    else
                    {
                        respuesta["reporte"] = "usuario no autorizado";
                        return Ok(respuesta);
                    }
                }
                else
                {
                    respuesta["reporte"] = "usuario no autorizado";
                    return Ok(respuesta);
                }
            }
            catch (Exception e)
            {
                respuesta["reporte"] = "Ha ocurrido un error vuelva a intentarlo mas tarde";
                respuesta["error"] = e;
                return Ok(respuesta);
            }
        }
    }

}
