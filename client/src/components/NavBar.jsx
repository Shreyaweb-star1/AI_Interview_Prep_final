import { Link } from "react-router-dom";

function NavBar() {

  return (

    <nav
      className="
      w-full
      flex
      justify-between
      items-center
      px-8
      py-5
      border-b
      border-slate-800
      "
    >

      <h1
        className="
        text-xl
        font-bold
        text-blue-500
        "
      >
        AI Interview
      </h1>

      <div
        className="
        flex
        gap-6
        text-slate-300
        "
      >

        <Link to="/">
          <button className="hover:text-white transition">
            Home
          </button>
        </Link>

        <Link to="/interview">
          <button className="hover:text-white transition">
            Interview
          </button>
        </Link>

        <Link to="/feedback">
          <button className="hover:text-white transition">
            Feedback
          </button>
        </Link>

      </div>

    </nav>

  );

}

export default NavBar;