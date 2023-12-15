/* eslint-disable no-alert, no-console, react/no-find-dom-node */
import { useEffect, useRef, useState } from "react";
import React from "react";
import Tree from "rc-tree";
import Title from "./SlidesTreeNode";
import { useStyles } from "../TreeStyle";
import useListStyles from "../../List/liststyle";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import TreeCollapseIcon from "@material-ui/icons/ChevronRight";
import "../tree.css";
import TreeExpandedIcon from "@material-ui/icons/ExpandMore";
import { setSlideSelection } from "store/sideBar/slideSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/storeHooks";

export const TreeView = (props: any) => {
  const dispatch = useAppDispatch();
  const treestyle = useStyles();
  const listClasses = useListStyles();
  const myTree = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [dynamicWidth, setWidth] = useState(myTree.current?.offsetWidth);
  const [treeSelectedKey, setTreeSelectedKey] = useState(props.selectedKey);

  // useEffect(() => {
  //   setTreeSelectedKey(props.selectedKey);
  // }, [props.selectedKey]);

  const [singleSelectTimer, setSingleSelectTimer] = useState<number|null>(null);
  const handleSelect = (selectedKeys:any, nodes:any, event:any) => {
    if (singleSelectTimer) {
      // if there is a single click timer set, it means this is a double click
      clearTimeout(singleSelectTimer);
      setSingleSelectTimer(null);
      // handleDoubleClick();
    } else {
      // if there's no single click timer, set one for the single click
      setSingleSelectTimer(window.setTimeout(() => {
        setSingleSelectTimer(null);
        onSelect(selectedKeys, nodes);
      }, 300));
    }
  }

  const onSelect = (key:any,node:any) => {
    let selectedNode = node[key[0]];
    if(selectedNode !== undefined) {
      if(selectedNode.children.length === 0 && selectedNode.pid !== "-1") 
      setTreeSelectedKey(key);
     }
     else if(props.unselect === true) {
      setTreeSelectedKey("");  
      props.handleRowUnselect();
  
     }
  
    }

  const onClickAddButton = (e: any) => {
    e?.stopPropagation();
    // console.log("onClickAddButton", e);
  };

  useEffect(() => {
    const fullWidth = props.containerwidth + props.scrollValue;
    setWidth(fullWidth);
  }, [props]);

  const switcherIcon = (obj: any) => {
    if (obj.data.children.length == 0) {
      return <TreeExpandedIcon style={{ visibility: "hidden" }} />;
    } else if (obj.expanded) {
      return <TreeExpandedIcon />;
    } else {
      return <TreeCollapseIcon />;
    }
  };

  return (
    <>
      <div
        ref={myTree}
        style={{ width: dynamicWidth }}
        className={clsx(treestyle.root)}
      >
        <Tree
          virtual={true}
          switcherIcon={switcherIcon}
          defaultExpandAll
          showIcon={false}
          // defaultExpandParent={true}
          // selectable={true}
          onSelect={(selectedKeys, event) =>
            props.handleRowClick(event)
          }
          expandedKeys={props.expanded}
          selectedKeys={props.selectedKey}
          multiple = {true}
          onExpand={props.handleExpand}
          treeData={props.treeData}
          titleRender={(nodeData) => (
            <Title
              nodes={props.nodes}
              node={nodeData}
              conwidth={props.containerwidth}
              selectedSlideId={props.selectedSlideId}
              appliedSlideId={props.appliedSlideId}
              handleCreateNode={props.handleCreateNode}
              //handleRowClick={props.handleRowClick}
              onhandleAddButtonClick={onClickAddButton}
              onHandleIsTitleEditable = {props.onHandleIsTitleEditable}
              setNewTitleTitle = {props.setNewTitleTitle}
              isTitleEditable = {props.isTitleEditable}
              isViewerDataChanged = {props.isViewerDataChanged}
              // handleRowClick={props.check}
              // onCheck={props.check}
            ></Title>
          )}
        ></Tree>
      </div>
    </>
  );
};

export default TreeView;
