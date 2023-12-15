import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { Source } from '../../components/shared/List/List';
import {undoStack} from '../../components/utils/undoStack';


export enum AverageType {

  AVERAGEANDDERIVE,
  DERIVEANDAVERAGE,
}

export type AvgControlList = {

  id: string,
  list: AvgControlListItem[],

}

export type  AvgControlListItem = {

  id: string,
  control: string,
  action: string,
  priority: string,

}
export type MenuItem = {
  id: any,
  text: string,
  selected: boolean,
  applied: boolean,
  edit: boolean,
  readonly: boolean,
  type: Source,
  averageType:AverageType
}
type AverageOptionSetting={
  idGenerator: number,
  userLabelId: number,
  menuItems: MenuItem[],

 
  isMenuItemSelected: boolean,
  defaultAverageList: AvgControlList,
  copyItem: boolean,
  
}

export enum MouseSettingsType {
  SYSTEM,
  USER
}

const initialState: AverageOptionSetting = {
  idGenerator: 6,
  userLabelId: 0,
  isMenuItemSelected: false,
  copyItem:false,
  menuItems: [{
    id: "vc1",
    selected: false,
    text: "Vcollab",
    applied: false,
    edit: false,
    readonly: false,
    type: Source.SYSTEM,
    averageType:AverageType.DERIVEANDAVERAGE,
     
  }],

  
  defaultAverageList: {
    id: '',
    list: []
  }
  
}

export const averageOptionSlice= createSlice({
  name: 'averageOptionsettings',
  initialState,
  reducers: {
    addItemToMenuItems: (state ,action:PayloadAction<{undoable:boolean}>) => {

      const undoable = action.payload.undoable;

        state.idGenerator += 1;
        state.userLabelId += 1;
       

      // add item into menulist
      state.menuItems = [...state.menuItems, {
        id: state.idGenerator.toString(),
        selected: false,
        text: `Custom ${state.userLabelId}`,
        applied: false,
        edit: false,
        readonly: false,
        type: Source.USER,
        averageType:AverageType.DERIVEANDAVERAGE,
      }]

 



    },
    setSelectedItem: (state, action: PayloadAction<{ id: string, isSelected: boolean }>) => {


      state.menuItems.forEach((item: MenuItem) => {

        if (item.id === action.payload.id) {

          item.selected = action.payload.isSelected;

        }
        else {

          item.selected = false
        }

      })


    },
    setMenuItemEditable: (state, action: PayloadAction<{ edit: boolean, activeMenuId: string }>) => {

      state.menuItems.map((item) => {

        if (item.id === action.payload.activeMenuId) {

          item.edit = action.payload.edit;
        }

      })

    },

    setMenuItemEditableText: (state, action: PayloadAction<{ text: string, activeMenuId: string }>) => {

      state.menuItems.map((item) => {

        if (item.id === action.payload.activeMenuId) {

          item.text = action.payload.text;

        }

      })

    },
    
    setcopyItem: (state, action: PayloadAction<boolean>) => {

      state.copyItem = action.payload
    },


    pasteItem: (state, action: PayloadAction<{activeUserID:string,id:string,undoable:boolean}>) => {

      const undoable = action.payload.undoable;

      state.idGenerator += 1;
      let text: string;
      state.menuItems.map((item) => {
        let copycount = 0;


        text = item.text + ` Copy  (${copycount})`
        state.menuItems.forEach((elemettext) => {



          if (elemettext.text.includes(text))
            copycount++;
          {
            if (copycount == 0) {
              text = item.text + ` Copy`

            }
            else {
              text = item.text + ` Copy  (${copycount}) `
            }
          }

        })

        while(true){
          let found=false;
         
        state.menuItems.forEach((el)=>{
          
       
          if(el.text==text){
            found=true;
            copycount++;
            text = item.text + ` Copy  (${copycount}) `
          }
        })
        if(!found){
          break;
        }

        }






        if (item.id === action.payload.id) {

          state.menuItems = [...state.menuItems, {
            id: state.idGenerator.toString(),
            selected: false,
            text: text,
            applied: false,
            edit: false,
            readonly: false,
            type: Source.USER,
            averageType:AverageType.DERIVEANDAVERAGE,
          }]


        }

      });



    },

    deleteItem: (state, action: PayloadAction<{id:string,undoable:boolean}>) => {

      const undoable = action.payload.undoable;
      var deletedItemID:string = action.payload.id;
      var deletedItemLabel:string = '';
      var deletedItemIndex:number = state.menuItems.findIndex(item=>item.id === action.payload.id);

      state.menuItems.forEach((item)=>{

        if(item.id === action.payload.id) {

          deletedItemLabel = item.text ;
         

        }

      })

      state.menuItems.splice(state.menuItems.findIndex(item => item.id === action.payload.id), 1);
      state.copyItem = false;

      if(undoable) {

        undoStack.add({

          undo:{reducer:undoDeleteItem,payload:{itemindex:deletedItemIndex,itemid:deletedItemID,itemLabel:deletedItemLabel}},
          redo:{reducer:deleteItem,payload:{id:action.payload.id}}
        })
      }

    },
    
    undoDeleteItem :(state , action:PayloadAction<{itemindex:number ,itemid:string,itemLabel:string}>) => {

      const { itemid ,itemindex,itemLabel} = action.payload;

      const oldData = {
        id:itemid ,
        selected: false,
        text:itemLabel ,
        applied: false,
        edit: false,
        readonly: false,
        type: Source.USER,
        averageType:AverageType.DERIVEANDAVERAGE,
      }

      state.menuItems = [...state.menuItems];

      state.menuItems.splice(itemindex , 0 , oldData);

   
    },


    setAverageType: (state, action: PayloadAction<{activemenuID:any ,avgValue:any}>)=>{
state.menuItems.forEach((key)=>{
  if(key.id===action.payload.activemenuID)
  {
    key.averageType=action.payload.avgValue
  }
})
          } ,
  
    
  }
})

export const {
addItemToMenuItems,
setSelectedItem,
setMenuItemEditable,
setMenuItemEditableText,
setcopyItem,
pasteItem,
deleteItem,
undoDeleteItem,
setAverageType

}=averageOptionSlice.actions

export const selectmenuItems = (state: RootState) => state.averageOptionsettings.menuItems;


export const selectActiveMenuId = (state: RootState) => {


  const selectedItems = state.averageOptionsettings.menuItems.filter((item) => {

    return item.selected === true

  })

  if (selectedItems.length === 1) {

    return selectedItems[0].id

  }
  else {

    return -1
  }


}

export default averageOptionSlice.reducer; 