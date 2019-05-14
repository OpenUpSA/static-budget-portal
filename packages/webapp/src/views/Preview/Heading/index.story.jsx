/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@storybook/react';

import PreviewHeading from './index';

const share = () => <PreviewHeading share>Children Components</PreviewHeading>;

storiesOf('component.PreviewHeading', module).add('Static', share);
