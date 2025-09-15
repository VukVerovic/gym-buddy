import WorkoutForm from "../components/WorkoutForm.jsx";
import WorkoutList from "../components/WorkoutList.jsx";

/* lokalni helperi */
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
function isSameYearMonth(iso, y, m /*0-11*/) {
  const d = new Date(iso);
  return d.getFullYear() === y && d.getMonth() === m;
}

export default function WorkoutsPage({ workouts, setWorkouts, exercises, currentUser }) {
  const exercisesById = new Map(exercises.map(e => [e.id, e]));
  const ym = { y: new Date().getFullYear(), m: new Date().getMonth() };
  const thisMonthCount = workouts.filter(w => w.userId === currentUser.id && isSameYearMonth(w.date, ym.y, ym.m)).length;

  function add({ date, title, notes, items }) {
    setWorkouts(prev => [
      { id: uid(), userId: currentUser.id, date, title, notes, items },
      ...prev
    ]);
  }
  function del(id) {
    setWorkouts(prev => prev.filter(w => w.id !== id));
  }

  const mine = workouts.filter(w => w.userId === currentUser.id);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div className="card">
        <h2 className="h1" style={{ fontSize: 20 }}>Dodaj trening</h2>
        <WorkoutForm exercises={exercises} onAdd={add} />
      </div>

      <div className="two-col">
        <div className="card">
          <h3 className="h1" style={{ fontSize: 18 }}>Statistika (tekući mesec)</h3>
          <div className="sub">
            Broj odrađenih treninga: <strong style={{ color: "#e5e7eb" }}>{thisMonthCount}</strong>
          </div>
        </div>

        <div className="card">
          <h3 className="h1" style={{ fontSize: 18 }}>Brza napomena</h3>
          <div className="sub">Kombinuj snagu i kardio 3–5x nedeljno.</div>
        </div>
      </div>

      <div className="card">
        <h2 className="h1" style={{ fontSize: 20 }}>Moji treninzi</h2>
        <WorkoutList workouts={mine} exercisesById={exercisesById} onDelete={del} />
      </div>
    </div>
  );
}