export interface labelData {
  id: any,
	x: number,
	y: number,
  width: number,
  height: number,
}

export interface anchorData {
  id: any,
	x: number,
	y: number
}

export interface viewport {
	width: number,
	height: number
}
  
export interface labelProp {
	width: number,
	height: number
}
  
export interface anchorProp {
	anchorRadius: number
}
  
export interface opts {
	algorithm: string,
	data: any
}
  
export interface labelPoint {
  id: any,
	x: number,
	y: number,
	width: number,
	height: number
}
  
export interface anchorPoint {
  id: any,
	x: number,
	y: number,
	r: number
}