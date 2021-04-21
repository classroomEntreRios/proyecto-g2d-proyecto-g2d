using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
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
        [HttpPost]
        public IHttpActionResult token(authToken entrada)
        {
            Dictionary<string, bool> respuesta = new Dictionary<string, bool> {
                { "respuesta", false },
                { "invalido", false }
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
}
