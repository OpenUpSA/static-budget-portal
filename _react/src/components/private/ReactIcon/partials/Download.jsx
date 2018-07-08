import React from 'react';
import createSizeModifier from './createSizeModifier.js';


export default function ReactDownload({ size }) {
  return (
    <svg className={`ReactIcon${createSizeModifier(size)}`} width="0" height="0" xmlns="http://www.w3.org/2000/svg" viewBox="157 347 100 100">
      <path d="M250.5 402.4a2 2 0 0 0-1.9-1.3h-22.8v-52c0-1.2-1-2.1-2.1-2.1h-33.3a2 2 0 0 0-2.1 2v52.1h-23a2 2 0 0 0-1.4 3.6l41.6 41.7c.4.4.9.6 1.4.6.6 0 1.1-.2 1.5-.6l41.7-41.7a2 2 0 0 0 .4-2.3z" />
    </svg>
  );
}
