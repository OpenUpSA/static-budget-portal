import React from 'react';
import { lighten } from 'polished';
import trimValues from '../../helpers/trimValues';


function makeLabel(x, y, width, height, text, isBold, clickHandler) {
  var fontSize = 14;
  var padding = 10;
  var estimatedWidth = text.length * (fontSize*0.6);
  if (estimatedWidth > width) {
    var estimatedFittingChars = Math.floor(width / fontSize);
    if (estimatedFittingChars < 4)
      return null;

    text = text.slice(0, estimatedFittingChars) + "...";
  }
  const style = {
    fontSize,
    fontFamily: "Roboto, sans-serif",
    fontWeight: isBold ? "600" : '400',
    cursor: "pointer",
  };
  return <text
           x={x + padding}
           y={y + fontSize + padding}
           style={style}
           onClick={clickHandler}
         >
           {text}
         </text>;
}


const IEBlock = props => {
  const {
    depth,
    x,
    y,
    id,
    url,
    width,
    height,
    color,
    selected,
    name,
    amount,
    changeSelectedHandler,
    children,
    root,
    zoom,
    icon,
  } = props;

  if (depth === 1) {
    const clickHandler = () => changeSelectedHandler({ id, name, color, value: amount, url, zoom });

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: color,
            cursor: "pointer",
          }}
          onClick={clickHandler}
        />
        {makeLabel(x, y, width, height, name, true, clickHandler)}
        {makeLabel(x, y+19, width, height, `R${trimValues(amount, true)}`, false, clickHandler)}
      </g>
    );
  }

  if (depth === 2) {
    const { name: rootName } = root;
    const fullName = `${rootName}: ${name}`;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: 'none',
            stroke: lighten(0.1, color),
            strokeWidth: 1,
          }}
          onClick={() =>
                   changeSelectedHandler({
                     id,
                     name: fullName,
                     color,
                     value: amount,
                     url,
                     zoom: rootName,
                   })
                  }
        />
      </g>
    );
  }

  // depth < 1
  return null;
};


export default IEBlock;
