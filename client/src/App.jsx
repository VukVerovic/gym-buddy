import { useState } from "react";
import "./styles/app.css";

import NavTabs from "./components/NavTabs.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import ExercisesPage from "./pages/Exercises.jsx";
import WorkoutsPage from "./pages/Workouts.jsx";

/* =============== seed podaci =============== */
const SEED_USERS = [
  {
    id: "u1",
    email: "pera@example.com",
    password: "123",
    name: "Pera Perić",
    heightCm: 182,
    weightKg: 82,
    dateOfBirth: "1998-06-15",
    membershipPaidAt: "2025-09-01",
    membershipValidDays: 30
  },
  {
    id: "u2",
    email: "mika@example.com",
    password: "123",
    name: "Mika Mikić",
    heightCm: 176,
    weightKg: 78,
    dateOfBirth: "1999-03-10",
    membershipPaidAt: "2025-09-10",
    membershipValidDays: 30
  }
];

const SEED_EXERCISES = [
  { id: "e1", name: "Bench press", type: "strength", muscleGroup: "chest" },
  { id: "e2", name: "Čučanj",      type: "strength", muscleGroup: "legs" },
  { id: "e3", name: "Trčanje",     type: "cardio",   muscleGroup: "full" },
];

const SEED_WORKOUTS = [
  {
    id: "w1",
    userId: "u1",
    date: "2025-09-12",
    title: "Gornji deo",
    notes: "",
    items: [
      {
        exerciseId: "e1",
        notes: "Rad sa spotterom",
        sets: [
          { reps: 8, weightKg: 60 },
          { reps: 6, weightKg: 70 },
          { reps: 4, weightKg: 80 }
        ]
      }
    ]
  },
  {
    id: "w2",
    userId: "u1",
    date: "2025-09-13",
    title: "Kardio",
    notes: "",
    items: [
      {
        exerciseId: "e3",
        notes: "Lagano",
        sets: [
          { timeSec: 1800, distanceM: 4000 }
        ]
      }
    ]
  }
];

export default function App() {
  const [users, setUsers] = useState(SEED_USERS);
  const [currentUser, setCurrentUser] = useState(null);
  const [tab, setTab] = useState("Profil");

  const [exercises, setExercises] = useState(SEED_EXERCISES);
  const [workouts, setWorkouts] = useState(SEED_WORKOUTS);

  async function login(email, password) {
    const found = users.find(u => u.email === email && u.password === password);
    if (found) { setCurrentUser(found); setTab("Profil"); return true; }
    return false;
    }
  function logout() { setCurrentUser(null); }
  function updateUser(next) {
    setUsers(prev => prev.map(u => u.id === next.id ? next : u));
    setCurrentUser(next);
  }

  if (!currentUser) return <Login onLogin={login} />;

  return (
    <div className="wrap">
      <NavTabs active={tab} onChange={setTab} onLogout={logout} user={currentUser} />
      <div style={{ marginTop: 12 }}>
        {tab === "Profil" && <Profile user={currentUser} onUpdate={updateUser} />}
        {tab === "Vežbe" && <ExercisesPage exercises={exercises} setExercises={setExercises} />}
        {tab === "Treninzi" && (
          <WorkoutsPage
            workouts={workouts}
            setWorkouts={setWorkouts}
            exercises={exercises}
            currentUser={currentUser}
          />
        )}
      </div>
    </div>
  );
}