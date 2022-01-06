import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import screenfull from 'screenfull'
import ReactPlayer from 'react-player';
import Duration from '../../../../utils/Duration'
import './video.less'
import {FullscreenOutlined, PauseCircleOutlined, PlayCircleOutlined} from '@ant-design/icons';
import {Progress, Slider, Switch} from 'antd';

/**
 * player
 */
class Video extends Component {
    state = {
      url: this.props.url,
      playing: false,
      volume: 1,
      muted: false,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      loop: false
    }

    load = (url) => {
      this.setState({
        url,
        played: 0,
        loaded: 0
      })
    }
    handleToggleMuted = () => {
      this.setState({ muted: !this.state.muted })
    }
    // set playback rate
    handleSetPlaybackRate = (e) => {
      let rate = {
        1.0:1.5,
        1.5:2.0,
        2.0:1.0
      }
      this.setState({ playbackRate: parseFloat(rate[this.state.playbackRate]) })
    }
    handlePlay = () => {
      this.setState({ playing: true })
    }
    handleTogglePlay=() => {
      this.setState({playing:!this.state.playing})
    }
    handleProgress = (state) => {
      this.setState(state)
    }
    // submit status
    handleEnded = () => {
      if(this.props.role ==='2'){
        this.props.uploadRecord(this.props.data)
      }
    }
    handleDuration = (duration) => {
      this.setState({ duration })
    }
    handleClickFullscreen = () => {
      this.handlePlay()
      screenfull.request(findDOMNode(this.player))
    }
    handleReady=() => {
      console.log('ready')
    }
    handleError=(e) => {
      console.log('error', e)
    }
    ref = (player) => {
      this.player = player
    }
    render () {
      const { url, playing, muted, played, duration, playbackRate } = this.state
      return (
        <div className="player-wrapper">
          <div className="player-cover"  onClick={this.handleTogglePlay}>
            {!this.state.playing&&<PlayCircleOutlined/>}
          </div>
          <ReactPlayer
            ref={this.ref}
            className="react-player"
            width="100%"
            height="100%"
            url={url}
            playing={playing}
            playbackRate={playbackRate}
            muted={muted}
            onReady={() => this.handleReady}
            onEnded={this.handleEnded}
            onError={this.handleError}
            onProgress={this.handleProgress}
            onDuration={this.handleDuration}
          />
          <div className="player-button">
            <Progress percent={played*100} showInfo={false} strokeWidth={4} strokeColor={'#999'} success={{strokeColor:'gray'}}/>
            <div className="player-button-left">
              <div className="play-button" onClick={this.handleTogglePlay}>{playing ? <PauseCircleOutlined /> : <PlayCircleOutlined />}</div>
              <div><Duration className="played" seconds={duration * played} />/<Duration seconds={duration} /></div>
            </div>
            <div className="player-button-right">
              {/*<Slider defaultValue={30} />*/}
              {/*<label>mute </label>*/}
              {/*<Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked onChange={(v) => {console.log(v)}} />*/}
              {/*<input id="muted" type="checkbox" checked={muted} onChange={this.handleToggleMuted} />*/}
              <span className="playback-rate" onClick={this.handleSetPlaybackRate}>{this.state.playbackRate}x</span>
              <FullscreenOutlined onClick={this.handleClickFullscreen}/>
            </div>
          </div>
        </div>
      )
    }
}
export default Video
