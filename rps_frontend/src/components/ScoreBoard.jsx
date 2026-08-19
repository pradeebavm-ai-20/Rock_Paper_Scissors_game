export default function ScoreBoard({ score, round }) {
  return <section className="scoreboard" aria-label="Match score"><div><span>YOU</span><strong>{score.user}</strong></div><div className="round-info"><span>ROUND {round}</span><b>BEST OF 5</b></div><div><span>CPU</span><strong>{score.computer}</strong></div></section>
}
