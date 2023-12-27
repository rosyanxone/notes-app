import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import AddPage from "./pages/AddPage";
import ArchivesPage from "./pages/ArchivesPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navigation from "./components/Navigation";
import ToggleLocale from "./components/ToggleLocale";
import ToggleTheme from "./components/ToggleTheme";
import LogoutButton from "./components/LogoutButton";
import { getUserLogged, putAccessToken } from "./utils/network-data";
import LocaleContext from "./contexts/LocaleContext";
import ThemeContext from "./contexts/ThemeContext";

function App() {
  const [initializing, setInitializing] = useState(true);
  const [authedUser, setAuthedUser] = useState(null);
  const [locale, setLocale] = useState(() => {
    const locale = localStorage.getItem("locale") || "id";
    localStorage.setItem("locale", locale);
    return locale;
  });
  const [theme, setTheme] = useState(() => {
    const theme = localStorage.getItem("theme") || "dark";
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    return theme;
  });

  useEffect(() => {
    getUserLogged().then(({ data }) => {
      setAuthedUser(data);
      setInitializing(false);
    });
  }, []);

  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  }

  function onLogout() {
    setAuthedUser(null);
    putAccessToken("");
  }

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === "id" ? "en" : "id";

      localStorage.setItem("locale", newLocale);

      return newLocale;
    });
  };

  const toggleTheme = () => {
    setTheme(() => {
      const prevTheme = localStorage.getItem("theme");
      const newTheme = prevTheme === "dark" ? "light" : "dark";

      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);

      return newTheme;
    });
  };

  const localeContextValue = useMemo(() => {
    return {
      locale,
      toggleLocale,
    };
  }, [locale]);

  const themeContextValue = useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme]);

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <LocaleContext.Provider value={localeContextValue}>
        <ThemeContext.Provider value={themeContextValue}>
          <div className="app-container">
            <header>
              <h1>
                <Link to="/">
                  {locale === "id" ? "Aplikasi Catatan" : "Notes App"}
                </Link>
              </h1>
              <ToggleLocale />
              <ToggleTheme />
            </header>
            <main>
              <Routes>
                <Route
                  path="/"
                  element={<LoginPage loginSuccess={onLoginSuccess} />}
                />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="*"
                  element={<LoginPage loginSuccess={onLoginSuccess} />}
                />
              </Routes>
            </main>
          </div>
        </ThemeContext.Provider>
      </LocaleContext.Provider>
    );
  }

  return (
    <LocaleContext.Provider value={localeContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <div className="app-container">
          <header>
            <h1>
              <Link to="/">
                {locale === "id" ? "Aplikasi Catatan" : "Notes App"}
              </Link>
            </h1>
            <Navigation />
            <ToggleLocale />
            <ToggleTheme />
            <LogoutButton logout={onLogout} userName={authedUser.name} />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/notes/new" element={<AddPage />} />
              <Route path="/notes/:id" element={<DetailPage />} />
              <Route path="/archives" element={<ArchivesPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </ThemeContext.Provider>
    </LocaleContext.Provider>
  );
}

export default App;
