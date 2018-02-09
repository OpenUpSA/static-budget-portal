import { h } from 'preact';
import buildGroupSpaceArray from './buildGroupSpaceArray.js';
import VerticalBreakpointsList from './VerticalBreakpointsList.jsx';
import HorisontalBreakpointsList from './HorisontalBreakpointsList.jsx';
import HorisontalLabelList from './HorisontalLabelList.jsx';
import Grid from './Grid.jsx';
import HoristonalLineGroupList from './HoristonalLineGroupList.jsx';
import VerticalLineGroupList from './VerticalLineGroupList.jsx';
import VerticalGuidesList from './VerticalGuidesList.jsx';
import VerticalTooltipsList from './VerticalTooltipsList.jsx';
import HorisontalGuidesList from './HorisontalGuidesList.jsx';


export default function GraphMarkup({ items, styling, legend }) {
  const { valueSpace, padding } = styling;
  const groupSpaceArray = buildGroupSpaceArray(items, styling);
  const totalGroupSpace = groupSpaceArray.reduce((result, val) => result + val, 0);
  const height = padding[0] + totalGroupSpace + padding[2];
  const width = padding[3] + valueSpace + padding[1];

  const columnChart = (
    <g>
      <VerticalBreakpointsList {...{ styling, totalGroupSpace }} />
      <VerticalGuidesList {...{ styling, totalGroupSpace }} />
      <HorisontalLabelList {...{ totalGroupSpace, groupSpaceArray, items, styling }} />
      <Grid {...{ styling, totalGroupSpace }} />
      <VerticalLineGroupList {...{ totalGroupSpace, groupSpaceArray, items, styling }} />
      <VerticalTooltipsList {...{ totalGroupSpace, groupSpaceArray, items, styling }} />
    </g>
  );

  const barChart = (
    <g>
      <HorisontalBreakpointsList {...{ styling, totalGroupSpace }} />
      <HorisontalGuidesList {...{ styling, totalGroupSpace }} />
      <Grid {...{ styling, totalGroupSpace }} />
      <VerticalLineGroupList {...{ totalGroupSpace, groupSpaceArray, items, styling }} />
      <VerticalTooltipsList {...{ totalGroupSpace, groupSpaceArray, items, styling }} />
    </g>
  );


  return (
    <svg
      version="1.1"
      className="Graph-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      {...{ width, height }}
    >

      {/* <rect
        x="0"
        y="0"
        {...{ width, height }}
        fill="blue"
        opacity="0.5"
      /> */}

      {barChart}

    </svg>
  );
}
