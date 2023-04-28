import { useState, useRef } from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ReplayIcon from '@mui/icons-material/Replay';
import LoopIcon from '@mui/icons-material/Loop';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import video from "/test.mp4";
import styles from "../components/Video/Video.module.css";

export default function Video() {
  const [timeStatus, setTimeStatus] = useState<string>('Start');
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(50);
  const videoRef = useRef<HTMLVideoElement>(null);
  const volumeRef = useRef<HTMLInputElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  const handlePlayPause = () => {
    switch (timeStatus) {
        case 'Playing':
            videoRef.current?.pause();
            setTimeStatus('Paused');
            console.log('Paused');
            break;
        case 'Paused':
        case 'Start':
        case 'Finished':
            videoRef.current?.play(); 
            setTimeStatus('Playing'); 
            console.log('Playing')
            break
    }

  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      const currentTime = video.currentTime;
      setCurrentTime(currentTime);
      const progressBar = progressBarRef.current;
      progressBar?.setAttribute("value", `${(currentTime / duration) * 100}`);
      if (video.ended) setTimeStatus('Finished');
    }
  };

  const handleProgressBarChange = () => {
    const progressBar = progressBarRef.current;
    if (progressBar) {
      const currentTime = (progressBar.valueAsNumber / 100) * duration;
      setCurrentTime(currentTime);
      const video = videoRef.current;
      if (video) {
        video.currentTime = currentTime;
        if (video.ended) setTimeStatus('Finished');
        if (video.seeking && timeStatus === 'Finished') setTimeStatus('Paused')
      }
    }
  };

  const handleVolumeChange = () => {
    const volume = volumeRef.current;
    if (volume) {
        const currentVolume = (volume.valueAsNumber / 100);
        setVolume(currentVolume);
        const video = videoRef.current;
        if (video) {
            video.volume = currentVolume;
        }
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      const duration = video.duration;
      setDuration(duration);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className={styles.videoContainer}>
        <div className={styles.videoContent}>
            <video
            className={styles.video}
            ref={videoRef}
            src={video}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            />
            <div className={styles.customControls}>
                <button className={styles.playBtn} onClick={handlePlayPause}>
                {timeStatus === 'Paused' || timeStatus == 'Start' ? <PlayArrowIcon /> : null}
                {timeStatus === 'Playing' ? <PauseIcon /> : null}
                {timeStatus === 'Finished' ? <ReplayIcon /> : null}
                </button>
                <div className={styles.progressBarContainer}>
                    <input
                    className={styles.progressBar}
                    type="range"
                    min={0}
                    max={100}
                    value={(currentTime / duration) * 100}
                    onChange={handleProgressBarChange}
                    ref={progressBarRef}
                    />
                    <input
                    className={styles.progressBar}
                    type="range"
                    min={0}
                    max={100}
                    value={volume * 100}
                    onChange={handleVolumeChange}
                    ref={volumeRef}
                    />
                    <div className={styles.timeContainer}>
                        <span className={styles.time}>{formatTime(currentTime)} / {formatTime(duration)}</span>                    
                    </div>
                </div>
                

            </div>
        </div>
    </div>
  );
}
