using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Viajar360BackEnd.Models;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace Viajar360BackEnd.Controllers
{
    public class IngresoController : ApiController
    {
        UsuariosEntities db = new UsuariosEntities();
        TokenEntities Tdb = new TokenEntities();
        [HttpPost]
        public IHttpActionResult Login([FromBody] Login Entrada)
        {
            try { 
                if(db.Usuario.Any(i => i.username == Entrada.usuario))
                {
                    var User = db.Usuario.Where(i => i.username == Entrada.usuario).FirstOrDefault();
                    if (Hasheo(Entrada.password,User.salt) == User.password)
                    {
                        var nuevoToken = Tdb.Token.First(i=> i.usuario == Entrada.usuario);
                        nuevoToken.token1 = Guid.NewGuid().ToString();
                        nuevoToken.vencimiento = DateTime.Today.AddDays(31);
                        Tdb.SaveChanges();
                        return Ok("Ingreso Correcto");

                    }
                    else
                    {
                        return Ok("Contraseña Incorrecta");
                    }
                
                }
                else
                {
                    return Ok("Usuario Invalido");
                }
            }
            catch {
                return Ok("Ha ocurrido un error");
            }
        }
        public string Hasheo(string pass,string dbSalt)
        {
            byte[] salt = new byte[128 / 8];
            salt = Convert.FromBase64String(dbSalt);
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: pass,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA1,
            iterationCount: 10000,
            numBytesRequested: 256 / 8));
            return (hashed);
        }
    }

    public class RegistroController : ApiController
    {
        UsuariosEntities db = new UsuariosEntities();
        TokenEntities Tdb = new TokenEntities();
        [HttpPost]
        public IHttpActionResult SignIn([FromBody] Registro entrada)
        {
            try {
                if(!db.Usuario.Any(i => i.username == entrada.usuario)) { 
                    Tuple<string, string> hash = Hasheo(entrada.password);
                    var nuevo = new Usuario {
                        mail = entrada.email,
                        username = entrada.usuario,
                        password = hash.Item2,
                        nombre = entrada.nombre,
                        apellido = entrada.apellido,
                        direccion = entrada.direccion,
                        telefono = entrada.telefono,
                        localidad = entrada.localidad,
                        provincia = entrada.provincia,
                        estado = "P",
                        reset_password = false,
                        modificaciones = "mortadela",
                        salt = hash.Item1
                    };
                    db.Usuario.Add(nuevo);
                    db.SaveChanges();
                    var nuevoToken = new Token {
                        usuario = entrada.usuario,
                        token1 = Guid.NewGuid().ToString(),
                        vencimiento = DateTime.Today.AddDays(5)
                    };
                    Tdb.Token.Add(nuevoToken);
                    Tdb.SaveChanges();
                    return Ok("El usuario: "+entrada.usuario+" fue creado con exito");
                }
                else
                {
                    return Ok("El usuario "+entrada.usuario+" ya existe");
                }
            }
            catch(Exception e)
            {
                return Ok("ah ocurrido un error-------------------------\n"+e);
            }
        }
        public Tuple<string,string> Hasheo(string pass)
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

    public class TokenController : ApiController
    {
        [HttpPost]
        public IHttpActionResult CheckToken([FromBody] authToken tok)
        {
            TokenEntities Tdb = new TokenEntities();
            if (Tdb.Token.Any(i => i.usuario == tok.usuario))
            {
                var revisar = Tdb.Token.First(i => i.usuario == tok.usuario);
                if (revisar.token1 == tok.sid)
                {
                    if (DateTime.Compare(revisar.vencimiento, DateTime.Today) <= 0)
                    {
                        return Ok("El token es valido");
                    }
                    else
                    { 
                        return Ok("El token ya caduco");
                    }
                }
                else
                {
                    return Ok("El token No es correcto");
                }
            }
            else
            {
                return Ok("El usuario no existe");
            }
        }
    }

}
