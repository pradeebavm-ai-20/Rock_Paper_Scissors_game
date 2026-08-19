import SoundToggle from './SoundToggle'
export default function Header({ soundEnabled, onSoundToggle, onHelp, onStats }) {
  return <header className="topbar"><div className="brand"><span className="brand-mark">◈</span><div><small>NEURAL ARENA</small><strong>GESTURE//DUEL</strong></div></div><nav><SoundToggle enabled={soundEnabled} onToggle={onSoundToggle} /><button onClick={onHelp}>HOW TO PLAY</button><button onClick={onStats}>STATS</button></nav></header>
}
