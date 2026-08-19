import { useCallback, useState } from 'react'

export function useSound() {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const play = useCallback((kind) => {
    if (!soundEnabled || !window.AudioContext) return
    try {
      const context = new window.AudioContext()
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      const tone = { countdown: 440, go: 720, reveal: 590, win: 840, lose: 180, draw: 330, click: 520 }[kind] || 440
      oscillator.frequency.value = tone
      gain.gain.setValueAtTime(0.05, context.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.12)
      oscillator.connect(gain).connect(context.destination)
      oscillator.start()
      oscillator.stop(context.currentTime + 0.12)
    } catch { /* Audio is optional: silently continue if the browser blocks it. */ }
  }, [soundEnabled])
  return { soundEnabled, setSoundEnabled, play }
}
