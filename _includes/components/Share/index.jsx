import { h, Component } from 'preact';
import { ga } from 'react-ga';
import PropTypes from 'prop-types';

import Icon from '../universal/Icon/index.jsx';
import { createModal } from '../header-and-footer/Modals/redux.js';


const createButtonEvent = ({ selected, anchor }) => {
  const url = anchor ? `${window.location.href}#${anchor}` : window.location.href;
  const message = 'SA Budget Data from vulekamali';

  const wrapInGa = (type, callback) => {
    ga('send', 'social', 'email', type, url);
    callback();
  };

  const createNewTab = (newUrl) => {
    const { focus } = window.open(newUrl, '_blank');
    return focus();
  };

  const facebookUrl = encodeURI(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
  const twitterUrl = encodeURI(`https://twitter.com/home?status=${message}%20${url}`);

  const shareMarkup = (
    <a className="u-wordBreak u-wordBreak--breakAll" href={encodeURI(url)}>
      {url}
    </a>
  );

  const events = {
    link: () => wrapInGa('share', createModal('Share this link', shareMarkup)),
    facebook: () => wrapInGa('facebook', createNewTab(facebookUrl)),
    twitter: () => wrapInGa('twitter', createNewTab(twitterUrl)),
  };

  return events[selected];
};


const Markup = ({ selected, anchor, updateShare, color }) => {
  const buttonStyling = [
    'Button',
    'is-circle',
    color === 'purple' && 'is-purple',
  ].join(' ');

  return (
    <div className="Share-wrap">
      <div className="Share-action">
        <div className="Share-select">
          <select
            className="Share-dropdown"
            onChange={event => updateShare(event.target.value)}
            value={selected}
          >
            <option value="link">as Link</option>
            <option value="facebook">on Facebook</option>
            <option value="twitter">on Twitter</option>
          </select>
        </div>
        <div className="Share-button">
          <button className={buttonStyling} onClick={createButtonEvent({ selected, anchor })}>
            <div className="u-transformRotate270">
              <Icon type="download" size="small" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};


Markup.propTypes = {
  selected: PropTypes.string.isRequired,
  anchor: PropTypes.string,
  updateShare: PropTypes.func.isRequired,
  color: PropTypes.string,
};


Markup.defaultProps = {
  anchor: '',
  color: null,
};


class Share extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 'link',
    };

    this.events = {
      updateShare: this.updateShare.bind(this),
    };
  }

  updateShare(selected) {
    return this.setState({ selected });
  }

  render() {
    const { anchor, color } = this.props;
    const { selected } = this.state;
    const { updateShare } = this.events;
    return <Markup {...{ selected, anchor, updateShare, color }} />;
  }
}


export default Share;
