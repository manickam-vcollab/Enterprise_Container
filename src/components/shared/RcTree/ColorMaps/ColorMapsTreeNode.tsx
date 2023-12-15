import { Text, Group, Button, ActionIcon } from "@mantine/core";
import { Typography } from "@material-ui/core";
import { useHover } from "@mantine/hooks";
import { Eye, Link } from "tabler-icons-react";
import InvertCell from "../Invert";
import ShowHide from "../ShowHide";
import SelectPointerIcon from "../SelectionPointer";
import Grid from "@material-ui/core";
import { useStyles } from "../TreeStyle";
import Checkbox from "../../checkbox";
import Input from '@material-ui/core/Input';
import {
  LabelType,
  Label3DType,
  LabelChartType,
} from "store/sideBar/labelSlice/shared/types";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "store/storeHooks";
import { selectSelectionPointerId } from "store/sideBar/labelSlice/AllLabelSlice";

import SelectionPointer from "../SelectionPointer";

import { preProcessFile } from "typescript";
import { useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import { useRef } from "react";

//Icons

import AddNotes from "../../../icons/labelNotes";
import PointLabelIcon from "../../../icons/pointLabel";
import FaceLabelIcon from "../../../icons/faceLabel";
import PointToPointLabelIcon from "../../../icons/pointToPointLabel";
import LabelArcPointIcon from "../../../icons/labelArcPoint";
import XYPlotsIcon from "../../../icons/xyplots";
import NotInterestedIcon from '@material-ui/icons/NotInterested';

import EditIcon from "../../../icons/edit";
import PopOutIcon from "../../../icons/popout";
// import Add from "@material-ui/icons/Add";
import MuiIconButton from "@material-ui/core/IconButton";
import { Download } from "tabler-icons-react";
import AddIcon from "components/icons/add";
import MuiCheckIcon from "@material-ui/icons/Check";
import MuiDownloadIcon from "@material-ui/icons/CloudDownloadOutlined";
import MuicloudDoneIcon from "@material-ui/icons/CloudDone";
import { makeStyles } from "@material-ui/core/styles";
import {
  selectcolormapData,
  colormapElements,
  selectColormapRootIds,
  expandNode,
  createColorMap,
  deleteColorMap,
  setColorMapSelection,
  applyColorMap,
  pasteColormap,
  selectColorPaletteData
} from "../../../../store/sideBar/colormapSlice";
import { convertListToTree } from "../../../utils/tree";

export enum ColormapType {
  SYSTEM = 0,
  USER = 1,
}


const LabelTitle = ({ ...props }) => {
  // console.log("props.node.pid", props.node.pid);

  const selectionPointerId: string = useAppSelector(selectSelectionPointerId);

  const treenoderef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const treenodeleftWidth = treenoderef.current?.offsetLeft;

  const treenodeWidth = props.conwidth - treenodeleftWidth;

  const appliedColorMapId = useAppSelector(
    (state) => state.colormap.appliedColorMapId
  );

  const selectedColorMapId = useAppSelector(
    (state) => state.colormap.selectedColorMapId
  );
  const colormapsData = useAppSelector(selectcolormapData);
  const colormapNamelist = useAppSelector(colormapElements);
  const colorPaletteData  = useAppSelector(selectColorPaletteData);

  const [activeColormapId, setActiveColormapId] = useState(selectedColorMapId);
  // const appliedColorPalette = colormapsData[activeColormapId].colorPalette;
  // const appliedColorPalette = colormapsData[selectedColorMapId].colorPalette;
  // const appliedColorPalette = colormapsData[appliedColorMapId].colorPalette;

  // const treeDataRedux = useAppSelector(selectcolormapData);
  // const treeRootIds = useAppSelector(selectColormapRootIds);
  // const { roots, expanded } = convertListToTree(treeDataRedux, treeRootIds);

  let appliedColorPalette: any = null;

  if (appliedColorMapId !== "-1") {
    appliedColorPalette = colormapsData[selectedColorMapId].colorPalette;
  }

  const style = useStyles();
  const theme = useTheme();
  const { hovered, ref } = useHover();

  const useStylesNew = makeStyles((theme) => ({
    customHoverFocus: {
      "&:hover, &.Mui-focusVisible": { backgroundColor: "yellow" },
    },
  }));

  const useOverlay = () => {
    // const add = (
    //   <ActionIcon className={clsx(style.iconHover)}>
    //     <div
    //       style={{ color: "white" }}
    //       className={props.node.state.visibility == false ? style.disabled : ""}
    //     >
    // <MuiIconButton
    //   size="small"
    //   onClick={(event) => props.handleCreateLabel(props.node.id)}
    // >
    //   <AddIcon fontSize="default" />
    // </MuiIconButton>
    //     </div>
    //   </ActionIcon>
    // );

    const add = (
      <ActionIcon className={clsx(style.iconHover)}>
        <div
          style={{ color: "white" }}
          className={props.node.state.visibility == false ? style.disabled : ""}
        >
          {/* {props.node.id === "1" ? (
            <MuiIconButton
              size="small"
              onClick={(event) => props.handleCreateLabel(props.node.id)}
            >
              <AddIcon fontSize="default" />
            </MuiIconButton>
          ) : null} */}
          {props.PidName == "List" ? (
            <MuiIconButton
              style={{ backgroundColor: "transparent" }}
              size="small"
              onClick={(event) => props.handleCreateLabel(props.node.id)}
            >
              <AddIcon fontSize="default" />
            </MuiIconButton>
          ) : props.node.id === "1" ? (
            <MuiIconButton
              size="small"
              onClick={(event) => props.handleCreateLabel(props.node.id)}
            >
              <AddIcon fontSize="small" />
            </MuiIconButton>
          ) : null}
        </div>
      </ActionIcon>
    );

    const download = (
      <ActionIcon className={clsx(style.iconHover)}>
        <div
          style={{ color: "white" }}
          className={props.node.state.visibility == false ? style.disabled : ""}
        >
          {/* {" "} */}
          {/* <Download fontSize="default"></Download> */}

          {props.PidName === "List" ? (
            appliedColorMapId === props.node.id ? (
              <MuiCheckIcon fontSize="small" />
            ) : props.nodes[props.node.id].pid !== "-1" ? (
              props.nodes[props.node.id].downloaded === true ? (
                <MuicloudDoneIcon fontSize="small" />
              ) : (
                <MuiDownloadIcon fontSize="small" />
              )
            ) : null
          ) : null}
        </div>
      </ActionIcon>
    );
    const checkmark = (
      <ActionIcon className={clsx(style.iconHover)}>
        <div
          style={{ color: "white" }}
          className={props.node.state.visibility == false ? style.disabled : ""}
        >
          {/* {" "} */}
          {/* <Download fontSize="default"></Download> */}

          {appliedColorPalette === props.node.id ? (
            <div style={{ marginTop: "10px" }}>
              <MuiCheckIcon fontSize="small" />
            </div>
          ) : null}
        </div>
      </ActionIcon>
    );

    const disable =(
      <ActionIcon className={clsx(style.iconHover)}>
      <div
        style={{ color: "white" }}
        className={props.node.state.visibility == false ? style.disabled : ""}
      >


          <div style={{ marginTop: "10px" }}>
            <NotInterestedIcon fontSize="small" />
          </div>
      </div>
    </ActionIcon>
    );


    return [add, download, checkmark,disable];
    // return [add];
  };

  const [add, download, checkmark,disable] = useOverlay();
  // const [add] = useOverlay();
  const getOverlayIcons = (pid: string, PidName: string) => {
    // if (pid == "-1") {
    //   return [add];
    // } else {
    //   return [download];
    //   // return;
    // }

    if (PidName == "List") {
      if (pid == "-1") {
        return [add];
      } else {
        return [download];
        // return;
      }
    } else if (PidName == "ColorPalette") {
      if (pid == "-1") {
        return [add];
      } else {
        return [checkmark];
      }
    } if(props.avaliableResult !== undefined && !props.avaliableResult?.includes(props.node.id)){
      return [disable]
    }
  };

  const styleProps = {
    color: props.node.state.visibility
      ? theme.palette.text.secondary
      : theme.palette.text.disabled,
  };

  const stringTrucate = (str:string,length:number)=>{
    if (str.length > length) {
      return str.slice(0, length) + '...';
    } else return str;

  }

  const [singleSelectTimer, setSingleSelectTimer] = useState<number|null>(null);
  const [isDoubleClick,setIsDoubleClick] = useState(false);
  const handleClick = () => {
    if (singleSelectTimer) {
      // if there is a single click timer set, it means this is a double click
      clearTimeout(singleSelectTimer);
      setSingleSelectTimer(null);
      setIsDoubleClick(true);
      // console.log('test double clicik data')
      // handleDoubleClick();
      // props.handleRowUnselect();
      // if(props.unselect === true) {
      //   setTreeSelectedKey("");  
      //   props.handleRowUnselect();
    
      //  }
    } else {
      // if there's no single click timer, set one for the single click
      setSingleSelectTimer(window.setTimeout(() => {
        setSingleSelectTimer(null);
        props.handleRowClick(props.node);
        // console.log('test single clicik data',props.node)
      }, 200));
    }
  }

  return (

    <div ref={treenoderef} >
       <div
        style={{ width: treenodeWidth }}
        onClick={handleClick}
        onDoubleClick = {()=>{
          if(props.node.type !== ColormapType.SYSTEM && props.isTitleEditable === true)
          props.onHandleIsTitleEditable(props.node.id,true);
        }}
        ref={ref}
      >
        <Group spacing="sm">
          {/* <Checkbox
            className={style.checkbox}
            style={{ styleProps }}
            size="small"
            checked={props.node.state.checked}
            indeterminate={props.node.state.partiallyChecked}
            disableRipple
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              e.stopPropagation()
            }
            onChange={
              (e: any) => props.onCheck(e.target.checked, props.node, true)
              // (e: any) => props.handleRowClick(props.node)
            }
          ></Checkbox> */}
          {props.node.isTitleEditable ? <Input type="text" style={{width:'80%'}} defaultValue= {props.node.title} autoFocus={true}
          onChange={event => props.setNewTitleTitle(props.node.id,event.target.value)}
          onMouseLeave={(event)=>{
          if(props.node.title.length >=1) {
            props.onHandleIsTitleEditable(props.node.id,false);
          }
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === 'Escape') {
              if(props.node.title.length >=1) {
                props.onHandleIsTitleEditable(props.node.id,false);
                event.preventDefault()
                event.stopPropagation() 
              }
            }
          }}/>:
          <Typography
            align="left"
            style={{
              maxWidth: "75%",
              // overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              alignContent: "left",
            }}
            className={
              props.node.state.visibility == false ? style.disabled : ""
            }
          >
   
            {props.avaliableResult?
              <div className={props.avaliableResult?.includes(props.node.id)?'':style.disabled}>
              {stringTrucate(props.node.title,20)} 
              </div>:<div>{stringTrucate(props.node.title,20)}</div>
              }
          
          </Typography>}
          {hovered ? (
            <div className={style.overlaystyling}>
              <div className={style.overlayicons}>
                {getOverlayIcons(props.node.pid, props.PidName)}
              </div>
            </div>
          ) : null}
        </Group>
      </div>
    </div>

  );
};

export default LabelTitle;
