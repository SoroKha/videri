import { useState, useRef, useEffect } from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ReplayIcon from '@mui/icons-material/Replay';
import LoopIcon from '@mui/icons-material/Loop';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import videoSrc from "/test.mp4";
import styles from "./Video.module.css";

export default function VideoPlayer() {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const [progressBar, setProgressBar] = useState<HTMLInputElement | null>(null);
  const [timeStatus, setTimeStatus] = useState<string>('Paused');
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(50);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [loop, setLoop] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const volumeRef = useRef<HTMLInputElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (videoRef && progressBarRef) {
      setVideo(videoRef.current);
      setProgressBar(progressBarRef.current);
    }
  }, []);
 
  function handlePlayPause() {
    if (video) {
      switch (timeStatus) {
        case 'Playing':
          video.pause();
          setTimeStatus('Paused');
          console.log('Paused');
          break;
        case 'Paused':
          video.play(); 
          setTimeStatus('Playing'); 
          break
        case 'Finished':
          video.currentTime = 0;
          video.play(); 
          setTimeStatus('Playing'); 
          break
      }
    }

  }

  function handleTimeUpdate() {
    if (video && progressBar) {
      const currentTime = video?.currentTime;
      setCurrentTime(currentTime);
      progressBar.setAttribute("value", `${(currentTime / duration) * 100}`);
      if (video.ended) setTimeStatus('Finished');
    }
  }

  function handleProgressBarChange() {
    if (video && progressBar) {
      const currentTime = (progressBar.valueAsNumber / 100) * duration;
      setCurrentTime(currentTime);
      video.currentTime = currentTime;
      if (video.seeking && timeStatus === 'Finished' && currentTime < duration) setTimeStatus('Paused');
      else if (video.ended) setTimeStatus('Finished');
    }
  }

  function handleVolumeChange() {
    const volume = volumeRef.current;
    if (video && volume) {
      const currentVolume = (volume.valueAsNumber / 100);
      setVolume(currentVolume);
      video.volume = currentVolume;
    }
  }

  function handleFullscreen() {
    if (!fullscreen) {
      document.getElementById('videoPlayer')?.requestFullscreen();
      setFullscreen(true);
    } 
    else {
      document.exitFullscreen();
      setFullscreen(false);
    } 
  }

  function handleLoadedMetadata() {
    if (video) {
      const duration = video.duration;
      setDuration(duration);
    }
  }

  function formatTime(timeInSeconds: number) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  return (
    <div id="videoPlayer">
        <video
        onClick={handlePlayPause}
        className={styles.video}
        ref={videoRef}
        src={videoSrc}
        loop={loop}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        controls={false}
        />
        <div className={styles.customControls}>
            <button className={styles.playBtn} onClick={() => setLoop(loop => !loop)}>
              <LoopIcon sx={{color: loop ? 'red' : null}} />
            </button>
            <button className={styles.playBtn} onClick={handlePlayPause}>
              {timeStatus === 'Paused' ? <PlayArrowIcon /> : null}
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
                    <span className={styles.time}>
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>                    
                </div>
                <button className={styles.playBtn} onClick={handleFullscreen}>
                    {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                </button>
            </div>
        </div>
    </div>
  );
}
