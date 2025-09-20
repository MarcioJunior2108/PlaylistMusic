import React from 'react'
import { Play, Heart, MoreHorizontal } from 'lucide-react'

export default function Playlist({ tracks, currentIndex, onSelect }){
  // pegue a capa da primeira música como demo da header
  const cover = tracks[0]?.cover

  return (
    <div className="pl">
      <header className="pl__header">
        <div className="pl__coverWrap">
          {cover && <img className="pl__cover" src={cover} alt="Capa" />}
        </div>

        <div className="pl__meta">
          <div className="pl__label">Playlist</div>
          <h1 className="pl__title">Cyber<br/>Synthwave</h1>
          <p className="pl__desc">
            Uma jornada pelos sons futurísticos da música eletrônica. Deixe-se levar pelas batidas sintéticas e melodias que ecoam o amanhã.
          </p>

          <div className="pl__stats">
            <span className="dot">NeuraMusic</span>
            <span className="dot">127.832 seguidores</span>
            <span className="dot">{tracks.length} músicas</span>
            <span>~ {Math.round(tracks.length * 3.8)} min</span>
          </div>

          <div className="pl__actions">
            <button className="btn btn--play"><Play size={20}/></button>
            <button className="btn"><Heart size={18}/></button>
            <button className="btn"><MoreHorizontal size={18}/></button>
          </div>
        </div>
      </header>

      <div className="pl__table">
        <div className="pl__thead">
          <span>#</span><span>Título</span><span>Álbum</span><span>⏱</span>
        </div>

        <ul className="pl__tbody">
          {tracks.map((t, i)=>(
            <li
              key={t.id}
              className={`pl__row ${i === currentIndex ? 'row--active':''}`}
              onClick={()=> onSelect(i)}
              title="Clique para tocar"
            >
              <span className="muted">{i+1}</span>
              <div className="pl__titleCell">
                <div className="pl__song">{t.title}</div>
                <div className="pl__artist muted">{t.artist}</div>
              </div>
              <span className="pl__album">{t.album}</span>
              <span className="muted">{t.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
