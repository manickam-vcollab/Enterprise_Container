import MuiIconButton from "@material-ui/core/IconButton";
import Title from "../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title";

import SideBarContainer from "../../../layout/sideBar/sideBarContainer";
import BackButton from "../../../icons/back";
import { undoStack } from "components/utils/undoStack";

import {
  setWindowPos,
  setWindowAnchor,
  selectWindowSize,
  setEditMode,
} from "store/windowMgrSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/storeHooks";

import { goBack, push } from "connected-react-router/immutable";

import { windowId } from "../shared/colorPlot/colorplotWindow";

import MuiPlusIcon from "@material-ui/icons/Add";
import MuiMinusIcon from "@material-ui/icons/Remove";
import MuiGrid from "@material-ui/core/Grid";
import ColorPicker from "../../../shared/colorPicker";
import MuiTypography from "@material-ui/core/Typography";

import FileMoveUpIcon from "../../../icons/fileMoveUp";
import FIleMoveDownIcon from "../../../icons/fileMoveDown";
import HelpIcon from "@material-ui/icons/HelpOutline";

import { useState, useContext } from "react";

import HeaderIconButton from "../../../shared/headerIconButton/IconButton";
import MuiDeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import OptionContainer from "../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer";
import Option from "../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option";
import MuiButton from "@material-ui/core/Button";

import Slider from "react-slick";
import * as viewerAPIProxy from "../../../../backend/viewerAPIProxy";
import { selectActiveViewerID } from "../../../../store/appSlice";
import {
  selectColorPaletteData,
  selectlegendList,
  setApplyItem,
} from "../../../../store/sideBar/colormapSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useRef } from "react";

import MuiKeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import MuiKeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { ViewerContext } from "components/App";
import styles from "./style";

import LegendListPosition from "./legendPosition";
import SelectAction from "../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction";
import MuiMenuItem from "@material-ui/core/MenuItem";
import { hexToRgb } from "../../../utils/colorConvertion";

import {
  selectedColorPaletteId,
  editColorPalette,
  colorPaletteElements,
  setSelectedColorPalette,
  CheckedColorPalette,
  setIsColorSetValueChanged,
  updatePaletteColorSet,
  selectcolormapData,
  LegendType,
  setColorPalette,
} from "../../../../store/sideBar/colormapSlice";
import { TOUR_MENU_NAMES } from "components/utils/tourMenus";
import { DialogueProps, dialogueState } from "store/tutorialSlice";

import { useEffect } from "react";
import { Routes } from "routes";
import globalThemes from "theme/globalThemes";
import Checkbox from 'components/shared/checkbox';
import { FormControlLabel } from "@material-ui/core";

export default function ColorPalleteEdit() {
  const dispatch = useAppDispatch();
  const classes = styles();
  const customClasses = globalThemes();

  const slider = useRef(null);

  const onClickBackIcon = () => {
    dispatch(goBack());
  };

  const activeColorPaletteId = useAppSelector(selectedColorPaletteId);
  //const activeColorPaletteId_old = useAppSelector(selectedColorPaletteId);
  // const activeColorPaletteId = useAppSelector((state) =>
  //   CheckedColorPalette(state)
  // );
  const appliedColorMapId = useAppSelector((state)=>state.colormap.appliedColorMapId);
  const selectedColorMapId = useAppSelector(
    (state) => state.colormap.selectedColorMapId
  );

  const colorPaletteList = useAppSelector(
    (state) => state.colormap.colorPaletteTree.data
  );
  const windowSize = useAppSelector((state) =>
    selectWindowSize(state, windowId)
  );
  const listItems = useAppSelector(selectlegendList);
  const colormapsData = useAppSelector(selectcolormapData);
  const legendPaletteType = colormapsData[selectedColorMapId].paletteType;
  const appliedColorPaletteId = colormapsData[selectedColorMapId].colorPalette;
  const viewerContainerRef = useContext(ViewerContext);
  const [colorSet, setColorSet] = useState(
    colorPaletteList[activeColorPaletteId].colorSet
  );
  const [noResultColor, setNoResultColor] = useState(
    colorPaletteList[activeColorPaletteId].noResultColor
  );
  const [aboveMaxColor, setAboveMaxColor] = useState(
    colorPaletteList[activeColorPaletteId].aboveMaxColor
  );
  const [belowMinColor, setBelowMinColor] = useState(
    colorPaletteList[activeColorPaletteId].belowMinColor
  );
  const noResultColorRGBA = noResultColor[0].color;
  const belowMinColorRGBA    =  belowMinColor[0].color;
  const aboveMaxColorRGBA = aboveMaxColor[0].color;

  const [valueSet, setValueSet] = useState(
    colorPaletteList[activeColorPaletteId].valueSet
  );

  const [currentId, setCurrentId] = useState("-1");
  const colorPaletteNameList = useAppSelector(colorPaletteElements);
  const activeViewerID = useAppSelector(selectActiveViewerID);

  const [selectedColor, setSelectedColor] = useState<any>();
  const [selectNoResultColor, setSelectNoResultColor] = useState<any>();
  const [selectAboveMaxColor, setSelectAboveMaxColor] = useState<any>();
  const [selectBelowMinColor, setSelectBelowMinColor] = useState<any>();
  const [openDelete, setOpenDelete] = useState(false);
  const [idGenerator, setIdGenerator] = useState(colorSet.length);
  const colorpalette = useAppSelector(selectColorPaletteData);
    const colorMap = useAppSelector(selectcolormapData);
  const selectedColorMapColorPalette = colorMap[selectedColorMapId].colorPalette ;
  const [isReverseColorChecked, setReverseColorChecked] = useState();

  const viewOnly =
    colorPaletteList[activeColorPaletteId].pid === "0" ? true : false;

  useEffect(() => {
    setColorSet(colorPaletteList[activeColorPaletteId].colorSet);
    setNoResultColor(colorPaletteList[activeColorPaletteId].noResultColor);
    setAboveMaxColor(colorPaletteList[activeColorPaletteId].aboveMaxColor);
    setBelowMinColor(colorPaletteList[activeColorPaletteId].belowMinColor);
    setValueSet(colorPaletteList[activeColorPaletteId].valueSet);
  }, [activeColorPaletteId]);

  const handleAddColor = () => {
    const colorPicker = () => {
      const colorList = [
        { r: 255, g: 0, b: 0, a: 1 },
        { r: 0, g: 255, b: 0, a: 1 },
        { r: 0, g: 0, b: 255, a: 1 },
        { r: 255, g: 255, b: 0, a: 1 },
        { r: 0, g: 255, b: 255, a: 1 },
        { r: 255, g: 0, b: 255, a: 1 },
        { r: 192, g: 192, b: 192, a: 1 },
        { r: 128, g: 128, b: 128, a: 1 },
        { r: 128, g: 0, b: 0, a: 1 },
        { r: 128, g: 128, b: 0, a: 1 },
        { r: 0, g: 128, b: 0, a: 1 },
        { r: 128, g: 0, b: 128, a: 1 },
        { r: 0, g: 128, b: 128, a: 1 },
        { r: 0, g: 0, b: 128, a: 1 },
      ];

      const colorListFiltered = colorList.filter(
        (item) =>
          JSON.stringify(item) !==
          JSON.stringify(colorSet[colorSet.length - 1].color)
      );
      let randomColor =
        colorListFiltered[(Math.random() * colorListFiltered.length) | 0];
      return randomColor;
    };

    const newValueSet = [...valueSet];
    const newColor = {
      id: idGenerator,
      color: colorPicker(),
    };

    const newColorSet = [...colorSet, newColor];
    newValueSet.push("Auto");

    setColorSet(newColorSet);
    setValueSet(newValueSet);
    setIdGenerator(idGenerator + 1);
    setSelectedColor(null);
  };

  const onHandleSelect = (id: string) => {
    dispatch(setSelectedColorPalette(id));
  };

  const handleColorSelector = (colorSet: any) => {
    if (colorSet !== selectedColor) setSelectedColor(colorSet);
    else setSelectedColor(null);
    setColorsChanged(true);
    setSelectNoResultColor(null);
    setSelectAboveMaxColor(null);
    setSelectBelowMinColor(null);
    setOpenDelete(false);
  };

  // const handleNoResultColor = (noResultColor: any) => {
  //   if (noResultColor !== selectNoResultColor)
  //     setSelectNoResultColor(noResultColor);
  //   else setSelectNoResultColor(null);
  //   setSelectedColor(null);
  //   setOpenDelete(false);
  // };
  // const handleAboveMaxColor = (aboveMaxColor: any) => {
  //   if (aboveMaxColor !== selectAboveMaxColor)
  //     setSelectAboveMaxColor(aboveMaxColor);
  //   else setSelectAboveMaxColor(null);
  //   setSelectedColor(null);
  //   setOpenDelete(false);
  // };
  // const handleBelowMinColor = (belowMinColor: any) => {
  //   if (belowMinColor !== selectBelowMinColor)
  //     setSelectBelowMinColor(belowMinColor);
  //   else setSelectBelowMinColor(null);
  //   setSelectedColor(null);
  //   setOpenDelete(false);
  // };

  const [colorsChanged, setColorsChanged] = useState(false);

  const handleColorSelection = (color: any, category: string) => {
    switch (category) {
      case "noResult":
        if (color !== selectNoResultColor) {
          setSelectNoResultColor(color);
          setColorsChanged(true);
          setSelectAboveMaxColor(null); // Deselect other categories
          setSelectBelowMinColor(null);
        }
        break;
      case "aboveMax":
        if (color !== selectAboveMaxColor) {
          setSelectAboveMaxColor(color);
          setColorsChanged(true);
          setSelectNoResultColor(null); // Deselect other categories
          setSelectBelowMinColor(null);
        }
        break;
      case "belowMin":
        if (color !== selectBelowMinColor) {
          setSelectBelowMinColor(color);
          setColorsChanged(true);
          setSelectNoResultColor(null); // Deselect other categories
          setSelectAboveMaxColor(null);
        }
        break;
      default:
        break;
    }
  
    setSelectedColor(null);
    setOpenDelete(false);
  };

  const handleChangeComplete = (colorNew: any) => {
    colorNew = hexToRgb(colorNew, true);
    const index = colorSet.findIndex((item) => item.id === selectedColor.id);
    if (index >= 0) {
      let newArray = [...colorSet];
      newArray[index] = { ...newArray[index], color: colorNew };
      setColorSet(newArray);
      setSelectedColor(newArray[index]);
    }
  };

  const handleNoResultColorChangeComplete = (changedColor: any) => {
    changedColor = hexToRgb(changedColor, true);
    const noResultColorIndex = noResultColor.findIndex(
      (item) => item.id === selectNoResultColor.id
    );
    if (noResultColorIndex >= 0) {
      let noResultArray = [...noResultColor];
      noResultArray[noResultColorIndex] = {
        ...noResultArray[noResultColorIndex],
        color: changedColor,
      };
      setNoResultColor(noResultArray);
      setSelectNoResultColor(noResultArray[noResultColorIndex]);
    }
  };
  const handleAboveMaxColorChangeComplete = (changedColor: any) => {
    changedColor = hexToRgb(changedColor, true);
    const aboveMaxColorIndex = aboveMaxColor.findIndex(
      (item) => item.id === selectAboveMaxColor.id
    );
    if (aboveMaxColorIndex >= 0) {
      let aboveMaxArray = [...aboveMaxColor];
      aboveMaxArray[aboveMaxColorIndex] = {
        ...aboveMaxArray[aboveMaxColorIndex],
        color: changedColor,
      };
      setAboveMaxColor(aboveMaxArray);
      setSelectAboveMaxColor(aboveMaxArray[aboveMaxColorIndex]);
    }
  };
  const handleBelowMinColorChangeComplete = (changedColor: any) => {
    changedColor = hexToRgb(changedColor, true);
    const belowMinIndex = belowMinColor.findIndex(
      (item) => item.id === selectBelowMinColor.id
    );
    if (belowMinIndex >= 0) {
      let belowMinArray = [...belowMinColor];
      belowMinArray[belowMinIndex] = {
        ...belowMinArray[belowMinIndex],
        color: changedColor,
      };
      setBelowMinColor(belowMinArray);
      setSelectBelowMinColor(belowMinArray[belowMinIndex]);
    }
  };

  const onHandlDownButton = () => {
    const indexOfSelected = colorSet.findIndex(
      (item) => item.id === selectedColor.id
    );
    let newArray = [...colorSet];
    newArray.splice(indexOfSelected, 1);
    newArray.splice(indexOfSelected + 1, 0, selectedColor);

    setColorSet(newArray);
  };

  const onHandleUpButton = () => {
    const indexOfSelected = colorSet.findIndex(
      (item) => item.id === selectedColor.id
    );
    let newArray = [...colorSet];
    newArray.splice(indexOfSelected, 1);
    newArray.splice(indexOfSelected - 1, 0, selectedColor);

    setColorSet(newArray);
  };

  const onHandleDeleteButton = () => {
    setOpenDelete(true);
  };

  const onHandleDelete = () => {
    const newValueData = [...valueSet];
    const newColorData = colorSet.filter(
      (item) => item.id !== selectedColor.id
    );

    if (colorSet.length !== newColorData.length) newValueData.pop();

    setColorSet(newColorData);
    setValueSet(newValueData);
    setSelectedColor(null);
    setOpenDelete(false);
  };

  const onHandleApply = () => {
    let legendType =
      parseInt(legendPaletteType) === LegendType.CONTINUOUS ? 0 : 1;
    let colorSetValues: any[] = [];
        if (appliedColorPaletteId === activeColorPaletteId) {
          dispatch(
            updatePaletteColorSet({
              activeColorPaletteId,
              colorSet,
              valueSet,
              noResultColor,
              aboveMaxColor,
              belowMinColor
            })
          ).then((response: any) => {
            response.payload.payload.colorData.forEach((data: any) => {
              let R = data.color.r;
              let G = data.color.g;
              let B = data.color.b;
              //let A = data.color.a ;
              colorSetValues.push([R, G, B]);
            });
            dispatch(setIsColorSetValueChanged(true));
            //let newColorSet = colorSetValues.slice(1, colorSetValues.length - 1);
            viewerAPIProxy.setAboveMaxColor([aboveMaxColorRGBA.r,aboveMaxColorRGBA.g,aboveMaxColorRGBA.b,aboveMaxColorRGBA.a],  activeViewerID);
            viewerAPIProxy.setBelowMinColor([belowMinColorRGBA.r,belowMinColorRGBA.g,belowMinColorRGBA.b,belowMinColorRGBA.a],  activeViewerID);
            viewerAPIProxy.setNoResultColor([noResultColorRGBA.r, noResultColorRGBA.g, noResultColorRGBA.b,noResultColorRGBA.a], activeViewerID);
            viewerAPIProxy.setLegendData(legendType, colorSetValues, activeViewerID);
            dispatch(push(Routes.COLORMAPS_COLOR_PALETTE));
            setColorsChanged(false);
          });
        } else {
          dispatch(
            editColorPalette({
              colorPaletteId: activeColorPaletteId,
              colorData: colorSet,
              noResultColorData: noResultColor,
              aboveMaxColorData:aboveMaxColor,
              belowMinColorData:belowMinColor,
              valueData: valueSet,
            })
          );
          // dispatch(
          //   setColorPalette({
          //     colorMapId: selectedColorMapId,
          //     colorPaletteId: activeColorPaletteId,
          //   })
          // );
          dispatch(push(Routes.COLORMAPS_COLOR_PALETTE));
          setColorsChanged(false);
      }
  };

  const onHandleReset = () => {
    setColorSet(colorPaletteList[activeColorPaletteId].colorSet);
  };

  const handleCheck = (e:any) => {
    let reversedArray = colorSet.map((obj, index, arr) => {
      return {
        id: arr.length-1 - index,
        color: obj.color
      };
    }).reverse();

    if (e.target.checked) {
      setSelectAboveMaxColor(colorPaletteList[activeColorPaletteId].belowMinColor[0])
      setAboveMaxColor(colorPaletteList[activeColorPaletteId].belowMinColor)
      
      // setSelectBelowMinColor(colorPaletteList[activeColorPaletteId].aboveMaxColor[0])
      setBelowMinColor(colorPaletteList[activeColorPaletteId].aboveMaxColor);
    } else {
      // setSelectAboveMaxColor(colorPaletteList[activeColorPaletteId].aboveMaxColor[0])
      setAboveMaxColor(colorPaletteList[activeColorPaletteId].aboveMaxColor)
      
      setSelectBelowMinColor(colorPaletteList[activeColorPaletteId].belowMinColor[0])
      setBelowMinColor(colorPaletteList[activeColorPaletteId].belowMinColor);

    }

    setColorsChanged(true);
    setColorSet(reversedArray)
  }

  const getHeaderLeftIcon = () => {
    return (
      <MuiIconButton onClick={() => onClickBackIcon()}>
        <BackButton />
      </MuiIconButton>
    );
  };

  const applySelcetedItem = (
    id: string,
    isSeleced: boolean,
    undoable?: boolean
  ) => {
    if (viewerContainerRef?.current) {
      let rect = viewerContainerRef.current.getBoundingClientRect();
      let uid = windowId;
      let w = rect.width;
      let h = rect.height;
      let winWidth = windowSize[0];
      let winHeight = windowSize[1];

      let oldValue: any;

      if (currentId === "-1") oldValue = "2";
      else oldValue = currentId;

      setCurrentId(id);

      switch (id) {
        case "1":
          dispatch(setWindowPos({ uid, pos: [w - winWidth, 0] }));
          dispatch(setWindowAnchor({ uid, anchor: [winWidth, 0] }));
          break;
        case "2":
          dispatch(setWindowPos({ uid, pos: [0, 0] }));
          dispatch(setWindowAnchor({ uid, anchor: [0, 0] }));
          break;
        case "3":
          dispatch(
            setWindowPos({ uid, pos: [w - winWidth, h / 2 - winHeight / 2] })
          );
          dispatch(setWindowAnchor({ uid, anchor: [winWidth, 0] }));
          break;
        case "4":
          dispatch(setWindowPos({ uid, pos: [0, h / 2 - winHeight / 2] }));
          dispatch(setWindowAnchor({ uid, anchor: [0, 0] }));
          break;
        case "5":
          dispatch(setWindowPos({ uid, pos: [0, h - winHeight] }));
          dispatch(setWindowAnchor({ uid, anchor: [0, winHeight] }));
          break;
        case "6":
          dispatch(setWindowPos({ uid, pos: [w - winWidth, h - winHeight] }));
          dispatch(setWindowAnchor({ uid, anchor: [winWidth, winHeight] }));
          break;
        case "7":
          dispatch(setEditMode({ uid, isEdit: true }));
          break;
        default:
          break;
      }
      dispatch(setApplyItem(id));

      if (undoable) {
        undoStack.add({
          undo: () => applySelcetedItem(oldValue, isSeleced),
          redo: () => applySelcetedItem(id, isSeleced),
        });
      }
    }
  };

  let dialogProps: DialogueProps = {
    dialogueRun: true,
    tourName: TOUR_MENU_NAMES.COLOR_MAP_EDIT,
  };

  const onhandleHelpClick = (e: any) => {
    dispatch(dialogueState(dialogProps));
  };

  const getHeaderRightIcon = () => {
    return (
      <div>
        {/* <LegendListPosition
          items={listItems}
          onSelectMenuList={applySelcetedItem}
        ></LegendListPosition> */}
        {/* <MuiIconButton onClick={(event) =>onhandleHelpClick(event)}><HelpIcon/></MuiIconButton> */}
        <HeaderIconButton
          icon={<HelpIcon />}
          label={"helpIcon"}
          disabled={false}
          onClick={onhandleHelpClick}
        ></HeaderIconButton>
      </div>
    );
  };

  const SampleNextArrow = () => {
    return null;
  };

  const getAction = () => {
    return (
      <SelectAction
        labelId="display-modes-selection-label-id"
        id="display-modes-selection-id"
        value={activeColorPaletteId}
        onChange={(e: any) => onHandleSelect(e.target.value)}
        MenuProps={{
          disablePortal: true,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          getContentAnchorEl: null,
        }}
      >
        {colorPaletteNameList.map((item: any) => (
          <MuiMenuItem className={customClasses.selected} value={item.id}>
            {item.name}
          </MuiMenuItem>
        ))}
      </SelectAction>
    );
  };

  const getBody = () => {
    const settings = {
      dots: false,
      infinite: false,
      slidesToShow: 5,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true,
      swipeToSlide: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SampleNextArrow />,
    };

    return (
      <div>
        <div style={{ marginTop: "20px" }}>
          <div>
            <MuiGrid container>
              <MuiGrid item xs={4}>
                <div
                  style={{ textTransform: "none", marginLeft: "10px" }}
                  className={classes.sidebarText}
                >
                  Add Color
                </div>
              </MuiGrid>
              <MuiGrid item xs={6}></MuiGrid>
              <MuiGrid item xs={2}>
                <MuiIconButton size="small" disabled={viewOnly}>
                  <MuiPlusIcon onClick={handleAddColor} />
                </MuiIconButton>
              </MuiGrid>
            </MuiGrid>
          </div>

          <div style={{ overflow: "hidden" }}>
            <MuiGrid
              container
              spacing={2}
              style={{ marginLeft: "3px", marginTop: "10px", height: "270px" }}
            >
              <MuiGrid item xs={2}>
                {colorSet.length <= 5 ? null : (
                  <MuiIconButton
                    style={{ marginTop: "-18px", marginLeft: "-5px" }}
                    size="small"
                    onClick={() => slider?.current?.slickPrev()}
                  >
                    {" "}
                    <MuiKeyboardArrowUpIcon />{" "}
                  </MuiIconButton>
                )}
                <div style={{ marginTop: "-5px" }}>
                  <Slider ref={slider} {...settings}>
                    {colorSet.map((item: any, index: number) => (
                      <div>
                        <div
                          key={"divParent_" + index}
                          className={
                            selectedColor
                              ? item.id !== selectedColor.id
                                ? classes.colorPicker
                                : classes.active
                              : classes.colorPicker
                          }
                          style={{
                            height: "30px",
                            marginTop: "4px",
                            width: "30px",
                            backgroundColor: `rgb(${item.color.r},${item.color.g},${item.color.b})`,
                          }}
                          onClick={() => handleColorSelector(item)}
                        ></div>
                      </div>
                    ))}
                  </Slider>
                </div>
                {colorSet.length <= 5 ? null : (
                  <MuiIconButton
                    style={{ marginTop: "-5px", marginLeft: "-5px" }}
                    size="small"
                    onClick={() => slider?.current?.slickNext()}
                  >
                    {" "}
                    <MuiKeyboardArrowDownIcon />
                  </MuiIconButton>
                )}
              </MuiGrid>

              <MuiGrid item xs={4} style={{ marginLeft: "2px" }}>
                <ColorPicker
                  color={
                    selectedColor
                    ? selectedColor.color
                    : selectNoResultColor
                    ? selectNoResultColor.color
                    : selectAboveMaxColor
                    ? selectAboveMaxColor.color
                    : selectBelowMinColor
                    ? selectBelowMinColor.color
                    : { r: 255, g: 255, b: 255, a: 1 }
                  }
                  onChangeComplete={
                    (selectedColor && !viewOnly && handleChangeComplete) ||
                    (selectNoResultColor &&
                      !viewOnly &&
                      handleNoResultColorChangeComplete) ||
                      (selectAboveMaxColor &&
                        !viewOnly &&
                        handleAboveMaxColorChangeComplete) ||
                        (selectBelowMinColor &&
                          !viewOnly &&
                          handleBelowMinColorChangeComplete)
                  }
                />
              </MuiGrid>
            </MuiGrid>
          </div>
        </div>

        <div style={{ marginLeft: "10px" }}>
          <div style={{ marginTop: "-10px", display: "flex" }}>
            {/* <Slider ref={slider} {...settings}> */}
            {noResultColor.map((item: any, index: number) => (
              // <div>
              <div
                key={"divParent_" + index}
                className={
                  selectNoResultColor
                    ? item.id !== selectNoResultColor.id
                      ? classes.colorPicker
                      : classes.active
                    : classes.colorPicker
                }
                style={{
                  height: "30px",
                  marginTop: "4px",
                  width: "30px",
                  // display:'inline',
                  backgroundColor: `rgb(${item.color.r},${item.color.g},${item.color.b})`,
                }}
                onClick={() => handleColorSelection(item, "noResult")}
              ></div>
              // </div>
            ))}
            {/* </Slider> */}

            <div
              style={{
                textTransform: "none",
                marginTop: "10px",
                marginLeft: "10px",
              }}
              className={classes.sidebarText}
            >
              No Results Color
            </div>
          </div>
          <div style={{ marginTop: "5px", display: "flex" }}>
            {/* <Slider ref={slider} {...settings}> */}
            {aboveMaxColor.map((item: any, index: number) => (
              // <div>
              <div
                key={"divParent_" + index}
                className={
                  selectAboveMaxColor
                    ? item.id !== selectAboveMaxColor.id
                      ? classes.colorPicker
                      : classes.active
                    : classes.colorPicker
                }
                style={{
                  height: "30px",
                  marginTop: "4px",
                  width: "30px",
                  // display:'inline',
                  backgroundColor: `rgb(${item.color.r},${item.color.g},${item.color.b})`,
                }}
                onClick={() => handleColorSelection(item, "aboveMax")}
              ></div>
              // </div>
            ))}
            {/* </Slider> */}

            <div
              style={{
                textTransform: "none",
                marginTop: "10px",
                marginLeft: "10px",
              }}
              className={classes.sidebarText}
            >
              Above Max Color
            </div>
          </div>
          <div style={{ marginTop: "5px", display: "flex" }}>
            {/* <Slider ref={slider} {...settings}> */}
            {belowMinColor.map((item: any, index: number) => (
              // <div>
              <div
                key={"divParent_" + index}
                className={
                  selectBelowMinColor
                    ? item.id !== selectBelowMinColor.id
                      ? classes.colorPicker
                      : classes.active
                    : classes.colorPicker
                }
                style={{
                  height: "30px",
                  marginTop: "4px",
                  width: "30px",
                  // display:'inline',
                  backgroundColor: `rgb(${item.color.r},${item.color.g},${item.color.b})`,
                }}
                onClick={() => handleColorSelection(item, "belowMin")}
              ></div>
              // </div>
            ))}
            {/* </Slider> */}

            <div
              style={{
                textTransform: "none",
                marginTop: "10px",
                marginLeft: "10px",
              }}
              className={classes.sidebarText}
            >
              Below Min Color
            </div>
          </div>
          <div
            style={{ textTransform: "none", marginTop: "10px" }}
            className={classes.sidebarText}
          >
            Preview
          </div>
          <div style={{ marginTop: "10px" }}>
            <div
              style={{ textTransform: "none" }}
              className={classes.sidebarText}
            >
              Discrete
            </div>
            <MuiGrid container style={{ marginTop: "5px" }}>
              {colorSet.map((item: any, index: number) => (
                <MuiGrid
                  item
                  key={"divParent_" + index}
                  style={{
                    width: 280 / colorSet.length,
                    height: "30px",
                    backgroundColor: `rgb(${item.color.r},${item.color.g},${item.color.b})`,
                  }}
                ></MuiGrid>
              ))}
            </MuiGrid>
          </div>

          <div style={{ marginTop: "10px" }}>
            <div
              style={{ textTransform: "none" }}
              className={classes.sidebarText}
            >
              Continous
            </div>

            {colorSet.length === 1 ? (
              <div
                style={{
                  width: 280,
                  marginTop: "5px",
                  height: "30px",
                  background: `rgb(${colorSet[0].color.r},${colorSet[0].color.g},${colorSet[0].color.b})`,
                }}
              ></div>
            ) : (
              <div
                style={{
                  width: 280,
                  marginTop: "5px",
                  height: "30px",
                  backgroundImage: `linear-gradient(to right, ${colorSet.map(
                    (item) =>
                      `rgb(${item.color.r},${item.color.g},${item.color.b})`
                  )})`,
                }}
              ></div>
            )}
          </div>
          {viewOnly ? null : 
                <div>
                  <FormControlLabel 
                          className={classes.sidebarText}
                          style={{marginTop:'5px'}}
                          control={
                            <Checkbox  
                              checked={isReverseColorChecked}
                              onChange={handleCheck}
                              // disabled={viewOnly ? null : true}
                            />
                          } 
                          label="Reverse Color" 
                    />
              </div>}
          
        </div>
      </div>
    );
  };

  const getFooter = () => {
    let disableDown = true;
    let disableUp = true;

    const disabled = !colorsChanged;

    if (selectedColor) {
      const indexOfSelected = colorSet.findIndex(
        (item) => item.id === selectedColor.id
      );
      if (indexOfSelected !== colorSet.length - 1) disableDown = false;
    }

    if (selectedColor) {
      const indexOfSelected = colorSet.findIndex(
        (item) => item.id === selectedColor.id
      );
      if (indexOfSelected !== 0) disableUp = false;
    }

    if (
      JSON.stringify(colorSet) !==
      JSON.stringify(colorPaletteList[activeColorPaletteId].colorSet)
    )
      // disabled = false;

    if (selectNoResultColor) {
      const indexOfSelected = noResultColor.findIndex(
        (item) => item.id === selectNoResultColor.id
      );
      if (indexOfSelected !== colorSet.length - 1) disableDown = false;
    }

    if (selectNoResultColor) {
      const indexOfSelected = noResultColor.findIndex(
        (item) => item.id === selectNoResultColor.id
      );
      if (indexOfSelected !== 0) disableUp = false;
    }

      // if(selectAboveMaxColor){
      //   const indexOfSelected = aboveMaxColor.findIndex(
      //     (item) => item.id === selectAboveMaxColor.id
      //   );
      //   if (indexOfSelected !== colorSet.length - 1) disableDown = false;
      // }

      if(selectAboveMaxColor){
        const indexOfSelected = aboveMaxColor.findIndex(
          (item) => item.id === selectAboveMaxColor.id
        );
        if (indexOfSelected !== 0) disableUp = false;
      }

      // if(selectBelowMinColor){
      //   const indexOfSelected = belowMinColor.findIndex(
      //     (item) => item.id === selectBelowMinColor.id
      //   );
      //   if (indexOfSelected !== colorSet.length - 1) disableDown = false;
      // }

      if(selectBelowMinColor){
        const indexOfSelected = belowMinColor.findIndex(
          (item) => item.id === selectBelowMinColor.id
        );
        if (indexOfSelected !== 0) disableUp = false;
      }

      // if (
      //   JSON.stringify(noResultColor) !==
      //   JSON.stringify(colorPaletteList[activeColorPaletteId].noResultColor)
      // )
      // if (
      //   JSON.stringify(aboveMaxColor) !==
      //   JSON.stringify(colorPaletteList[activeColorPaletteId].aboveMaxColor)
      // )
      // if (
      //   JSON.stringify(belowMinColor) !==
      //   JSON.stringify(colorPaletteList[activeColorPaletteId].belowMinColor)
      // )
      //   disabled = false;
    // }

    return (
      <div>
        {!openDelete ? (
          <div>
            {viewOnly ? null : (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
              >
                <MuiButton
                  // style={{
                  //   backgroundColor: "#5958FF",
                  //   width: "20%",
                  //   fontSize: "9px",
                  //   marginRight: "5px",
                  // }}
                  className={customClasses.Muibtn}
                  autoFocus
                  onClick={onHandleApply}
                  // color="primary"
                  disabled={disabled}
                >
                  Save
                </MuiButton>

                <MuiButton
                  // style={{ width: "20%", fontSize: "9px", marginRight: "5px" }}
                  className={customClasses.BtnOutlined}
                  autoFocus
                  onClick={onHandleReset}
                  // color="primary"
                  disabled={disabled}
                >
                  Reset
                </MuiButton>
              </div>
            )}
            <OptionContainer>
              <div style={{marginTop:'25px'}}>
                <Option
                  label="Down"
                  active={disableDown || viewOnly}
                  icon={FIleMoveDownIcon}
                  onClickUpdate={onHandlDownButton}
                />
              </div>
              <div style={{marginTop:'25px'}}>
                <Option
                  label="Up"
                  active={disableUp || viewOnly}
                  icon={FileMoveUpIcon}
                  onClickUpdate={onHandleUpButton}
                />
              </div>
              <div style={{marginTop:'25px'}}>
                <Option
                  label="Delete"
                  active={!selectedColor || colorSet.length <= 3 || viewOnly}
                  icon={MuiDeleteForeverOutlinedIcon}
                  onClickUpdate={onHandleDeleteButton}
                />
              </div>
              
            </OptionContainer>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: "5px", marginTop: "5px" }}>
              <MuiTypography style={{ marginBottom: "5px", fontSize: "14px" }}>
                Are you sure want to delete ?
              </MuiTypography>
              <div style={{ alignContent: "center" }}>
                <MuiButton
                  style={{
                    backgroundColor: "#5958FF",
                    width: "20%",
                    fontSize: "9px",
                    marginRight: "5px",
                  }}
                  autoFocus
                  onClick={onHandleDelete}
                  // color="primary"
                >
                  Confirm
                </MuiButton>
                <MuiButton
                  style={{ width: "20%", fontSize: "9px" }}
                  onClick={() => setOpenDelete(false)}
                  // color="primary"
                >
                  Cancel
                </MuiButton>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <SideBarContainer
      headerContent={<Title text={"Color palette - Edit"} group="Color Maps" />}
      headerAction={getAction()}
      headerRightIcon={getHeaderRightIcon()}
      body={getBody()}
      footer={getFooter()}
    />
  );
}
