import React from 'react';
import Video from './views/video';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './App.css';

const playbackRates = [0.25, 0.5, 1, 2, 4, 8];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.state = {
      play: false,
      muted: false,
      rateIdx: 2,
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (this.videoRef === null) {
      return;
    }
    switch(e.key) {
      case ' ': {
        console.log(this.videoRef.current);
        if (this.state.play) {
          this.videoRef.current.pause();
          this.setState({
            play: false,
          });
        } else {
          this.videoRef.current.play();
          this.setState({
            play: true,
          });
        }
        break;
      }
      case 'ArrowRight': {
        this.videoRef.current.adjustCurrentTime(true);
        break;
      }
      case 'ArrowLeft': {
        this.videoRef.current.adjustCurrentTime(false);
        break;
      }
      case 'F':
      case 'f': {
        this.videoRef.current.enterFullscreen();
        break;
      }
      case 'M':
      case 'm': {
        this.videoRef.current.mute(!this.state.muted);
        this.setState({
          muted: !this.state.muted
        })
        break;
      }
      case 'Q':
      case 'q': {
        if (this.state.rateIdx === 5) {
          return;
        }
        console.log('上一倍率：', playbackRates[this.state.playbackRates])
        this.videoRef.current.setRate(playbackRates[this.state.rateIdx + 1]);
        this.setState({
          playbackRates: this.state.playbackRates + 1,
        })
        break;
      }
      case 'W':
      case 'w': {
        if (this.state.rateIdx === 0) {
          return;
        }
        this.videoRef.current.setRate(playbackRates[this.state.rateIdx - 1]);
        this.setState({
          playbackRates: this.state.playbackRates - 1,
        })
        break;
      }
    }
  }
  
  render() {
    const { play ,muted, rateIdx } = this.state;
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div>
          <div className="m10">
            <Button
              type="primary"
              onClick={() => {
                play ? this.videoRef.current.pause() : this.videoRef.current.play();
                this.setState({
                  play: !play
                })
              }}
            >
              {
                play ? '暂停' : '播放'
              }
            </Button>
          </div>
          <div className="m10">
            <Button
              type="primary"
              onClick={() => {
                muted ? this.videoRef.current.mute(false) : this.videoRef.current.mute(true)
                this.setState({
                  muted: !muted
                })
              }}
            >
              {
                muted ? '放音' : '静音'
              }
            </Button>
          </div>
          <div className="m10">
            <Button
              type="primary"
              onClick={() => this.videoRef.current.adjustCurrentTime(true)}
            >
              快进5s
            </Button>
          </div>
          <div className="m10">
            <Button
              type="primary"
              onClick={() => this.videoRef.current.adjustCurrentTime(false)}
            >
              回退5s
            </Button>
          </div>
          <div className="m10">
            <Button
              type="primary"
              onClick={() => this.videoRef.current.enterFullscreen()}
            >
              全屏
            </Button>
          </div>
          <div className="m10"
            style={{
              padding: 10,
              border: '1px solid #333333'
            }}
          >
            {`当前倍数：${playbackRates[rateIdx]}`}
          </div>
        </div>
        <Video
          options={{
            autoplay: false,
            controls: true,
            sources: [{
              src: 'https://blieyes.corp.bianlifeng.com/api/v1/record/playlist/20220601140000-140459.m3u8?camId=b_000ayt&client=nvr3403d06d&sip=10.253.7.72&token=d2VubGVpLndhbmd8Z29kZXllcy1wbGF5YmFja3wxNjU4MTQ0OTYyfGViY2ZjZGUxZmYwOTA0YWI0NGM1ZjAyMzYwZTkxYWNk',
              type: 'application/x-mpegURL'
            }]
          }}
          ref={this.videoRef}
        />
      </div>
    );
  }
}
 
export default App;