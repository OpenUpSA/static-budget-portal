import { renderToString } from 'react-dom/server';
import canvg from 'canvg-browser';
import downloadjs from 'downloadjs';
import React, { Component } from 'react';
import ReactBarChart from './../../private/ReactBarChart';
import Markup from './partials/Markup.jsx';
import './styles.css';


export default class ProgrammesChart extends Component {
  constructor(props) {
    super(props);

    this.events = {
      ReactDownloadAction: this.ReactDownloadAction.bind(this),
      canvasAction: this.canvasAction.bind(this),
    };
  }


  ReactDownloadAction() {
    canvg(this.canvas, renderToString(
      <ReactBarChart
        scale={1.5}
        ReactDownload={{
          heading: this.props.department,
          subReactHeading: `${this.props.location} Department Budget for ${this.props.year}`,
          type: 'Programme budgets chart',
        }}
        items={this.props.items}
        guides
        width={900}
      />,
    ));

    downloadjs(this.canvas.toDataURL(), `${this.props.department}.png`, 'image/png');
  }


  canvasAction(node) {
    this.canvas = node;
  }


  render() {
    const { hasNull } = this;
    const { items, files, year, deptLocation } = this.props;
    const { ReactDownloadAction, canvasAction } = this.events;

    return (
      <Markup
        national={deptLocation === 'National'}
        {...{
          hasNull,
          items,
          files,
          year,
          ReactDownloadAction,
          canvasAction,
        }}
      />
    );
  }
}
