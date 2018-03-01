import { h, render } from 'preact';
import ExpenditureMarkup from './partials/ExpenditureMarkup.jsx';
import decodeHtmlEntities from './../../../utilities/js/helpers/decodeHtmlEntities.js';


function Expenditure() {
  const componentsList = document.getElementsByClassName('Expenditure-data');

  if (componentsList.length > 0) {
    for (let i = 0; i < componentsList.length; i++) {
      const component = componentsList[i];
      const rawItems = JSON.parse(decodeHtmlEntities(component.getAttribute('data-info'))).data;
      const year = component.getAttribute('data-year');

      const items = rawItems.reduce(
        (results, val) => {
          return {
            ...results,
            [val.name]: [val.total_budget],
          };
        },
        {},
      );

      render(
        <ExpenditureMarkup {...{ items, year }} />,
        component,
      );
    }
  }
}


export default Expenditure();
