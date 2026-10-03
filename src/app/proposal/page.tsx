import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Business Proposal & Plan Comparison | Belvoro AI',
  description: 'Everything Belvoro can do for your business, and how the three plans compare.',
}

const PDF = '/belvoro-proposal.pdf'
const DOWNLOAD_NAME = 'Belvoro-Business-Proposal.pdf'

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4v11M7 10.5l5 5 5-5" />
      <path d="M4.5 19.5h15" />
    </svg>
  )
}

function OpenIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 4h6v6M20 4l-9 9" />
      <path d="M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />
    </svg>
  )
}

export default function ProposalPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.top}>
          <div className="container">
            <header className={styles.header}>
              <span className={styles.badge}>Resources</span>
              <h1 className={styles.heading}>
                Business Proposal
                <br />
                <span className={styles.gradient}>&amp; Plan Comparison</span>
              </h1>
              <p className={styles.sub}>
                Everything Belvoro can do for your business, and how the three plans compare.
              </p>
              <div className={styles.btns}>
                <a href={PDF} download={DOWNLOAD_NAME} className={styles.btnDark}>
                  <DownloadIcon />
                  Download PDF
                </a>
                {/* Phones only: embedded PDF viewers work badly there. */}
                <a href={PDF} target="_blank" rel="noopener noreferrer" className={styles.btnLight}>
                  <OpenIcon />
                  Open PDF
                </a>
              </div>
            </header>

            {/* Desktop/tablet: the browser's built-in PDF viewer. */}
            <div className={styles.viewer}>
              <iframe
                src={`${PDF}#view=FitH`}
                title="Belvoro Business Proposal (PDF)"
                className={styles.frame}
              />
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  )
}
