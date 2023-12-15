import React from "react";
import { useState, ChangeEvent } from 'react';
import { ReactEditor } from 'slate-react';
import { BaseEditor } from 'slate';
import { HistoryEditor } from 'slate-history';

import { useAppSelector, useAppDispatch} from '../../../../../../store/storeHooks';
import {selectLabelData, selectEditableNodeId} from '../../../../../../store/sideBar/labelSlice/AllLabelSlice';
import {ILabel,LabelChartType,LabelType} from '../../../../../../store/sideBar/labelSlice/shared/types';

import { selectLine3DChartEditData, set3DChartTitle, set3DChartXAxisTitle, set3DChartYAxisTitle } from 'store/chart3DSlice';

import { makeStyles } from '@material-ui/styles';
import {goBack,push} from 'connected-react-router/immutable';
import {Routes} from '../../../../../../routes/index'
import { selectLineChartData, setChartTitle, setChartXAxisTitle, setChartYAxisTitle } from "store/chartSlice";
import { Theme } from "@material-ui/core";



type CustomText = { text: string }
type CustomElement = { type: 'paragraph'; children: CustomText[] }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}

const { forwardRef, useImperativeHandle } = React;

const useMyStyles = makeStyles<Theme>((theme) => ({
  form:{
    position: "relative",
    top: "20px"
  },
  label: {
    margin:'20px auto',
    width:"100%",
    display:"flex" ,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:'0 20px',
    height:'40px',
    color: theme.palette.text.secondary,    
    fontSize:theme.typography.fontSize,
    fontWeight:theme.typography.fontWeightRegular,
    fontFamily:theme.typography.fontFamily,
    fontStyle:'normal',
    lineHeight:'20px',
    letterSpacing:'0.0025em',
  },
  input: {
    boxSizing:'border-box',
    background: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius:'4px',
    height:'100%',
    width:'60%',
    padding:'10px',
    fontSize:theme.typography.fontSize,
    fontWeight:theme.typography.fontWeightRegular,
    fontFamily:theme.typography.fontFamily,
    fontStyle:'normal',
    lineHeight:'20px',
    letterSpacing:'0.0025em',
    '&:focus':{
      outline:'none',
    }
  }
}))

const ChartEditor = forwardRef((props:{selectedLabels:ILabel[]}, ref) => {

  const selectedLabels = useAppSelector(selectEditableNodeId);
  const allLabels = useAppSelector(selectLabelData);
  const getSelectedNode = allLabels[selectedLabels];
  const dispatch = useAppDispatch();

  const label = props.selectedLabels[0]
  const chartEditDataList = useAppSelector(selectLine3DChartEditData);
  const chartDataList = useAppSelector(selectLineChartData);

  const getChartEditData = () => {
    if(label.type && (label.type === LabelChartType.LINECHART)){
      return (chartDataList && chartDataList.length > 0) ? chartDataList.find((e) => e.id === label.id) : null
    } else if (label.type && (label.type === LabelChartType.LINECHART3D)){
      return (chartEditDataList && chartEditDataList.length>0) ? chartEditDataList.find( e => e.pid === label.id) : null
    }
  }

  const chartEditData = getChartEditData();

  const chart3DTitleValue = (chartEditData?.chartTitle !== undefined ) ? chartEditData.chartTitle : 'Chart Title';
  const chart3DXAxisTitleValue = (chartEditData?.xAxisTitle !== undefined ) ? chartEditData.xAxisTitle : 'X-Axis';
  const chart3DYAxisTitleValue = (chartEditData?.yAxisTitle !== undefined ) ? chartEditData.yAxisTitle : 'Y-Axis';

  const classes = useMyStyles();

  const setDefaultValues = () => {
    if(label.type && (label.type === LabelChartType.LINECHART)){
      dispatch(setChartTitle({id:label.id, chartTitle: title}))
      dispatch(setChartXAxisTitle({id:label.id, xAxisTitle: xAxisTitle}))
      dispatch(setChartYAxisTitle({id:label.id, yAxisTitle: yAxisTitle}))
     } else if (label.type && (label.type === LabelChartType.LINECHART3D)){
      dispatch(set3DChartTitle({pid:props.selectedLabels[0].id, chartTitle: title}))
      dispatch(set3DChartXAxisTitle({pid:props.selectedLabels[0].id, xAxisTitle: xAxisTitle}))
      dispatch(set3DChartYAxisTitle({pid:props.selectedLabels[0].id, yAxisTitle: yAxisTitle}))
     }
  }

  const onHandleSave = (undoable:boolean) => {

    if(getSelectedNode.labelType === LabelType.LABEL2D) {

      dispatch(goBack()); 
 
     }
     else {
 
       Object.values(allLabels)?.forEach((label) => {
 
         if(label.id === selectedLabels) {
 
          if(label.children.length > 0) {
 
           dispatch(goBack()); 
          }
          else {
 
           dispatch(push(Routes.SELECT_WINDOW));
 
          }
 
         }
    })
 
     }
    
     if( (chartEditData?.chartTitle === undefined) || (chartEditData?.xAxisTitle === undefined) || (chartEditData?.xAxisTitle === undefined) ){setDefaultValues()}

  }
  
  const [title, setTitle] = useState(chart3DTitleValue)
  const handleOnChartTitleChange = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitle(e.target.value);
    (label.type && (label.type === LabelChartType.LINECHART)) ? dispatch(setChartTitle({id:label.id, chartTitle: e.target.value})) :dispatch(set3DChartTitle({pid:props.selectedLabels[0].id, chartTitle: e.target.value}))
  }

  const [xAxisTitle, setXAxisTitle] = useState(chart3DXAxisTitleValue)
  const handleOnXAxisTitleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setXAxisTitle(e.target.value);
    (label.type && (label.type === LabelChartType.LINECHART)) ? dispatch(setChartXAxisTitle({id:label.id, xAxisTitle: e.target.value})) : dispatch(set3DChartXAxisTitle({pid:props.selectedLabels[0].id, xAxisTitle: e.target.value}))
  }

  const [yAxisTitle, setYAxisTitle] = useState(chart3DYAxisTitleValue)
  const handleOnYAxisTitleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setYAxisTitle(e.target.value);
    (label.type && (label.type === LabelChartType.LINECHART)) ? dispatch(setChartYAxisTitle({id:label.id, yAxisTitle: e.target.value})) : dispatch(set3DChartYAxisTitle({pid:props.selectedLabels[0].id, yAxisTitle: e.target.value}))
  }

  useImperativeHandle(ref, () => ({
    onHandleSave,
  }));

    return (
      <>
        <form className={classes.form} >
          <label className={classes.label} style={{margin:'0px auto'}}>
            Chart Title:
            <input className={classes.input} name='chartTitle' type="text" onChange={handleOnChartTitleChange} placeholder="Enter valid chart title" value={title} autoComplete="off" />
          </label>
          <label className={classes.label}>
            X-Axis Title:
            <input className={classes.input} name='xAxisTitle' type="text" onChange={handleOnXAxisTitleChange} placeholder="Enter vlaid x-Axis title" value={xAxisTitle} autoComplete="off" />
          </label>
          <label className={classes.label}>
            Y-axis Title:
            <input className={classes.input} name='yAxisTitle' type="text" onChange={handleOnYAxisTitleChange} placeholder="Enter vlaid y-Axis title" value={yAxisTitle} autoComplete="off" />
          </label>
        </form>
      </>
    )

}); 

export default ChartEditor
