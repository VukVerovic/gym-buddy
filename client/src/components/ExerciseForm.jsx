import { useState } from "react";

export default function ExerciseForm({ onAdd }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("strength");
  const [muscleGroup, setMuscle] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({ name: name.trim(), type, muscleGroup: muscleGroup.trim() });
    setName(""); setType("strength"); setMuscle("");
  }

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
      <input className="inp" placeholder="Naziv vežbe" value={name} onChange={e=>setName(e.target.value)} />
      <div className="row">
        <select className="inp" value={type} onChange={e=>setType(e.target.value)}>
          <option value="strength">Snaga</option>
          <option value="cardio">Kardio</option>
        </select>
        <input className="inp" placeholder="Mišićna grupa (npr. legs/chest)" value={muscleGroup} onChange={e=>setMuscle(e.target.value)} />
      </div>
      <button className="btn">Dodaj vežbu</button>
    </form>
  );
}