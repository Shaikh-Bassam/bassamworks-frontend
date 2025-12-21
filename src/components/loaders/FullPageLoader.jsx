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
        <div className={styles.loader}></div>
    </div>
  )
}

export default FullPageLoader