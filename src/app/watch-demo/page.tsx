import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Demo Video | Belvoro AI',
  description: 'A 2-minute look at how Belvoro answers, books and follows up for your business.',
}

export default function WatchDemo() {
  return (
    <>
      <Navbar />
      <main>
        <section className={styles.section}>
          <div className={`container ${styles.inner}`}>
            <div className={styles.badge}>Demo Video</div>
            <h1 className={styles.heading}>
              See Belvoro <span className={styles.gradient}>in action.</span>
            </h1>
            <p className={styles.sub}>
              A 2-minute look at how Belvoro answers, books and follows up for your business.
            </p>

            <div className={styles.videoWrap}>
              <video
                className={styles.video}
                controls
                playsInline
                preload="metadata"
                poster="/belvoro-demo-poster.jpg"
              >
                <source src="/belvoro-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  )
}
