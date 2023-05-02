import { useState, useRef, useEffect } from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ReplayIcon from '@mui/icons-material/Replay';
import LoopIcon from '@mui/icons-material/Loop';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import SettingsIcon from '@mui/icons-material/Settings';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import videoSrc from "/test.mp4";
import styles from "./Video.module.css";
import { Button } from "@mui/material";

export default function VideoPlayer() {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const [progressBar, setProgressBar] = useState<HTMLInputElement | null>(null);
  const [timeStatus, setTimeStatus] = useState<string>('Paused');
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [loop, setLoop] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0);
  const [prevVolume, setPrevVolume] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const volumeRef = useRef<HTMLInputElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);


  

  useEffect(() => {
    if (videoRef && progressBarRef && volumeRef) {
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
          break;
        case 'Paused':
          video.play(); 
          setTimeStatus('Playing'); 
          break;
        case 'Finished':
          video.currentTime = 0;
          video.play(); 
          setTimeStatus('Playing'); 
          break;
      }
    }
  }

  function handleTimeUpdate() {
    if (video && progressBar) {
      const currentTime = video?.currentTime;
      setCurrentTime(currentTime);
      progressBar.setAttribute("value", `${(currentTime / duration) * 100}`);
      if (currentTime >= duration) setTimeStatus('Finished');
    }
  }

  function handleProgressBarChange() {
    if (video && progressBar) {
      const currentTime = (progressBar.valueAsNumber / 100) * duration;
      setCurrentTime(currentTime);
      video.currentTime = currentTime;
      if (video.seeking
        && timeStatus === 'Finished'
        && currentTime < duration)
        setTimeStatus('Paused');
    }
  }

  function handleVolumeChange() {
    const volume = volumeRef.current;
    
    if (video && volume) {
      const currentVolume = (volume.valueAsNumber / 100);
      video.volume = currentVolume;
      setVolume(currentVolume);
    }
  }

  function handleVolumeMute() {
    if (video) {
      if (volume === 0) {
        video.volume = prevVolume;
        setVolume(video.volume);
      }
      else {
        setPrevVolume(video.volume);
        video.volume = 0;
        setVolume(video.volume);
      }

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
      video.volume = 0;
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
          <Button className={styles.loopBtn} onClick={() => setLoop(loop => !loop)}>
            <LoopIcon sx={{color: loop ? 'green' : null}} />
          </Button>
          <Button className={styles.playBtn} onClick={handlePlayPause}>
            {timeStatus === 'Paused' && <PlayArrowIcon />}
            {timeStatus === 'Playing' && <PauseIcon />}
            {timeStatus === 'Finished' && <ReplayIcon />}
          </Button>
          <input
          className={styles.progressBar}
          type="range"
          min={0}
          max={100}
          step="any"
          value={(currentTime / duration) * 100}
          onChange={handleProgressBarChange}
          ref={progressBarRef}
          />
          <Button className={styles.volumeBtn} onClick={handleVolumeMute}>
            {volume === 0 && <VolumeOffIcon />}
            {volume < 0.5 && volume !== 0 && <VolumeDownIcon />}
            {volume >= 0.5 && <VolumeUpIcon />}
          </Button>
          <input
          className={styles.volumeBar}
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
          <Button className={styles.fullscreenBtn} onClick={handleFullscreen} sx={{marginLeft: 'auto', borderRadius: 0}}>
            {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </Button>
        </div>
    </div>
  );
}
