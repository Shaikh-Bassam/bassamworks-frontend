import React from 'react'
import styles from '../../styles/widget.module.css'
const FullPageLoader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.starterLoader}>
        <p>Loading your experience...</p>
        <div className={styles.loaderWords}>
          <span className={styles.loaderWord}>Smooth Animations</span>
          <span className={styles.loaderWord}>Interactive Forms</span>
          <span className={styles.loaderWord}>Dynamic Components</span>
          <span className={styles.loaderWord}>Responsive Design</span>
          <span className={styles.loaderWord}>Fast Performance</span>
        </div>
      </div>

      <svg
        width="72"
        height="72"
        viewBox="0 0 24 24"
        className={styles.bwLoader}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 6H14L12 9H2L4 6Z" />
        <path d="M4 11H22L20 14H2L4 11Z" />
        <path d="M14 16H22L20 19H12L14 16Z" />
      </svg>
    </div>
  )
}

export default FullPageLoader