import React, { Component } from 'react'
import styled from 'styled-components'
import Sound from 'react-sound'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seconds: 5,
      status: 'stopped',
    }
  }

  decrement = () => {
    this.setState({ seconds: this.state.seconds - 1 })
    if (this.state.seconds === 0) {
      this.stop()
    }
  }

  reset = () => {
    this.setState({ seconds: 2 })
  }

  start = () => {
    if (!this.timer) {
      this.timer = setInterval(this.decrement, 1000)
      this.setState({ status: 'running' })
    }
  }

  stop = () => {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = undefined
      this.setState({ status: 'stopped' })
    }
  }

  componentDidMount() {
    this.start()
  }

  componentWillUnmount() {
    this.stop()
  }
  render() {
    return (
      <Container>
        <div>{this.state.seconds}</div>
        <div>
          {this.state.status === 'stopped' ? (
            <button onClick={this.start}>start</button>
          ) : (
            <button onClick={this.stop}>stop</button>
          )}
          <button onClick={this.reset}>reset</button>
          <Sound
            url="ride-01.wav"
            playStatus={
              this.state.seconds === 0
                ? Sound.status.PLAYING
                : Sound.status.STOPPED
            }
            autoLoad
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onFinishedPlaying={this.handleSongFinishedPlaying}
          />
        </div>
      </Container>
    )
  }
}

export default Timer
