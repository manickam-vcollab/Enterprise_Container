import { LabelType } from "store/sideBar/labelSlice/shared/types";
import { Layers } from "store/windowMgrSlice";
import {
  selectLabelData,
  setLabelPos,
  toggleVisibility,
  windowPrefixId,
} from "../../../../store/sideBar/labelSlice/AllLabelSlice";
//} from "../../../../store/sideBar/labelSlice/labelAllSlice";
import { useAppSelector } from "../../../../store/storeHooks";
import Chart from "./Chart";

interface Props {
  parentRef: any;
  layerId: Layers;
}
function ChartWindowLayer(props: Props) {
  const labelTree = useAppSelector(selectLabelData);
  return (
    <>
      {[...Object.values(labelTree)].map((label) => {
        return (label.labelType === LabelType.LABELCHART && label.title.includes("LineChart") )? (
          <Chart
            key={label.id}
            layerId={props.layerId}
            windowPrefixId={windowPrefixId}
            label={label}
            setLabelPosReducer={setLabelPos}
            parentRef={props.parentRef}
          />
        ) : null;
      })}
    </>
  );
}

export default ChartWindowLayer;
