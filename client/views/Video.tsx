import { useState, useRef } from "react";
import styles from "../components/Video/Video.module.css";
import VideoPlayer from "../components/Video/VideoPlayer";
import { Button, Typography } from "@mui/material";

export default function Video() {

  return (
    <div className={styles.videoContainer}>
        <VideoPlayer />
        <Typography variant="h5">VIDEO TITLE</Typography>
        <div style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant="body1">UPLOADER</Typography>
          <div style={{textAlign: 'center'}}>
            <div style={{flexDirection: 'row', display: 'flex', justifyContent: 'center'}}>
              <Typography color='green' variant="body1">10,500</Typography>
              <Typography color='white' variant="body1">&nbsp;/&nbsp;</Typography>
              <Typography color='red' variant="body1">1000</Typography>           
            </div>
            <Typography color='green' variant="body1">94.5% like ratio</Typography>          
          </div>
        </div>
        <div style={{flexDirection: 'column', display: 'flex', backgroundColor: '#272727', padding: '10px', borderRadius: '10px'}}>
          <Typography color='white' variant="h6">1,554,500 views - Uploaded on 21st March 2016</Typography>
          <Typography color='white' variant="body1">Video Description</Typography>
          <Typography color='white' variant="body1">Category:</Typography>
          <Button>View Tags</Button>
        </div>
    </div>
  );
}
