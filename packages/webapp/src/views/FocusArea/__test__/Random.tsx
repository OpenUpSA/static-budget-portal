import React from 'react';
import { mockPresentationalProps, TpresentationProps } from '../schema';
import ContentFilterHeading from '../index';

const passedProps: TpresentationProps = mockPresentationalProps();

const Test = () => <ContentFilterHeading {...passedProps} />;

export default Test;
