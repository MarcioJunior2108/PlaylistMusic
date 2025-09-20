import './App.css'
import Sidebar from './components/Sidebar'
import Playlist from './components/Playlist'
import Player from './components/Player'

// Importe suas músicas locais
import track1 from './assets/track1.mp3'
import track2 from './assets/track2.mp3'
import track3 from './assets/track3.mp3'


// Capas (use as que você já tem)
import cover from './assets/cover.jpg'
import mini from './assets/mini.jpg'

export default function App(){
  // catálogo com preview SRC real
  const tracks = [
    { id:1, title:'Neon Nights',   artist:'Digital Phantoms', album:'Cyber Dreams',   time:'4:23', src: track1, cover },
    { id:2, title:'Chrome Skyline',artist:'Arcade Runner',     album:'Midnight City',  time:'3:58', src: track2, cover },
    { id:3, title:'Vector Love',    artist:'Pixel Hearts',      album:'Soft Glitch',    time:'4:11', src: track3, cover },
  ]

  // estado do player
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress]   = useState(0)   // segundos
  const [duration, setDuration]   = useState(0)   // segundos
  const [volume, setVolume]       = useState(0.62)

  // ações básicas
  const playTrackAt = (index) => {
    setCurrentIndex(index)
    setIsPlaying(true)
    setProgress(0)
  }
  const togglePlay = () => setIsPlaying(v => !v)
  const next = () => setCurrentIndex(i => (i + 1) % tracks.length)
  const prev = () => setCurrentIndex(i => (i - 1 + tracks.length) % tracks.length)

  // quando mudar de faixa por next/prev, manter tocando
  useEffect(() => {
    setIsPlaying(true)
    setProgress(0)
  }, [currentIndex])

  return (
    <div className="shell">
      <aside className="left"><Sidebar/></aside>
      <main className="center">
        <Playlist
          tracks={tracks}
          currentIndex={currentIndex}
          onSelect={(i)=> playTrackAt(i)}
        />
      </main>
      <footer className="bottom">
        <Player
          track={tracks[currentIndex]}
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onNext={next}
          onPrev={prev}
          progress={progress}
          setProgress={setProgress}
          duration={duration}
          setDuration={setDuration}
          volume={volume}
          setVolume={setVolume}
          miniSrc={mini}
        />
      </footer>
    </div>
  )
}

import { useEffect, useState } from 'react'
