import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import Toggle from './components/Toggle'
import './App.css'

function App() {

  const [spinClockwise, setSpinClockwise] = useState<boolean>(true)
  const [idleTime, setIdleTime] = useState<number>(0)
  const idleIntervalRef = useRef<number | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [turnOffFeatures, setTurnOffFeatures] = useState<boolean>(false)

  const style = {
    transition: 'transform 150ms ease',
    height: '6em',
    padding: '1.5em',
    willChange: 'filter',
    animation: turnOffFeatures ? 'none' : spinClockwise ? 'logo-spin-clockwise infinite 20s linear' : 'logo-spin-counterclockwise infinite 20s linear',
  }

  useEffect(() => {
    const handleMouseMove = () => {
      setIdleTime(0)
      if (idleIntervalRef.current) {
        clearInterval(idleIntervalRef.current)
      }
      idleIntervalRef.current = setInterval(() => {
        setIdleTime((prevIdleTime) => prevIdleTime + 1)
      }, 1000)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (idleIntervalRef.current) {
        clearInterval(idleIntervalRef.current)
      }
    }
  }, [])

  return (
    <>
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <h2>Sidebar</h2>
          <p>Active features?</p>
          <Toggle setTurnOffFeatures={setTurnOffFeatures}/>
        </div>
      </div>
      <div className={`main-content ${sidebarOpen ? '' : 'full-width'}`}>
        <button className="button one" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
        </button>
        <div className={turnOffFeatures ? '' : 'container'}>
          <a>
            <img src={reactLogo} style={style} className="logo" alt="React logo" />
          </a>
        </div>
        <div>
        <button className="button two" onClick={() => setSpinClockwise(!spinClockwise)}>
          Toggle Spin Direction
        </button>
        </div>
        <p>Idle time: {turnOffFeatures ? '0' : idleTime} seconds</p>
      </div>
     
    </>
  )
}

export default App
