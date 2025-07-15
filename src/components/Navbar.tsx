import Profile from "../assets/Profile.png";
import { RiLightbulbFlashLine, RiLightbulbFlashFill } from "react-icons/ri";
import { useEffect, useState } from "react";

export function Navbar() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prevTheme) => {
      if (prevTheme === "dark") return "light";
      return "dark";
    });
  }

  return (
    <div
      className={`dark:bg-[#15161a]/30 w-9/12 bg-gray-100 mx-auto shadow-lg backdrop-blur-lg border border-primary/10 p-4 rounded-2xl dark`}
    >
      <div className="flex justify-between px-2 items-center">
        <div className="flex items-center gap-3">
          <img className="h-12" src={Profile} alt="My Profile" />
          <h1 className="text-lg md:text-2xl font-bold hidden md:block dark:text-gray-100 text-gray-900">
            Wallet Mka
          </h1>
        </div>

        {/* Theme Toggle Button */}
        <div>
          <button
            onClick={toggleTheme}
            className="hover:bg-gray-700 p-1 rounded-xl hover:shadow-lg duration-100 transition-all cursor-pointer"
          >
            {theme === "light" ? (
              <RiLightbulbFlashLine className="text-3xl font-semibold hover:text-gray-100  dark:text-gray-100 text-gray-900" />
            ) : (
              <RiLightbulbFlashFill className="text-3xl font-semibold hover:text-gray-100 dark:text-gray-100 text-gray-900" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
