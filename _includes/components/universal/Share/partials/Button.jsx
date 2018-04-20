import { h } from 'preact';
import Icon from './../../../universal/Icon/index.jsx';
import analyticsEvents from './../../../../utilities/js/helpers/analyticsEvent.js';


export default function Button({ selected, createModal }) {
  const url = encodeURIComponent(window.location.href);
  const message = encodeURIComponent('SA Budget Data from vulekamali');

  const copyText = () => {
    analyticsEvents('send', 'social', 'email', 'share', url);
    createModal();
  };
  const fbDirect = () => {
    analyticsEvents('send', 'social', 'facebook', 'share', url);
    const win = window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    win.focus();
  };
  const twDirect = () => {
    analyticsEvents('send', 'social', 'twitter', 'share', url);
    const win = window.open(`https://twitter.com/home?status=${message}%20${url}`, '_blank');
    win.focus();
  };

  const share = () => {
    if (selected === 'link') {
      return copyText();
    } else if (selected === 'facebook') {
      return fbDirect();
    } else if (selected === 'twitter') {
      return twDirect();
    }

    return null;
  };

  return (
    <button className="Button is-circle" onClick={share}>
      <div className="u-transformRotate270">
        <Icon type="download" size="small" />
      </div>
    </button>
  );
}