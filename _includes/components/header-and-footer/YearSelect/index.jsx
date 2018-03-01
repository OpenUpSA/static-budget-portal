import { h, render } from 'preact';
import YearSelectContainer from './partials/YearSelectContainer.jsx';
import decodeHtmlEntities from './../../../utilities/js/helpers/decodeHtmlEntities.js';


function YearSelect() {
  const nodes = document.getElementsByClassName('YearSelect');
  const nodesArray = [...nodes];
  const { search, no_js: noJs } = window.budgetPortal.stringQueries;

  if (nodesArray.length > 0 && !noJs) {
    nodesArray.forEach((node, i) => {
      const jsonData = JSON.parse(decodeHtmlEntities(nodes[i].getAttribute('data-json'))).data;
      const jsonDynamicAttr = nodes[i].getAttribute('data-dynamic') || null;
      const jsonDynamic = jsonDynamicAttr && JSON.parse(decodeHtmlEntities(jsonDynamicAttr)).data;

      render(
        <YearSelectContainer {...{ jsonData, search, jsonDynamic }} />,
        nodes[i].parentNode,
        nodes[i],
      );
    });
  }
}


export default YearSelect();
