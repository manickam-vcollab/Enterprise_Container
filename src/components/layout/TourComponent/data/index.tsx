import { TourData } from '../tour/Types';
import { createTour } from '../tour/CreatorMethods';
import tutorialSteps from './tutorialSteps';
import {DATA as assemblyTreeTourStepsData } from './assemblyTreeTourSteps';
import {DATA as displayModeTourStepsData } from './displayModeTourSteps';
import {DATA as clipPlanesTourStepsData } from './clipPlanesTourSteps';
import {DATA as labelsTourStepsData } from './labelsTourSteps';
import activitybarTourSteps from './activitybarTourSteps';
import {DATA as guidesTourStepsData}from './guidesTourSteps';
import { DATA as menuTourStepsData } from './menuTourSteps';
import { DATA as historyTourStepsData }from './historyTourSteps';
 
const TOUR_LIST: TourData[] = [
    tutorialSteps,
    assemblyTreeTourStepsData,
    displayModeTourStepsData,
    clipPlanesTourStepsData,
    labelsTourStepsData,
    activitybarTourSteps,
    guidesTourStepsData,
    menuTourStepsData,
    historyTourStepsData,
];
export const createTourList = 
    () => TOUR_LIST.map((data,val) => createTour(data))

export const createTourListFor = (tourFor: string)=> 
    TOUR_LIST.find(data => {
        let tourId = tourFor.toLowerCase().replaceAll(" ", "_");
        if((data.id === tourId) || tourId.includes(data.id)) {
            return createTour(data);
        }
    })

