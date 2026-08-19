export default function SoundToggle({ enabled, onToggle, compact = false }) {
  return <button className={`sound-toggle ${compact ? 'compact' : ''}`} onClick={onToggle} aria-label={enabled ? 'Turn sound off' : 'Turn sound on'}>
    <span>{enabled ? '◖))' : '◖×'}</span>{!compact && <span>SOUND {enabled ? 'ON' : 'OFF'}</span>}
  </button>
}
