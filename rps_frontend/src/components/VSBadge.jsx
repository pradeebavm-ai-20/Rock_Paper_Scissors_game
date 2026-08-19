export default function VSBadge({ phase }) { return <div className={`vs-wrap ${phase === 'REVEAL' ? 'surge' : ''}`}><span/><b>VS</b><span/></div> }
