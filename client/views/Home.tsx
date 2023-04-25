import { Typography } from "@mui/material";
import thumbnail from '../../public/thumb.png';

import styles from '../components/Home/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      {[...Array(12)].map((_, index) => (
        <div className={styles.video} key={index}>
          <img className={styles.thumbnail} src={thumbnail} alt="video thumbnail" />
          <div className={styles.info}>
            <Typography variant="h6" gutterBottom>
              SUPER COLOR VISION
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Uploader
            </Typography>
            <Typography variant="caption" gutterBottom>
              1M views • 1 day ago
            </Typography>
          </div>
        </div>
      ))}
    </div>
  );
}
