export default function Timer({ phase, countdown }) {
  const active = ['COUNTDOWN', 'ANALYZING'].includes(phase)
  const label = phase === 'ANALYZING' ? 'SCAN' : active ? countdown : 'READY'
  return <div className={`timer ${phase === 'COUNTDOWN' ? 'active' : ''}`}><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="43"/><circle className="progress" cx="50" cy="50" r="43"/></svg><div><small>{phase === 'ANALYZING' ? 'ANALYZING' : 'NEXT MOVE'}</small><strong>{label}</strong></div></div>
}
