import React from 'react';
import { Step, Styles } from 'react-joyride';

type Placement =
  | 'auto'
  | 'auto-start'
  | 'auto-end'
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'center';

export type DescriptionComponent  = string | React.ReactNode;

export interface StepContent {
  description: (string | React.ReactNode);
  actionItems?: DescriptionComponent[];
};

interface StepBase {
  title: string,
  target: string;
  description?: (string | React.ReactNode);
  placement?: Placement;
  styles?:Styles,
  disableOverlay?: boolean;
  spotlightClicks?: boolean;
  spotlightPadding?: number;
  disableBeacon?: boolean;
  disableOverlayClose?: boolean;
};

export interface StepData extends StepBase {
  actions?: DescriptionComponent[];
  //disableOverlay?: boolean;
  //spotlightClicks?: boolean;
  //disableBeacon?: boolean;
  //spotlightPadding?: number;
  isFixed?:boolean;
  disableScrolling?:boolean;
};

interface TourBase {
  title: string,
  description: string | React.ReactNode;
};

export interface TourData extends TourBase {
  id: string,
  steps: StepData[];
 
};

export interface StepEnhanced extends Step {
  description: (string | React.ReactNode);
  actionItems: DescriptionComponent[];
  nextActionIndex: number;
  isFixed?:boolean;
}

export interface Tour extends TourBase {
  steps: StepEnhanced[];
  activeStepIndex: number;
};


export interface TourLocale {
    last: string;
    next: string;
  };
  
  export const TOUR_LOCALE_DEFAULT: TourLocale = {
    last: 'Done',
    next: 'Next',
  };
  
  export const TOUR_LOCALE_SKIP : TourLocale = {
    last: 'Done',
    next: 'Skip',
  };
  export const TOUR_START_DIALOGUE: TourLocale ={
    last:'Done',
    next:'Start Tour'
  }
  export interface TourActions { 
    startTour?: () => void;
    stopTour?: () => void;
    pauseTour?: () => void;
    stepBack?: () => void;
    stepForward?: () => any;
    updateActionStatus?: (target: string) => void ;
 
  }
  export interface TourSlice {
    tours: Tour[];
    activeTourIndex: number;
    activeStepIndex?: number;
    tourDialogOn?:boolean;
    isTourRunning: boolean;
    tourLocale?: TourLocale;
  isManualUpdate : boolean;
  /*tourAction?: TourActions
    content?:
      {
      description: string,
      actionItems:DescriptionComponent[],
      nextActionIndex: number,
      },
      nextItem?: number,
  skipItem?: number
  */

}