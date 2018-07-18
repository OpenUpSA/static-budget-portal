import { h, Component } from 'preact';


const Dropdown = ({ selected, setSelected, languages }) => {
  const onChange = event => setSelected(event.target.value);
  const options = Object.keys(languages);

  return (
    <select className="VideoEmbed-dropdown" value={selected} {...{ onChange }}>
      {options.map(value => <option key={value} {...{ value }}>{value}</option>)}
    </select>
  );
};


const Markup = ({ title, languages, selected, setSelected }) => {
  const languagesCount = Object.keys(languages).length;

  return (
    <div className="VideoEmbed-modal">
      <div className="VideoEmbed-embed">
        <div className="VideoEmbed-embedInner">
          <div className="VideoEmbed-loader" />
        </div>
        <iframe title="VideoEmbed-iframe" className="VideoEmbed-iframe" width="560" height="315" src={`https://www.youtube.com/embed/${languages[selected]}?rel=0&amp;amp;showinfo=0`} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
      </div>
      {languagesCount > 1 && <Dropdown {...{ setSelected, selected, languages }} />}
    </div>
  );
}


export default class VideoEmbed extends Component {
  constructor(props) {
    super(props);
    const { initialSelected, languages } = this.props;

    this.state = {
      selected: initialSelected || languages[Object.keys(languages)[0]],
    };

    this.events = {
      setSelected: this.setSelected.bind(this),
    };
  }

  setSelected(selected) {
    this.setState({ selected });
  }

  render() {
    const { title, languages } = this.props;
    const { selected } = this.state;
    const { setSelected } = this.events;
    return <Markup {...{ title, languages, selected, setSelected }} />;
  }
}
