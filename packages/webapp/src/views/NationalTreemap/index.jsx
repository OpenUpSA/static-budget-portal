import React, { Fragment } from 'react';
import MediaQuery from 'react-media';

import calcIfForeignObjectIsSupported from './calcIfForeignObjectIsSupported';
import ChartSection from '../../components/ChartSection';
import Treemap from '../../components/Treemap';
import sortItems from './sortItems';

import colorsList from './colorsList.js';

const footer = (
  <Fragment>
    <div>
      Please note the above treemap is a representation of expenditure of national government
      departments.
    </div>
    <div>Budget data for the financial year 1 April 2019 - 31 March 2020</div>
    <div>Direct charges against the National Revenue Fund are excluded</div>
  </Fragment>
);

const Markup = ({ items, initialSelected }) => {
  const sortedItems = sortItems(items);
  const itemsWithColor = sortedItems.map((item, index) => ({
    ...item,
    color: colorsList[index],
  }));

  return (
    <ChartSection
      {...{ initialSelected, footer }}
      chart={onSelectedChange => <Treemap {...{ onSelectedChange }} items={itemsWithColor} />}
      verb="Explore"
      subject="this department"
      title="National Budget Summary"
      phases={{
        disabled: 'Original budget',
      }}
      years={{
        disabled: '2019-20',
      }}
      anchor="national-treemap"
    />
  );
};

const NationalTreemap = props => (
  <MediaQuery query="(min-width: 600px)">
    {matches => !!matches && calcIfForeignObjectIsSupported() && <Markup {...props} />}
  </MediaQuery>
);

export default NationalTreemap;
