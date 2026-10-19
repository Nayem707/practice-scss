import styles from './SkipLink.module.scss';

export const MAIN_CONTENT_ID = 'main-content';

/** Lets keyboard users jump past navigation straight to the page content. */
export function SkipLink() {
  return (
    <a href={`#${MAIN_CONTENT_ID}`} className={styles.skipLink}>
      Skip to main content
    </a>
  );
}
