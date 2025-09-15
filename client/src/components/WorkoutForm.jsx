import { useState } from "react";

export default function WorkoutForm({ exercises, onAdd }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [exerciseId, setExerciseId] = useState(exercises[0]?.id || "");
  const [setReps, setSetReps] = useState("");
  const [setWeight, setSetWeight] = useState("");
  const [setTime, setSetTime] = useState("");
  const [setDistance, setSetDistance] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const setObj = {};
    if (setReps) setObj.reps = Number(setReps);
    if (setWeight) setObj.weightKg = Number(setWeight);
    if (setTime) setObj.timeSec = Number(setTime);
    if (setDistance) setObj.distanceM = Number(setDistance);
    const items = exerciseId ? [{ exerciseId, notes: "", sets: Object.keys(setObj).length ? [setObj] : [] }] : [];
    onAdd({ date, title: title.trim(), notes: notes.trim(), items });
    setTitle(""); setNotes(""); setSetReps(""); setSetWeight(""); setSetTime(""); setSetDistance("");
  }

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
      <div className="row">
        <input className="inp" type="date" value={date} onChange={e=>setDate(e.target.value)} />
        <input className="inp" placeholder="Naslov (npr. Noge/Push/Kardio…)" value={title} onChange={e=>setTitle(e.target.value)} />
      </div>
      <textarea className="inp" placeholder="Beleške (opciono)" value={notes} onChange={e=>setNotes(e.target.value)} />
      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Brzo dodavanje jedne vežbe i jednog seta (opciono)</div>
        <div className="row">
          <select className="inp" value={exerciseId} onChange={e=>setExerciseId(e.target.value)}>
            {exercises.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
          </select>
          <input className="inp" placeholder="reps" value={setReps} onChange={e=>setSetReps(e.target.value)} />
          <input className="inp" placeholder="kg" value={setWeight} onChange={e=>setSetWeight(e.target.value)} />
          <input className="inp" placeholder="sec" value={setTime} onChange={e=>setSetTime(e.target.value)} />
          <input className="inp" placeholder="m" value={setDistance} onChange={e=>setSetDistance(e.target.value)} />
        </div>
      </div>
      <button className="btn">Dodaj trening</button>
    </form>
  );
}