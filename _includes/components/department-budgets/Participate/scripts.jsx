import { h, Component, render } from 'preact';
import Participate from './index.jsx';
import DebounceFunction from './../../../utilities/js/helpers/DebounceFunction.js';


class ParticipateContainer extends Component {
  constructor(props) {
    super(props);

    this.months = {
      Jan: 'Jan',
      Feb: 'Feb',
      Mar: 'Mar',
      Apr: 'Apr',
      May: 'May',
      Jun: 'Jun',
      Jul: 'Jul',
      Aug: 'Aug',
      Sep: 'Sep',
      Oct: 'Oct',
      Nov: 'Nov',
      Dec: 'Dec',
    };

    this.state = {
      selected: this.months[Object.keys(this.months)[this.props.currentMonthIndex]],
      open: false,
      mobile: true,
    };

    this.setMonth = this.setMonth.bind(this);
    this.setMobileMonth = this.setMobileMonth.bind(this);

    const func = () => {
      if (this.state.mobile && window.innerWidth >= 600) {
        this.setState({ mobile: false });
      } else if (!this.state.mobile && window.innerWidth < 600) {
        this.setState({ mobile: true });
      }
    };

    func();
    const viewportDebounce = new DebounceFunction(100);
    const updateViewport = () => viewportDebounce.update(func);

    window.addEventListener(
      'resize',
      updateViewport,
    );
  }

  setMonth(selected) {
    this.setState({ selected });
  }

  setMobileMonth(selected) {
    if (this.state.open) {
      return this.setState({
        ...this.state,
        open: false,
        selected,
      });
    }

    return this.setState({ open: true });
  }

  render() {
    return (
      <Participate
        selected={this.state.selected}
        setMonth={this.setMonth}
        open={this.state.open}
        setMobileMonth={this.setMobileMonth}
        mobile={this.state.mobile}
        months={this.months}
      />
    );
  }
}


const nodes = document.getElementsByClassName('js-initParticipate');

for (let i = 0; i < nodes.length; i++) {
  const node = nodes[i];

  const currentMonthIndex = new Date().getMonth();

  render(
    <ParticipateContainer {...{ currentMonthIndex }} />,
    node,
  );
}
