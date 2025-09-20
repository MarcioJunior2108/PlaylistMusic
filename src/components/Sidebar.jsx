import React from 'react'
import {
  Home,
  Search,
  Library,
  Plus,
  Heart,
  Music
} from 'lucide-react'

export default function Sidebar(){
  return (
    <div className="sb">
      <div className="sb__brand">
        <div className="sb__logo"><Music className='lolo'/></div>
        <div className="sb__name">NeuraMusic</div>
      </div>

      <nav className="sb__nav">
        <Section title="Geral">
          <Item icon={<Home size={18}/>} label="Início" active />
          <Item icon={<Search size={18}/>} label="Buscar" />
          <Item icon={<Library size={18}/>} label="Sua Biblioteca" />
        </Section>

        <Section>
          <Item icon={<Plus size={18}/>} label="Criar Playlist" />
          <Item icon={<Heart size={18}/>} label="Músicas Curtidas" />
        </Section>

        <Section title="Playlists">
          {[
            'Electronic Vibes',
            'Synthwave Paradise',
            'Future Bass Mix',
            'Cyberpunk Nights',
            'Neon Dreams',
            'Digital Euphoria',
            'Techno Underground',
            'Retrowave Journey'
          ].map((t)=> <Item key={t} icon={<Music size={16}/>} label={t} />)}
        </Section>
      </nav>
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

function Item({icon, label, active}){
  return (
    <li className={`sb__item ${active ? 'is-active':''}`}>
      <span className="sb__icon">{icon}</span>
      <span className="sb__text">{label}</span>
    </li>
  )
}
