'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './CallPlayer.module.css'

const BAR_COUNT = 64

// Decorative waveform: a fixed, speech-like pattern (not computed from the audio,
// which would mean downloading the whole 21 MB file up front).
const BARS = Array.from({ length: BAR_COUNT }, (_, i) => {
  const phrase = 0.55 + 0.45 * Math.abs(Math.sin(i * 0.23))
  const jitter = 0.5 + 0.5 * Math.abs(Math.sin(i * 12.9898) * Math.cos(i * 4.1414))
  return Math.max(0.18, Math.min(1, phrase * jitter * 1.25))
})

interface CallPlayerProps {
  src: string
  label: string
}

export default function CallPlayer({ src, label }: CallPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  // Smooth fill while playing (timeupdate alone only fires ~4x per second).
  useEffect(() => {
    if (!playing) return
    let frame: number
    const tick = () => {
      const a = audioRef.current
      if (a && a.duration) setProgress(a.currentTime / a.duration)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [playing])

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (a.paused) a.play().catch(() => setPlaying(false))
    else a.pause()
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current
    if (!a || !a.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    a.currentTime = ratio * a.duration
    setProgress(ratio)
  }

  const played = Math.round(progress * BAR_COUNT)

  return (
    <div className={styles.player}>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setProgress(1) }}
      />
      <button
        type="button"
        className={styles.play}
        onClick={toggle}
        aria-label={playing ? `Pause ${label}` : `Play ${label}`}
      >
        {playing ? (
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <rect x="3" y="2" width="3.5" height="12" rx="1" fill="currentColor" />
            <rect x="9.5" y="2" width="3.5" height="12" rx="1" fill="currentColor" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 2.5v11a.8.8 0 0 0 1.2.7l8.6-5.5a.8.8 0 0 0 0-1.4L5.2 1.8A.8.8 0 0 0 4 2.5Z" fill="currentColor" />
          </svg>
        )}
      </button>
      <div className={styles.wave} onClick={seek} aria-hidden="true">
        {BARS.map((h, i) => (
          <span
            key={i}
            className={i < played ? styles.barPlayed : styles.bar}
            style={{ height: `${Math.round(h * 100)}%` }}
          />
        ))}
      </div>
    </div>
  )
}
