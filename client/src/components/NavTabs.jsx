export default function NavTabs({ active, onChange, onLogout, user }) {
  const tabs = ["Profil", "Vežbe", "Treninzi"];
  return (
    <div className="nav">
      <div className="nav__brand">GymTracker</div>
      <div className="nav__spacer" />
      {tabs.map(t => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`nav-btn ${active === t ? "nav-btn--active" : ""}`}
        >
          {t}
        </button>
      ))}
      <div className="sub" style={{ margin: "0 8px" }}>{user?.name || user?.email}</div>
      <button className="btn-secondary" style={{ height: 34 }} onClick={onLogout}>Odjava</button>
    </div>
  );
}