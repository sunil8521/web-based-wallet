import { Box, Moon, Sun } from 'lucide-react'

const Header = ({ isDark, toggleTheme }) => {
 
  return (
    <header className="flex justify-between items-center">
    <div className="flex items-center gap-2">
      <Box className="w-8 h-8" />
      <span className="text-xl font-bold">Wallet</span>
      <span className="px-2 py-1 text-xs bg-neutral-200 dark:bg-neutral-800 rounded-full">cohort assignment</span>

    </div>
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  </header>
  )
}

export default Header
