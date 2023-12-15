import { Box, Typography } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react'
import {Palette, PaletteBuilder} from 'components/utils/palette/PaletteBuilder'
import { useAppDispatch, useAppSelector } from 'store/storeHooks';
import { selectcolormapData, paletteTypeDataList, directionDataList, ticPositionDataList, titlePlacementDataList, valuePlacementDataList ,selectColorPaletteData ,LegendDirection ,selectLegendTitle,setColorPaletteValues, selectPaletteRange} from 'store/sideBar/colormapSlice';
import {selectWindowSize,setWindowSize} from 'store/windowMgrSlice';
import { selectResultMinMax } from "store/sideBar/colormapSlice";
import {SelectCAEDerivedType} from "../../../store/caeResultSlice"

function Legend() {
    const canvasRef = useRef(null);
    const paletteRef = useRef<Palette| null>(null);
    const [ctx, setCtx] = useState< CanvasRenderingContext2D | null>(null);
    const dispatch = useAppDispatch();

   const selectedColorMapId = useAppSelector(state => state.colormap.selectedColorMapId);
   
   //const [activeColormapId, setActiveColormapId] = useState(selectedColorMapId); 
    let derivedTypeName:string = '';
    const appliedColorMapId = useAppSelector(state => state.colormap.appliedColorMapId);
    const colormapTreeData = useAppSelector(selectcolormapData);
    const caeDerivedType = useAppSelector(SelectCAEDerivedType);
    const selectedColorMap = colormapTreeData[selectedColorMapId];
    let selectedDeriveTypeId:string = selectedColorMap.derivedType.includes(":")?selectedColorMap.derivedType.split(":")[1]:selectedColorMap.derivedType;
    const colorPaletteData = useAppSelector(selectColorPaletteData);
    const valueNatureAppliedId = colormapTreeData[selectedColorMapId].colorPalette;
    const appliedValueNature = colorPaletteData[valueNatureAppliedId];
    const paletteTypeArray = useAppSelector(paletteTypeDataList);
    const paletteDirectionArray =useAppSelector(directionDataList);
    const paletteTickPositionArray = useAppSelector(ticPositionDataList);
    const paletteTittlePlacementArray = useAppSelector(titlePlacementDataList);
    const paletteValuePlacementArray = useAppSelector(valuePlacementDataList);
    const colormapsData = useAppSelector(selectcolormapData);
    const legendTitle = useAppSelector(selectLegendTitle);
    const appliedColorPalette = colormapsData[appliedColorMapId].colorPalette;
    const colorPaletteList = useAppSelector(state => state.colormap.colorPaletteTree.data);
    const minmax = useAppSelector(selectPaletteRange);

    const colorSet =  colorPaletteList[appliedColorPalette].colorSet;
    const valueSet =   colorPaletteList[appliedColorPalette].valueSet;
    const noResultColor = colorPaletteList[appliedColorPalette].noResultColor;
    const aboveMaxColor = colorPaletteList[appliedColorPalette].aboveMaxColor;
    const belowMinColor = colorPaletteList[appliedColorPalette].belowMinColor;
  

    const [colorMapWindowSizeWidth ,colorMapWindowSizeHeight]  = useAppSelector(state=>selectWindowSize(state,'colorPlotWindow'));

    const paletteTypeID = colormapsData[appliedColorMapId].paletteType;
    const paletteDirectionID = colormapsData[appliedColorMapId].direction;
    const paletteTickPositionID = colormapsData[appliedColorMapId].ticPosition;
    const paletteTittlePlacementID = colormapsData[appliedColorMapId].titlePlacement;
    const paletteValuePlacementID = colormapsData[appliedColorMapId].valuePlacement;
    const paletteGap = colormapsData[appliedColorMapId].gap;

    Object.values(caeDerivedType).forEach((item:any)=> {
        let generator = item.id.split(":")[1];
       if(generator === selectedDeriveTypeId) {
   
         derivedTypeName = item.title;
       }
   
   
     })



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

    let noReslutsColorSetValues:string[] = [];  
    let noReslutsColorComputedValues:string[] = ['NA']; 

    let aboveMaxColorSetValues:string[] = [];  
    let aboveMaxColorComputedValues:string[] = ['Above Max']; 

    let belowMinColorSetValues:string[] = [];  
    let belowMinColorComputedValues:string[] = ['Below Min']; 

        const noResultColors = noResultColor[0].color
        let R = noResultColors.r;
    let G = noResultColors.g;
    let B = noResultColors.b;
    let A = noResultColors.a;
    let colors = 'rgba('+R+','+G+','+B+','+A+')';
    let hexValue = convertRGBtoHEX(colors);
    noReslutsColorSetValues.push(hexValue);

    const aboveMaxColors = aboveMaxColor[0].color
    let max_R = aboveMaxColors.r;
let max_G = aboveMaxColors.g;
let max_B = aboveMaxColors.b;
let max_A = aboveMaxColors.a;
let max_colors = 'rgba('+max_R+','+max_G+','+max_B+','+max_A+')';
let max_hexValue = convertRGBtoHEX(max_colors);
aboveMaxColorSetValues.push(max_hexValue);

const belowMinColors = belowMinColor[0].color
    let min_R = belowMinColors.r;
let min_G = belowMinColors.g;
let min_B = belowMinColors.b;
let min_A = belowMinColors.a;
let min_colors = 'rgba('+min_R+','+min_G+','+min_B+','+min_A+')';
let min_hexValue = convertRGBtoHEX(min_colors);
belowMinColorSetValues.push(min_hexValue);

    



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
             return null;
        }
        else {
             let values = [];
             let valueCount = valueSet.length;
             if(colorSetValues.length === valueSet.length){
                 let division = (max - min) / (valueCount);
                 for(let i =0; i < valueCount; i++ ){
                     let value1 = min + (i * division);
                     let value2 = min + ((i + 1) * division);
                     values.push(value2.toFixed(3) + ":" +    value1.toFixed(3) );
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


    let paletteType:any;
    let valueNature:any;
    let paletteDirection:any;
    let paletteTickPosition:any; 
    let paletteTittlePlacement:any;
    let paletteValuePlacement:any;


    // palette Type
    paletteTypeArray.forEach( data => {
    if ( data.id === paletteTypeID ) {
        paletteType = data.type;
    }
    });

    //ValueNature Type
   
        
    valueNature = appliedValueNature.valueNature;
        

    // palette Direction
     paletteDirectionArray.forEach( data => {
        if ( data.id === paletteDirectionID ) {
            paletteDirection = data.direction;
        }
     });

    // palette tick position 
     paletteTickPositionArray.forEach(data=> {

        if(data.id === paletteTickPositionID ) {

            paletteTickPosition = data.ticktype;

        }

     });

     //palette tittle position 

     paletteTittlePlacementArray.forEach(data=> {

        if(data.id === paletteTittlePlacementID ) {

            paletteTittlePlacement = data.position;

        }

     });

     //palette value position

     paletteValuePlacementArray.forEach(data=> {

        if(data.id === paletteValuePlacementID ) {

            paletteValuePlacement = data.position;

        }

     });


    // palette direction change set window size 

    useEffect(()=> {

                if(paletteDirection === LegendDirection.VERTICAL) {

                    dispatch(setWindowSize({uid:'colorPlotWindow',size:[200,300]}));
                    
                }

                if(paletteDirection === LegendDirection.HORIZONTAL || paletteDirection === LegendDirection.AUTO) {

                    dispatch(setWindowSize({uid:'colorPlotWindow',size:[500,150]}));

                }

    },[paletteDirection]) 


    useEffect(() => {
        
        if(canvasRef.current) {

            const canvas = canvasRef.current as unknown as HTMLCanvasElement;
            canvas.width = colorMapWindowSizeWidth;
            canvas.height = colorMapWindowSizeHeight;
            setCtx(canvas.getContext('2d'));

            if(ctx){
                paletteRef.current = new PaletteBuilder().build();
                //let newValueSet = getComputedValueSet(colorSetValues,valueSet);
                //dispatch(setColorPaletteValues({appliedColorPaletteId:appliedColorMapId , colorPaletteValues:newValueSet}));
            }    
        }
    },[canvasRef.current])


    useEffect(() => {

            const canvas = canvasRef.current as unknown as HTMLCanvasElement;
            canvas.width = colorMapWindowSizeWidth;
            canvas.height = colorMapWindowSizeHeight;


    },[colorMapWindowSizeWidth , colorMapWindowSizeHeight])

    useEffect(() => {
        
        if(paletteRef.current && ctx) {

            paletteRef.current.setPaletteType(paletteType);

            paletteRef.current.setValueNature(valueNature);

            paletteRef.current.setPaletteDirection(paletteDirection);

            paletteRef.current.setPaletteTickPosition(paletteTickPosition);

            paletteRef.current.setPaletteTittlePlacement(paletteTittlePlacement);

            paletteRef.current.setPaletteValuePlacement(paletteValuePlacement);

            paletteRef.current.setPaletteColor(colorSetValues);

            paletteRef.current.setNoResultsPaletteColor(noReslutsColorSetValues);

            paletteRef.current.setAboveMaxPaletteColor(aboveMaxColorSetValues);

            paletteRef.current.setBelowMinPaletteColor(belowMinColorSetValues);

            paletteRef.current.setNoResultsComputedValues(noReslutsColorComputedValues);

            paletteRef.current.setAboveMaxComputedValues(aboveMaxColorComputedValues);

            paletteRef.current.setBelowMinComputedValues(belowMinColorComputedValues);
            

            let newValueSet = getComputedValueSet(colorSetValues,valueSet);
            if(newValueSet !== null) {
                paletteRef.current.setPaletteValue(newValueSet);
                paletteRef.current.draw(ctx ,colorMapWindowSizeWidth ,colorMapWindowSizeHeight,selectedColorMap,derivedTypeName); 
            }
            paletteRef.current.setPaletteGap(paletteGap);
            paletteRef.current.setLegendTitle(legendTitle);
        }
        return () => {
            if(ctx && canvasRef.current !== null) {   
                const canvas = canvasRef.current as unknown as HTMLCanvasElement;
                ctx.clearRect(0,0,canvas.width,canvas.height);
            }
        }
    })

    return (
        <>
        <canvas ref={canvasRef} >
        </canvas>
        </>
    )
}

export default Legend