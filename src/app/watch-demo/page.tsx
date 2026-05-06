'use client'
import { useRef, useState, type MouseEvent } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import styles from './page.module.css'

function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      void audio.play()
    }
    setPlaying(!playing)
  }

  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (!audio) return
    setCurrentTime(audio.currentTime)
    setProgress((audio.currentTime / audio.duration) * 100)
  }

  const handleLoadedMetadata = () => {
    const audio = audioRef.current
    if (!audio) return
    setDuration(audio.duration)
  }

  const handleEnded = () => setPlaying(false)

  const handleSeek = (e: MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    const bar = e.currentTarget
    const rect = bar.getBoundingClientRect()
    const x = e.clientX - rect.left
    const pct = x / rect.width
    audio.currentTime = pct * audio.duration
  }

  const fmt = (s: number) => {
    if (isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <div className={styles.player}>
      <audio
        ref={audioRef}
        src="/demo-call.mp4"
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      <button type="button" className={styles.playBtn} onClick={toggle}>
        {playing ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        )}
      </button>
      <div className={styles.playerMiddle}>
        <div className={styles.progressBar} onClick={handleSeek}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
          <div
            className={styles.progressThumb}
            style={{ left: `${progress}%` }}
          />
        </div>
        <div className={styles.times}>
          <span>{fmt(currentTime)}</span>
          <span>{fmt(duration)}</span>
        </div>
      </div>
    </div>
  )
}

export default function WatchDemo() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>

          {/* Header */}
          <div className={styles.header}>
            <div className={styles.eyebrow}>Product Demo</div>
            <h1 className={styles.heading}>
              See Belvoro <i>in action</i>
            </h1>
            <p className={styles.sub}>
              Watch how Belvoro handles real calls, books appointments, and qualifies
              leads, automatically.
            </p>
          </div>

          <div className={styles.videoWrap}>
            <video
              className={styles.video}
              controls
              playsInline
              poster=""
            >
              <source src="https://alvhh0k661czyjmu.public.blob.vercel-storage.com/belvoro-demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className={styles.audioSection}>
            <div className={styles.audioLeft}>
              <div className={styles.audioLabel}>
                <div className={styles.audioEyebrow}>Live example</div>
                <h3 className={styles.audioTitle}>
                  Listen to Belvoro <i>in action</i>
                </h3>
                <p className={styles.audioDesc}>
                  A real inbound call handled entirely by Belvoro,
                  no human required.
                </p>
              </div>
            </div>
            <div className={styles.audioRight}>
              <AudioPlayer />
            </div>
          </div>

          {/* CTA */}
          <div className={styles.cta}>
            <p className={styles.ctaText}>Ready to get your own?</p>
            <div className={styles.ctaBtns}>
              <a href="/get-started" className={styles.btnMain}>Get Started Free</a>
              <a href="/get-started" className={styles.btnOutline}>Contact Us</a>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
