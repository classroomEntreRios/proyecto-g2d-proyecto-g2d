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
                        return Ok("Ingreso exitoso");
                    }
                    else
                    {
                        return Ok("Contraseña incorrecta");
                    }
                }
                else
                {
                    return Ok("El usuario no existe");
                }
            }
            catch
            {
                return Ok("Ha ocurrido un error");
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
        UsuariosEntities db = new UsuariosEntities();
        TokenEntities Tdb = new TokenEntities();
        [HttpPost]
        public IHttpActionResult SignUp(Registro entrada) 
        {
            try { 
                if(!db.Usuario.Any(i => i.username == entrada.usuario))
                {
                    var contra = hasheo(entrada.password);
                    var nuevo = new Usuario {
                        username = entrada.usuario,
                        mail = entrada.email,
                        password = contra.Item2,
                        nombre = entrada.nombre,
                        apellido = entrada.apellido,
                        direccion = entrada.direccion,
                        telefono = entrada.telefono,
                        localidad = entrada.localidad,
                        provincia = entrada.provincia,
                        estado = "N",
                        motivo = "",
                        reset_password = false,
                        modificaciones = "0",
                        salt = contra.Item1
                    };
                    db.Usuario.Add(nuevo);
                    db.SaveChanges();
                    var nuevoToken = new Token {
                        token1 = Guid.NewGuid().ToString(),
                        usuario = entrada.usuario,
                        vencimiento = DateTime.Today.AddDays(5)
                    };
                    Tdb.Token.Add(nuevoToken);
                    Tdb.SaveChanges();
                    return Ok("El usuario: "+entrada.usuario+" fue creado con exito");
                }
                else
                {
                    return Ok("El usuario ya existe");
                }
            }
            catch
            {
                return Ok("Ha ocurrido un error");
            }
        }
        public Tuple<string,string> hasheo(string pass) 
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
            try { 
                if (Tdb.Token.Any(i => i.usuario == entrada.usuario))
                {
                    var user = Tdb.Token.First(i => i.usuario == entrada.usuario);
                    if (user.token1 == entrada.sid)
                    {
                        if (DateTime.Compare(DateTime.Today, user.vencimiento) <= 0)
                        {
                            return Ok("token valido");
                        }
                        else
                        {
                            return Ok("Token vencido");
                        }
                    }
                    else
                    {
                        return Ok("Token invalido");
                    }
                }
                else
                {
                    return Ok("El usuario no tiene token");
                }
            }
            catch
            {
                return Ok("ha ocurrido un error");
            }
        }
    }
}
