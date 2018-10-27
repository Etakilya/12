import { Component } from 'react';
import { AppState } from 'react-native';

interface IState {
  timeLeft?: number;
  appState;
}

const DELAY_THRESHOLD = 2;
const MINUTE = 60;

class TestContainer extends Component<IState> {
  public state = {
    code: '',
    timeLeft: MINUTE,
    appState: AppState.currentState,
  };
  private timer;
  private timeout;
  private oldDate: Date;

  public componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    this.handleInterval();
  }

  public componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    this.clearTimer();
  }

  public handleAppStateChange = nextAppState => {
    if (nextAppState === 'active') {
      const diff = Math.floor(
        (new Date().getTime() - this.oldDate.getTime()) / 1000
      );
      this.restartTimer(this.state.timeLeft - diff - DELAY_THRESHOLD);
    } else if (nextAppState.match(/inactive|background/)) {
      this.clearTimer();
      this.oldDate = new Date();
    }
    this.setState({ appState: nextAppState });
  };

  private handleInterval = (): void => {
    this.timer = setInterval(() => {
      this.setState({ timeLeft: this.state.timeLeft - 1 });
    }, 1000);
    this.timeout = setTimeout(() => {
      clearInterval(this.timer);
    }, this.state.timeLeft * 1000 + 1000);
  };

  private restartTimer = async (time: number, withClear?: boolean) => {
    await this.setState({ timeLeft: time });
    if (withClear) {
      clearTimeout(this.timeout);
    }
    this.handleInterval();
  };

  private clearTimer = () => {
    clearInterval(this.timer);
    clearTimeout(this.timeout);
  };
}

export default TestContainer;
