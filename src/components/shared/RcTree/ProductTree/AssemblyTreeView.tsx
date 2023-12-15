/* eslint-disable no-alert, no-console, react/no-find-dom-node */
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import Tree from 'rc-tree';
import Title from './AssemblyTreeNode'
import { useStyles } from '../TreeStyle'
import useListStyles from '../../../shared/List/liststyle';
import clsx from 'clsx'
import TreeCollapseIcon from '@material-ui/icons/ChevronRight';
import "../tree.css";
import TreeExpandedIcon from '@material-ui/icons/ExpandMore';

export const TreeView = (props: any) => {

  const treestyle = useStyles();
  const listClasses = useListStyles();
  const myTree = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [dynamicWidth, setWidth] = useState(myTree.current?.offsetWidth);
 


  useEffect(() => {
    const fullWidth = (props.containerwidth + props.scrollValue);
    setWidth(fullWidth);
  }, [props])

  function searchData(dataArray:any, searchTerm:any) {
    return dataArray.flatMap((obj:any) => {
      const tagArray= ((obj || {}).attributes || {}).tags
      
      const objHasSearchTerm = Object.keys(obj).some((key) => obj.title.toLowerCase().includes(searchTerm.toLowerCase()) || tagArray?.includes(searchTerm.toLowerCase()));




      if (objHasSearchTerm && !obj.children ) return [obj];
  
      const matchedChildren = searchData(obj.children ?? [], searchTerm);

      return objHasSearchTerm || matchedChildren.length > 0
        ? [{
        
     ...obj,
      children: matchedChildren,
      
      
        }]
        : [];
    })

  }


  

  
 
  const searchedData=searchData(props.treedata,props.searchtext)
  const switcherIcon = (obj: any) => {
  

     if (obj.data.children.length == 0 ) {
      return (<TreeExpandedIcon style={{visibility:'hidden'}} />)
    }
 
    else if (obj.expanded ) {
      return (
        <TreeExpandedIcon />
      )
    }
    else {
      return (
        <TreeCollapseIcon />
      )
    }
  }

  return (
    <>
      <div ref={myTree} style={{ width: dynamicWidth}} className={clsx(treestyle.root)} >
        <Tree
          virtual={true}
         switcherIcon={switcherIcon}
          defaultExpandAll
          showIcon={false}
          selectable={false}
          treeData={props.searchtext.length > 2 && props.searchmode ? searchedData : props.treedata}
          onExpand={props.handleExpand}
          expandedKeys={props.expanded}

       
         
          titleRender={(nodeData) => (
        
            <Title node={nodeData} handleinvert={props.invert} handlevisibility={props.visibility} onCheck={props.check} conwidth={props.containerwidth} marginStyle={props.marginStyle}>
              {nodeData.title}
            </Title>
          )}

        >




        </Tree>
      </div>

    </>
  );
}

export default TreeView;
