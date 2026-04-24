import { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue, remove } from "firebase/database";
import { FaTrash, FaCheck, FaLock, FaSignOutAlt, FaCalendarAlt, FaUser, FaPhone, FaCut } from "react-icons/fa";

function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [appointments, setAppointments] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todas");
  const [stats, setStats] = useState({ total: 0, hoy: 0, semana: 0 });

  // Contraseña del panel (cámbiala por la que quieras)
  const ADMIN_PASSWORD = "favela2026";

  // Iniciar sesión
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      localStorage.setItem("admin_auth", "true");
    } else {
      alert("❌ Contraseña incorrecta");
    }
  };

  // Cerrar sesión
  const handleLogout = () => {
    setAuthenticated(false);
    setPassword("");
    localStorage.removeItem("admin_auth");
  };

  // Verificar si ya estaba autenticado
  useEffect(() => {
    const saved = localStorage.getItem("admin_auth");
    if (saved === "true") {
      setAuthenticated(true);
    }
  }, []);

  // Cargar citas desde Firebase
  useEffect(() => {
    if (!authenticated) return;

    const citasRef = ref(db, "citas");
    const unsubscribe = onValue(citasRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setAppointments(data);
        calcularStats(data);
      } else {
        setAppointments({});
        setStats({ total: 0, hoy: 0, semana: 0 });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [authenticated]);

  // Calcular estadísticas
  const calcularStats = (data) => {
    const citas = Object.values(data);
    const hoy = new Date().toISOString().split("T")[0];
    const semanaInicio = new Date();
    semanaInicio.setDate(semanaInicio.getDate() - 7);
    const semanaFecha = semanaInicio.toISOString().split("T")[0];

    setStats({
      total: citas.length,
      hoy: citas.filter(c => c.fecha === hoy).length,
      semana: citas.filter(c => c.fecha >= semanaFecha).length
    });
  };

  // Eliminar cita
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta cita?")) return;
    
    try {
      await remove(ref(db, `citas/${id}`));
      alert("✅ Cita eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("❌ Error al eliminar la cita");
    }
  };

  // Filtrar citas
  const getFilteredAppointments = () => {
    const citas = Object.entries(appointments);
    const hoy = new Date().toISOString().split("T")[0];
    const manana = new Date(Date.now() + 86400000).toISOString().split("T")[0];

    switch (filter) {
      case "hoy":
        return citas.filter(([, c]) => c.fecha === hoy);
      case "manana":
        return citas.filter(([, c]) => c.fecha === manana);
      case "semana":
        const semanaInicio = new Date();
        semanaInicio.setDate(semanaInicio.getDate() - 7);
        return citas.filter(([, c]) => c.fecha >= semanaInicio.toISOString().split("T")[0]);
      default:
        return citas.sort(([, a], [, b]) => b.createdAt - a.createdAt);
    }
  };

  const filteredAppointments = getFilteredAppointments();

  // Pantalla de login
  if (!authenticated) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <div className="admin-login-icon">
            <FaLock />
          </div>
          <h1>Panel de Administración</h1>
          <p>Favela Barber</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <button type="submit">Ingresar</button>
          </form>
        </div>
      </div>
    );
  }

  // Panel principal
  return (
    <div className="admin-panel">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-left">
          <h1>🪒 Panel Favela Barber</h1>
          <span className="admin-subtitle">Administración de citas</span>
        </div>
        <div className="admin-header-right">
          <div className="admin-stats-mini">
            <div className="stat-mini">
              <span className="stat-mini-number">{stats.hoy}</span>
              <span className="stat-mini-label">Hoy</span>
            </div>
            <div className="stat-mini">
              <span className="stat-mini-number">{stats.semana}</span>
              <span className="stat-mini-label">Semana</span>
            </div>
            <div className="stat-mini">
              <span className="stat-mini-number">{stats.total}</span>
              <span className="stat-mini-label">Total</span>
            </div>
          </div>
          <button className="admin-btn-logout" onClick={handleLogout}>
            <FaSignOutAlt /> Salir
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="admin-filters">
        <button
          className={`admin-filter-btn ${filter === "todas" ? "active" : ""}`}
          onClick={() => setFilter("todas")}
        >
          Todas
        </button>
        <button
          className={`admin-filter-btn ${filter === "hoy" ? "active" : ""}`}
          onClick={() => setFilter("hoy")}
        >
          Hoy
        </button>
        <button
          className={`admin-filter-btn ${filter === "manana" ? "active" : ""}`}
          onClick={() => setFilter("manana")}
        >
          Mañana
        </button>
        <button
          className={`admin-filter-btn ${filter === "semana" ? "active" : ""}`}
          onClick={() => setFilter("semana")}
        >
          Esta Semana
        </button>
      </div>

      {/* Tabla de citas */}
      <div className="admin-table-container">
        {loading ? (
          <div className="admin-loading">Cargando citas...</div>
        ) : filteredAppointments.length === 0 ? (
          <div className="admin-empty">
            <p>📅 No hay citas {filter !== "todas" ? `para ${filter}` : "registradas"}</p>
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th><FaUser /> Cliente</th>
                  <th><FaPhone /> Teléfono</th>
                  <th><FaCut /> Servicio</th>
                  <th><FaCalendarAlt /> Fecha</th>
                  <th>⏰ Hora</th>
                  <th>💬 Mensaje</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map(([id, cita]) => (
                  <tr key={id}>
                    <td>
                      <strong>{cita.nombre}</strong>
                      {cita.email && <small>{cita.email}</small>}
                    </td>
                    <td>{cita.telefono}</td>
                    <td>
                      <span className="admin-badge">{cita.servicio}</span>
                    </td>
                    <td>{formatDate(cita.fecha)}</td>
                    <td>{cita.hora}</td>
                    <td>
                      {cita.mensaje ? (
                        <span className="admin-message">{cita.mensaje}</span>
                      ) : (
                        <span className="admin-no-message">-</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="admin-btn-delete"
                        onClick={() => handleDelete(id)}
                        title="Eliminar cita"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="admin-footer">
        <p>Total de citas: <strong>{filteredAppointments.length}</strong></p>
      </div>
    </div>
  );
}

// Formatear fecha DD/MM/YYYY
const formatDate = (fecha) => {
  if (!fecha) return "-";
  const [year, month, day] = fecha.split("-");
  return `${day}/${month}/${year}`;
};

export default Admin;