import { h } from 'preact';
import trimValues from './trimValues.js';


export default function HorisontalTooltip({ styling, xTriggerPosition, xPosition, yPosition, amount, totalGroupSpace }) {

  const { barWidth, popUpOffset, buffer, valueSpace, lineGutter, padding, popupWidth, popupHeight, popupFontSize, units, popupCentre } = styling;


  return (
    <g className="Graph-tooltip">

      {/* <rect
        x={xPosition}
        y={yPosition - ((popupHeight) / 2)}
        width={popupWidth + popUpOffset}
        height={popupHeight}
        fill="blue"
        opacity="0.5"
      />

      <rect
        x={padding[3] + buffer}
        y={yPosition - ((barWidth + lineGutter) / 2)}
        width={(valueSpace + padding[0]) - buffer}
        height={barWidth + lineGutter}
        fill="none"
        stroke="blue"
        opacity="0.5"
      /> */}

      <rect
        x={padding[3] + buffer}
        y={yPosition - ((barWidth + lineGutter) / 2)}
        width={(valueSpace + padding[0]) - buffer}
        height={barWidth + lineGutter}
        opacity="0"
      />

      <polygon
        className="Graph-triangle"
        points={`
          ${xPosition + popUpOffset},
          ${yPosition}

          ${xPosition + (barWidth / 2) + popUpOffset},
          ${yPosition - (barWidth / 2)}

          ${xPosition + barWidth + popUpOffset},
          ${yPosition - (barWidth / 2)}

          ${xPosition + barWidth + popUpOffset},
          ${yPosition + (barWidth / 2)}
          
          ${xPosition + (barWidth / 2) + popUpOffset},
          ${yPosition + (barWidth / 2)}
        `}
      />

      <rect
        rx="10"
        ry="10"
        className="Graph-tooltipBase"
        x={xPosition + (barWidth / 2) + popUpOffset}
        y={yPosition - ((popupHeight) / 2)}
        width={popupWidth}
        height={popupHeight}
      />

      <text
        x={xPosition + (popupWidth / 2) + popUpOffset + (barWidth / 2)}
        y={yPosition + popupCentre}
        fontSize={popupFontSize}
        className="Graph-tooltipText"
      >
        {trimValues(amount)}
      </text>
    </g>
  );
}
