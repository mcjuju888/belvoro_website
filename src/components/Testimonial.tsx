import styles from './Testimonial.module.css'

export default function Testimonial() {
  return (
    <section className={styles.section}>
      <div className="container">
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.quote}>
            "Belvoro handles our incoming calls better than we expected. It books appointments, answers questions, and makes sure no lead goes cold."
          </p>
          <div className={styles.attr}>
            <div className={styles.avatar}>HH</div>
            <div>
              <div className={styles.name}> Manager</div>
              <div className={styles.role}>Home Highlight Services, Toronto</div>
            </div>
          </div>
        </div>
        <div className={styles.bigQuote}>"</div>
      </div>
      </div>
    </section>
  )
}
