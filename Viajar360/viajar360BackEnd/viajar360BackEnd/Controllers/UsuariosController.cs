using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Http;
using viajar360BackEnd.Models;

namespace viajar360BackEnd.Controllers
{
    public class ingresoController : ApiController
    {

        UsuariosEntities db = new UsuariosEntities();
        TokenEntities Tdb = new TokenEntities();
        [HttpPost]
        public IHttpActionResult Login(Login entrada)
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "token", "" },
                { "reporte", ""}
            };
            try
            {
                if (db.Usuario.Any(i => i.username == entrada.usuario))
                {
                    var user = db.Usuario.First(i => i.username == entrada.usuario);
                    if (hasheo(entrada.password, user.salt) == user.password)
                    {
                        var UserTok = Tdb.Token.First(i => i.usuario == entrada.usuario);
                        UserTok.token1 = Guid.NewGuid().ToString();
                        UserTok.vencimiento = DateTime.Today.AddDays(31);
                        Tdb.SaveChanges();
                        respuesta["token"] = UserTok.token1;
                        respuesta["estado"] = true;
                        respuesta["reporte"] = "Ingreso exitoso";
                        return Ok(respuesta);
                    }
                    else
                    {
                        respuesta["estado"] = false;
                        respuesta["reporte"] = "Contraseña Incorrecta";
                        return Ok(respuesta);
                    }
                }
                else
                {
                    respuesta["estado"] = false;
                    respuesta["reporte"] = "El usuario ingresado no existe";
                    return Ok(respuesta);
                }
            }
            catch
            {
                respuesta["estado"] = false;
                respuesta["reporte"] = "Ha ocurrido un error, nuestros mejores monos entrenados estan buscando el problema";
                return Ok(respuesta);
            }
        }
        public string hasheo(string pass, string salt)
        {
            byte[] bsalt = new byte[128 / 8];
            bsalt = Convert.FromBase64String(salt);
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: pass,
            salt: bsalt,
            prf: KeyDerivationPrf.HMACSHA1,
            iterationCount: 10000,
            numBytesRequested: 256 / 8));
            return (hashed);
        }

    }
    public class registroController : ApiController
    {
        Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "token", "" },
                { "reporte", ""}
           };
        UsuariosEntities db = new UsuariosEntities();
        TokenEntities Tdb = new TokenEntities();
        [HttpPost]
        public IHttpActionResult SignUp(Registro entrada)
        {
            try
            {
                if (!db.Usuario.Any(i => i.username == entrada.usuario))
                {
                    var contra = hasheo(entrada.password);
                    var nuevo = new Usuario
                    {
                        username = entrada.usuario,
                        mail = entrada.email,
                        password = contra.Item2,
                        nombre = "",
                        apellido = "",
                        direccion = "",
                        telefono = "",
                        localidad = "",
                        provincia = "",
                        estado = "N",
                        motivo = "",
                        reset_password = false,
                        modificaciones = "0",
                        salt = contra.Item1
                    };
                    db.Usuario.Add(nuevo);
                    db.SaveChanges();
                    var nuevoToken = new Token
                    {
                        token1 = Guid.NewGuid().ToString(),
                        usuario = entrada.usuario,
                        vencimiento = DateTime.Today.AddDays(5)
                    };
                    Tdb.Token.Add(nuevoToken);
                    Tdb.SaveChanges();
                    respuesta["estado"] = true;
                    respuesta["token"] = nuevoToken.token1;
                    respuesta["reporte"] = "Usuario creado con exito";
                    return Ok(respuesta);
                }
                else
                {
                    respuesta["reporte"] = "El Usuario ya existe";
                    return Ok(respuesta);
                }
            }
            catch
            {
                respuesta["reporte"] = "Ha ocurrido un error, vuelva a intentarlo mas tarde";
                return Ok(respuesta);
            }
        }
        public Tuple<string, string> hasheo(string pass)
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
            return new Tuple<string, string>(strsalt, hashed);
        }
    }

    public class tokenController : ApiController
    {

        TokenEntities Tdb = new TokenEntities();
        UsuariosEntities db = new UsuariosEntities();
        [HttpPost]
        public IHttpActionResult token(authToken entrada)
        {
            Dictionary<string, bool> respuesta = new Dictionary<string, bool> {
                { "respuesta", false },
                { "invalido", false },
                { "flag", false },
            };
            try
            {
                if (Tdb.Token.Any(i => i.usuario == entrada.usuario))
                {
                    var user = Tdb.Token.First(i => i.usuario == entrada.usuario);
                    if (user.token1 == entrada.sid)
                    {
                        if (DateTime.Compare(DateTime.Today, user.vencimiento) <= 0)
                        {
                            respuesta["respuesta"] = true;
                            if (db.Usuario.Where(d => d.username == entrada.usuario).First().modificaciones == "admin")
                            {
                                respuesta["flag"] = true;
                            }
                            return Ok(respuesta);
                        }
                        else
                        {
                            respuesta["invalido"] = true;
                            return Ok(respuesta);
                        }
                    }
                    else
                    {
                        respuesta["invalido"] = true;
                        return Ok(respuesta);
                    }
                }
                else
                {
                    respuesta["invalido"] = true;
                    return Ok(respuesta);
                }
            }
            catch
            {
                return Ok(respuesta);
            }
        }
    }

    public class getremovekeyController : ApiController
    {
        TokenEntities Tdb = new TokenEntities();
        [HttpPost]
        public IHttpActionResult Obtener(authToken datos)
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "clave", "" },
                { "reporte", ""},
                { "error", "" }
            };
            try
            {
                if (Tdb.Token.Any(j => j.usuario == datos.usuario))
                {
                    var user = Tdb.Token.First(i => i.usuario == datos.usuario);
                    if (user.token1 == datos.sid)
                    {
                        if (DateTime.Compare(DateTime.Today, user.vencimiento) <= 0)
                        {
                            respuesta["estado"] = true;
                            respuesta["clave"] = KeyGen(datos.usuario, datos.sid);
                            return Ok(respuesta);
                        }
                        else
                        {
                            respuesta["reporte"] = "token de ingreso invalido, por favor inicie sesion nuevamente";
                            return Ok(respuesta);
                        }
                    }
                    else
                    {
                        respuesta["reporte"] = "token de ingreso invalido, por favor inicie sesion nuevamente";
                        return Ok(respuesta);
                    }
                }
                else
                {
                    respuesta["reporte"] = "token de ingreso invalido, por favor inicie sesion nuevamente";
                    return Ok(respuesta);
                }
            }
            catch (Exception e)
            {
                respuesta["reporte"] = "Ha ocurrido un error por favor intentelo mas tarde   ";
                respuesta["error"] = e;
                return Ok(respuesta);
            }
        }

        public string KeyGen(string user, string hash)
        {
            MD5 md5 = new MD5CryptoServiceProvider();
            UTF8Encoding encoder = new UTF8Encoding();
            Byte[] originalBytes = encoder.GetBytes(hash + user);
            Byte[] encodedBytes = md5.ComputeHash(originalBytes);
            string key = BitConverter.ToString(encodedBytes).Replace("-", "");
            return (key);
        }
    }

    public class borrarcuentaController : ApiController
    {
        UsuariosEntities db = new UsuariosEntities();
        TokenEntities Tdb = new TokenEntities();
        [HttpPost]
        public IHttpActionResult borrar(BorrarUsuario datos)
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""},
                { "error", "" }
            };
            try
            {
                if (Tdb.Token.Any(j => j.usuario == datos.usuario))
                {
                    var user = Tdb.Token.First(i => i.usuario == datos.usuario);
                    if (user.token1 == datos.sid)
                    {
                        if (DateTime.Compare(DateTime.Today, user.vencimiento) <= 0)
                        {
                            if (datos.removekey == KeyGen(datos.usuario, datos.sid))
                            {
                                var usuario = db.Usuario.Where(i => i.username == datos.usuario).First();
                                var Tusuario = Tdb.Token.Where(j => j.usuario == datos.usuario).First();
                                db.Usuario.Remove(usuario);
                                Tdb.Token.Remove(Tusuario);
                                db.SaveChanges();
                                Tdb.SaveChanges();
                                String path = HttpContext.Current.Server.MapPath("~/images/perfil/");
                                File.Delete(path + datos.usuario + ".png");
                                respuesta["estado"] = true;
                                respuesta["reporte"] = "Usuario borrado con éxito";
                                return Ok(respuesta);
                            }
                            else
                            {
                                respuesta["reporte"] = "Clave de borrado incorrecta, no se borro la cuenta";
                                return Ok(respuesta);
                            }
                        }
                        else
                        {
                            respuesta["reporte"] = "token de ingreso invalido, por favor inicie sesion nuevamente";
                            return Ok(respuesta);
                        }
                    }
                    else
                    {
                        respuesta["reporte"] = "token de ingreso invalido, por favor inicie sesion nuevamente";
                        return Ok(respuesta);
                    }
                }
                else
                {
                    respuesta["reporte"] = "token de ingreso invalido, por favor inicie sesion nuevamente";
                    return Ok(respuesta);
                }
            }
            catch (Exception e)
            {
                respuesta["reporte"] = "Ha ocurrido un error por favor intentelo mas tarde   ";
                respuesta["error"] = e;
                return Ok(respuesta);
            }
        }
        public string KeyGen(string user, string hash)
        {
            MD5 md5 = new MD5CryptoServiceProvider();
            UTF8Encoding encoder = new UTF8Encoding();
            Byte[] originalBytes = encoder.GetBytes(hash + user);
            Byte[] encodedBytes = md5.ComputeHash(originalBytes);
            string key = BitConverter.ToString(encodedBytes).Replace("-", "");
            return (key);
        }
    }

    public class editarusuarioController : ApiController
    {
        UsuariosEntities db = new UsuariosEntities();
        TokenEntities Tdb = new TokenEntities();
        [HttpPost]
        public IHttpActionResult edit(EditarUsuario user)
        {
            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""},
                { "error", "" }
            };
            try
            {

                if (Tdb.Token.Any(j => j.usuario == user.usuario))
                {
                    var usuario = Tdb.Token.First(j => j.usuario == user.usuario);
                    if (usuario.token1 == user.sid)
                    {
                        if (DateTime.Compare(DateTime.Today, usuario.vencimiento) <= 0)
                        {
                            var cambio = db.Usuario.Where(i => i.username == user.usuario).First();
                            if (user.nombre != "")
                            {
                                cambio.nombre = user.nombre;
                            }
                            if (user.apellido != "")
                            {
                                cambio.apellido = user.apellido;
                            }
                            if (user.direccion != "")
                            {
                                cambio.direccion = user.direccion;
                            }
                            if (user.telefono != "")
                            {
                                cambio.telefono = user.telefono;
                            }
                            if (user.provincia != "")
                            {
                                cambio.provincia = user.provincia;
                            }
                            if (user.localidad != "")
                            {
                                cambio.localidad = user.localidad;
                            }
                            if (user.mail != "")
                            {
                                cambio.mail = user.mail;
                            }
                            if (user.foto != "")
                            {
                                String path = HttpContext.Current.Server.MapPath("~/images/perfil/"); //Path

                                //Check if directory exist
                                if (!Directory.Exists(path))
                                {
                                    Directory.CreateDirectory(path); //Create directory if it doesn't exist
                                }

                                string imageName = cambio.username + ".png";

                                //set the image path
                                string imgPath = Path.Combine(path, imageName);

                                byte[] imageBytes = Convert.FromBase64String(user.foto);

                                File.WriteAllBytes(imgPath, imageBytes);
                                cambio.foto = "/images/perfil/" + cambio.username + ".png";
                            }
                            db.SaveChanges();
                            respuesta["estado"] = true;
                            return Ok(respuesta);
                        }
                        else
                        {
                            respuesta["reporte"] = "token de ingreso invalido, por favor inicie sesion nuevamente";
                            return Ok(respuesta);
                        }
                    }
                    else
                    {
                        respuesta["reporte"] = "token de ingreso invalido, por favor inicie sesion nuevamente";
                        return Ok(respuesta);
                    }
                }
                else
                {
                    respuesta["reporte"] = "token de ingreso invalido, por favor inicie sesion nuevamente";
                    return Ok(respuesta);
                }
            }
            catch (Exception e)
            {
                respuesta["reporte"] = "Ha ocurrido un error por favor intentelo mas tarde   ";
                respuesta["error"] = e;
                return Ok(respuesta);
            }
        }
    }

    public class obteneridController : ApiController
    {
        UsuariosEntities db = new UsuariosEntities();
        [HttpPost]
        public IHttpActionResult informacion(obtID name)
        {

            Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
            {
                { "estado", false },
                { "reporte", ""},
                { "error", "" },
                { "envio", -1 },
            };
            try
            {
                if (db.Usuario.Any(i => i.username == name.name))
                {
                    respuesta["estado"] = true;
                    respuesta["envio"] = db.Usuario.Where(i => i.username == name.name).First().id_usuario;
                    return Ok(respuesta);
                }
                else
                {
                    respuesta["reporte"] = "No existe un usuario con ese nombre";
                    return Ok(respuesta);
                }
            }
            catch (Exception e)
            {
                respuesta["error"] = e;
                respuesta["reporte"] = "Ha ocurrido un error vuelva a intentarlo mas tarde";
                return Ok(respuesta);
            }
        }
    }

    public class getdatosController : ApiController
    {
        Dictionary<string, dynamic> respuesta = new Dictionary<string, dynamic>
        {
            { "estado", false },
            { "reporte", ""},
            { "error", "" },
            { "objeto", null },
        };

        Dictionary<string, dynamic> datos = new Dictionary<string, dynamic>
        {
            { "nombre", ""},
            { "apellido", "" },
            { "direccion", "" },
            { "telefono", "" },
            { "provincia", "" },
            { "localidad", "" },
            { "mail", "" },
            { "foto", ""  },
            { "user", "" },
        };


        UsuariosEntities db = new UsuariosEntities();
        [HttpGet]
        public IHttpActionResult informacion(int id)
        {
            respuesta["objeto"] = datos;
            try
            {
                if (db.Usuario.Any(i => i.id_usuario == id))
                {
                    var usuario = db.Usuario.Where(i => i.id_usuario == id).First();
                    respuesta["objeto"]["nombre"] = usuario.nombre;
                    respuesta["objeto"]["apellido"] = usuario.apellido;
                    respuesta["objeto"]["direccion"] = usuario.direccion;
                    respuesta["objeto"]["telefono"] = usuario.telefono;
                    respuesta["objeto"]["provincia"] = usuario.provincia;
                    respuesta["objeto"]["localidad"] = usuario.localidad;
                    respuesta["objeto"]["mail"] = usuario.mail;
                    respuesta["objeto"]["foto"] = usuario.foto;
                    respuesta["objeto"]["user"] = usuario.username;
                    respuesta["estado"] = true;
                    return Ok(respuesta);
                }
                else
                {
                    respuesta["reporte"] = "No existe ese usuario";
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

    public class getguidController : ApiController
    {
        [HttpGet]
        public IHttpActionResult generador()
        {
            Dictionary<string, dynamic> datos = new Dictionary<string, dynamic>
            {
                { "id" ,Guid.NewGuid().ToString() },
            };
            return Ok(datos);
        }
    }
}
