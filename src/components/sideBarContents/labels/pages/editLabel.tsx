import MuiIconButton from '@material-ui/core/IconButton';
import {goBack} from 'connected-react-router/immutable';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';
import Toggle from 'react-toggle';
import "react-toggle/style.css";

import MuiListItemIcon from '@material-ui/core/ListItemIcon';
import MuiListItemText from '@material-ui/core/ListItemText';
import styles from './style';
import MuiGrid from '@material-ui/core/Grid';
import ColorPicker from '../../../shared/colorPicker';
import SelectAction from "../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction";
import MenuItem from "@material-ui/core/MenuItem";
import MuiCheckbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { setLabelBackgroundEnable, setLabelBorderEnable } from '../../../../store/sideBar/labelSlice/AllLabelSlice';
import { useAppSelector, useAppDispatch} from '../../../../store/storeHooks';

import {editLabel, selectLabelData, selectedLeafNodes, selectImage,selectCheckedLeafNodes,selectImageStyle, updateBackgroundImage, editLabelBackground,  setcolorsApplyTo,selectActiveId, selectEditableNodeId,ColorSelection,selectAppliedColorType, editLabelFontColor, editLabelBorderColor, editImageStyle} from '../../../../store/sideBar/labelSlice/AllLabelSlice'
import { makeStyles } from "@material-ui/styles";
import MuiButton from '@material-ui/core/Button'; 
import {useRef, useState,useEffect} from 'react';
import { ILabel, ImageStyle, LabelType } from 'store/sideBar/labelSlice/shared/types';
import Editor from '../components/shared/Editor/SlateEditorSidebar'
import { Typography } from '@material-ui/core';
import { batch } from 'react-redux';
import { ITreeNode } from 'components/shared/RsTreeTable';
import ChartEditor from '../components/shared/Editor/SlateEditorChart'
import Dropzone from 'react-dropzone';
import Probe from 'components/probe';
import Label3D from '../components/Label3D';
import { toastMsg } from 'store/toastSlice';
import toastMessage from '../../messages/toastMessage.json'



const selectionStyle = makeStyles((theme: any) => ({
  bodyContent: {
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.body2.fontWeight,
    lineHeight: theme.typography.body2.lineHeight,
    color: theme.palette.text.secondary,
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.text.primary,
      opacity: 1,
    },
    
    '&.Mui-selected':{
      backgroundColor: `${theme.palette.action.selected} !important`,
      color:`${theme.palette.accent.primaryText}`,
      // backgroundColor:"transparent !important",
      '&:hover':{
        color:theme.palette.accent.primaryText,
      },
    },
    minWidth: 120,
    
  },
 imageStyle:{

    color: theme.palette.text.secondary,
    fontWeight:theme.typography.body2.fontWeight ,
    fontSize: theme.typography.body2.fontSize,
    lineHeight: theme.typography.body2.lineHeight,
    paddingLeft:50

  },
}));
export default function EditLabels2D(){
  const selectionclasses = selectionStyle();
  const childRef = useRef();
  const treeDataRedux = useAppSelector(selectLabelData);
  
  const colorsType = useAppSelector(selectAppliedColorType);
  const imgStyle=useAppSelector(selectImageStyle)
  
  
  // const activeLabelId : string = useAppSelector(selectActiveId)
  // const checkedNodes = useAppSelector(selectCheckedLeafNodes);
  const editableNodeId : string = useAppSelector(selectEditableNodeId);

  const selectedLabel = [treeDataRedux[editableNodeId]];
  const selectAllChildNodes = selectedLabel[0].children.map((i:any) => treeDataRedux[i]);
  // const selectedLabels = selectedLabel[0].pid === LabelType.LABEL2D ?selectedLabel : selectAllChildNodes
  const selectedLabels = selectedLabel 
  const remirrorRef = useRef<any>(null);
const colors = treeDataRedux[editableNodeId].bgColor;
  const [color, setColor] = useState(colors);
  const borderDisplay = treeDataRedux[editableNodeId].isBorderEnabled;
const [borderEnabled, setBorderEnabled ] = useState(true)
const [backgroundEnabled, setBackgroundEnabled ] = useState(true)
  const fileRedux = useAppSelector(selectImage);

  const classes = styles();
  const dispatch = useAppDispatch();  
  const onClickBackIcon = () =>{
    dispatch(goBack());
  }

  const onHandleReset = () => {
    //setLabelText(label2D?label2D.label : "");
  }

  const handleApplyClick = () => {
    childRef.current?.onHandleSave();
    dispatch(toastMsg({msg:toastMessage.editLabel001}))
  };

  const getHeaderLeftIcon= () => {
    return (
     <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
    );
  }

  const getHeaderRightIcon = () => {
    return (
      <div>
      </div>
    )
  }
  
  const handleColorChange = (e:any) => {
        batch(() => {
          selectedLabels.forEach(l => {
            dispatch(editLabelBackground({id:l.id, color: e.target.value}));
          });
        });
       
  }

  const getSelectedLabelColor = () => {
    return (selectedLabels[0] as ILabel).bgColor 
  }


useEffect(()=>{
 
if(colorsType===3)
{
  Object.values(treeDataRedux)?.forEach((label:any) => {
    if(label.id === editableNodeId)
    {

     dispatch(updateBackgroundImage({file:fileRedux,id:label.id}));

     if(label.children.length > 0 && label.pid !== "PROBE") {

      if (label.pid === "LINECHART3D" ) {

            
        Object.values(label.children).forEach((key:any)=>{
          treeDataRedux[key].children.forEach((item)=>{
            dispatch(updateBackgroundImage({file:fileRedux,id:item}));
           
          })
          })
        

      } else {

      label.children.forEach((childLabelID:string)=>{
        
       
        dispatch(updateBackgroundImage({file:fileRedux,id:childLabelID}));

      })
    }

}

else if(label.children.length > 0 && label.pid == "PROBE")
    {
Object.values(label.children).forEach((key:any)=>{
treeDataRedux[key].children.forEach((item)=>{
  dispatch(updateBackgroundImage({file:fileRedux,id:item}));
 
})
})
    }
    }
  })
 
}

},[colorsType])


const onDrop = (acceptedFiles : any , rejected : any) => {


    
    if (Object.keys(rejected).length !== 0) {
        return;
    }
    
    else{
      batch(() => {
      
        Object.values(treeDataRedux)?.forEach((label:any) => {
          if(label.id === editableNodeId)
          {
      
           dispatch(updateBackgroundImage({file:URL.createObjectURL(acceptedFiles[0]),id:label.id}));

           if(label.children.length > 0 && label.pid !== "PROBE") {

            if (label.pid === "LINECHART3D" ) {

            
              Object.values(label.children).forEach((key:any)=>{
                treeDataRedux[key].children.forEach((item)=>{
                  dispatch(updateBackgroundImage({file:URL.createObjectURL(acceptedFiles[0]),id:item}));
                 
                })
                })
              
  
            } else {
 
                label.children.forEach((childLabelID:string)=>{
                  
                
                  dispatch(updateBackgroundImage({file:URL.createObjectURL(acceptedFiles[0]),id:childLabelID}));
    
            })

          }
  
     }

     else if(label.children.length > 0 && label.pid === "PROBE")
    {
Object.values(label.children).forEach((key:any)=>{
treeDataRedux[key].children.forEach((item)=>{
  dispatch(updateBackgroundImage({file:URL.createObjectURL(acceptedFiles[0]),id:item}));
 
})
})
    }
     
          }
        })
       
      });
       
    }
}
  
  function rgbToHex(r, g, b) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
  }

  const handleColors=(id:string,color:string)=>{
    if(colorsType === ColorSelection.BACKGROUND )
      {
    dispatch(editLabelBackground({id:id,color:color}))
      }
      if(colorsType === ColorSelection.BORDER)

      {
    dispatch(editLabelBorderColor({id:id,color:color}))
      }
}
const handleChangeComplete = (color) => {
  const hexa = color;
  setColor(hexa);

  // Check if the background is enabled before applying the color change
  if (backgroundEnabled || borderEnabled) {
    Object.values(treeDataRedux)?.forEach((label:any) => {
      if (label.id === editableNodeId) {
        handleColors(label.id, hexa);

        // Handle children if any
        if (label.children.length > 0 && label.pid !== "PROBE") {
          if (label.pid === "LINECHART3D") {
            Object.values(label.children).forEach((key:any) => {
              treeDataRedux[key].children.forEach((item) => {
                handleColors(item, hexa);
              });
            });
          } else {
            label.children.forEach((childLabelID:string) => {
              handleColors(childLabelID, hexa);
            });
          }
        } else if (label.children.length > 0 && label.pid === "PROBE") {
          Object.values(label.children).forEach((key:any) => {
            treeDataRedux[key].children.forEach((item) => {
              handleColors(item, hexa);
            });
          });
        }
      }
    });
  }
};

   const handleChange = (event:any) => {
    //setColorType(event.target.value);
   dispatch(setcolorsApplyTo(event.target.value));
    };

    const handleImageStyleChange=(event:any)=>{
      const imageStyle=event.target.value
      Object.values(treeDataRedux)?.forEach((label:any) => {
        if(label.id === editableNodeId)
        {
         
     
          dispatch(editImageStyle({id:label.id,value:imageStyle}))
  
          if(label.children.length > 0 && label.pid !== "PROBE") {

            if (label.pid === "LINECHART3D" ) {

            
              Object.values(label.children).forEach((key:any)=>{
                treeDataRedux[key].children.forEach((item)=>{
                  dispatch(editImageStyle({id:item,value:imageStyle}))
                })
                })
              
  
            } else {
              label.children.forEach((childLabelID:string)=>{
                      
                dispatch(editImageStyle({id:childLabelID,value:imageStyle}))
              })

            }  
   
      }
      else if(label.children.length > 0 && label.pid == "PROBE" )
      {
  Object.values(label.children).forEach((key:any)=>{
  treeDataRedux[key].children.forEach((item)=>{
    dispatch(editImageStyle({id:item,value:imageStyle}))
  })
  })
      }
        }
        })
    }

    
    const handleCheckboxChange = (e) =>{
      dispatch(setLabelBorderEnable({id:editableNodeId , enabled: e.target.checked}))
      setBorderEnabled(e.target.checked)
      
    }

    const handleBackgroundCheckBox = (item:any) =>{
      dispatch(setLabelBackgroundEnable({id:editableNodeId , enabled: item.target.checked}))
      setBackgroundEnabled(item.target.checked)
      
    }


    const shouldDisableColorPicker = () => {
      // Disable when Background Image is selected or when the corresponding toggle button is disabled
      console.log('colorsType:', colorsType);
      console.log('backgroundEnabled:', backgroundEnabled);
      console.log('borderEnabled:', borderEnabled);
    
      if (
        (colorsType === ColorSelection.BACKGROUNDIMAGE && !backgroundEnabled) ||
        (colorsType === ColorSelection.BORDER && !borderEnabled)
      ) {
        return true;
      }
    
      return false;
    };
    
    

  const getBody = () => {
    return (
      <div style={{textAlign: 'initial', width:'100%', height:'100%',position:"relative"}}>
      {
      (selectedLabel[0]?.labelType !== LabelType.LABELCHART) ? <Editor selectedLabels={selectedLabels as ILabel[]} ref={childRef} /> : <ChartEditor selectedLabels={selectedLabels as ILabel[]} ref={childRef} /> 
     }

<div style={{ display: 'flex', alignItems: 'center', marginLeft:'10px', marginTop:'10px' }}>
  <MuiListItemText>Disable border </MuiListItemText>
  <MuiListItemIcon>
    <Toggle checked={borderEnabled} onChange={(e) => handleCheckboxChange(e)} />
  </MuiListItemIcon>
</div>

<div style={{ display: 'flex', alignItems: 'center', marginLeft:'10px', marginTop:'10px' }}>
  <MuiListItemText>Disable Background </MuiListItemText>
  <MuiListItemIcon>
    <Toggle checked={backgroundEnabled} onChange={(item) => handleBackgroundCheckBox(item)} />
  </MuiListItemIcon>
</div>


<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', marginTop: 30 }}>
<SelectAction
  className={selectionclasses.bodyContent}
  labelId="display-modes-selection-label-id"
  id="display-modes-selection-id"
  value={colorsType}
  defaultValue={ColorSelection.BACKGROUND}
  label="Change"
  MenuProps={{
    disablePortal: false,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  }}
  onChange={handleChange}
>
  <MenuItem
    id="step15"
    className={selectionclasses.bodyContent}
    value={ColorSelection.BACKGROUND}
    disabled={!backgroundEnabled}
  >
    Background Color
  </MenuItem>
  <MenuItem
    className={selectionclasses.bodyContent}
    value={ColorSelection.BORDER}
    disabled={!borderEnabled}
  >
    Border Color
  </MenuItem>
  <MenuItem
    className={selectionclasses.bodyContent}
    value={ColorSelection.BACKGROUNDIMAGE}
    disabled={!backgroundEnabled}
  >
    Background Image
  </MenuItem>
</SelectAction>


{    colorsType === 0 ||  colorsType === 1 ||  colorsType === 2 ? 
     
  <MuiGrid item xs={4} style={{ marginRight: 120, marginTop: 50, pointerEvents: shouldDisableColorPicker() ? 'none' : 'auto' }}>
  <ColorPicker
    color={color}
    onChangeComplete={handleChangeComplete}
  />
</MuiGrid> : null }

</div>

     
      
     {  backgroundEnabled && colorsType === 3 &&
     <>
<div style={{paddingTop:20}}>
<SelectAction
        className={selectionclasses.bodyContent}
         labelId="display-modes-selection-label-id"
        id="display-modes-selection-id"
     value={imgStyle}
 
        label="Image Mode"
        MenuProps={{
          disablePortal: false,
        
          anchorOrigin: {
            vertical:"bottom",
            horizontal:"left",
         },
     
     
         getContentAnchorEl: null
        }}
        onChange={handleImageStyleChange}
        >
          <MenuItem id='step15'  className={selectionclasses.bodyContent} value={ColorSelection.BACKGROUND}>Tile</MenuItem>
          <MenuItem  className={selectionclasses.bodyContent} value={ColorSelection.FONT} >Center</MenuItem>
          <MenuItem  className={selectionclasses.bodyContent} value={ColorSelection.BORDER}>Stretch</MenuItem>
          <MenuItem  className={selectionclasses.bodyContent} value={ColorSelection.BACKGROUNDIMAGE}>Fit View</MenuItem>

        </SelectAction>
        </div>
                        <div style={{marginTop:"40px", marginLeft:"25px"}}>
                            <Dropzone onDrop={(acceptedFiles, rejected )=> onDrop(acceptedFiles,rejected)}
                                multiple={false}
                                accept="image/*"
                             >
                                {({getRootProps, getInputProps}) => (
                                    <section>
                                        <div {...getRootProps()}  style={{
                                            width: "250px",
                                            height: "150px",
                                            borderRadius: "5%",
                                            objectFit: "cover",
                                            objectPosition: "center",
                                            border: " 1px dashed"
                                        }}>
                                            <input {...getInputProps()} />
                                            {   fileRedux 
                                                ?
                                                    <div>
                                                        <img 
                                                            style={{
                                                                width: "250px",
                                                                height: "150px",
                                                                borderRadius: "5%",
                                                                objectFit: "cover",
                                                                objectPosition: "center",
                                                              
                                                            }} 
                                                            src={fileRedux} alt="profile" 
                                                        />
                                                    </div>
                                                :
                                                    <div className={selectionclasses.imageStyle}>
                                                        <div style={{marginTop:"60px"}}>Drop your image here or</div>
                                                        <div style={{marginTop:"3px", color:"#8C8BFF",paddingLeft:45}}>Browse</div>
                                                    </div>
                                            }                                           
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                        </div>

                       
                        
                        </>   
                } 
    </div>
        
    )
  }

  const getFooter = () => {

    let change = false;
    // if(label2D?.label !== labelText)
    //   change = true;

    return(
      <div className={classes.editPageFooter}>
        <MuiButton className={classes.saveButton}
          autoFocus 
          onClick={handleApplyClick}
          variant="contained" 
          color="primary"
          size="small"
        >
          Apply
        </MuiButton>
      </div>
    ) 
  }

  const getHeaderContent = () => {
  
      const type = (selectedLabels[0] as ILabel).labelType;
      const text = selectedLabels.length > 1 ? "..." : selectedLabels[0].title;
      return(<Title text={text} group={`Labels - ${type}`}/>)
  }
  return (
          <SideBarContainer
            headerContent={ getHeaderContent() }
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}
