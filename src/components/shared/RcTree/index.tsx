import React, {useCallback, useEffect, useRef, useState} from 'react'

export interface ITreeNodeState {
  checked?: boolean,
  partiallyChecked?: boolean,
  expanded?: boolean,
  highlighted?: boolean,
  visibility?: boolean,
  selected?: boolean
  // frames?:number,
  // slider?:number
}

export interface ITreeNode {
  id:string,
  pid:string|null,
  title:string,
  children:string[],
  isGroup?:boolean,
  state:ITreeNodeState,
  attributes?:any,
  treeType?:any, //Wheather is VARIABLE or STEPS or DERIVED
  isTitleEditable?:boolean,
  type?:any //Wheather type is SYSTEM or USER
}

export interface ITreeTableProps {
  treeData: ITreeNode[],
  selectable?: boolean,
  hover?:boolean,
  expandedRowIds: string[],
  width: number,
  height: number,
  selected?: string[],
  rowHeight?: (rowData : any) => number,
  renderTreeToggle: (icon:any, rowData:any) => any,
  onExpand: (toOpen:boolean,nodeId:string) => void,
  onRowClick?: (node:ITreeNode, event:React.MouseEvent<HTMLHeadingElement>) => void,
  treeNode: (node:ITreeNode) => JSX.Element,
  column1?: (node:ITreeNode) => JSX.Element,
  column2?: (node:ITreeNode) => JSX.Element
}
