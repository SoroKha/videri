import video from '/test.mp4'
import styles from '../components/Video/Video.module.css'

export default function Video() {
    return(
        <div className={styles.videoContainer}>
            <video className={styles.video} controls>
                <source src={video} type="video/mp4" />
            </video>
        </div>
    );
}