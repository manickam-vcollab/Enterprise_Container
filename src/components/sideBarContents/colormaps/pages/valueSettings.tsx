import MuiIconButton from '@material-ui/core/IconButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';
import MUICheckBox from '@material-ui/core/Checkbox';
import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';
import {goBack} from 'connected-react-router/immutable';
import { editPaletteNature } from '../../../../store/sideBar/colormapSlice';
import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import MuiListSubHeader from '@material-ui/core/ListSubheader';
import MuiMenuItem from '@material-ui/core/MenuItem';
import { selectResultMinMax } from '../../../../store/sideBar/colormapSlice';
import { useRef, useState } from 'react';
import { colormapElements, selectcolormapData, selectColorPaletteData, ValueType, setSelectedValue, setSelectedValueType, ColormapType, ValueNature ,setActiveColorPaletteValueNature} from '../../../../store/sideBar/colormapSlice';

import MuiGrid from '@material-ui/core/Grid'
import styles from './style'
import {useEffect} from 'react'
import MuiInput from '@material-ui/core/Input';
import MuiButton from '@material-ui/core/Button';

import MuiRadio from '@material-ui/core/Radio';
import MuiRadioGroup from '@material-ui/core/RadioGroup';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';
import MuiClearIcon from '@material-ui/icons/Clear';
import { TOUR_MENU_NAMES } from 'components/utils/tourMenus';
import HelpIcon from '@material-ui/icons/HelpOutline';
import HeaderIconButton from '../../../shared/headerIconButton/IconButton';
import { DialogueProps, dialogueState } from 'store/tutorialSlice';
import globalThemes from 'theme/globalThemes';


export default function Variable(){

  const dispatch = useAppDispatch();  
  const minmax = useAppSelector(selectResultMinMax);
  const classes = styles();
  const customClasses = globalThemes();
  const containerRef = useRef(null);
  const [checked, setChecked] = useState(false);
  const selectedColorMapId = useAppSelector(state => state.colormap.selectedColorMapId);
  const [activeColormapId, setActiveColormapId] = useState(selectedColorMapId); 
  const colormapsData = useAppSelector(selectcolormapData)
 
  const colorSetList = useAppSelector(selectColorPaletteData);

   const appliedColorPaletteId = colormapsData[activeColormapId].colorPalette

  const appliedColorPalette = colorSetList[appliedColorPaletteId];

  const colormapNameList = useAppSelector(colormapElements)

  const [valueSet, setValueSet] = useState<any>(appliedColorPalette.valueSet)

  const [valueType, setValueType] = useState<ValueType>(appliedColorPalette.valueType)

  const [valueDisplay, setValueDisplay] = useState(false)

  const readOnly = useAppSelector(state => state.colormap.colormapTree.data[activeColormapId].colormapType === ColormapType.SYSTEM ? true : false)
  const colorSet = appliedColorPalette.colorSet;
  useEffect(() => {
    setValueSet(appliedColorPalette.valueSet)
    setValueType(appliedColorPalette.valueType)
  },[appliedColorPalette]);

  // const classes = styles();
  const onClickBackIcon = () =>{
    dispatch(goBack());
  }

  const handleChange = (e:any) => {
    const newValue = Number(e.target.checked)
    dispatch(setActiveColorPaletteValueNature({colorPaletteId:appliedColorPaletteId,valueNature:newValue}))
    dispatch(editPaletteNature({colorPaletteId : appliedColorPaletteId , newValueNature: newValue}));
  };

  
  let colorSetValues:string[] = [];

  colorSet.forEach(data => {

      let R = data.color.r ;
      let G = data.color.g ;
      let B = data.color.b ;
      let A = data.color.a ;

      let colors = 'rgba('+R+','+G+','+B+','+A+')';
      let hexValue = convertRGBtoHEX(colors);

       colorSetValues.push(hexValue);

  })
  function convertRGBtoHEX(colors:any) {

    const colorValue = colors;
    const rgba = colorValue.replace(/^rgba?\(|\s+|\)$/g, '').split(',');

    const hex = `#${((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1)}`;
    return hex ;

}

  function getComputedValueSet(colorSetValues : string[], valueSet : string[]){
    let max= minmax[0];
    let min= minmax[1];
    if(min === null ||  max === null){
         return valueSet;
    }
    else {
         let values = [];
         let valueCount = valueSet.length;
         if(colorSetValues.length === valueSet.length){
             let division = (max - min) / (valueCount);
             for(let i =0; i < valueCount; i++ ){
                 let value1 = min + (i * division);
                 let value2 = min + ((i + 1) * division);
                 values.push(value1.toFixed(3) + ":" +    value2.toFixed(3) );
             }
         }
         else{   
             let division: number = (max - min) / (valueCount - 1);
             for(let i =0; i < valueCount; i++ ){
                 let value = min + (i * division);
                 values.push(value.toFixed(3));
             }
         }
         return values;
     }
 }

  let newAutoValueSet = getComputedValueSet(colorSetValues,valueSet);


  const onHandleSelect = (id : string) => {
    setActiveColormapId(id)
  }

  const onHandleEditValue = (index : number, e: any) => {

    let newValueSet = [...valueSet];

    if(appliedColorPalette.valueNature === ValueNature.MAXMIN)
      newValueSet[index] = Number(e.currentTarget.value);
    else
      newValueSet[index] = e.currentTarget.value; 

    setValueSet([...newValueSet]);

  }

  const onHandleDeleteValue = (index : number) => {
    let newValueSet = [...valueSet];
    newValueSet[index] = "";

    setValueSet([...newValueSet]);
  }

  const onHandleClearAll = () => {
    let newValueSet = [...valueSet];
    newValueSet.forEach((item,index) => newValueSet[index] = "")

    setValueSet([...newValueSet])

  }

  const handleRadioChange = (e : any) => {
    const newValueType = Number(e.currentTarget.value)
    setValueType(newValueType)
  }
  
  const onHandleSave = () => {
    dispatch(setSelectedValue({colorPaletteId: appliedColorPaletteId, updatedValueSet : valueSet}))
    dispatch(setSelectedValueType({colorPaletteId: appliedColorPaletteId, updatedValueType : valueType}))
  }

  const onHandleReset = () => {
    setValueSet(appliedColorPalette.valueSet)
    setValueType(appliedColorPalette.valueType)
  }

  const getHeaderLeftIcon= () => {
    return (
     <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
    );
  }

  const getAction = () => {
    const parentNodes = colormapNameList.filter(item => item.children?.length !== 0)

    return(
      <SelectAction
      labelId="display-modes-selection-label-id"
      id="display-modes-selection-id"
      value={activeColormapId}
      onChange={(e : any) => {if(e.target.value) onHandleSelect(e.target.value)}}
      MenuProps={{
        disablePortal: true,
        anchorOrigin: {
          vertical:"bottom",
          horizontal:"left",
       },
       getContentAnchorEl: null
      }}
      >
         <MuiListSubHeader key={parentNodes[0].id}>{parentNodes[0].name}</MuiListSubHeader>
        {
          colormapNameList.map((element : any) => {
            return(
              element.pid === parentNodes[0].id 
                ?
                  <MuiMenuItem className={customClasses.selected} key={element.id} value={element.id}>{element.name}</MuiMenuItem>
                :
                  null
            )
          }) 
        }
      </SelectAction>
    )
  }

  // const handleChangeChange = (e :any) => {
  //   const newValue = Number(e.currentTarget.value)

  //   dispatch(editColorPaletteNature({colorPaletteId : appliedColorPaletteId , newValueNature: newValue}))

  // }

  let dialogProps:DialogueProps={
    dialogueRun: true,
    tourName: TOUR_MENU_NAMES.VALUE_SETTINGS
  }
    
  const getHeaderRightIcon=()=> {
    const onHelpClick = (e:any) => {
      dispatch(dialogueState(dialogProps));
      }
  
  
    return (
  
           <HeaderIconButton icon={<HelpIcon />} label={"helpIcon"} disabled={false} onClick={onHelpClick}></HeaderIconButton>
  
    )
  
  
  } 
  

 

  const maxMin = () => {
    return(
      <MuiGrid container style={{marginTop:"30px", marginLeft:"20px"}}>
          <MuiGrid item xs={2} >
            <MuiGrid container direction="column">
              { appliedColorPalette.colorSet.map(item =>
                <MuiGrid key={ 'colorSet_' + item.id }>
                  <div style={{marginBottom:"5px",height:"50px", 
                                width:"30px",
                                backgroundColor:`rgb(${item.color.r},${item.color.g},${item.color.b})` ,
                        }}
                  >
                  </div>
                </MuiGrid>
              )}
            </MuiGrid>
          </MuiGrid>
          
          <MuiGrid item xs={6}>
            <MuiGrid container direction="column" style={{marginTop:"-15px"}}>
              { valueSet.map((item : any,index : number) => 
                <MuiGrid key={ 'valueSet_' + index} item style={{marginBottom:"25px"}} >
                  <div  className={classes.textBox} >
                    <MuiGrid container>
                      <MuiGrid item xs={8}>
                        <MuiInput disabled={index === 0 || index === valueSet.length -1 ? true : false} inputProps={{style: { textAlign: 'center' , margin:"-2px"},}} 
                          value={item}
                          onChange={(e) => onHandleEditValue(index,e)}
                        />
                      </MuiGrid>
                    <MuiGrid item xs={4}>
                      { item === "" || readOnly
                        ?
                          null
                        :
                          <MuiIconButton disabled={index === 0 || index === valueSet.length -1 ? true : false} style={{height:"2px"}} onClick={() => onHandleDeleteValue(index)}><MuiClearIcon/></MuiIconButton>
                      } 
                    </MuiGrid>
                  </MuiGrid>
                </div>
              </MuiGrid>
            )}
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>
    )
  }

  const single = () => {
    return(
      <MuiGrid container style={{marginTop:"30px", marginLeft:"20px"}}>
        <MuiGrid item xs={2} >
          <MuiGrid container direction="column">
            { appliedColorPalette.colorSet.map(item =>
              <MuiGrid key={ 'colorSet_' + item.id }>
                <div style={{ marginBottom:"5px",height:"50px", 
                              width:"30px",
                              backgroundColor:`rgb(${item.color.r},${item.color.g},${item.color.b})` ,
                      }}
                >
                </div>
              </MuiGrid>
            )}
          </MuiGrid>
        </MuiGrid>
    
        <MuiGrid item xs={6}>
          <MuiGrid container direction="column" style={{marginTop:"10px"}}>
            { valueSet.map((item : any,index : number) => 
              <MuiGrid key={ 'valueSet_' + index} item style={{marginBottom:"25px"}} >
                <div  className={classes.textBox} >
                  <MuiGrid container>
                    <MuiGrid item xs={8}>
                      <MuiInput disabled={index === 0 || index === valueSet.length -1 ? true : false}  inputProps={{style: { textAlign: 'center' , margin:"-2px"},}} 
                        value={item}
                        onChange={(e) => onHandleEditValue(index,e)}
                      />
                    </MuiGrid>
                    <MuiGrid item xs={4}>
                      { item === "" || readOnly
                        ?
                          null
                        :
                          <MuiIconButton disabled={index === 0 || index === valueSet.length -1 ? true : false}  style={{height:"2px"}} onClick={() => onHandleDeleteValue(index)}><MuiClearIcon/></MuiIconButton>
                      }
                    </MuiGrid>
                  </MuiGrid>
                </div>
              </MuiGrid>
            )}
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>
    )
  }


  const getBody = () => {
    
    return (
      <div style={{height:"100%"}}>
      <div className={classes.scrollBarValueSetting} >
       {
      //  checked === false?
         appliedColorPalette.valueNature === ValueNature.MAXMIN
          ?
          maxMin()
          :
            single()
        
        // :
        // appliedColorPalette.valueNature === ValueNature.SINGLE
        // ?
        // maxMin()
        // :
        //   single()
       
      }
    </div> 
    {/*
    <div style={{marginLeft:'40px'}}>
    
        
          <MUICheckBox
              checked={appliedColorPalette.valueNature === ValueNature.SINGLE }
              onClick={handleChange}
              
              />
          Show at middle
       
    </div>
    */}
    <div style={{marginTop:"10px", marginBottom:"20px"}}>
                  <MuiButton className={classes.clearButton+' '+customClasses.Muibtn} 
                    autoFocus 
                    onClick={onHandleClearAll} 
                    // color="primary"
                    disabled= {readOnly}
                  >
                    Clear All
                  </MuiButton>
      </div>
    {/*
      <div style={{marginTop:"10px", marginBottom:"20px", marginLeft:'20px'}}>
       
          <MuiRadioGroup
          aria-label="Algorithm"
          name="controlled-radio-buttons-group"
         
          value={valueType}
          onChange={handleRadioChange}
        >
          <MuiGrid container>
            <MuiGrid item xs={6}>
            <MuiFormControlLabel  disabled= {readOnly} value={ValueType.LINEAR} control={<MuiRadio color="default"/>} label="Linear" />
            </MuiGrid>
            <MuiGrid item xs={6}>
            <MuiFormControlLabel  disabled= {readOnly} value={ValueType.LOGARITHMIC} control={<MuiRadio color="default" />} label="Logarithmic" />
            </MuiGrid>
          </MuiGrid>
          
         
        </MuiRadioGroup>
      


      </div>
    */}

    <div style={{marginTop:"20px", marginBottom:"20px"}}>
      {
        readOnly 
        ?
          null
        :
              <div>
                  <MuiButton className={classes.saveButton+' '+customClasses.Muibtn} 
                    autoFocus 
                    onClick={onHandleSave} 
                    // color="primary"
                    disabled= {valueSet === appliedColorPalette.valueSet}
                  >
                    Save
                  </MuiButton>

                  <MuiButton className={classes.resetButton+' '+customClasses.BtnOutlined}
                    autoFocus 
                    onClick={onHandleReset} 
                    // color="primary"
                    disabled= {valueSet === appliedColorPalette.valueSet}
                  >
                    Reset
                  </MuiButton>
                </div>
      }
      </div>
    </div>
    )
  }


  const getFooter = () => {

    return(
        <div>
      </div>
    ) 
  }

  return (
          <SideBarContainer
            headerContent={ <Title text={"Value Settings" } group="Color Maps"/> }
            headerAction = {getAction()}
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}
