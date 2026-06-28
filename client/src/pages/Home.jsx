import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function Home() {
  const navigate = useNavigate();
  const [role, setRole] = useState("frontend");
  const [difficulty, setDifficulty] = useState("easy");
  const [useRealAI, setUseRealAI] = useState(false);

  const startInterview = () => {
    navigate("/interview", {
      state: {
        role,
        difficulty,
        useRealAI,
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <NavBar />
      
      <div className="flex justify-center items-center px-6 py-16">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 w-full max-w-2xl shadow-lg">
          <h1 className="text-5xl font-bold text-center mb-4">
            AI Technical Interview Platform
          </h1>
          <p className="text-slate-400 text-center mb-10">
            Practice technical interviews with role-based questions.
          </p>

          {/* === AI MODE TOGGLE === */}
          <div className="mb-8 flex items-center justify-center gap-4">
            <span className="text-sm text-slate-400">Mock Mode</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={useRealAI}
                onChange={(e) => setUseRealAI(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-blue-600"></div>
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
            </label>
            <span className="text-sm font-medium text-blue-400">Real AI Mode</span>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block mb-2 text-slate-300">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
            >
              <option value="frontend">Frontend Developer</option>
              <option value="backend">Backend Developer</option>
              <option value="fullstack">Full Stack Developer</option>
              <option value="software">Software Engineer</option>
            </select>
          </div>

          {/* Difficulty Selection */}
          <div className="mb-8">
            <label className="block mb-2 text-slate-300">Difficulty Level</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <button
            onClick={startInterview}
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg font-semibold text-lg"
          >
            Start Interview
          </button>
        </div>
      </div>

      {/* Built by Section */}
      <div className="text-center py-8 text-slate-500 text-sm">
        Built by <span className="text-blue-400 font-medium">Shreya Dutta</span>
      </div>
    </div>
  );
}

export default Home;