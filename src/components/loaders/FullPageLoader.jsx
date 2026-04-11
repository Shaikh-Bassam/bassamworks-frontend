import styles from '../../styles/widget.module.css'

const loaderWords = [
  'Smooth Animations',
  'Interactive Forms',
  'Dynamic Components',
  'Responsive Design',
  'Fast Performance',
]

const FullPageLoader = () => {
  return (
    <div className={styles.loaderContainer} role="status" aria-live="polite" aria-busy="true">
      <div className={styles.loaderBackdrop} aria-hidden="true">
        <span className={styles.loaderOrbPrimary} />
        <span className={styles.loaderOrbSecondary} />
        <span className={styles.loaderGrid} />
      </div>

      <div className={styles.loaderFrame}>
        <div className={styles.loaderHeader}>
          <span className={styles.loaderEyebrow}>BassamWorks</span>
          <p className={styles.starterLoader}>Loading your experience...</p>
        </div>

        <div className={styles.loaderWords} aria-hidden="true">
          <div className={styles.loaderWordsTrack}>
            {loaderWords.map((word) => (
              <span key={word} className={styles.loaderWord}>
                {word}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.loaderSignal} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  )
}

export default FullPageLoader