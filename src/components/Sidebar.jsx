import React, { useEffect, useRef, useState } from 'react'
import {
  Home, Search, Library, Plus, Heart, Music,
  Menu as MenuIcon, X as CloseIcon
} from 'lucide-react'

export default function Sidebar(){
  const [open, setOpen] = useState(false)
  const drawerRef = useRef(null)

  // Fechar com ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Fechar clicando fora do painel
  useEffect(() => {
    if (!open) return
    const onClick = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  const handleItemClick = () => setOpen(false)

  return (
    <div className="sb">
      {/* Top bar (só mobile) */}
      <div className="sb__mobileBar">
        <button
          className="sb__hamb"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="drawer-nav"
          onClick={() => setOpen(v => !v)}
        >
          {open ? <CloseIcon size={22}/> : <MenuIcon size={22}/>}
        </button>

        <div className="sb__brand sb__brand--compact">
          <div className="sb__logo"><Music className="lolo" /></div>
          <div className="sb__name">NeuraMusic</div>
        </div>
      </div>

      {/* Sidebar fixa (só desktop) */}
      <div className="sb__desktop">
        <div className="sb__brand">
          <div className="sb__logo"><Music className="lolo" /></div>
          <div className="sb__name">NeuraMusic</div>
        </div>

        <nav className="sb__nav">
          <Section title="Geral">
            <Item icon={<Home size={18}/>} label="Início" active onClick={handleItemClick}/>
            <Item icon={<Search size={18}/>} label="Buscar" onClick={handleItemClick}/>
            <Item icon={<Library size={18}/>} label="Sua Biblioteca" onClick={handleItemClick}/>
          </Section>

          <Section>
            <Item icon={<Plus size={18}/>} label="Criar Playlist" onClick={handleItemClick}/>
            <Item icon={<Heart size={18}/>} label="Músicas Curtidas" onClick={handleItemClick}/>
          </Section>

          <Section title="Playlists">
            {[
              'Electronic Vibes','Synthwave Paradise','Future Bass Mix','Cyberpunk Nights',
              'Neon Dreams','Digital Euphoria','Techno Underground','Retrowave Journey'
            ].map((t)=> (
              <Item key={t} icon={<Music size={16}/>} label={t} onClick={handleItemClick}/>
            ))}
          </Section>
        </nav>
      </div>

      {/* Drawer (só mobile; controlado por .drawer/.is-open no CSS) */}
      <div className={`drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div
          className="drawer__panel"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          id="drawer-nav"
        >
          <div className="sb__brand sb__brand--drawer">
            <div className="sb__logo"><Music className="lolo" /></div>
            <div className="sb__name">NeuraMusic</div>
          </div>

          <nav className="sb__nav">
            <Section title="Geral">
              <Item icon={<Home size={18}/>} label="Início" active onClick={handleItemClick}/>
              <Item icon={<Search size={18}/>} label="Buscar" onClick={handleItemClick}/>
              <Item icon={<Library size={18}/>} label="Sua Biblioteca" onClick={handleItemClick}/>
            </Section>

            <Section>
              <Item icon={<Plus size={18}/>} label="Criar Playlist" onClick={handleItemClick}/>
              <Item icon={<Heart size={18}/>} label="Músicas Curtidas" onClick={handleItemClick}/>
            </Section>

            <Section title="Playlists">
              {[
                'Electronic Vibes','Synthwave Paradise','Future Bass Mix','Cyberpunk Nights',
                'Neon Dreams','Digital Euphoria','Techno Underground','Retrowave Journey'
              ].map((t)=> (
                <Item key={t} icon={<Music size={16}/>} label={t} onClick={handleItemClick}/>
              ))}
            </Section>
          </nav>
        </div>

        {/* backdrop clicável */}
        <button
          className="drawer__backdrop"
          onClick={() => setOpen(false)}
          aria-label="Fechar menu"
        />
      </div>
    </div>
  )
}

function Section({title, children}){
  return (
    <div className="sb__section">
      {title && <div className="sb__sectionTitle">{title}</div>}
      <ul className="sb__list">{children}</ul>
    </div>
  )
}

function Item({icon, label, active, onClick}){
  return (
    <li className={`sb__item ${active ? 'is-active':''}`} onClick={onClick}>
      <span className="sb__icon">{icon}</span>
      <span className="sb__text">{label}</span>
    </li>
  )
}
