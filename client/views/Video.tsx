import { useState, useRef } from "react";
import styles from "../components/Video/Video.module.css";
import VideoPlayer from "../components/Video/VideoPlayer";

export default function Video() {

  return (
    <div className={styles.videoContainer}>
        <VideoPlayer />
    </div>
  );
}
