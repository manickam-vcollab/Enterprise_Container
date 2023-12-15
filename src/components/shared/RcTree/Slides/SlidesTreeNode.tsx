import { Text, Group, Button, ActionIcon } from "@mantine/core";
import { Typography } from "@material-ui/core";
import { useHover } from "@mantine/hooks";
import { useStyles } from "../TreeStyle";
import Input from '@material-ui/core/Input';

import SelectionPointer from "../SelectionPointer";

import { preProcessFile } from "typescript";
import { useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import { useRef } from "react";

//Icons
// import Add from "@material-ui/icons/Add";
import MuiIconButton from "@material-ui/core/IconButton";
import AddIcon from "components/icons/add";
import MuiCheckIcon from '@material-ui/icons/Done';
// import MuiDownloadIcon from "@material-ui/icons/CloudDownloadOutlined";
import MuiDownloadIcon from "@material-ui/icons/Done";
// import MuicloudDoneIcon from "@material-ui/icons/CloudDone";
// import DownloadIcon from "../../../icons/download";
import DownloadIcon from "../../../icons/downloadProcessIcon";
import { updateViewpointOnServer } from "store/viewpointSlice";
import store, { RootState } from "store";

const LabelTitle = ({ ...props }) => {
  const treenoderef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const treenodeleftWidth = treenoderef.current?.offsetLeft;

  const treenodeWidth = props.conwidth - treenodeleftWidth;

  const appliedSlideId = props.appliedSlideId;

  const style = useStyles();
  const theme = useTheme();
  const { hovered, ref } = useHover();

  const useOverlay = () => {
    const add = (
      <ActionIcon className={clsx(style.iconHover)}>
        <div
          className={props.node.state.visibility == false ? style.disabled : ""}
          onClick={(e) => {
            props.handleCreateNode(props.node.id);
            props.onhandleAddButtonClick(e);
          }}
        >

            <AddIcon fontSize="default" />

        </div>
      </ActionIcon>
    );

    const download = (
      <ActionIcon className={clsx(style.iconHover)}>
        <div
          // style={{ color: "white" }}
          className={props.node.state.visibility == false ? style.disabled : ""}
        >
          {appliedSlideId === props.node.id && props.isViewerDataChanged === false ? (
            <MuiCheckIcon  />
          ) : props.nodes[props.node.id].pid !== "-1" ? (
            props.nodes[props.node.id].downloaded === true ? (
              <DownloadIcon color={theme.palette.text.primary}/>
            ) : (
              <MuiDownloadIcon/>
            )
          ) : null}
        </div>
      </ActionIcon>
    );

    return [add, download];
    // return [add];
  };

  const [add, download] = useOverlay();

  const getOverlayIcons = (pid: string) => {
    if (pid == "-1") {
      return [add];
    } else {
      return [download];
    }
  };

  return (
    <div ref={treenoderef}>
      <div
        style={{ width: treenodeWidth }}
        onClick={(event) => {
          // console.log(event);
          //props.handleRowClick(event);
        }}
        onDoubleClick = {()=>{
          if(props.isTitleEditable === true)
          props.onHandleIsTitleEditable(props.node.id,true);
        }}
        ref={ref}
      >
        <Group spacing="sm">
        {props.node.isTitleEditable ? <Input type="text" style={{width:'80%'}} defaultValue= {props.node.title} autoFocus={true}
          onChange={(event) =>{
            if(event.target.value){
             props.setNewTitleTitle(props.node.id,event.target.value)
             }
             //  updateViewpointOnServer(store.getState() as RootState);
             }
            }
          onMouseLeave={(event)=>{
          if(props.node.title.length >=1) {
            props.onHandleIsTitleEditable(props.node.id,false);
            updateViewpointOnServer(store.getState() as RootState);
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
            // style={{
            //   // marginLeft: "-10%",
            //   maxWidth: "75%",
            //   overflow: "hidden",
            //   textOverflow: "ellipsis",
            //   whiteSpace: "nowrap",
            //   alignContent: "left",
            //   // border: "1px solid white",
            // }}
            className={
              props.node.state.visibility == false ? style.disabled : ""
            }
          >
            {props.node.title}
          </Typography>}
            <div className={style.overlaystyling}>
              <div className={style.overlayicons}>
                {getOverlayIcons(props.node.pid)}
              </div>
            </div>
        </Group>
      </div>
    </div>
  );
};

export default LabelTitle;
