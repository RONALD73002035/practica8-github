
import { useState } from "react";
import TarjetaUsuario from "./TarjetaUsuario";

function BuscadorGitHub() {
  const [usuario, setUsuario] = useState("");
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  async function buscar(e) {
    e.preventDefault();

    const nombre = usuario.trim();

    if (nombre === "") {
      setError("Por favor, escribe un usuario");
      setDatos(null);
      return;
    }

    setCargando(true);
    setError("");
    setDatos(null);

    try {
      const respuesta = await fetch(
        `https://api.github.com/users/${encodeURIComponent(nombre)}`
      );

      if (!respuesta.ok) {
        if (respuesta.status === 404) {
          throw new Error("Usuario no encontrado");
        }

        throw new Error("Error al consultar GitHub");
      }

      const resultado = await respuesta.json();
      setDatos(resultado);

    } catch (err) {
      setError(err.message);
      setDatos(null);
    } finally {
      setCargando(false);
    }
  }

  return (
    <div>
      <form onSubmit={buscar} className="formulario">
        <input
          type="text"
          placeholder="Escribe un usuario de GitHub"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <button type="submit" disabled={cargando}>
          Buscar perfil
        </button>
      </form>

      {cargando && (
        <p className="cargando">Buscando en GitHub...</p>
      )}

      {error && (
        <p className="error">{error}</p>
      )}

      {datos && (
        <TarjetaUsuario
          nombre={datos.name}
          alias={datos.login}
          biografia={datos.bio}
          foto={datos.avatar_url}
          enlace={datos.html_url}
        />
      )}
    </div>
  );
}

export default BuscadorGitHub;
