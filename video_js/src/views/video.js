import React from 'react';
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default class Video extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { options, onReady } = this.props;
    if (!this.playerInstance) {
      const videoElement = this.videoRef.current;
      if (!videoElement) return;

      const player = this.playerInstance = videojs(videoElement, options, () => {
        console.log("player is ready");
        onReady && onReady(player);
      });
    } 
    const player = this.playerInstance;
    player.src(options.sources[0].src);
    player.autoplay(true);
  }
  
  play = () => {
    this.playerInstance.play();
  }

  pause = () => {
    this.playerInstance.pause();
  }

  enterFullscreen = () => {
    this.playerInstance.requestFullscreen();
  }

  mute = (muted) => {
    this.playerInstance.muted(muted);
  }

  adjustCurrentTime = (forward) => {
    if (forward) {
      this.playerInstance.currentTime(this.playerInstance.currentTime() + 5);
    } else {
      this.playerInstance.currentTime(this.playerInstance.currentTime() - 5);
    }
  }

  setRate = (rate) => {
    this.playerInstance.playbackRate(rate);
  }

  render() {
    return (
      <div data-vjs-player>
        <video
          ref={this.videoRef}
          className="video-js vjs-big-play-centered"
        />
      </div>
    );
  }
}