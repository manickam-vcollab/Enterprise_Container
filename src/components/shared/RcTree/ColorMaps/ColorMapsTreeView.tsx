/* eslint-disable no-alert, no-console, react/no-find-dom-node */
import { useEffect, useRef, useState } from "react";
import React from "react";
import Tree ,{TreeNode}from "rc-tree";
import Title from "./ColorMapsTreeNode";
import { useStyles } from "../TreeStyle";
import useListStyles from "../../List/liststyle";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import TreeCollapseIcon from "@material-ui/icons/ChevronRight";
import "../tree.css";
import TreeExpandedIcon from "@material-ui/icons/ExpandMore";

export const TreeView = (props: any) => {

  const treestyle = useStyles();
  const listClasses = useListStyles();
  const myTree = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [dynamicWidth, setWidth] = useState(myTree.current?.offsetWidth);
  const [treeSelectedKey , setTreeSelectedKey] = useState(props.selectedKey);

  useEffect(() => {
    const fullWidth = props.containerwidth + props.scrollValue;
    setWidth(fullWidth);
    //setTreeSelectedKey(props.selectedKey);
  }, [props]);

  const [singleSelectTimer, setSingleSelectTimer] = useState<number|null>(null);
  const [isDoubleClick,setIsDoubleClick] = useState(false);
  const handleSelect = (selectedKeys:any, nodes:any) => {
    if (singleSelectTimer) {
      // if there is a single click timer set, it means this is a double click
      clearTimeout(singleSelectTimer);
      setSingleSelectTimer(null);
      setIsDoubleClick(true);
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
        onSelect(selectedKeys, nodes);
        // console.log('test single clicik data',selectedKeys)
      }, 200));
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
          onSelect={(selectedKeys)=>handleSelect(selectedKeys,props.nodes)}
          selectedKeys = {treeSelectedKey}
          treeData={props.treedata}
          titleRender={(nodeData) => (
            <Title
              nodes={props.nodes}
              node={nodeData}
              conwidth={props.containerwidth}
              handleCreateLabel={props.add}
              onHanleDownload={props.download}
              onHandleNameEdit = {props.onHandleNameEdit}
              onHandleIsTitleEditable = {props.onHandleIsTitleEditable}
              setNewTitleTitle = {props.setNewTitleTitle}
              // handleRowClick={props.check}
              // onCheck={props.check}
              PidName={props.PidName}
              handleRowClick = {props.onClick}
              isTitleEditable = {props.isTitleEditable}
              avaliableResult = {props.avaliableResult}
            ></Title>
          )}
        >
        </Tree>
      </div>
    </>
  );
};

export default TreeView;
