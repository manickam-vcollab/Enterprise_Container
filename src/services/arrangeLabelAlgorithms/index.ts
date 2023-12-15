import { idText } from 'typescript';
import simulatedAnnealingLabeler from './SimulatedAnnealing';
import forceBasedLabeler from './forceBased';
import { anchorData, labelData, viewport, labelProp, anchorProp, opts, labelPoint, anchorPoint } from './types';
  
var anchor_array: any[] = [];
var anc_prop = {};
  
export default function labelPositioner (
    options: opts,
    viewport: viewport,
    labelPoints: labelData[],
    labelProperties: labelProp,
    anchorPoints: anchorData[], // optional argument. If anchorPoints are not provided, it will take labelPoints as the anchorPoints
    anchorProperties?: anchorProp // optional argument. If anchorProperties is not provided, it will take anchorRadius as 0
  ): labelData[] {
	var { algorithm, data } = options;
    var { width, height } = viewport;
  
	var outputLabelArray: labelData[] = [];
  
	var ancPts = anchorPoints ?
	  anchorPoints :
	  (anchor_array && anchor_array.length) ?
	  anchor_array :
	  labelPoints;
  
	var ancProp: any = (anchorProperties && Object.keys(anchorProperties).length > 0) ? anchorProperties : anc_prop;
	var { anchorRadius } = ancProp;
  
	anchor_array = [];
	ancPts.forEach(d => {
	  var anchor: anchorPoint = {
      id: d.id,
      x: d.x,
      y: d.y,
      r: (anchorRadius || 10)
	  };
  
	  anchor_array.push(anchor);
	});
  
	var labelHeight = labelProperties?.height;
	var labelWidth = labelProperties?.width;
	var label_array: labelPoint[] = [];
  
	labelPoints.forEach(d => {
	  var label: labelPoint = {
      id: d.id,
      x: d.x,
      y: d.y,
      width: labelWidth,
      height: labelHeight
	  }
  
	  label_array.push(label);
	});
  
	if (algorithm === 'simulated_annealing') {
	  var { nsweeps } = data;
  
	  simulatedAnnealingLabeler(label_array, anchor_array, width, height, nsweeps);
	  
	  label_array.forEach(element => {
      var newObj: labelData = {
        id: element.id,
        x: element.x,
        y: element.y
      };
    
      outputLabelArray.push(newObj);
	  });
	}
  
	if (algorithm === 'force_based') {
	  forceBasedLabeler(data, viewport, label_array, anchor_array, labelWidth, labelHeight);
  
	  label_array.forEach(d => {
		var newItm: labelData = {
      id: d.id,
		  x: d.x,
		  y: d.y
		};
  
		outputLabelArray.push(newItm);
	  })
	}
	
	return outputLabelArray;
}