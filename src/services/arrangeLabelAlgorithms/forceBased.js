import * as d3 from 'd3';

const forceClampX = (min, max) => {
  let nodes;
  const force = () => {
    nodes.forEach((n) =>
    {
        if (n.y > max) { n.y = max; }
        if (n.y < min) { n.y = min; }
    });
  };

  force.initialize = f => nodes = f;
  return force;
}

const forceClampY = (min, max) => {
  let nodes;
  const force = () => {
    nodes.forEach((n) => {
      if (n.x > max) { n.x = max; }
      if (n.x < min) { n.x = min; }
    });
  };

  force.initialize = f => nodes = f;
  return force;
}
  
export default function forceBasedLabeler (data, viewport, label_array, anchor_array, labelWidth, labelHeight) {
  var {
    strength,
    forcecenter,
    forcemanybody,
    forcex,
    forcey,
    forcecollide,
    forceclamp,
  } = data;

  var { width, height } = viewport;

  var force = d3.forceSimulation(label_array)
    .force('charge', forcemanybody ? d3.forceManyBody().strength(strength) : null)
    .force('center', forcecenter ? d3.forceCenter(width / 2, height / 2) : null)
    .force('x', forcex ? d3.forceX().x(function(d, i) {
      return anchor_array[i].x
    }) : null)
    .force('y', forcey ? d3.forceY().y(function(d, i) {
      return anchor_array[i].y
    }) : null)
    .force('collision', forcecollide ? d3.forceCollide().radius(function(d) {
      return labelWidth
    }) : null)
    .force('clampy', forceclamp ? forceClampX(labelHeight, height) : null)
    .force('clampx', forceclamp ? forceClampY(0, width - labelWidth) : null)
    .stop();

    for (let index = 0; index < 200; index++) {
      force.tick()
    }
}