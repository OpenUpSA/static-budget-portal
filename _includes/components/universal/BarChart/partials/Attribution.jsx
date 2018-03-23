import { h } from 'preact';


export default function Attribution({ top, left }) {
  return (
    <g>
      <text
        font-size="14"
        x={left}
        y={top}
        font-weight="bold"
        text-anchor="end"
        fill="#ed9e31"
        font-family="sans-serif"
      >
        Downloaded from www.vulekamali.go.za
      </text>
    </g>
  );
}
