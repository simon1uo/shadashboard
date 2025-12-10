import { AuthProvider } from './providers/auth-provider'
import { RouteProvider } from './providers/route-provider'
import { ThemeProvider } from './providers/theme-provider'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouteProvider />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
