import { useMemo, useState } from "react";

/* ---- lokalni mali helperi (umesto utils) ---- */
function addDays(iso, days) {
  const d = new Date(iso);
  d.setDate(d.getDate() + Number(days || 0));
  return d.toISOString().slice(0, 10);
}
function daysBetween(aIso, bIso) {
  const a = new Date(aIso), b = new Date(bIso);
  return Math.ceil((b - a) / (1000 * 60 * 60 * 24));
}
function ageFromDob(dobIso) {
  if (!dobIso) return 0;
  const dob = new Date(dobIso);
  const t = new Date();
  let age = t.getFullYear() - dob.getFullYear();
  const m = t.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && t.getDate() < dob.getDate())) age--;
  return age;
}
/* --------------------------------------------- */

export default function Profile({ user, onUpdate }) {
  const [name, setName] = useState(user.name || "");
  const [heightCm, setHeight] = useState(user.heightCm || "");
  const [weightKg, setWeight] = useState(user.weightKg || "");
  const [dob, setDob] = useState(user.dateOfBirth || "1998-01-01");
  const [paidAt, setPaidAt] = useState(user.membershipPaidAt || new Date().toISOString().slice(0,10));
  const [validDays, setValidDays] = useState(user.membershipValidDays || 30);

  const validUntil = useMemo(() => addDays(paidAt, Number(validDays || 0)), [paidAt, validDays]);
  const todayIso = new Date().toISOString().slice(0,10);
  const left = useMemo(() => daysBetween(todayIso, validUntil), [todayIso, validUntil]);
  const expired = left < 0;

  const age = useMemo(() => ageFromDob(dob), [dob]);
  const bmi = useMemo(() => {
    const h = Number(heightCm) / 100, w = Number(weightKg);
    if (!h || !w) return 0;
    return +(w / (h*h)).toFixed(1);
  }, [heightCm, weightKg]);

  function save(e) {
    e.preventDefault();
    onUpdate({
      ...user,
      name,
      heightCm: Number(heightCm) || 0,
      weightKg: Number(weightKg) || 0,
      dateOfBirth: dob,
      membershipPaidAt: paidAt,
      membershipValidDays: Number(validDays) || 0
    });
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div className="card">
        <h2 className="h1" style={{ fontSize: 20 }}>Moj profil</h2>
        <form onSubmit={save} style={{ display: "grid", gap: 10, marginTop: 10, maxWidth: 520 }}>
          <input className="inp" placeholder="Ime i prezime" value={name} onChange={e=>setName(e.target.value)} />
          <div className="row">
            <input className="inp" placeholder="Visina (cm)" value={heightCm} onChange={e=>setHeight(e.target.value)} />
            <input className="inp" placeholder="Težina (kg)" value={weightKg} onChange={e=>setWeight(e.target.value)} />
          </div>
          <div className="row">
            <input className="inp" type="date" value={dob} onChange={e=>setDob(e.target.value)} title="Datum rođenja" />
            <input className="inp" type="date" value={paidAt} onChange={e=>setPaidAt(e.target.value)} title="Datum uplate članarine" />
            <input className="inp" type="number" value={validDays} onChange={e=>setValidDays(e.target.value)} title="Trajanje (dana)" placeholder="Trajanje (dana)" />
          </div>
          <button className="btn">Sačuvaj</button>
        </form>
      </div>

      <div className="two-col">
        <div className="card">
          <h3 className="h1" style={{ fontSize: 18 }}>Osnovno</h3>
          <div className="sub">Godine: <strong style={{ color: "#e5e7eb" }}>{age}</strong></div>
          <div className="sub">BMI: <strong style={{ color: "#e5e7eb" }}>{bmi}</strong></div>
        </div>

        <div className="card">
          <h3 className="h1" style={{ fontSize: 18 }}>Članarina</h3>
          <div className="sub">Plaćeno: <strong style={{ color: "#e5e7eb" }}>{paidAt}</strong></div>
          <div className="sub">Važi do: <strong style={{ color: "#e5e7eb" }}>{validUntil}</strong></div>
          <div style={{ marginTop: 6, fontWeight: 700, color: expired ? "#fca5a5" : "#86efac" }}>
            {expired ? `Istekla pre ${Math.abs(left)} dana` : `Preostalo dana: ${left}`}
          </div>
        </div>
      </div>
    </div>
  );
}