import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';
import { ReactNode } from 'react';


export type SearchItem = {
    id:string,
    name: string,
    tag:Array<string>,
    display?:boolean | null
}

export type SearchState = {
    searchexpand : boolean,
    prevSearches: string[],
    prevSearchesLimit: number,
    run: boolean,
    stepIndex: number,
    tourSelected?:string,
    dialogueRun?:boolean,
    tourName?:string,
    description?:string | ReactNode
}

export const getSearchItems = (groupElements:SearchItem[]): SearchItem[] => {
    // let items:SearchItem[] = [];
    //let excludeTypes = [MainMenuItems.TUTORIALS];
    groupElements.sort((a,b) => (a.name < b.name)?-1:(a.name>b.name)?1:0);
    return groupElements;
}
const initialState: SearchState ={
    searchexpand : false,
    prevSearches: [],
    prevSearchesLimit: 3,
    run: true,
    stepIndex: 0,
    description: ""
}
export type DialogueProps = {
    dialogueRun:boolean,
    tourName:string,
    description?:string | ReactNode,
    stepIndex?: number
}


export const tutorialSlice = createSlice({
    name: 'tutorials',
    initialState,
    reducers: {
        addPrevSearchItem: (state , action: PayloadAction<string>) => {
            if (!(action.payload === "" || state.prevSearches.includes(action.payload))) {
                state.prevSearches.push(action.payload);
                if(state.prevSearches.length > state.prevSearchesLimit)
                state.prevSearches.shift();
            }
        },
        dialogueState:(state , action: PayloadAction<DialogueProps>)=>{
            state.dialogueRun=action.payload.dialogueRun
             state.tourName=action.payload.tourName
             state.description=action.payload.description
             state.stepIndex = action.payload.stepIndex as number;
        },
        setSearchExpand:(state ,action:PayloadAction<boolean>)=> {

            state.searchexpand = action.payload;
        }
    },
   

})
export const {addPrevSearchItem,dialogueState,setSearchExpand} = tutorialSlice.actions;
//selectors
export const selectSearchExpand =(state:RootState)=> state.tutorials.searchexpand;
export const selectList = (state:RootState) => state.tutorials.items; 
export const selectPrevSearches = (state:RootState) => state.tutorials.prevSearches;
export const selectTut=(state:RootState)=>state.tutorials.run;
export const getDialogProps=(state:RootState)=> {
    let dialogProps:DialogueProps={
        dialogueRun: state.tutorials.dialogueRun?state.tutorials.dialogueRun:false,
        tourName: state.tutorials.tourName?state.tutorials.tourName:'tourName',
        description:state.tutorials.description?state.tutorials.description:'Coming Soon....',
        stepIndex: state.tutorials.stepIndex ? state.tutorials.stepIndex: 0
      }
      return dialogProps;
     
}
export default tutorialSlice.reducer;
