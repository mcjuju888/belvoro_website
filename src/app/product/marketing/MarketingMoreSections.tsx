'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FacebookIcon, InstagramIcon } from '@/components/ChannelIcons'
import styles from './more.module.css'

const EASE = [0.16, 1, 0.3, 1] as const

/** Paths of the optional mockup images (null = not added yet, show a placeholder). */
export interface MarketingImages {
  winterTire: string | null
  studio: string | null
}

const line = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

const Icons = {
  car: (
    <svg width="15" height="15" viewBox="0 0 24 24" {...line}>
      <path d="M4 16.5V12l2-5c.3-.8 1-1.3 1.9-1.3h8.2c.9 0 1.6.5 1.9 1.3l2 5v4.5" />
      <path d="M3 12h18v4.5H3z" />
      <path d="M6.5 16.5v2M17.5 16.5v2" />
    </svg>
  ),
  snow: (
    <svg width="15" height="15" viewBox="0 0 24 24" {...line}>
      <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" />
      <path d="m9.5 4.5 2.5 2 2.5-2M9.5 19.5l2.5-2 2.5 2" />
    </svg>
  ),
  person: (
    <svg width="15" height="15" viewBox="0 0 24 24" {...line}>
      <circle cx="12" cy="8" r="3.8" />
      <path d="M4.5 20.5c.8-3.9 3.8-6.2 7.5-6.2s6.7 2.3 7.5 6.2" />
    </svg>
  ),
  mail: (
    <svg width="15" height="15" viewBox="0 0 24 24" {...line}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" {...line} strokeWidth={1.6}>
      <path d="m4 20 10.5-10.5" />
      <path d="m13 8 3 3" />
      <path d="M17.5 2.5 18 4l1.5.5L18 5l-.5 1.5L17 5l-1.5-.5L17 4l.5-1.5Z" fill="currentColor" />
      <path d="M20.5 9.5 21 11l1.5.5L21 12l-.5 1.5L20 12l-1.5-.5L20 11l.5-1.5Z" fill="currentColor" />
      <path d="M10.5 2.5 11 4l1.5.5L11 5l-.5 1.5L10 5l-1.5-.5L10 4l.5-1.5Z" fill="currentColor" />
    </svg>
  ),
  background: (
    <svg viewBox="0 0 24 24" {...line} strokeWidth={1.6}>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <circle cx="8.5" cy="9" r="1.8" />
      <path d="m3.5 17 5-5 3.5 3.5 2.5-2.5 6 6" />
    </svg>
  ),
  video: (
    <svg viewBox="0 0 24 24" {...line} strokeWidth={1.6}>
      <rect x="2.5" y="6" width="13.5" height="12" rx="2.2" />
      <path d="m16 10.2 5.5-3.2v10l-5.5-3.2" />
    </svg>
  ),
  text: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 4h16v4.2h-1.3c-.3-1.7-1-2.6-2.6-2.6h-2.9v12.1c0 .9.4 1.2 1.6 1.3V20H9.2v-1c1.2-.1 1.6-.4 1.6-1.3V5.6H7.9c-1.6 0-2.3.9-2.6 2.6H4V4Z" />
    </svg>
  ),
  captions: (
    <svg viewBox="0 0 24 24" {...line} strokeWidth={1.6}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M6 10h2M10 10h2M14 10h4M6 14h5M13 14h5" />
    </svg>
  ),
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#FF0000" />
      <path d="M13 11.2v9.6l8.2-4.8L13 11.2Z" fill="#fff" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#111" />
      <path d="M18.6 8.5c.4 2 1.7 3.3 3.7 3.6v2.6c-1.4 0-2.6-.4-3.7-1.1v5.6a4.8 4.8 0 1 1-4.8-4.8c.3 0 .5 0 .8.1v2.7a2.2 2.2 0 1 0 1.4 2V8.5h2.6Z" fill="#25F4EE" transform="translate(-0.6 -0.4)" />
      <path d="M18.6 8.5c.4 2 1.7 3.3 3.7 3.6v2.6c-1.4 0-2.6-.4-3.7-1.1v5.6a4.8 4.8 0 1 1-4.8-4.8c.3 0 .5 0 .8.1v2.7a2.2 2.2 0 1 0 1.4 2V8.5h2.6Z" fill="#FE2C55" transform="translate(0.6 0.4)" />
      <path d="M18.6 8.5c.4 2 1.7 3.3 3.7 3.6v2.6c-1.4 0-2.6-.4-3.7-1.1v5.6a4.8 4.8 0 1 1-4.8-4.8c.3 0 .5 0 .8.1v2.7a2.2 2.2 0 1 0 1.4 2V8.5h2.6Z" fill="#fff" />
    </svg>
  )
}

const AUDIENCE = [
  { icon: Icons.car, label: 'SUV owners' },
  { icon: Icons.snow, label: 'Past winter service customers' },
  { icon: Icons.person, label: 'High-value, active customers' },
]

const TOOLS = [
  { icon: Icons.sparkle, label: 'AI Enhance' },
  { icon: Icons.background, label: 'Add background' },
  { icon: Icons.video, label: 'Generate Video' },
  { icon: Icons.text, label: 'Add Text Overlay' },
  { icon: Icons.captions, label: 'Create Captions' },
]

const STUDIO_CHECKS = [
  'AI-enhanced photos',
  'Dynamic text overlays',
  'Custom background',
  'Captions & hashtags',
  'Photo-to-video ads',
  'Direct social publishing',
]

function Check() {
  return (
    <span className={styles.check} aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 6.2 5 8.6 9.5 3.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function fadeIn(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, delay, ease: EASE },
  }
}

export default function MarketingMoreSections({ images }: { images: MarketingImages }) {
  const stepsRef = useRef<HTMLDivElement>(null)
  const stepsInView = useInView(stepsRef, { once: true, margin: '-80px' })


  return (
    <>
      {/* TARGET OUTREACH */}
      <section className={styles.outreach}>
        <div className="container">
          <motion.div className={styles.outreachHeader} {...fadeIn()}>
            <span className={styles.badge}>Target outreach</span>
            <h2 className={styles.heading}>
              From idea to <span className={styles.gradient}>outreach</span>
              <br />
              in minutes.
            </h2>
            <p className={styles.text}>
              Belvoro reviews customer profiles, conversations, inquiries, and past activity to identify
              who&apos;s most likely to be interested, then creates personalized outreach for each
              customer instead of sending the same spam message to everyone.
            </p>
          </motion.div>

          <div className={styles.outreachBody}>
            <motion.div className={styles.outreachArt} {...fadeIn(0.1)}>
              <Image
                src="/characters/marketing.png"
                alt="Sage green Belvoro character with a megaphone"
                width={1118}
                height={1107}
                className={styles.outreachCharacter}
              />
            </motion.div>

            <div className={styles.steps} ref={stepsRef}>
              {/* 01 */}
              <motion.article
                className={styles.step}
                initial={{ opacity: 0, y: 28 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              >
                <span className={styles.stepNum}>01</span>
                <h3 className={styles.stepTitle}>Choose what to promote</h3>
                <p className={styles.stepText}>Tell Belvoro about your offer or campaign.</p>
                <div className={`${styles.mock} ${styles.mockOffer}`}>
                  <span className={styles.offerThumb}>
                    {images.winterTire && (
                      <Image src={images.winterTire} alt="" fill sizes="56px" className={styles.cover} />
                    )}
                  </span>
                  <span className={styles.offerText}>
                    <span className={styles.offerTitle}>Winter tire special</span>
                    <span className={styles.skeleton} />
                    <span className={`${styles.skeleton} ${styles.skeletonShort}`} />
                  </span>
                </div>
              </motion.article>

              {/* 02 */}
              <motion.article
                className={styles.step}
                initial={{ opacity: 0, y: 28 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
              >
                <span className={styles.stepNum}>02</span>
                <h3 className={styles.stepTitle}>Belvoro finds the right customers</h3>
                <p className={styles.stepText}>It analyzes your customer data to identify the best audience.</p>
                <ul className={`${styles.mock} ${styles.audience}`}>
                  {AUDIENCE.map((a) => (
                    <li key={a.label}>
                      <span className={styles.audienceIcon}>{a.icon}</span>
                      {a.label}
                    </li>
                  ))}
                </ul>
              </motion.article>

              {/* 03 */}
              <motion.article
                className={styles.step}
                initial={{ opacity: 0, y: 28 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.0, ease: EASE }}
              >
                <span className={styles.stepNum}>03</span>
                <h3 className={styles.stepTitle}>Belvoro writes a personal message</h3>
                <p className={styles.stepText}>Each customer gets a message written just for them.</p>
                <div className={`${styles.mock} ${styles.email}`}>
                  <span className={styles.emailLabel}>{Icons.mail} Personalized email</span>
                  <div className={styles.emailBody}>
                    <p>Hi Sarah,</p>
                    <p>With winter just around the corner, we&apos;re offering 20% off winter tires for our valued SUV owners.</p>
                    <p>Get your tires today!</p>
                  </div>
                </div>
              </motion.article>
            </div>
          </div>
        </div>
      </section>

      {/* MARKETING STUDIO */}
      <section className={styles.studio}>
        <div className={`container ${styles.studioInner}`}>
          <motion.div {...fadeIn()}>
            <span className={styles.badge}>Marketing studio</span>
            <h2 className={styles.heading}>
              Create. Publish. <span className={styles.gradient}>Grow.</span>
            </h2>
            <p className={styles.text}>
              A custom-built AI editing tool designed around your business. Enhance photos, create
              short-form video ads, generate captions, and publish directly to your social channels,
              no extra tools needed.
            </p>
            <ul className={styles.studioChecks}>
              {STUDIO_CHECKS.map((c) => (
                <li key={c}><Check />{c}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div className={styles.stage} {...fadeIn(0.1)}>
            {/* Edited image with its thumbnail strip (one artwork: /marketing/new-arrivals.*) */}
            <div className={styles.canvas}>
              {images.studio ? (
                <Image
                  src={images.studio}
                  alt="Marketing Studio editing a New Arrivals video ad for a black SUV"
                  fill
                  sizes="(max-width: 600px) 60vw, 340px"
                  className={styles.contain}
                />
              ) : (
                <>
                  <span className={styles.placeholderMain} />
                  <span className={styles.placeholderThumbs}><i /><i /><i /><i /></span>
                </>
              )}
            </div>

            <div className={styles.tools} aria-label="Studio tools">
              {TOOLS.map((t) => (
                <div key={t.label} className={styles.tool}>
                  <span className={styles.toolIcon}>{t.icon}</span>
                  <span className={styles.toolLabel}>{t.label}</span>
                  <svg className={styles.chevron} width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M4.5 2.5 8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ))}
            </div>

            <svg className={styles.curve} viewBox="0 0 66 40" fill="none" aria-hidden="true">
              <path d="M3 5 C 24 2, 44 8, 56 30" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              <path d="M46.5 27.5 L57.5 33.5 L59.5 21" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <div className={styles.publish}>
              <span className={styles.publishTitle}>Publish to</span>
              <span className={styles.publishIcons}>
                {[
                  { icon: <InstagramIcon key="ig" />, checked: true },
                  { icon: <FacebookIcon key="fb" />, checked: true },
                  { icon: <YouTubeIcon key="yt" />, checked: false },
                  { icon: <TikTokIcon key="tt" />, checked: false },
                ].map(({ icon, checked }, i) => (
                  <span key={i} className={styles.publishIcon}>
                    {icon}
                    {checked && <span className={styles.publishCheck} aria-hidden="true">
                      <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6.2 5 8.6 9.5 3.6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>}
                  </span>
                ))}
              </span>
              <span className={styles.publishBtn}>Publish</span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
