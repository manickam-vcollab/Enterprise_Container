import React from 'react';
import { Styles } from 'react-joyride';

import { StepComponent } from './StepComponent';
import { StepData, StepEnhanced, TourData, Tour} from './Types'

export const DEFAULT_GUIDE_Z_INDEX = 100000;
export const DEFAULT_GUIDE_OPACITY = 0.5;
export const ACTIVE_GUIDE_OPACITY = 1.0;

export const STEP_STYLES_ACTIONS_PENDING: Styles = {
  options: {
    zIndex: DEFAULT_GUIDE_Z_INDEX,
  },
  buttonNext: {
    opacity: DEFAULT_GUIDE_OPACITY,
    cursor: 'not-allowed',
    pointerEvents: 'none'
  },
  buttonBack: {
    opacity: DEFAULT_GUIDE_OPACITY,
    cursor: 'not-allowed',
    pointerEvents: 'none'
  }

};

export const STEP_STYLES_DEFAULT: Styles = {
  options: {
    zIndex: DEFAULT_GUIDE_Z_INDEX,
  },
  buttonNext: {
    cursor: 'pointer',
    pointerEvents: 'all',
    opacity: ACTIVE_GUIDE_OPACITY
  },
  buttonBack: {
    cursor: 'auto',
    pointerEvents: 'all',
    opacity: ACTIVE_GUIDE_OPACITY
  }
};

export const createStep = (data: StepData) => {
  return {
    title: data.title,
    target: data.target,
    nextActionIndex: 0,
    content: React.createElement(StepComponent, { 
      description : data.description,
      actionItems : (data.actions !== undefined ? data.actions.map((item,) => item) : [])   
    }),
    disableBeacon: true,
    disableOverlayClose: true,
    spotlightClicks: (data.actions !== undefined && data.actions.length > 0),
    placement: (data.placement !== undefined ? data.placement : 'auto'),
    styles:
      (data.actions === undefined || data.actions.length === 0)
        ? STEP_STYLES_DEFAULT
        : STEP_STYLES_ACTIONS_PENDING,
    description: data.description,
    actionItems: (data.actions !== undefined ? data.actions : []),   
  } as StepEnhanced;
};

export const createTour = (data: TourData) => {
  return {
    id:data.id,
    title: data.title,
    description: data.description,
    steps: data.steps.map((value,) => createStep(value)),
    activeStepIndex: 0,
  } as Tour;
};
