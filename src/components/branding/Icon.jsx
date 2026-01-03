import React from 'react';
import brandLogo from '../../assets/branding/logo.svg';
import styles from './icon.module.css';

const Icon = ({
  size = 'md',      // sm | md | lg
  variant = 'default', // default | dark | outlined | glowPrimary
}) => {
  return (
    <div
      className={[
        styles.icon,
        size !== 'md' && styles[size],
        variant !== 'default' && styles[variant],
      ].filter(Boolean).join(' ')}
    >
      <img src={brandLogo} alt="brand logo" />
    </div>
  );
};

export default Icon;
