import { createSlice, PayloadAction, } from '@reduxjs/toolkit';
import { createTourList } from 'components/layout/TourComponent/data';

import { TourLocale, TourSlice, TOUR_LOCALE_DEFAULT } from 'components/layout/TourComponent/tour/Types';
import { STEP_STYLES_ACTIONS_PENDING, STEP_STYLES_DEFAULT } from 'components/layout/TourComponent/tour/CreatorMethods';
import tutorialTour from "../components/layout/TourComponent/data/tutorialSteps";
import type { RootState } from './index';

import { Styles } from 'react-joyride';

const initialState: TourSlice ={
  tours: createTourList(),
  activeTourIndex: 0,
  activeStepIndex: 0,
  isTourRunning: false,
  tourLocale: TOUR_LOCALE_DEFAULT,
  tourDialogOn: true,
  isManualUpdate: false,
}

export const tourListSlice = createSlice({
  name: 'tour',

  initialState,

  reducers: {
    setStartTour: (state, action: PayloadAction<string>) => {
      if (!state.isTourRunning) {
      for (let i = 0; i < state.tours.length; i++) {
        if (state.tours[i].title === action.payload) {
            state.activeTourIndex = i;
            state.isTourRunning = true;
            state.tours[i].activeStepIndex = state.activeStepIndex ?? 0;
            if (action.payload === tutorialTour.title) {
              //dispacth appSlice => setResetMouseInteraction
      }
            break;
      }
        }
      }
      return state;
    },

    setStepIndex: (state, action: PayloadAction<number>) => {
      state.activeStepIndex = action.payload;
    },

    setRestartTour: (state) => {
      if (state.isTourRunning === false)
        state.isTourRunning = true;
        return state;
    },

    setPauseTour: (state) => {
      if (state.isTourRunning)
        state.isTourRunning = false;
      return state;
    },

    setStopTour: (state) => {
      if (state.isTourRunning) {
        return initialState;
        }
        return state;
        },

    setStepBack: (state) => {
      if (state.isTourRunning) {
        const activeStepIndex = state.tours[state.activeTourIndex].activeStepIndex;
        if (activeStepIndex - 1 >= 0)
          state.tours[state.activeTourIndex].activeStepIndex--;
      }
      return state;
        },

    setStepForward: (state) => {
      if (state.isTourRunning) {
        const activeStepIndex = state.tours[state.activeTourIndex].activeStepIndex;
        if (activeStepIndex + 1 < state.tours[state.activeTourIndex].steps.length) {
          state.tours[state.activeTourIndex].activeStepIndex++;
      }
        else {
          return initialState;
      }
      }
      return state;
    },

    setManualStepForward: (state) => {
      if (state.isTourRunning) {
        const activeStepIndex = state.tours[state.activeTourIndex].activeStepIndex;
        if (activeStepIndex + 1 < state.tours[state.activeTourIndex].steps.length) {
          state.isManualUpdate = true;
          state.tours[state.activeTourIndex].activeStepIndex++;
      }
        else {
          return initialState;
      }
      }
      return state;
        },

    setIsManualUpdate: (state, action: PayloadAction<boolean>) => {
      state.isManualUpdate = action.payload;
          },

    setUpdateAction: (state, action: PayloadAction<string>) => {
      if (state.isTourRunning) {
        const activeStepIndex: number = state.tours[state.activeTourIndex].activeStepIndex;
        const actionItems = state.tours[state.activeTourIndex].steps[activeStepIndex].actionItems;
        const nextActionIndex = ++state.tours[state.activeTourIndex].steps[activeStepIndex].nextActionIndex;
        const styles: Styles = nextActionIndex < actionItems.length ? STEP_STYLES_ACTIONS_PENDING : STEP_STYLES_DEFAULT;
        state.tours[state.activeTourIndex].steps[activeStepIndex].styles = styles;
      }
      return state;
    },

    setUpdateDecreAction: (state, action: PayloadAction<string>) => {
      if (state.isTourRunning) {
        const activeStepIndex: number = state.tours[state.activeTourIndex].activeStepIndex;
        const actionItems = state.tours[state.activeTourIndex].steps[activeStepIndex].actionItems;
        const nextActionIndex = --state.tours[state.activeTourIndex].steps[activeStepIndex].nextActionIndex;
        const styles: Styles = nextActionIndex < actionItems.length ? STEP_STYLES_ACTIONS_PENDING : STEP_STYLES_DEFAULT;
        state.tours[state.activeTourIndex].steps[activeStepIndex].styles = styles;
      }
      return state;
    },
    
    setLocale(state, action: PayloadAction<TourLocale>) {
      state.tourLocale = action.payload;
    },
    setIsTourRunning(state,action:PayloadAction<boolean>) {
      state.isTourRunning = action.payload;
    }
},
});

export const { setStartTour, setStepIndex, setPauseTour,setUpdateDecreAction,setStepBack, setStepForward, setStopTour, setUpdateAction ,setIsTourRunning} = tourListSlice.actions;

export const selectisTourRunning=(state:RootState)=>state.tour.isTourRunning;
export const selectActiveTourIndex=(state:RootState)=>state.tour.activeTourIndex;
export const selectTourLocale=(state:RootState)=>state.tour.tourLocale;
export const selectActionItemLength=(state:RootState): number=>{
  const activeStepIndex: number = state.tour.tours[state.tour.activeTourIndex].activeStepIndex;
        const actionItems = state.tour.tours[state.tour.activeTourIndex].steps[activeStepIndex].actionItems;
        return actionItems.length
};
export const selectTour=(state:RootState)=>state.tour.tours;
export const selectNextActionIndex = (state: RootState): number => {
  try {
    if (state.tour.isTourRunning) {
      const activeTour = state.tour.tours[state.tour.activeTourIndex];
      const activeStep = activeTour.steps[activeTour.activeStepIndex];
      return activeStep.nextActionIndex;
    }
  }
  catch (err) {
    console.error(err);
  }
  return 0;
};
export const selectIsManualUpdate = (state: RootState): boolean => state.tour.isManualUpdate;

export default tourListSlice.reducer;