import React, { useEffect, useRef } from 'react'
import { SkipBack, Play, Pause, SkipForward, Volume2 } from 'lucide-react'

function fmt(seconds){
  if (!Number.isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2,'0')}`
}

export default function Player({
  track,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  progress, setProgress,
  duration, setDuration,
  volume, setVolume,
  miniSrc
}){
  const audioRef = useRef(null)
  const rafRef = useRef(0)        // para suavizar updates

  // Atualiza volume sempre
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  // Play/Pause controlado
  useEffect(() => {
    const a = audioRef.current
    if (!a || !track?.src) return
    if (isPlaying) a.play().catch(()=>{})
    else a.pause()
  }, [isPlaying, track])

  // Suavizar progresso: ~60fps com rAF mas com menos setState
  useEffect(() => {
    const a = audioRef.current
    if (!a) return

    const loop = () => {
      if (!a.paused) {
        // setState só quando muda “perceptivelmente”
        const t = a.currentTime | 0
        if (t !== (progress | 0)) setProgress(a.currentTime)
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [setProgress, progress])

  const onLoaded = () => {
    const a = audioRef.current
    if (!a) return
    setDuration(a.duration || 0)
  }
  const onEnded = () => onNext()

  const handleSeek = (e) => {
    const a = audioRef.current
    if (!a) return
    const val = Number(e.target.value)
    a.currentTime = val
    setProgress(val)
  }

  return (
    <div className="player">
      {/* Remonta o <audio> quando a música muda */}
      <audio
        key={track?.src || 'empty'}   // <— evita efeitos duplicados do StrictMode
        ref={audioRef}
        src={track?.src || ''}
        preload="auto"
        onLoadedMetadata={onLoaded}
        onEnded={onEnded}
        playsInline
      />

      <div className="player__left">
        <img className="player__thumb" src={miniSrc} alt="" />
        <div className="player__meta">
          <div className="player__title">{track?.title || '—'}</div>
          <div className="player__artist">{track?.artist || ''}</div>
        </div>
      </div>

      <div className="player__center">
        <div className="player__controls">
          <button title="Anterior" onClick={onPrev}><SkipBack size={20}/></button>
          <button className="play" title={isPlaying ? "Pausar" : "Tocar"} onClick={onTogglePlay}>
            {isPlaying ? <Pause size={24}/> : <Play size={24}/>}
          </button>
          <button title="Próxima" onClick={onNext}><SkipForward size={20}/></button>
        </div>

        <div className="player__bar">
          <span className="time">{fmt(progress)}</span>
          <input
            type="range"
            min="0"
            max={Math.max(duration, 0)}
            step="1"
            value={Math.min(progress, duration || 0)}
            onChange={handleSeek}
          />
          <span className="time">{fmt(duration)}</span>
        </div>
      </div>

      <div className="player__right">
        <Volume2 size={18} style={{opacity:.8}} />
        <input
          type="range"
          min="0" max="1" step="0.01"
          value={volume}
          onChange={e=>setVolume(Number(e.target.value))}
        />
      </div>
    </div>
  )
}
