import ExerciseForm from "../components/ExerciseForm.jsx";
import ExerciseList from "../components/ExerciseList.jsx";

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export default function ExercisesPage({ exercises, setExercises }) {
  function add({ name, type, muscleGroup }) {
    setExercises(prev => [...prev, { id: uid(), name, type, muscleGroup }]);
  }
  function del(id) {
    setExercises(prev => prev.filter(x => x.id !== id));
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div className="card">
        <h2 className="h1" style={{ fontSize: 20 }}>Dodaj vežbu</h2>
        <ExerciseForm onAdd={add} />
      </div>

      <div className="card">
        <h2 className="h1" style={{ fontSize: 20 }}>Lista vežbi</h2>
        <ExerciseList exercises={exercises} onDelete={del} />
      </div>
    </div>
  );
}