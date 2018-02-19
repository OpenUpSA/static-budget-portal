import { h } from 'preact';
import Links from './Links.jsx';


export default function Box({ title, description, actions, year, down, closeAction }) {
  return (
    <div className="Tooltip-box">
      <div className={`Tooltip-content${down ? ' is-down' : ''}`}>
        <div className="Tooltip-shadowBox">
          <div className="Tooltip-infoBox">
            <div className="Tooltip-title">{title}</div>
            <div className="Tooltip-text">{description}</div>
            <Links {...{ actions, year, closeAction }} />
          </div>
          <div className={`Tooltip-triangle${down ? ' is-down' : ''}`} />
        </div>
      </div>
    </div>
  );
}
