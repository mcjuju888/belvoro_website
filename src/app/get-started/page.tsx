'use client'
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import styles from './page.module.css'

export default function GetStarted() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  // Honeypot: humans never see or fill this
  const [website, setWebsite] = useState('')

  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    industry: '',
    callVolume: '',
    message: '',
  })

  // Arriving from the revenue calculator? Carry their numbers into the message
  // so the first conversation starts from their own math.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('calc') !== '1') return
    const inquiries = params.get('inquiries')
    const missed = params.get('missed')
    const recovered = params.get('recovered')
    if (!recovered) return
    setFormData(prev => prev.message ? prev : ({
      ...prev,
      message: `I used the revenue calculator: ~${inquiries} inquiries/month with ${missed}% missed. It estimated $${Number(recovered).toLocaleString()}/month recoverable. I'd like to see what that looks like for my business.`,
    }))
  }, [])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, website }),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json().catch(() => null)
        setError(data?.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>

          {/* LEFT: Form */}
          <div className={styles.formCard}>
            {submitted ? (
              <div className={styles.successState}>
                <div className={styles.successIcon}>✓</div>
                <h2 className={styles.successTitle}>Message sent!</h2>
                <p className={styles.successDesc}>
                  We&apos;ll be in touch within 24 hours. Keep an eye
                  on your inbox.
                </p>
              </div>
            ) : (
              <>
                <div className={styles.eyebrow}>Get Started</div>
                <h1 className={styles.heading}>
                  Let&apos;s build your<br />
                  <i>AI front desk</i>
                </h1>
                <p className={styles.sub}>
                  Tell us about your business and we&apos;ll be in touch within 24 hours.
                </p>

                <form className={styles.form} onSubmit={handleSubmit}>
                  {/* Honeypot: hidden from humans, bots fill it and get silently dropped */}
                  <input
                    type="text"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    autoComplete="off"
                    tabIndex={-1}
                    aria-hidden="true"
                    style={{ position: 'absolute', left: '-9999px', height: 0, width: 0, opacity: 0 }}
                  />
                  <div className={styles.row2}>
                    <div className={styles.field}>
                      <label className={styles.label}>Full Name</label>
                      <input
                        className={styles.input}
                        type="text"
                        name="fullName"
                        placeholder="John Smith"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Business Name</label>
                      <input
                        className={styles.input}
                        type="text"
                        name="businessName"
                        placeholder="Acme Auto Group"
                        value={formData.businessName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className={styles.row2}>
                    <div className={styles.field}>
                      <label className={styles.label}>Email Address</label>
                      <input
                        className={styles.input}
                        type="email"
                        name="email"
                        placeholder="john@acmeauto.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Phone Number</label>
                      <input
                        className={styles.input}
                        type="tel"
                        name="phone"
                        placeholder="+1 (416) 555-0100"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className={styles.row2}>
                    <div className={styles.field}>
                      <label className={styles.label}>Industry</label>
                      <select
                        className={styles.input}
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                      >
                        <option value="">Select your industry</option>
                        <option value="Car Dealership">Car Dealership</option>
                        <option value="Dental">Dental</option>
                        <option value="Medical / Clinic">Medical / Clinic</option>
                        <option value="Salon & Spa">Salon &amp; Spa</option>
                        <option value="Legal">Legal</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Trades & Home Services">Trades &amp; Home Services</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Monthly Call Volume</label>
                      <select
                        className={styles.input}
                        name="callVolume"
                        value={formData.callVolume}
                        onChange={handleChange}
                      >
                        <option value="">Select call volume</option>
                        <option value="Under 100">Under 100</option>
                        <option value="100 – 500">100 – 500</option>
                        <option value="500 – 1,000">500 – 1,000</option>
                        <option value="1,000+">1,000+</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Tell us about your business</label>
                    <textarea
                      className={styles.textarea}
                      name="message"
                      rows={4}
                      placeholder="Describe your business, your current call handling process, and what you're hoping to improve..."
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Message →'}
                  </button>
                  {error && <p className={styles.errorMsg}>{error}</p>}
                  <p className={styles.submitNote}>We&apos;ll respond within 24 hours.</p>
                </form>
              </>
            )}
          </div>

          {/* RIGHT: Info panel */}
          <div className={styles.infoPanel}>
            <h2 className={styles.infoHeading}>
              What happens <i>next</i>
            </h2>

            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.stepNum}>1</div>
                <div className={styles.stepContent}>
                  <div className={styles.stepTitle}>We review your submission</div>
                  <div className={styles.stepDesc}>
                    We&apos;ll look over your business details within 24 hours.
                  </div>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNum}>2</div>
                <div className={styles.stepContent}>
                  <div className={styles.stepTitle}>Discovery call</div>
                  <div className={styles.stepDesc}>
                    A short 20-minute call to understand your workflow and goals.
                  </div>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNum}>3</div>
                <div className={styles.stepContent}>
                  <div className={styles.stepTitle}>We build your free demo</div>
                  <div className={styles.stepDesc}>
                    We create a working AI bot and an automated front desk tailored to your business. No payment until you&apos;re fully satisfied with the setup.
                  </div>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNum}>4</div>
                <div className={styles.stepContent}>
                  <div className={styles.stepTitle}>Go live</div>
                  <div className={styles.stepDesc}>
                    Once approved, we connect everything and make it live.
                  </div>
                </div>
              </div>
            </div>



            <div className={styles.clientBox}>
              <div className={styles.clientBoxTitle}>Already a client?</div>
              <div className={styles.clientBoxText}>
                Log in to your dashboard to manage your account.
              </div>
              <a href="/dashboard" className={styles.clientBoxLink}>
                Go to Dashboard →
              </a>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
