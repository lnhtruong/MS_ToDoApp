import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from "@/components/ui/button";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8">
      <div className="flex gap-8 mb-8">
        <a 
          href="https://vite.dev" 
          target="_blank"
          className="transition-transform hover:scale-110"
        >
          <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
        </a>
        <a 
          href="https://react.dev" 
          target="_blank"
          className="transition-transform hover:scale-110 animate-spin-slow"
        >
          <img src={reactLogo} className="h-24 w-24" alt="React logo" />
        </a>
      </div>

      <h1 className="text-5xl font-bold mb-8 text-foreground">
        Vite + React
      </h1>

      <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
        <div className="flex justify-center">
          <Button 
            onClick={() => setCount((count) => count + 1)}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium mb-4"
          >
            count is {count}
          </Button>
        </div>
        <p className="text-muted-foreground">
          Edit <code className="bg-muted px-2 py-1 rounded text-sm">src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p className="text-muted-foreground mt-8 text-sm">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App