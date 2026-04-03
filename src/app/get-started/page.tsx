import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import styles from './page.module.css'

export default function GetStarted() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>

          {/* LEFT — Form */}
          <div className={styles.formCard}>
            <div className={styles.eyebrow}>Get Started</div>
            <h1 className={styles.heading}>
              Let's build your<br />
              <i>AI front desk</i>
            </h1>
            <p className={styles.sub}>
              Tell us about your business and we'll be in touch within 24 hours.
            </p>

            <form className={styles.form}>
              <div className={styles.row2}>
                <div className={styles.field}>
                  <label className={styles.label}>Full Name</label>
                  <input className={styles.input} type="text" placeholder="John Smith" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Business Name</label>
                  <input className={styles.input} type="text" placeholder="Acme Auto Group" />
                </div>
              </div>

              <div className={styles.row2}>
                <div className={styles.field}>
                  <label className={styles.label}>Email Address</label>
                  <input className={styles.input} type="email" placeholder="john@acmeauto.com" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Phone Number</label>
                  <input className={styles.input} type="tel" placeholder="+1 (416) 555-0100" />
                </div>
              </div>

              <div className={styles.row2}>
                <div className={styles.field}>
                  <label className={styles.label}>Industry</label>
                  <select className={styles.input}>
                    <option value="">Select your industry</option>
                    <option>Car Dealership</option>
                    <option>Medical / Clinic</option>
                    <option>Salon &amp; Spa</option>
                    <option>Legal</option>
                    <option>Real Estate</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Monthly Call Volume</label>
                  <select className={styles.input}>
                    <option value="">Select call volume</option>
                    <option>Under 100</option>
                    <option>100 – 500</option>
                    <option>500 – 1,000</option>
                    <option>1,000+</option>
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Tell us about your business</label>
                <textarea
                  className={styles.textarea}
                  rows={4}
                  placeholder="Describe your business, your current call handling process, and what you're hoping to improve..."
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                Send Message →
              </button>
              <p className={styles.submitNote}>We'll respond within 24 hours.</p>
            </form>
          </div>

          {/* RIGHT — Info panel */}
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
                    We'll look over your business details and call volume within 24 hours.
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
                  <div className={styles.stepTitle}>We build your agent</div>
                  <div className={styles.stepDesc}>
                    Custom AI built around your business. Live within days.
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
