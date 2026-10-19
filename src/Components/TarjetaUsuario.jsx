
function TarjetaUsuario({
  nombre,
  alias,
  biografia,
  foto,
  enlace
}) {
  return (
    <div className="tarjeta">

      <img
        src={foto}
        alt="Foto del usuario"
        className="avatar"
      />

      <h2>{nombre || alias}</h2>

      <p className="alias">@{alias}</p>

      <p className="biografia">
        {biografia || "Sin biografía"}
      </p>

      <a
        href={enlace}
        target="_blank"
        rel="noreferrer"
        className="enlace"
      >
        Ver perfil en GitHub
      </a>

    </div>
  );
}

export default TarjetaUsuario;
