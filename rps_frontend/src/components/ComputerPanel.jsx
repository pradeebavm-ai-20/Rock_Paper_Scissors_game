import { moveIcons, moveNames } from '../data/gameData'
export default function ComputerPanel({ phase, computerMove }) {
  const revealed = ['REVEAL', 'RESULT'].includes(phase)
  return <section className={`move-panel computer-panel ${revealed ? 'revealed' : ''}`}><div className="panel-heading"><span>COMPUTER MOVE</span><i>CPU // 01</i></div><div className="computer-feed"><div className="scan-lines"/>{revealed ? <><b className="move-icon">{moveIcons[computerMove]}</b><strong>{moveNames[computerMove]}</strong></> : <><b className="question">?</b><span>{phase === 'ANALYZING' ? 'CALCULATING...' : 'WAITING...'}</span></>}</div><p>{revealed ? 'Opponent signal received' : 'Move encrypted until reveal'}</p></section>
}
