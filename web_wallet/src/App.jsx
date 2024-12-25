import Choose from "./component/Choose";
import Header from "./component/Header";
import Setup from "./component/Setup";
import { useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(true);
  const [choose, setChoose] = useState(false);
  const [walletType, setWalletType] = useState(null);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark", !isDark);
  };
  const setWallet = () => {
    setChoose(!choose);
  };
  const setCoin = (type, name) => {
    setWalletType({
      type: type,
      name: name,
    });
  };

  return (
    <>
      <div className={`min-h-screen ${isDark ? "dark" : ""}`}>
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-6">
          {/* Header */}
          <Header isDark={isDark} toggleTheme={toggleTheme} />
          {choose ? (
            <Setup setWallet={setWallet} walletType={walletType} />
          ) : (
            <Choose setWallet={setWallet} setCoin={setCoin} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
