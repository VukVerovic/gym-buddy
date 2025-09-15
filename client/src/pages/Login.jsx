import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("pera@example.com");
  const [password, setPassword] = useState("123");
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    const ok = await onLogin(email.trim(), password);
    if (!ok) setErr("Pogrešan email ili lozinka.");
  }

  return (
    <div style={{ maxWidth: 420, margin: "60px auto" }}>
      <div className="card">
        <h1 className="h1">Prijava</h1>
        <div className="sub">Demo login bez backenda</div>
        <form onSubmit={submit} style={{ display: "grid", gap: 10, marginTop: 12 }}>
          <input className="inp" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="inp" type="password" placeholder="lozinka" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="btn">Uđi</button>
        </form>
        {err && <div style={{ color: "#fca5a5", marginTop: 8 }}>{err}</div>}
      </div>
    </div>
  );
}