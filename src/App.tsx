import { RouteProvider } from './providers/route-provider'
import { ThemeProvider } from './providers/theme-provider'

function App() {
  return (
    <ThemeProvider>
      <RouteProvider />
    </ThemeProvider>
  )
}

export default App
