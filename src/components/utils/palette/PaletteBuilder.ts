import { PaletteColor } from "../palette/types/palette"
import { LegendType, LegendDirection,ValueNature, LegendTicsType, LegendValuePlacement, LegendTitlePlacement,AddValue,selectId  } from '../../../store/sideBar/colormapSlice';
import {selectedColormapID,selectcolormapData} from '../../../../src/store/sideBar/colormapSlice';
import { useAppDispatch, useAppSelector } from "../../../../src/store/storeHooks";
import { selectThems } from "store/sideBar/settings";
import {setWindowSize} from '../../../store/windowMgrSlice';
import { useTheme } from '@material-ui/core/styles';
import { useStore } from 'react-redux';
import store from "store";
import * as d3 from 'd3';
 
type PaletteElementOptions = {
    x: number;
    y: number;
    m: number;
    n: number;
    width: number;
    height: number;
    colorTop: string;
    colorBottom: string;
    noResultsColor:string;
    aboveMaxColor:string;
    belowMinColor:string;
    horizontalNoResultcolor:string;
    horizontalAboveMaxColor:string;
    horizontalBelowMinColor:string;
    horizontalYBelowMinColor:string;
    textTop: string;
    textCenter: string;
    noResultText:string;
    aboveMaxText:string;
    belowMinText:string;
    textBottom: string;
    textColor: string;
    valueType: ValueType;
    variable:string;
    steps:string;
    derivedType:string;
    title:string;
    paletteType: LegendType;
    valueNature:ValueNature;
    paletteDirection: LegendDirection;
    valuePlacement: LegendValuePlacement;
    titlePlacement: LegendTitlePlacement;
    ticks: LegendTicsType;
    gap:number;
    valuePlacementRight:number;  
    valuePlacementLeft:number;   
    valuePlacementTop:number;   
    valuePlaceentBottom:number;  
}
enum ValueType {
    NA = 'na',
    FLOAT = 'float'
}
class PaletteElement {
    private x: number;
    private y: number;
    private m: number;
    private n: number;
    private width: number;
    private height: number;
    private colorTop: string;
    private colorBottom: string;
    private noResultsColor: string;
    private aboveMaxColor: string;
    private belowMinColor:string;
    private horizontalNoResultcolor : string;
    private horizontalAboveMaxColor : string;
    private horizontalBelowMinColor :string;
    private horizontalYBelowMinColor :string;
    private textTop: string;
    private textCenter: string;
    private noResultText: string;
    private aboveMaxText: string;
    private belowMinText:string;
    private textBottom: string;
    private textColor: string;
    private valueType: ValueType;
    private title :string;
    private variable:string;
    private steps:string;
    private derivedType:string;
    private paletteType: LegendType;
    private valueNature:ValueNature;
    private paletteDirection: LegendDirection;
    private valuePlacement: LegendValuePlacement;
    private titlePlacement: LegendTitlePlacement;
    private ticks: LegendTicsType;
    private gap:number;



    constructor(options: PaletteElementOptions) {
        this.x = options.x;
        this.y = options.y;
        this.m = options.m;
        this.n = options.n;
        this.width = options.width;
        this.height = options.height;
        this.colorTop = options.colorTop;
        this.colorBottom = options.colorBottom;
        this.horizontalNoResultcolor = options.horizontalNoResultcolor;
        this.horizontalAboveMaxColor = options.horizontalAboveMaxColor;
        this.horizontalBelowMinColor = options.horizontalBelowMinColor;
        this.horizontalYBelowMinColor = options.horizontalYBelowMinColor;
        this.noResultsColor = options.noResultsColor;
        this.aboveMaxColor = options.aboveMaxColor;
        this.belowMinColor = options.belowMinColor;
        this.textTop = options.textTop;
        this.textCenter = options.textCenter;
        this.noResultText = options.noResultText;
        this.aboveMaxText = options.aboveMaxText;
        this.belowMinText = options.belowMinText;
        this.textBottom = options.textBottom;
        this.textColor = options.textColor;
        this.valueType = options.valueType;
        this.title = options.title;
        this.variable = options.variable;
        this.steps = options.steps;
        this.derivedType = options.derivedType;
        this.paletteType = options.paletteType;
        this.valueNature = options.valueNature;
        this.paletteDirection = options.paletteDirection;
        this.valuePlacement = options.valuePlacement;
        this.titlePlacement = options.titlePlacement;
        this.ticks = options.ticks;
        this.gap = options.gap;
    }

    noResultsColordraw(ctx: CanvasRenderingContext2D, paletteCount: number, colorCountLength: number , paletteElementGap:number) {
        
        if(this.valuePlacement === LegendValuePlacement.LEFT || this.valuePlacement === LegendValuePlacement.ALTERNATING ) {

            //let textWidth =  ctx.measureText(this.textBottom);
  
            if(this.paletteDirection === LegendDirection.VERTICAL) {
  
              if(this.x === 50) {
                  this.x = this.x + 50;
              }
             
  
           }
        

        }
        if(this.paletteDirection === LegendDirection.VERTICAL && this.titlePlacement === LegendTitlePlacement.BOTTOM) {
            this.y = this.y - 50;

        }

          
           
        if(this.paletteDirection === LegendDirection.HORIZONTAL )
        {
           
            this.x = this.horizontalNoResultcolor
            this.y = this.horizontalYBelowMinColor
        }

        if(this.paletteDirection === LegendDirection.HORIZONTAL && this.titlePlacement === LegendTitlePlacement.BOTTOM_LEFT || this.titlePlacement === LegendTitlePlacement.BOTTOM_MIDDLE || this.titlePlacement === LegendTitlePlacement.BOTTOM_RIGHT) {
            this.y = this.y - 40;

        }
       
        
       this.setGap(paletteElementGap);
        this.createNoResultsPaletteFillColor(ctx , paletteElementGap);
        this.createNoResultsTicPosition(ctx , colorCountLength,paletteCount);
        
         this.setNoResultsValuePosition(ctx,paletteElementGap,paletteCount);
    }

    aboveMaxColordraw(ctx: CanvasRenderingContext2D, paletteCount: number, colorCountLength: number , paletteElementGap:number) {
        
        if(this.valuePlacement === LegendValuePlacement.LEFT || this.valuePlacement === LegendValuePlacement.ALTERNATING ) {

            //let textWidth =  ctx.measureText(this.textBottom);
  
            if(this.paletteDirection === LegendDirection.VERTICAL) {
  
              if(this.x === 50) {
                  this.x = this.x + 50;
              }
             
  
           }
        

        }
        if(this.paletteDirection === LegendDirection.VERTICAL && this.titlePlacement === LegendTitlePlacement.BOTTOM) {
            this.y = this.y - 50;

        }

          
           
        if(this.paletteDirection === LegendDirection.HORIZONTAL )
        {
           
            this.x = this.horizontalAboveMaxColor 
            this.y = this.horizontalYBelowMinColor
        }

        if(this.paletteDirection === LegendDirection.HORIZONTAL && this.titlePlacement === LegendTitlePlacement.BOTTOM_LEFT || this.titlePlacement === LegendTitlePlacement.BOTTOM_MIDDLE || this.titlePlacement === LegendTitlePlacement.BOTTOM_RIGHT) {
            this.y = this.y - 40;

        }
       
        
       this.setGap(paletteElementGap);
        this.createAboveMaxPaletteFillColor(ctx , paletteElementGap);
        // this.createAboveMaxTicPosition(ctx , colorCountLength,paletteCount);
        
         this.setAboveMaxValuePosition(ctx,paletteElementGap,paletteCount);
    }

    belowMinColordraw(ctx: CanvasRenderingContext2D, paletteCount: number, colorCountLength: number , paletteElementGap:number) {
        
        if(this.valuePlacement === LegendValuePlacement.LEFT || this.valuePlacement === LegendValuePlacement.ALTERNATING ) {

            //let textWidth =  ctx.measureText(this.textBottom);
  
            if(this.paletteDirection === LegendDirection.VERTICAL) {
  
              if(this.x === 50) {
                  this.x = this.x + 50;
              }
             
  
           }
        

        }
        if(this.paletteDirection === LegendDirection.VERTICAL && this.titlePlacement === LegendTitlePlacement.BOTTOM) {
            this.y = this.y - 50;

        }

          
           
        if(this.paletteDirection === LegendDirection.HORIZONTAL )
        {
           
            this.x = this.horizontalBelowMinColor
            this.y = this.horizontalYBelowMinColor
        }

        if(this.paletteDirection === LegendDirection.HORIZONTAL && this.titlePlacement === LegendTitlePlacement.BOTTOM_LEFT || this.titlePlacement === LegendTitlePlacement.BOTTOM_MIDDLE || this.titlePlacement === LegendTitlePlacement.BOTTOM_RIGHT) {
            this.y = this.y - 40;

        }
       
        
       this.setGap(paletteElementGap);
        this.createBelowMinPaletteFillColor(ctx , paletteElementGap);
        // this.createBelowMinTicPosition(ctx , colorCountLength,paletteCount);
        
         this.setBelowMinValuePosition(ctx,paletteElementGap,paletteCount);
    }

    draw(ctx: CanvasRenderingContext2D, paletteCount: number, colorCountLength: number , paletteElementGap:number) {


         if(this.valuePlacement === LegendValuePlacement.LEFT || this.valuePlacement === LegendValuePlacement.ALTERNATING ) {

          //let textWidth =  ctx.measureText(this.textBottom);

          if(this.paletteDirection === LegendDirection.VERTICAL) {

            if(this.x === 50) {
                this.x = this.x + 50;
            }

         }
         

         }

         if(this.paletteDirection === LegendDirection.VERTICAL && this.titlePlacement === LegendTitlePlacement.BOTTOM) {
             this.y = this.y - 50;

         }

         if(this.paletteDirection === LegendDirection.HORIZONTAL )
         {
            
             this.x = this.horizontalAboveMaxColor
            //  this.y = this.y - 40;
         }

         if(this.paletteDirection === LegendDirection.HORIZONTAL && this.titlePlacement === LegendTitlePlacement.BOTTOM_LEFT || this.titlePlacement === LegendTitlePlacement.BOTTOM_MIDDLE || this.titlePlacement === LegendTitlePlacement.BOTTOM_RIGHT) {
            this.y = this.y - 40;

        }
         
         this.setGap(paletteElementGap);
         this.createPaletteFillColor(ctx , paletteElementGap);
         
         this.createTicPosition(ctx , colorCountLength,paletteCount);
         this.setValuePosition(ctx,paletteElementGap,paletteCount);



    }

    setGap(paletteElementGap:number) {

        if(this.paletteDirection === LegendDirection.VERTICAL) {

            this.height = this.height - paletteElementGap

        }

        if(this.paletteDirection === LegendDirection.HORIZONTAL || this.paletteDirection === LegendDirection.AUTO) {

           this.width = this.width -  paletteElementGap

        }


    }

    createNoResultsPaletteFillColor(ctx: CanvasRenderingContext2D ,paletteElementGap:number) {

        
        if(this.paletteType === LegendType.DISCRETE || LegendType.CONTINUOUS) {

            ctx.fillStyle = this.noResultsColor;
            ctx.fillRect(this.x,this.y,this.width,this.height);

        }
        
    }
    createAboveMaxPaletteFillColor(ctx: CanvasRenderingContext2D ,paletteElementGap:number) {

        
        if(this.paletteType === LegendType.DISCRETE || LegendType.CONTINUOUS) {

            ctx.fillStyle = this.aboveMaxColor;
            ctx.fillRect(this.x,this.y,this.width,this.height);

        }
        
    }

    createBelowMinPaletteFillColor(ctx: CanvasRenderingContext2D ,paletteElementGap:number) {

        
        if(this.paletteType === LegendType.DISCRETE || LegendType.CONTINUOUS) {

            ctx.fillStyle = this.belowMinColor;
            ctx.fillRect(this.x,this.y,this.width,this.height);

        }
        
    }

    createPaletteFillColor(ctx: CanvasRenderingContext2D ,paletteElementGap:number) {

        
        if(this.paletteType === LegendType.DISCRETE) {

            ctx.fillStyle = this.colorTop;
            ctx.fillRect(this.x,this.y,this.width,this.height);

        }

        if(this.paletteType === LegendType.CONTINUOUS) {

            let grd:any ;

            if(this.paletteDirection === LegendDirection.VERTICAL) {

               grd = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);

            }

            if(this.paletteDirection === LegendDirection.HORIZONTAL || this.paletteDirection === LegendDirection.AUTO ) {

              grd = ctx.createLinearGradient(this.x, this.y, this.x + this.width, this.y);
            }

            grd.addColorStop(0, this.colorTop);
            grd.addColorStop(1, this.colorBottom);
            ctx.fillStyle = grd;
            ctx.fillRect(this.x, this.y, this.width, this.height);

        }
    }

    createNoResultsTicPosition(ctx: CanvasRenderingContext2D ,colorCountLength:number,paletteCount:number) {

        if(this.paletteDirection === LegendDirection.VERTICAL) {

            // Tic position based on value position 
                if (this.ticks === LegendTicsType.NO_TICS) {
        


                }

                if(this.ticks === LegendTicsType.INSIDE) {

                      if(this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.drawTic(ctx,this.x+this.width, this.y + this.height / 2,this.x + this.width - 10, this.y + this.height / 2);

                      }

                      if(this.valuePlacement === LegendValuePlacement.LEFT) { 

                        this.drawTic(ctx,this.x,this.y + this.height / 2,this.x+10, this.y + this.height / 2);
                      }

                      if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            
                            this.drawTic(ctx,this.x,this.y + this.height / 2,this.x+10, this.y + this.height / 2);

                           }
                           else {

                            this.drawTic(ctx,this.x+this.width, this.y + this.height / 2,this.x + this.width - 10, this.y + this.height / 2);

                           }


                          

                      }


                }

                if(this.ticks === LegendTicsType.OUTSIDE) {

                      if(this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.drawTic(ctx,this.x+this.width, this.y + this.height / 2,this.x + this.width + 10, this.y + this.height / 2);

                      }

                      if(this.valuePlacement === LegendValuePlacement.LEFT) { 

                        this.drawTic(ctx,this.x,this.y + this.height / 2,this.x-10, this.y + this.height / 2);
                      }

                      if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            
                            this.drawTic(ctx,this.x,this.y + this.height / 2,this.x-10, this.y + this.height / 2);

                           }
                           else {

                            this.drawTic(ctx,this.x+this.width, this.y + this.height / 2,this.x + this.width + 10, this.y + this.height / 2);

                           }


                          

                      }


                }

                if(this.ticks === LegendTicsType.RUNNING_ACROSS) {

                      if(this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.drawTic(ctx,this.x, this.y + this.height / 2,this.x + this.width + 10, this.y + this.height / 2);

                      }

                      if(this.valuePlacement === LegendValuePlacement.LEFT) { 

                        this.drawTic(ctx,this.x+this.width,this.y + this.height / 2,this.x-10, this.y + this.height / 2);
                      }

                      if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x+this.width,this.y + this.height / 2,this.x-10, this.y + this.height / 2);

                           }
                           else {

                            this.drawTic(ctx,this.x, this.y + this.height / 2,this.x + this.width + 10, this.y + this.height / 2);

                           }


                          

                      }
                }

            }
        if(this.paletteDirection === LegendDirection.HORIZONTAL || this.paletteDirection === LegendDirection.AUTO ) { 

            if (this.ticks === LegendTicsType.NO_TICS) {
    


            }

            if(this.ticks === LegendTicsType.INSIDE) {

                  if(this.valuePlacement === LegendValuePlacement.TOP) {

                    this.drawTic(ctx,this.x+this.width/2,this.y,this.x+this.width/2,this.y+10);

                  }

                  if(this.valuePlacement === LegendValuePlacement.BOTTOM) { 

                    this.drawTic(ctx,this.x + this.width / 2, this.y + this.height,this.x + this.width / 2, this.y + this.height - 10);
                  }

                  if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                    let count = paletteCount + 1;

                       if (count % 2 === 0) {

                        
                        this.drawTic(ctx,this.x+this.width/2,this.y,this.x+this.width/2,this.y+10);

                       }
                       else {

                        this.drawTic(ctx,this.x + this.width / 2, this.y + this.height,this.x + this.width / 2, this.y + this.height - 10);

                       }


                      

                  }


            }

            if(this.ticks === LegendTicsType.OUTSIDE) {

                  if(this.valuePlacement === LegendValuePlacement.TOP) {

                    this.drawTic(ctx,this.x+this.width/2,this.y,this.x+this.width/2,this.y-10);

                  }

                  if(this.valuePlacement === LegendValuePlacement.BOTTOM) { 

                    this.drawTic(ctx,this.x + this.width / 2, this.y + this.height,this.x + this.width / 2, this.y + this.height + 10);
                  }

                  if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                    let count = paletteCount + 1;

                       if (count % 2 === 0) {

                        this.drawTic(ctx,this.x + this.width / 2, this.y + this.height,this.x + this.width / 2, this.y + this.height + 10);

                       }
                       else {

                        this.drawTic(ctx,this.x+this.width/2,this.y,this.x+this.width/2,this.y-10);

                      
                       }


                      

                  }


            }

            if(this.ticks === LegendTicsType.RUNNING_ACROSS) {

                  if(this.valuePlacement === LegendValuePlacement.TOP) {

                    this.drawTic(ctx,this.x+this.width/2,this.y+this.height,this.x+this.width/2,this.y-10);

                  }

                  if(this.valuePlacement === LegendValuePlacement.BOTTOM) { 

                    this.drawTic(ctx,this.x + this.width / 2, this.y ,this.x + this.width / 2, this.y + this.height + 10);
                  }

                  if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                    let count = paletteCount + 1;

                       if (count % 2 === 0) {

                        this.drawTic(ctx,this.x + this.width / 2, this.y ,this.x + this.width / 2, this.y + this.height + 10);

                       }
                       else {

                        this.drawTic(ctx,this.x+this.width/2,this.y+this.height,this.x+this.width/2,this.y-10);

                       }


                      

                  }
            }


        }

    }

    createAboveMaxTicPosition(ctx: CanvasRenderingContext2D ,colorCountLength:number,paletteCount:number) {

        if(this.paletteDirection === LegendDirection.VERTICAL) {

            // Tic position based on value position 
                if (this.ticks === LegendTicsType.NO_TICS) {
        


                }

                if(this.ticks === LegendTicsType.INSIDE) {

                      if(this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.drawTic(ctx,this.x+this.width, this.y + this.height / 2,this.x + this.width - 10, this.y + this.height / 2);

                      }

                      if(this.valuePlacement === LegendValuePlacement.LEFT) { 

                        this.drawTic(ctx,this.x,this.y + this.height / 2,this.x+10, this.y + this.height / 2);
                      }

                      if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            
                            this.drawTic(ctx,this.x,this.y + this.height / 2,this.x+10, this.y + this.height / 2);

                           }
                           else {

                            this.drawTic(ctx,this.x+this.width, this.y + this.height / 2,this.x + this.width - 10, this.y + this.height / 2);

                           }


                          

                      }


                }

                if(this.ticks === LegendTicsType.OUTSIDE) {

                      if(this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.drawTic(ctx,this.x+this.width, this.y + this.height / 2,this.x + this.width + 10, this.y + this.height / 2);

                      }

                      if(this.valuePlacement === LegendValuePlacement.LEFT) { 

                        this.drawTic(ctx,this.x,this.y + this.height / 2,this.x-10, this.y + this.height / 2);
                      }

                      if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            
                            this.drawTic(ctx,this.x,this.y + this.height / 2,this.x-10, this.y + this.height / 2);

                           }
                           else {

                            this.drawTic(ctx,this.x+this.width, this.y + this.height / 2,this.x + this.width + 10, this.y + this.height / 2);

                           }


                          

                      }


                }

                if(this.ticks === LegendTicsType.RUNNING_ACROSS) {

                      if(this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.drawTic(ctx,this.x, this.y + this.height / 2,this.x + this.width + 10, this.y + this.height / 2);

                      }

                      if(this.valuePlacement === LegendValuePlacement.LEFT) { 

                        this.drawTic(ctx,this.x+this.width,this.y + this.height / 2,this.x-10, this.y + this.height / 2);
                      }

                      if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x+this.width,this.y + this.height / 2,this.x-10, this.y + this.height / 2);

                           }
                           else {

                            this.drawTic(ctx,this.x, this.y + this.height / 2,this.x + this.width + 10, this.y + this.height / 2);

                           }


                          

                      }
                }

            }
        if(this.paletteDirection === LegendDirection.HORIZONTAL || this.paletteDirection === LegendDirection.AUTO ) { 

            if (this.ticks === LegendTicsType.NO_TICS) {
    


            }

            if(this.ticks === LegendTicsType.INSIDE) {

                  if(this.valuePlacement === LegendValuePlacement.TOP) {

                    this.drawTic(ctx,this.x+this.width/2,this.y,this.x+this.width/2,this.y+10);

                  }

                  if(this.valuePlacement === LegendValuePlacement.BOTTOM) { 

                    this.drawTic(ctx,this.x + this.width / 2, this.y + this.height,this.x + this.width / 2, this.y + this.height - 10);
                  }

                  if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                    let count = paletteCount + 1;

                       if (count % 2 === 0) {

                        
                        this.drawTic(ctx,this.x+this.width/2,this.y,this.x+this.width/2,this.y+10);

                       }
                       else {

                        this.drawTic(ctx,this.x + this.width / 2, this.y + this.height,this.x + this.width / 2, this.y + this.height - 10);

                       }


                      

                  }


            }

            if(this.ticks === LegendTicsType.OUTSIDE) {

                  if(this.valuePlacement === LegendValuePlacement.TOP) {

                    this.drawTic(ctx,this.x+this.width/2,this.y,this.x+this.width/2,this.y-10);

                  }

                  if(this.valuePlacement === LegendValuePlacement.BOTTOM) { 

                    this.drawTic(ctx,this.x + this.width / 2, this.y + this.height,this.x + this.width / 2, this.y + this.height + 10);
                  }

                  if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                    let count = paletteCount + 1;

                       if (count % 2 === 0) {

                        this.drawTic(ctx,this.x + this.width / 2, this.y + this.height,this.x + this.width / 2, this.y + this.height + 10);

                       }
                       else {

                        this.drawTic(ctx,this.x+this.width/2,this.y,this.x+this.width/2,this.y-10);

                      
                       }


                      

                  }


            }

            if(this.ticks === LegendTicsType.RUNNING_ACROSS) {

                  if(this.valuePlacement === LegendValuePlacement.TOP) {

                    this.drawTic(ctx,this.x+this.width/2,this.y+this.height,this.x+this.width/2,this.y-10);

                  }

                  if(this.valuePlacement === LegendValuePlacement.BOTTOM) { 

                    this.drawTic(ctx,this.x + this.width / 2, this.y ,this.x + this.width / 2, this.y + this.height + 10);
                  }

                  if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                    let count = paletteCount + 1;

                       if (count % 2 === 0) {

                        this.drawTic(ctx,this.x + this.width / 2, this.y ,this.x + this.width / 2, this.y + this.height + 10);

                       }
                       else {

                        this.drawTic(ctx,this.x+this.width/2,this.y+this.height,this.x+this.width/2,this.y-10);

                       }


                      

                  }
            }


        }

    }

    createBelowMinTicPosition(ctx: CanvasRenderingContext2D ,colorCountLength:number,paletteCount:number) {

        if(this.paletteDirection === LegendDirection.VERTICAL) {

            // Tic position based on value position 
                if (this.ticks === LegendTicsType.NO_TICS) {
        


                }

                if(this.ticks === LegendTicsType.INSIDE) {

                      if(this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.drawTic(ctx,this.x+this.width, this.y + this.height / 2,this.x + this.width - 10, this.y + this.height / 2);

                      }

                      if(this.valuePlacement === LegendValuePlacement.LEFT) { 

                        this.drawTic(ctx,this.x,this.y + this.height / 2,this.x+10, this.y + this.height / 2);
                      }

                      if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            
                            this.drawTic(ctx,this.x,this.y + this.height / 2,this.x+10, this.y + this.height / 2);

                           }
                           else {

                            this.drawTic(ctx,this.x+this.width, this.y + this.height / 2,this.x + this.width - 10, this.y + this.height / 2);

                           }


                          

                      }


                }

                if(this.ticks === LegendTicsType.OUTSIDE) {

                      if(this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.drawTic(ctx,this.x+this.width, this.y + this.height / 2,this.x + this.width + 10, this.y + this.height / 2);

                      }

                      if(this.valuePlacement === LegendValuePlacement.LEFT) { 

                        this.drawTic(ctx,this.x,this.y + this.height / 2,this.x-10, this.y + this.height / 2);
                      }

                      if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            
                            this.drawTic(ctx,this.x,this.y + this.height / 2,this.x-10, this.y + this.height / 2);

                           }
                           else {

                            this.drawTic(ctx,this.x+this.width, this.y + this.height / 2,this.x + this.width + 10, this.y + this.height / 2);

                           }


                          

                      }


                }

                if(this.ticks === LegendTicsType.RUNNING_ACROSS) {

                      if(this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.drawTic(ctx,this.x, this.y + this.height / 2,this.x + this.width + 10, this.y + this.height / 2);

                      }

                      if(this.valuePlacement === LegendValuePlacement.LEFT) { 

                        this.drawTic(ctx,this.x+this.width,this.y + this.height / 2,this.x-10, this.y + this.height / 2);
                      }

                      if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x+this.width,this.y + this.height / 2,this.x-10, this.y + this.height / 2);

                           }
                           else {

                            this.drawTic(ctx,this.x, this.y + this.height / 2,this.x + this.width + 10, this.y + this.height / 2);

                           }


                          

                      }
                }

            }
        if(this.paletteDirection === LegendDirection.HORIZONTAL || this.paletteDirection === LegendDirection.AUTO ) { 

            if (this.ticks === LegendTicsType.NO_TICS) {
    


            }

            if(this.ticks === LegendTicsType.INSIDE) {

                  if(this.valuePlacement === LegendValuePlacement.TOP) {

                    this.drawTic(ctx,this.x+this.width/2,this.y,this.x+this.width/2,this.y+10);

                  }

                  if(this.valuePlacement === LegendValuePlacement.BOTTOM) { 

                    this.drawTic(ctx,this.x + this.width / 2, this.y + this.height,this.x + this.width / 2, this.y + this.height - 10);
                  }

                  if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                    let count = paletteCount + 1;

                       if (count % 2 === 0) {

                        
                        this.drawTic(ctx,this.x+this.width/2,this.y,this.x+this.width/2,this.y+10);

                       }
                       else {

                        this.drawTic(ctx,this.x + this.width / 2, this.y + this.height,this.x + this.width / 2, this.y + this.height - 10);

                       }


                      

                  }


            }

            if(this.ticks === LegendTicsType.OUTSIDE) {

                  if(this.valuePlacement === LegendValuePlacement.TOP) {

                    this.drawTic(ctx,this.x+this.width/2,this.y,this.x+this.width/2,this.y-10);

                  }

                  if(this.valuePlacement === LegendValuePlacement.BOTTOM) { 

                    this.drawTic(ctx,this.x + this.width / 2, this.y + this.height,this.x + this.width / 2, this.y + this.height + 10);
                  }

                  if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                    let count = paletteCount + 1;

                       if (count % 2 === 0) {

                        this.drawTic(ctx,this.x + this.width / 2, this.y + this.height,this.x + this.width / 2, this.y + this.height + 10);

                       }
                       else {

                        this.drawTic(ctx,this.x+this.width/2,this.y,this.x+this.width/2,this.y-10);

                      
                       }


                      

                  }


            }

            if(this.ticks === LegendTicsType.RUNNING_ACROSS) {

                  if(this.valuePlacement === LegendValuePlacement.TOP) {

                    this.drawTic(ctx,this.x+this.width/2,this.y+this.height,this.x+this.width/2,this.y-10);

                  }

                  if(this.valuePlacement === LegendValuePlacement.BOTTOM) { 

                    this.drawTic(ctx,this.x + this.width / 2, this.y ,this.x + this.width / 2, this.y + this.height + 10);
                  }

                  if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                    let count = paletteCount + 1;

                       if (count % 2 === 0) {

                        this.drawTic(ctx,this.x + this.width / 2, this.y ,this.x + this.width / 2, this.y + this.height + 10);

                       }
                       else {

                        this.drawTic(ctx,this.x+this.width/2,this.y+this.height,this.x+this.width/2,this.y-10);

                       }


                      

                  }
            }


        }

    }

    createTicPosition(ctx: CanvasRenderingContext2D ,colorCountLength:number,paletteCount:number) {

             if(this.valueNature === ValueNature.MAXMIN){
        if(this.paletteType === LegendType.DISCRETE) {


            if(this.paletteDirection === LegendDirection.VERTICAL) {

                if (this.ticks === LegendTicsType.NO_TICS) {
        


                }

                if(this.ticks === LegendTicsType.INSIDE) {

                     if(this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.drawTic(ctx,this.x + this.width, this.y,this.x + this.width - 10, this.y);
                     
                        // Create End Tic     
                        if(colorCountLength-1 === paletteCount) {

                          this.drawTic(ctx,this.x + this.width, this.y+this.height,this.x + this.width - 10, this.y+this.height);
                          

                        }

                     }
                     if(this.valuePlacement === LegendValuePlacement.LEFT) {

                        this.drawTic(ctx,this.x, this.y ,this.x + 10, this.y );

                        // Create End Tic     
                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x, this.y+this.height ,this.x + 10, this.y+this.height);
  
                          }
                         
                     }
                     if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {


                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x, this.y ,this.x + 10, this.y );

                           }
                           else {

                            this.drawTic(ctx,this.x + this.width, this.y,this.x + this.width - 10, this.y);

                           }

                           if(colorCountLength-1 === paletteCount) {

                                if (count % 2 === 0) {

                                    this.drawTic(ctx,this.x + this.width, this.y+this.height,this.x + this.width - 10, this.y+this.height);

                                }
                                else {

                                    this.drawTic(ctx,this.x, this.y+this.height ,this.x + 10, this.y+this.height );

                                }
  
                          }


                         
                     }
                }

                if(this.ticks === LegendTicsType.OUTSIDE) {


                    if(this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.drawTic(ctx,this.x + this.width, this.y,this.x + this.width + 10, this.y);

                        // Create End Tic     
                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x + this.width, this.y+this.height,this.x + this.width + 10, this.y+this.height);
                            
  
                        }

                     }
                    if(this.valuePlacement === LegendValuePlacement.LEFT) {

                        this.drawTic(ctx,this.x, this.y ,this.x - 10, this.y );

                        // Create End Tic     
                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x, this.y+this.height ,this.x - 10, this.y+this.height);
  
                          }
                         
                     }
                    if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {


                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x, this.y ,this.x - 10, this.y );

                           }
                           else {

                            this.drawTic(ctx,this.x + this.width, this.y,this.x + this.width + 10, this.y);

                           }

                           if(colorCountLength-1 === paletteCount) {

                            if (count % 2 === 0) {

                                this.drawTic(ctx,this.x + this.width, this.y+this.height,this.x + this.width + 10, this.y+this.height);

                            }
                            else {

                                this.drawTic(ctx,this.x, this.y+this.height ,this.x - 10, this.y+this.height );

                            }

                      }


                         
                     }


                }

                if(this.ticks === LegendTicsType.RUNNING_ACROSS) {

                    if(this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.drawTic(ctx,this.x, this.y,this.x + this.width + 10, this.y);

                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x, this.y+this.height,this.x + this.width + 10, this.y+this.height);
                            
  
                        }

                     }
                    if(this.valuePlacement === LegendValuePlacement.LEFT) {

                        this.drawTic(ctx,this.x+this.width, this.y ,this.x - 10, this.y );

                         // Create End Tic     
                         if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x+this.width, this.y+this.height ,this.x - 10, this.y+this.height );
                            
  
                        }

                        
                         
                     }
                    if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {


                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x+this.width, this.y ,this.x - 10, this.y );

                           }
                           else {

                            this.drawTic(ctx,this.x, this.y,this.x + this.width + 10, this.y);

                           }

                           if(colorCountLength-1 === paletteCount) {

                            if (count % 2 === 0) {

                                this.drawTic(ctx,this.x, this.y+this.height,this.x + this.width + 10, this.y+this.height);

                            }
                            else {

                                this.drawTic(ctx,this.x+this.width, this.y+this.height ,this.x - 10, this.y+this.height );

                            }

                      }


                         
                     }
                }

            }

            if(this.paletteDirection === LegendDirection.HORIZONTAL || this.paletteDirection === LegendDirection.AUTO ) {

                if (this.ticks === LegendTicsType.NO_TICS) {
        


                }

                if(this.ticks === LegendTicsType.INSIDE) {


                     if(this.valuePlacement === LegendValuePlacement.TOP) {

                        this.drawTic(ctx,this.x, this.y,this.x, this.y + 10);

                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x+this.width, this.y,this.x+this.width, this.y + 10);
                            
                        }

                     }
                     if(this.valuePlacement === LegendValuePlacement.BOTTOM) {

                        this.drawTic(ctx,this.x, this.y + this.height,this.x, this.y + this.height - 10);

                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x+this.width, this.y + this.height,this.x+this.width, this.y + this.height - 10);
                            
                          }
                         
                     }
                     if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {


                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x, this.y + this.height,this.x, this.y + this.height - 10);

                           }
                           else {

                            this.drawTic(ctx,this.x, this.y,this.x, this.y + 10);

                           }

                           if(colorCountLength-1 === paletteCount) {

                            if (count % 2 === 0) {

                                this.drawTic(ctx,this.x+this.width, this.y,this.x+this.width, this.y + 10);

                            }
                            else {

                                this.drawTic(ctx,this.x+this.width, this.y + this.height,this.x+this.width, this.y + this.height - 10);

                            }

                      }


                         
                     }
                }

                if(this.ticks === LegendTicsType.OUTSIDE) {


                     if(this.valuePlacement === LegendValuePlacement.TOP) {

                        this.drawTic(ctx,this.x, this.y,this.x, this.y - 10);

                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x+this.width, this.y,this.x+this.width, this.y - 10);
                            
                        }

                     }
                     if(this.valuePlacement === LegendValuePlacement.BOTTOM) {

                        this.drawTic(ctx,this.x, this.y + this.height,this.x, this.y + this.height + 10);

                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x+this.width, this.y + this.height,this.x+this.width, this.y + this.height + 10);
                            
                        }
                         
                     }
                     if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x, this.y + this.height,this.x, this.y + this.height + 10);

                           }
                           else {

                            this.drawTic(ctx,this.x, this.y,this.x, this.y - 10);

                           }


                           if(colorCountLength-1 === paletteCount) {

                            if (count % 2 === 0) {

                                this.drawTic(ctx,this.x+this.width, this.y,this.x+this.width, this.y - 10);

                            }
                            else {

                                this.drawTic(ctx,this.x+this.width, this.y + this.height,this.x+this.width, this.y + this.height + 10);

                            }

                      }


                         
                     }

                }

                if(this.ticks === LegendTicsType.RUNNING_ACROSS) {

                     if(this.valuePlacement === LegendValuePlacement.TOP) {

                        this.drawTic(ctx,this.x, this.y+this.height,this.x, this.y - 10);

                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x+this.width, this.y+this.height,this.x+this.width, this.y - 10);
                            
                        }

                     }
                     if(this.valuePlacement === LegendValuePlacement.BOTTOM) {

                        this.drawTic(ctx,this.x, this.y ,this.x, this.y + this.height + 10);

                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x+this.width, this.y ,this.x+this.width, this.y + this.height + 10);
                            
                        }
                         
                     }
                     if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {


                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x, this.y ,this.x, this.y + this.height + 10);

                           }
                           else {

                            this.drawTic(ctx,this.x, this.y+this.height,this.x, this.y - 10);

                           }


                           if(colorCountLength-1 === paletteCount) {

                            if (count % 2 === 0) {

                                this.drawTic(ctx,this.x+this.width, this.y+this.height,this.x+this.width, this.y - 10);

                            }
                            else {

                                this.drawTic(ctx,this.x+this.width, this.y ,this.x+this.width, this.y + this.height + 10);

                            }

                           }


                         
                     }
                }

            }


        }
     }
    else {
        if(this.paletteType === LegendType.DISCRETE) {


            if(this.paletteDirection === LegendDirection.VERTICAL) {

            // Tic position based on value position 
                if (this.ticks === LegendTicsType.NO_TICS) {
        


                }

                if(this.ticks === LegendTicsType.INSIDE) {

                      if(this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.drawTic(ctx,this.x+this.width, this.y + this.height / 2,this.x + this.width - 10, this.y + this.height / 2);

                      }

                      if(this.valuePlacement === LegendValuePlacement.LEFT) { 

                        this.drawTic(ctx,this.x,this.y + this.height / 2,this.x+10, this.y + this.height / 2);
                      }

                      if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            
                            this.drawTic(ctx,this.x,this.y + this.height / 2,this.x+10, this.y + this.height / 2);

                           }
                           else {

                            this.drawTic(ctx,this.x+this.width, this.y + this.height / 2,this.x + this.width - 10, this.y + this.height / 2);

                           }


                          

                      }


                }

                if(this.ticks === LegendTicsType.OUTSIDE) {

                      if(this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.drawTic(ctx,this.x+this.width, this.y + this.height / 2,this.x + this.width + 10, this.y + this.height / 2);

                      }

                      if(this.valuePlacement === LegendValuePlacement.LEFT) { 

                        this.drawTic(ctx,this.x,this.y + this.height / 2,this.x-10, this.y + this.height / 2);
                      }

                      if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            
                            this.drawTic(ctx,this.x,this.y + this.height / 2,this.x-10, this.y + this.height / 2);

                           }
                           else {

                            this.drawTic(ctx,this.x+this.width, this.y + this.height / 2,this.x + this.width + 10, this.y + this.height / 2);

                           }


                          

                      }


                }

                if(this.ticks === LegendTicsType.RUNNING_ACROSS) {

                      if(this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.drawTic(ctx,this.x, this.y + this.height / 2,this.x + this.width + 10, this.y + this.height / 2);

                      }

                      if(this.valuePlacement === LegendValuePlacement.LEFT) { 

                        this.drawTic(ctx,this.x+this.width,this.y + this.height / 2,this.x-10, this.y + this.height / 2);
                      }

                      if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x+this.width,this.y + this.height / 2,this.x-10, this.y + this.height / 2);

                           }
                           else {

                            this.drawTic(ctx,this.x, this.y + this.height / 2,this.x + this.width + 10, this.y + this.height / 2);

                           }


                          

                      }
                }

            }

            if(this.paletteDirection === LegendDirection.HORIZONTAL || this.paletteDirection === LegendDirection.AUTO ) { 

                if (this.ticks === LegendTicsType.NO_TICS) {
        


                }

                if(this.ticks === LegendTicsType.INSIDE) {

                      if(this.valuePlacement === LegendValuePlacement.TOP) {

                        this.drawTic(ctx,this.x+this.width/2,this.y,this.x+this.width/2,this.y+10);

                      }

                      if(this.valuePlacement === LegendValuePlacement.BOTTOM) { 

                        this.drawTic(ctx,this.x + this.width / 2, this.y + this.height,this.x + this.width / 2, this.y + this.height - 10);
                      }

                      if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            
                            this.drawTic(ctx,this.x+this.width/2,this.y,this.x+this.width/2,this.y+10);

                           }
                           else {

                            this.drawTic(ctx,this.x + this.width / 2, this.y + this.height,this.x + this.width / 2, this.y + this.height - 10);

                           }


                          

                      }


                }

                if(this.ticks === LegendTicsType.OUTSIDE) {

                      if(this.valuePlacement === LegendValuePlacement.TOP) {

                        this.drawTic(ctx,this.x+this.width/2,this.y,this.x+this.width/2,this.y-10);

                      }

                      if(this.valuePlacement === LegendValuePlacement.BOTTOM) { 

                        this.drawTic(ctx,this.x + this.width / 2, this.y + this.height,this.x + this.width / 2, this.y + this.height + 10);
                      }

                      if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x + this.width / 2, this.y + this.height,this.x + this.width / 2, this.y + this.height + 10);

                           }
                           else {

                            this.drawTic(ctx,this.x+this.width/2,this.y,this.x+this.width/2,this.y-10);

                          
                           }


                          

                      }


                }

                if(this.ticks === LegendTicsType.RUNNING_ACROSS) {

                      if(this.valuePlacement === LegendValuePlacement.TOP) {

                        this.drawTic(ctx,this.x+this.width/2,this.y+this.height,this.x+this.width/2,this.y-10);

                      }

                      if(this.valuePlacement === LegendValuePlacement.BOTTOM) { 

                        this.drawTic(ctx,this.x + this.width / 2, this.y ,this.x + this.width / 2, this.y + this.height + 10);
                      }

                      if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x + this.width / 2, this.y ,this.x + this.width / 2, this.y + this.height + 10);

                           }
                           else {

                            this.drawTic(ctx,this.x+this.width/2,this.y+this.height,this.x+this.width/2,this.y-10);

                           }


                          

                      }
                }


            }


        }
    }

        if(this.paletteType === LegendType.CONTINUOUS) {

            if(this.valueNature === ValueNature.MAXMIN){

            if(this.paletteDirection === LegendDirection.VERTICAL) {

                if (this.ticks === LegendTicsType.NO_TICS) {
        


                }

                if(this.ticks === LegendTicsType.INSIDE) {

                     if(this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.drawTic(ctx,this.x + this.width, this.y,this.x + this.width - 10, this.y);
                     
                        // Create End Tic     
                        if(colorCountLength-1 === paletteCount) {

                          this.drawTic(ctx,this.x + this.width, this.y+this.height,this.x + this.width - 10, this.y+this.height);
                          

                        }

                     }
                     if(this.valuePlacement === LegendValuePlacement.LEFT) {

                        this.drawTic(ctx,this.x, this.y ,this.x + 10, this.y );

                        // Create End Tic     
                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x, this.y+this.height ,this.x + 10, this.y+this.height);
  
                          }
                         
                     }
                     if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {


                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x, this.y ,this.x + 10, this.y );

                           }
                           else {

                            this.drawTic(ctx,this.x + this.width, this.y,this.x + this.width - 10, this.y);

                           }

                           if(colorCountLength-1 === paletteCount) {

                                if (count % 2 === 0) {

                                    this.drawTic(ctx,this.x + this.width, this.y+this.height,this.x + this.width - 10, this.y+this.height);

                                }
                                else {

                                    this.drawTic(ctx,this.x, this.y+this.height ,this.x + 10, this.y+this.height );

                                }
  
                          }


                         
                     }
                }

                if(this.ticks === LegendTicsType.OUTSIDE) {


                    if(this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.drawTic(ctx,this.x + this.width, this.y,this.x + this.width + 10, this.y);

                        // Create End Tic     
                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x + this.width, this.y+this.height,this.x + this.width + 10, this.y+this.height);
                            
  
                        }

                     }
                    if(this.valuePlacement === LegendValuePlacement.LEFT) {

                        this.drawTic(ctx,this.x, this.y ,this.x - 10, this.y );

                        // Create End Tic     
                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x, this.y+this.height ,this.x - 10, this.y+this.height);
  
                          }
                         
                     }
                    if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {


                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x, this.y ,this.x - 10, this.y );

                           }
                           else {

                            this.drawTic(ctx,this.x + this.width, this.y,this.x + this.width + 10, this.y);

                           }

                           if(colorCountLength-1 === paletteCount) {

                            if (count % 2 === 0) {

                                this.drawTic(ctx,this.x + this.width, this.y+this.height,this.x + this.width + 10, this.y+this.height);

                            }
                            else {

                                this.drawTic(ctx,this.x, this.y+this.height ,this.x - 10, this.y+this.height );

                            }

                      }


                         
                     }


                }

                if(this.ticks === LegendTicsType.RUNNING_ACROSS) {

                    if(this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.drawTic(ctx,this.x, this.y,this.x + this.width + 10, this.y);

                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x, this.y+this.height,this.x + this.width + 10, this.y+this.height);
                            
  
                        }

                     }
                    if(this.valuePlacement === LegendValuePlacement.LEFT) {

                        this.drawTic(ctx,this.x+this.width, this.y ,this.x - 10, this.y );

                         // Create End Tic     
                         if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x+this.width, this.y+this.height ,this.x - 10, this.y+this.height );
                            
  
                        }

                        
                         
                     }
                    if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {


                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x+this.width, this.y ,this.x - 10, this.y );

                           }
                           else {

                            this.drawTic(ctx,this.x, this.y,this.x + this.width + 10, this.y);

                           }

                           if(colorCountLength-1 === paletteCount) {

                            if (count % 2 === 0) {

                                this.drawTic(ctx,this.x, this.y+this.height,this.x + this.width + 10, this.y+this.height);

                            }
                            else {

                                this.drawTic(ctx,this.x+this.width, this.y+this.height ,this.x - 10, this.y+this.height );

                            }

                      }


                         
                     }
                }

            }

            if(this.paletteDirection === LegendDirection.HORIZONTAL || this.paletteDirection === LegendDirection.AUTO ) {

                if (this.ticks === LegendTicsType.NO_TICS) {
        


                }

                if(this.ticks === LegendTicsType.INSIDE) {


                     if(this.valuePlacement === LegendValuePlacement.TOP) {

                        this.drawTic(ctx,this.x, this.y,this.x, this.y + 10);

                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x+this.width, this.y,this.x+this.width, this.y + 10);
                            
                        }

                     }
                     if(this.valuePlacement === LegendValuePlacement.BOTTOM) {

                        this.drawTic(ctx,this.x, this.y + this.height,this.x, this.y + this.height - 10);

                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x+this.width, this.y + this.height,this.x+this.width, this.y + this.height - 10);
                            
                          }
                         
                     }
                     if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {


                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x, this.y + this.height,this.x, this.y + this.height - 10);

                           }
                           else {

                            this.drawTic(ctx,this.x, this.y,this.x, this.y + 10);

                           }

                           if(colorCountLength-1 === paletteCount) {

                            if (count % 2 === 0) {

                                this.drawTic(ctx,this.x+this.width, this.y,this.x+this.width, this.y + 10);

                            }
                            else {

                                this.drawTic(ctx,this.x+this.width, this.y + this.height,this.x+this.width, this.y + this.height - 10);

                            }

                      }


                         
                     }
                }

                if(this.ticks === LegendTicsType.OUTSIDE) {


                     if(this.valuePlacement === LegendValuePlacement.TOP) {

                        this.drawTic(ctx,this.x, this.y,this.x, this.y - 10);

                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x+this.width, this.y,this.x+this.width, this.y - 10);
                            
                        }

                     }
                     if(this.valuePlacement === LegendValuePlacement.BOTTOM) {

                        this.drawTic(ctx,this.x, this.y + this.height,this.x, this.y + this.height + 10);

                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x+this.width, this.y + this.height,this.x+this.width, this.y + this.height + 10);
                            
                        }
                         
                     }
                     if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x, this.y + this.height,this.x, this.y + this.height + 10);

                           }
                           else {

                            this.drawTic(ctx,this.x, this.y,this.x, this.y - 10);

                           }


                           if(colorCountLength-1 === paletteCount) {

                            if (count % 2 === 0) {

                                this.drawTic(ctx,this.x+this.width, this.y,this.x+this.width, this.y - 10);

                            }
                            else {

                                this.drawTic(ctx,this.x+this.width, this.y + this.height,this.x+this.width, this.y + this.height + 10);

                            }

                      }


                         
                     }

                }

                if(this.ticks === LegendTicsType.RUNNING_ACROSS) {

                     if(this.valuePlacement === LegendValuePlacement.TOP) {

                        this.drawTic(ctx,this.x, this.y+this.height,this.x, this.y - 10);

                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x+this.width, this.y+this.height,this.x+this.width, this.y - 10);
                            
                        }

                     }
                     if(this.valuePlacement === LegendValuePlacement.BOTTOM) {

                        this.drawTic(ctx,this.x, this.y ,this.x, this.y + this.height + 10);

                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x+this.width, this.y ,this.x+this.width, this.y + this.height + 10);
                            
                        }
                         
                     }
                     if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {


                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x, this.y ,this.x, this.y + this.height + 10);

                           }
                           else {

                            this.drawTic(ctx,this.x, this.y+this.height,this.x, this.y - 10);

                           }


                           if(colorCountLength-1 === paletteCount) {

                            if (count % 2 === 0) {

                                this.drawTic(ctx,this.x+this.width, this.y+this.height,this.x+this.width, this.y - 10);

                            }
                            else {

                                this.drawTic(ctx,this.x+this.width, this.y ,this.x+this.width, this.y + this.height + 10);

                            }

                           }


                         
                     }
                }

            }


        }
        else{
            if(this.paletteDirection === LegendDirection.VERTICAL) {

                if (this.ticks === LegendTicsType.NO_TICS) {
        


                }

                if(this.ticks === LegendTicsType.INSIDE) {

                     if(this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.drawTic(ctx,this.x+this.width, this.y + this.height / 2,this.x + this.width - 10, this.y + this.height / 2);

                    }
                     if(this.valuePlacement === LegendValuePlacement.LEFT) {

                        this.drawTic(ctx,this.x,this.y + this.height / 2,this.x+10, this.y + this.height / 2);
                     
                         
                     }
                     if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        let count = paletteCount + 1;

                        if (count % 2 === 0) {

                         
                         this.drawTic(ctx,this.x,this.y + this.height / 2,this.x+10, this.y + this.height / 2);

                        }
                        else {

                         this.drawTic(ctx,this.x+this.width, this.y + this.height / 2,this.x + this.width - 10, this.y + this.height / 2);

                        }                        


                         
                     }
                }

                if(this.ticks === LegendTicsType.OUTSIDE) {


                    if(this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.drawTic(ctx,this.x+this.width, this.y + this.height / 2,this.x + this.width + 10, this.y + this.height / 2);


                     }
                    if(this.valuePlacement === LegendValuePlacement.LEFT) {

                        this.drawTic(ctx,this.x,this.y + this.height / 2,this.x-10, this.y + this.height / 2);
                     
                         
                     }
                    if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {


                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            
                            this.drawTic(ctx,this.x,this.y + this.height / 2,this.x-10, this.y + this.height / 2);

                           }
                           else {

                            this.drawTic(ctx,this.x+this.width, this.y + this.height / 2,this.x + this.width + 10, this.y + this.height / 2);

                           }
                         
                     }


                }

                if(this.ticks === LegendTicsType.RUNNING_ACROSS) {

                    if(this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.drawTic(ctx,this.x, this.y + this.height / 2,this.x + this.width + 10, this.y + this.height / 2);


                     }
                    if(this.valuePlacement === LegendValuePlacement.LEFT) {

                        this.drawTic(ctx,this.x+this.width,this.y + this.height / 2,this.x-10, this.y + this.height / 2);

                         
                     }
                    if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {


                        let count = paletteCount + 1;

                        if (count % 2 === 0) {

                         this.drawTic(ctx,this.x+this.width,this.y + this.height / 2,this.x-10, this.y + this.height / 2);

                        }
                        else {

                         this.drawTic(ctx,this.x, this.y + this.height / 2,this.x + this.width + 10, this.y + this.height / 2);

                        }
                     }
                }

            }

            if(this.paletteDirection === LegendDirection.HORIZONTAL || this.paletteDirection === LegendDirection.AUTO ) {

                if (this.ticks === LegendTicsType.NO_TICS) {
        


                }

                if(this.ticks === LegendTicsType.INSIDE) {


                     if(this.valuePlacement === LegendValuePlacement.TOP) {

                        this.drawTic(ctx,this.x+this.width/2,this.y,this.x+this.width/2,this.y+10);


                     }
                     if(this.valuePlacement === LegendValuePlacement.BOTTOM) {

                        this.drawTic(ctx,this.x + this.width / 2, this.y + this.height,this.x + this.width / 2, this.y + this.height - 10);
                     
                         
                     }
                     if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        let count = paletteCount + 1;

                        if (count % 2 === 0) {

                         
                         this.drawTic(ctx,this.x+this.width/2,this.y,this.x+this.width/2,this.y+10);

                        }
                        else {

                         this.drawTic(ctx,this.x + this.width / 2, this.y + this.height,this.x + this.width / 2, this.y + this.height - 10);

                        }                         
                     }
                }

                if(this.ticks === LegendTicsType.OUTSIDE) {


                     if(this.valuePlacement === LegendValuePlacement.TOP) {

                        this.drawTic(ctx,this.x+this.width/2,this.y,this.x+this.width/2,this.y-10);

                     }
                     if(this.valuePlacement === LegendValuePlacement.BOTTOM) {

                        this.drawTic(ctx,this.x + this.width / 2, this.y + this.height,this.x + this.width / 2, this.y + this.height + 10);
                      
                     }
                     if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                       
                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x + this.width / 2, this.y + this.height,this.x + this.width / 2, this.y + this.height + 10);

                           }
                           else {

                            this.drawTic(ctx,this.x+this.width/2,this.y,this.x+this.width/2,this.y-10);

                          
                           }
                     }

                }

                if(this.ticks === LegendTicsType.RUNNING_ACROSS) {

                     if(this.valuePlacement === LegendValuePlacement.TOP) {

                        this.drawTic(ctx,this.x+this.width/2,this.y+this.height,this.x+this.width/2,this.y-10);


                     }
                     if(this.valuePlacement === LegendValuePlacement.BOTTOM) {

                        this.drawTic(ctx,this.x + this.width / 2, this.y ,this.x + this.width / 2, this.y + this.height + 10);
                      
                         
                     }
                     if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        let count = paletteCount + 1;

                        if (count % 2 === 0) {

                         this.drawTic(ctx,this.x + this.width / 2, this.y ,this.x + this.width / 2, this.y + this.height + 10);

                        }
                        else {

                         this.drawTic(ctx,this.x+this.width/2,this.y+this.height,this.x+this.width/2,this.y-10);

                        }


                         
                     }
                }

            }
        }

    }

    }

    drawTic(ctx: CanvasRenderingContext2D,X1:number , Y1:number ,X2:number , Y2:number) {

        ctx.beginPath();
        ctx.moveTo(X1,Y1);
        ctx.lineTo(X2,Y2);
        ctx.strokeStyle = this.textColor;
        ctx.stroke();


    }

    setNoResultsValuePosition(ctx: CanvasRenderingContext2D ,paletteElementGap:number,paletteCount:number) {
        const text = this.noResultText;
        let count = paletteCount+1;
        if(this.paletteDirection === LegendDirection.VERTICAL) {

            if (this.valuePlacement === LegendValuePlacement.RIGHT) {

                this.setTextPosition(ctx,text, this.x + this.width + 15, this.y + this.height / 2);

            }

            if (this.valuePlacement === LegendValuePlacement.LEFT) {

                this.setTextPosition(ctx,text, this.x - 15, this.y + this.height / 2);

            }

            if (this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                if (count % 2 === 0) {

                    ctx.textAlign = "right";
                    this.setTextPosition(ctx,text, this.x - 15, this.y + this.height / 2);

                }
                else {

                    ctx.textAlign = "left";
                    this.setTextPosition(ctx,text , this.x + this.width + 15, this.y + this.height / 2);
                }

            }

            ctx.textAlign = "left";

    }
    if(this.paletteDirection === LegendDirection.HORIZONTAL || this.paletteDirection === LegendDirection.AUTO ) {

        if(this.valuePlacement === LegendValuePlacement.TOP) {
          ctx.textAlign = "center";
          this.setTextPosition(ctx,text,this.x+this.width/2,this.y-15);

        }

        if(this.valuePlacement === LegendValuePlacement.BOTTOM) { 
          ctx.textAlign = "center";
          this.setTextPosition(ctx,text,this.x + this.width / 2, this.y + this.height +15);
        }

        if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

          let count = paletteCount + 1;

             if (count % 2 === 0) {

              this.setTextPosition(ctx,text,this.x + this.width / 2, this.y + this.height +15);

             }
             else {

              this.setTextPosition(ctx,text,this.x+this.width/2,this.y-15);

             }


            

        }


  }

        
    }
    setAboveMaxValuePosition(ctx: CanvasRenderingContext2D ,paletteElementGap:number,paletteCount:number) {
        const text = '';
        let count = paletteCount+1;
        if(this.paletteDirection === LegendDirection.VERTICAL) {

            if (this.valuePlacement === LegendValuePlacement.RIGHT) {

                this.setTextPosition(ctx,text, this.x + this.width + 15, this.y + this.height / 2);

            }

            if (this.valuePlacement === LegendValuePlacement.LEFT) {

                this.setTextPosition(ctx,text, this.x - 15, this.y + this.height / 2);

            }

            if (this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                if (count % 2 === 0) {

                    ctx.textAlign = "right";
                    this.setTextPosition(ctx,text, this.x - 15, this.y + this.height / 2);

                }
                else {

                    ctx.textAlign = "left";
                    this.setTextPosition(ctx,text , this.x + this.width + 15, this.y + this.height / 2);
                }

            }

            ctx.textAlign = "left";

    }
    if(this.paletteDirection === LegendDirection.HORIZONTAL || this.paletteDirection === LegendDirection.AUTO ) {

        if(this.valuePlacement === LegendValuePlacement.TOP) {
          ctx.textAlign = "center";
          this.setTextPosition(ctx,text,this.x+this.width/2,this.y-15);

        }

        if(this.valuePlacement === LegendValuePlacement.BOTTOM) { 
          ctx.textAlign = "center";
          this.setTextPosition(ctx,text,this.x + this.width / 2, this.y + this.height +15);
        }

        if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

          let count = paletteCount + 1;

             if (count % 2 === 0) {

              this.setTextPosition(ctx,text,this.x + this.width / 2, this.y + this.height +15);

             }
             else {

              this.setTextPosition(ctx,text,this.x+this.width/2,this.y-15);

             }


            

        }


  }

        
    }

    setBelowMinValuePosition(ctx: CanvasRenderingContext2D ,paletteElementGap:number,paletteCount:number) {
        const text = '';
        let count = paletteCount+1;
        if(this.paletteDirection === LegendDirection.VERTICAL) {

            if (this.valuePlacement === LegendValuePlacement.RIGHT) {

                this.setTextPosition(ctx,text, this.x + this.width + 15, this.y + this.height / 2);

            }

            if (this.valuePlacement === LegendValuePlacement.LEFT) {

                this.setTextPosition(ctx,text, this.x - 15, this.y + this.height / 2);

            }

            if (this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                if (count % 2 === 0) {

                    ctx.textAlign = "right";
                    this.setTextPosition(ctx,text, this.x - 15, this.y + this.height / 2);

                }
                else {

                    ctx.textAlign = "left";
                    this.setTextPosition(ctx,text , this.x + this.width + 15, this.y + this.height / 2);
                }

            }

            ctx.textAlign = "left";

    }
    if(this.paletteDirection === LegendDirection.HORIZONTAL || this.paletteDirection === LegendDirection.AUTO ) {

        if(this.valuePlacement === LegendValuePlacement.TOP) {
          ctx.textAlign = "center";
          this.setTextPosition(ctx,text,this.x+this.width/2,this.y-15);

        }

        if(this.valuePlacement === LegendValuePlacement.BOTTOM) { 
          ctx.textAlign = "center";
          this.setTextPosition(ctx,text,this.x + this.width / 2, this.y + this.height +15);
        }

        if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

          let count = paletteCount + 1;

             if (count % 2 === 0) {

              this.setTextPosition(ctx,text,this.x + this.width / 2, this.y + this.height +15);

             }
             else {

              this.setTextPosition(ctx,text,this.x+this.width/2,this.y-15);

             }


            

        }


  }

        
    }

    setValuePosition(ctx: CanvasRenderingContext2D ,paletteElementGap:number,paletteCount:number) {

        let count = paletteCount+1;
        if(this.valueNature === ValueNature.MAXMIN){
        if(this.paletteType === LegendType.DISCRETE) {

            const text = this.valueType === ValueType.NA ? 'NA' : this.textCenter;
            const textTop = this.valueType === ValueType.NA ? 'NA' : this.textTop;
            const textBtm = this.valueType === ValueType.NA ? 'NA' : this.textBottom;


            if(this.paletteDirection === LegendDirection.VERTICAL) {

                if (this.valuePlacement === LegendValuePlacement.RIGHT) {  
                    if (textTop !== ValueType.NA && textTop)
                        this.setTextPosition(ctx,textTop, this.x + this.width + 15, this.y);
                    if (textBtm !== ValueType.NA && textBtm)
                        this.setTextPosition(ctx,textBtm, this.x + this.width + 15, this.y + this.height + paletteElementGap);

                }

                if (this.valuePlacement === LegendValuePlacement.LEFT) {

                    if (textTop !== ValueType.NA && textTop)
                      this.setTextPosition(ctx,textTop, this.x - 15, this.y)
                    if (textBtm !== ValueType.NA && textBtm)
                      this.setTextPosition(ctx,textBtm, this.x - 15, this.y + this.height + paletteElementGap);


                }

                if (this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                    if (count === 1) {
                        ctx.textAlign = "left";
                        this.setTextPosition(ctx,textTop, this.x + this.width + 15, this.y);
                        ctx.textAlign = "right";
                        this.setTextPosition(ctx,textBtm, this.x - 15, this.y + this.height + paletteElementGap);

                    }

                    if (count % 2 === 0) {

                        ctx.textAlign = "left";
                        this.setTextPosition(ctx,textBtm, this.x + this.width + 15, this.y + this.height + paletteElementGap)

                    }
                    else if (count !== 1) {

                        ctx.textAlign = "right";
                        this.setTextPosition(ctx,textBtm, this.x - 15, this.y + this.height + paletteElementGap);

                    }

                }

                ctx.textAlign = "left";
            }

            if(this.paletteDirection === LegendDirection.HORIZONTAL || this.paletteDirection === LegendDirection.AUTO ) {


                if (this.valuePlacement === LegendValuePlacement.TOP) {

                    if (textTop !== ValueType.NA && textTop)
    
                        this.setTextPosition(ctx,textTop, this.x, this.y - 15);
    
                    if (textBtm !== ValueType.NA && textBtm)
    
                        this.setTextPosition(ctx,textBtm, this.x + this.width + paletteElementGap, this.y - 15);
    
                }
    
                if (this.valuePlacement === LegendValuePlacement.BOTTOM) {
    
    
                    if (textTop !== ValueType.NA && textTop)
    
                    this.setTextPosition(ctx,textTop, this.x, this.y + this.height + 15);
    
                    if (textBtm !== ValueType.NA && textBtm)
    
                    this.setTextPosition(ctx,textBtm, this.x + this.width + paletteElementGap, this.y + this.height + 15);
    
                }
    
    
                if (this.valuePlacement === LegendValuePlacement.ALTERNATING) {
    
    
                    if (count === 1) {
                        // ctx.textAlign = "center";
                        this.setTextPosition(ctx,textTop, this.x-15, this.y - 15);
                        this.setTextPosition(ctx,textBtm, this.x-15 + this.width + paletteElementGap, this.y + this.height + 15);
    
                    }
    
    
                    if (count % 2 === 0) {
                        // ctx.textAlign = "center";
                        this.setTextPosition(ctx,textBtm, this.x-15 + this.width + paletteElementGap, this.y - 15);
    
                    }
                    else if (count !== 1) {
    
                        // ctx.textAlign = "center";
                        this.setTextPosition(ctx,textBtm, this.x-15 + this.width+paletteElementGap, this.y + this.height + 15);
    
                    }
    
                }

                
            }

        }
    }
    else{
        if(this.paletteType === LegendType.DISCRETE) {

            const text = this.valueType === ValueType.NA ? 'NA' : this.textCenter;

            if(this.paletteDirection === LegendDirection.VERTICAL) {

                    if (this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.setTextPosition(ctx,text, this.x + this.width + 15, this.y + this.height / 2);
        
                    }

                    if (this.valuePlacement === LegendValuePlacement.LEFT) {

                        this.setTextPosition(ctx,text, this.x - 15, this.y + this.height / 2);
        
                    }

                    if (this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        if (count % 2 === 0) {

                            ctx.textAlign = "right";
                            this.setTextPosition(ctx,text, this.x - 15, this.y + this.height / 2);

                        }
                        else {
        
                            ctx.textAlign = "left";
                            this.setTextPosition(ctx,text , this.x + this.width + 15, this.y + this.height / 2);
                        }
        
                    }

                    ctx.textAlign = "left";

            }

            if(this.paletteDirection === LegendDirection.HORIZONTAL || this.paletteDirection === LegendDirection.AUTO ) {

                  if(this.valuePlacement === LegendValuePlacement.TOP) {
                    ctx.textAlign = "center";
                    this.setTextPosition(ctx,text,this.x+this.width/2,this.y-15);

                  }

                  if(this.valuePlacement === LegendValuePlacement.BOTTOM) { 
                    ctx.textAlign = "center";
                    this.setTextPosition(ctx,text,this.x + this.width / 2, this.y + this.height +15);
                  }

                  if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                    let count = paletteCount + 1;

                       if (count % 2 === 0) {

                        this.setTextPosition(ctx,text,this.x-15 + this.width / 2, this.y + this.height +15);

                       }
                       else {

                        this.setTextPosition(ctx,text,this.x-15+this.width/2,this.y-15);

                       }


                      

                  }


            }
        }
    }

        if(this.paletteType === LegendType.CONTINUOUS) {
            if(this.valueNature === ValueNature.MAXMIN){
            

                const textTop = this.valueType === ValueType.NA ? 'NA' : this.textTop;
                const textBtm = this.valueType === ValueType.NA ? 'NA' : this.textBottom;

            if(this.paletteDirection === LegendDirection.VERTICAL) {

                if (this.valuePlacement === LegendValuePlacement.RIGHT) {  
                    if (textTop !== ValueType.NA && textTop)
                        this.setTextPosition(ctx,textTop, this.x + this.width + 15, this.y);
                    if (textBtm !== ValueType.NA && textBtm)
                        this.setTextPosition(ctx,textBtm, this.x + this.width + 15, this.y + this.height + paletteElementGap);

                }

                if (this.valuePlacement === LegendValuePlacement.LEFT) {

                    if (textTop !== ValueType.NA && textTop)
                      this.setTextPosition(ctx,textTop, this.x - 15, this.y)
                    if (textBtm !== ValueType.NA && textBtm)
                      this.setTextPosition(ctx,textBtm, this.x - 15, this.y + this.height + paletteElementGap);

                }

                if (this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                    if (count === 1) {
                        ctx.textAlign = "left";
                        this.setTextPosition(ctx,textTop, this.x + this.width + 15, this.y);
                        ctx.textAlign = "right";
                        this.setTextPosition(ctx,textBtm, this.x - 15, this.y + this.height + paletteElementGap);

                    }

                    if (count % 2 === 0) {

                        ctx.textAlign = "left";
                        this.setTextPosition(ctx,textBtm, this.x + this.width + 15, this.y + this.height + paletteElementGap)

                    }
                    else if (count !== 1) {

                        ctx.textAlign = "right";
                        this.setTextPosition(ctx,textBtm, this.x - 15, this.y + this.height + paletteElementGap);

                    }

                }

                ctx.textAlign = "left";
            }

            if(this.paletteDirection === LegendDirection.HORIZONTAL || this.paletteDirection === LegendDirection.AUTO ) {


                if (this.valuePlacement === LegendValuePlacement.TOP) {
                    
                    if (textTop !== ValueType.NA && textTop)
                    ctx.textAlign = "center";
                        this.setTextPosition(ctx,textTop, this.x, this.y - 15);
    
                    if (textBtm !== ValueType.NA && textBtm)
                    ctx.textAlign = "center";
                        this.setTextPosition(ctx,textBtm, this.x + this.width + paletteElementGap, this.y - 15);
    
                }
    
                if (this.valuePlacement === LegendValuePlacement.BOTTOM) {
    
    
                    if (textTop !== ValueType.NA && textTop)
                    ctx.textAlign = "center";
                    this.setTextPosition(ctx,textTop, this.x, this.y + this.height + 15);
    
                    if (textBtm !== ValueType.NA && textBtm)
                    ctx.textAlign = "center";
                    this.setTextPosition(ctx,textBtm, this.x + this.width + paletteElementGap, this.y + this.height + 15);
    
                }
    
    
                if (this.valuePlacement === LegendValuePlacement.ALTERNATING) {
    
    
                    if (count === 1) {
    
                        this.setTextPosition(ctx,textTop, this.x-15, this.y - 15);
                        this.setTextPosition(ctx,textBtm, this.x-15 + this.width + paletteElementGap, this.y + this.height + 15);
    
                    }
    
    
                    if (count % 2 === 0) {
    
                        this.setTextPosition(ctx,textBtm, this.x-15 + this.width + paletteElementGap, this.y - 15);
    
                    }
                    else if (count !== 1) {
    
    
                        this.setTextPosition(ctx,textBtm, this.x-15 + this.width+paletteElementGap, this.y + this.height + 15);
    
                    }
    
                }

                
            }



        }
        else {
        
            const text = this.valueType === ValueType.NA ? 'NA' : this.textCenter;  
            if(this.paletteDirection === LegendDirection.VERTICAL) {
    
                if (this.valuePlacement === LegendValuePlacement.RIGHT) {  
                    this.setTextPosition(ctx,text, this.x + this.width + 15, this.y + this.height / 2);
                    
                }
    
                if (this.valuePlacement === LegendValuePlacement.LEFT) {
    
                    this.setTextPosition(ctx,text, this.x - 15, this.y + this.height / 2);
            
                }
    
                if (this.valuePlacement === LegendValuePlacement.ALTERNATING) {
    
                    if (count % 2 === 0) {
    
                        ctx.textAlign = "right";
                        this.setTextPosition(ctx,text, this.x - 15, this.y + this.height / 2);
    
                    }
                    else {
    
                        ctx.textAlign = "left";
                        this.setTextPosition(ctx,text , this.x + this.width + 15, this.y + this.height / 2);
                    }
    
                }
    
                ctx.textAlign = "left";
            }
    
            if(this.paletteDirection === LegendDirection.HORIZONTAL || this.paletteDirection === LegendDirection.AUTO ) {
    
    
                if (this.valuePlacement === LegendValuePlacement.TOP) {
                    ctx.textAlign = "center";
                    this.setTextPosition(ctx,text,this.x+this.width/2,this.y-15);
                }
    
                if (this.valuePlacement === LegendValuePlacement.BOTTOM) {
    
                    ctx.textAlign = "center";
                    this.setTextPosition(ctx,text,this.x + this.width / 2, this.y + this.height +15);
                     
                }
    
    
                if (this.valuePlacement === LegendValuePlacement.ALTERNATING) {
    
    
                    let count = paletteCount + 1;
    
                           if (count % 2 === 0) {
    
                            this.setTextPosition(ctx,text,this.x-15 + this.width / 2, this.y + this.height +15);
    
                           }
                           else {
    
                            this.setTextPosition(ctx,text,this.x-15+this.width/2,this.y-15);
    
                           }
    
                }
    
                
            }
        }
    }
    
    }

    setTextPosition(ctx: CanvasRenderingContext2D,Text:string,positionX:number , positonY:number) {

        ctx.fillStyle = this.textColor;
        if(this.valuePlacement === LegendValuePlacement.LEFT) {
            ctx.textAlign = "right";
        }

        ctx.fillText(Text, positionX, positonY);

    }

    setTitlePosition(ctx: CanvasRenderingContext2D , count:number , paletteGap:number ,colorCountLength:number ) {

        // function will call only one time 

        if (this.paletteDirection === LegendDirection.VERTICAL) {

            if (count === 0) {

                this.verticalTitlePlacement(ctx, colorCountLength ,paletteGap);

            }



        }

    // function will call only one time     

        else if (this.paletteDirection === LegendDirection.HORIZONTAL || this.paletteDirection === LegendDirection.AUTO ) {

            if (count === 0) {

                this.horizontalTitlePlacement(ctx, colorCountLength,paletteGap);


            }
        }


    }

    verticalTitlePlacement(ctx: CanvasRenderingContext2D,colorCountLength:number ,paletteGap:number ) {

        let legendHeight:number = 0 ;
        let paletteTotalGap = (paletteGap * colorCountLength);
        colorCountLength = colorCountLength +3;
        legendHeight = (this.height * colorCountLength) ; 
        legendHeight = legendHeight+ paletteTotalGap;


        if (this.titlePlacement === LegendTitlePlacement.TOP) {
            if(this.valuePlacement === LegendValuePlacement.LEFT) { 

                ctx.fillText(this.variable, this.x - 50, this.y - 40);
                ctx.fillText(this.steps, this.x - 50, this.y - 25);
                ctx.fillText(this.derivedType, this.x - 50, this.y - 10);

            }
            else if(this.valuePlacement === LegendValuePlacement.RIGHT) { 

                ctx.fillText(this.variable, this.x, this.y - 40);
                ctx.fillText(this.steps, this.x, this.y - 25);
                ctx.fillText(this.derivedType, this.x, this.y - 10);
            }
            else if(this.valuePlacement === LegendValuePlacement.ALTERNATING) { 

                ctx.fillText(this.variable, this.x-25, this.y - 40);
                ctx.fillText(this.steps, this.x-25, this.y - 25);
                ctx.fillText(this.derivedType, this.x-25, this.y - 10);
            }

            

        }

        else if (this.titlePlacement === LegendTitlePlacement.BOTTOM) {

            if(this.valuePlacement === LegendValuePlacement.LEFT) { 

                ctx.fillText(this.variable, this.x - 50, (this.y+legendHeight+50) );
                ctx.fillText(this.steps, this.x - 50, (this.y+legendHeight+65) );
                ctx.fillText(this.derivedType, this.x - 50, (this.y+legendHeight+80) );

            }
            else if(this.valuePlacement === LegendValuePlacement.RIGHT) { 


                ctx.fillText(this.variable, this.x, (this.y+legendHeight+50) );
                ctx.fillText(this.steps, this.x, (this.y+legendHeight+65) );
                ctx.fillText(this.derivedType, this.x, (this.y+legendHeight+80) );
            }
            else if(this.valuePlacement === LegendValuePlacement.ALTERNATING) { 

                ctx.fillText(this.variable, this.x-50, (this.y+legendHeight+50) );
                ctx.fillText(this.steps, this.x-50, (this.y+legendHeight+65) );
                ctx.fillText(this.derivedType, this.x-50, (this.y+legendHeight+80) );
            }



            

        }


    }

    horizontalTitlePlacement(ctx: CanvasRenderingContext2D ,colorCountLength:number ,paletteGap:number) {


        let legendWidth:number = 0 ;
        let paletteTotalGap = (paletteGap * colorCountLength);
        colorCountLength = colorCountLength ;
        legendWidth = (this.width * colorCountLength) ; 
        legendWidth = legendWidth + paletteTotalGap;



        switch (true) {

            case this.titlePlacement === LegendTitlePlacement.TOP_LEFT:

                return (
                    ctx.fillText(this.variable, this.x+20, this.y - 52),
                    ctx.fillText(this.steps, this.x+20, this.y - 40),
                    ctx.fillText(this.derivedType, this.x+20, this.y - 30)
                    )
                    


            case this.titlePlacement === LegendTitlePlacement.TOP_MIDDLE:

                return (ctx.fillText(this.variable, (this.x + legendWidth / 2) , this.y - 52),
                ctx.fillText(this.steps, (this.x + legendWidth / 2) , this.y - 40),
                ctx.fillText(this.derivedType, (this.x + legendWidth / 2) , this.y - 30));

            case this.titlePlacement === LegendTitlePlacement.TOP_RIGHT:

                return (ctx.fillText(this.variable, (this.x + legendWidth) , this.y - 52),
                ctx.fillText(this.steps, (this.x + legendWidth) , this.y - 40),
                ctx.fillText(this.derivedType, (this.x + legendWidth) , this.y - 30));

            case this.titlePlacement === LegendTitlePlacement.BOTTOM_LEFT:

                return (ctx.fillText(this.variable, this.x, this.y + this.height +30),
                ctx.fillText(this.steps, this.x, this.y + this.height + 42),
                ctx.fillText(this.derivedType, this.x, this.y + this.height + 56)
                );

            case this.titlePlacement === LegendTitlePlacement.BOTTOM_MIDDLE:

                return(ctx.fillText(this.variable, this.x + legendWidth / 2, this.y + this.height + 30),
                ctx.fillText(this.steps, this.x + legendWidth / 2, this.y + this.height + 42),
                ctx.fillText(this.derivedType, this.x + legendWidth / 2, this.y + this.height + 56));

            case this.titlePlacement === LegendTitlePlacement.BOTTOM_RIGHT:

                return (ctx.fillText(this.variable,+this.x+ legendWidth, this.y + this.height + 30),
                ctx.fillText(this.steps, this.x+legendWidth, this.y + this.height + 42),
                ctx.fillText(this.derivedType,this.x+ legendWidth, this.y + this.height + 56)
                );

        }


    }


}

export class Palette {
    private position: { x: number, y: number};
    private noResultColorPosition: { m: number, n: number};
    private aboveMaxColorPosition: { m: number, n: number};
    private belowMinColorPosition: { m: number, n: number};
    private width: number;
    private height: number;
    private bandWidth: number;
    private noResultsColorBandWidth: number;
    private aboveMaxColorBandwidth: number;
    private belowMinColorBandwidth: number;
    private bandHeight: number;
    private noResultsColorBandHeight: number;
    private aboveMaxColorBandHeight : number;
    private belowMinColorBandHeight : number;
    private textColor: string;
    private textAlign: string;
    private font: string;
    private baseline: string;
    private minMax: [number, number];
    private colors: string[];
    private noResultsColor: string[];
    private aboveMaxColor:string[];
    private belowMinColor:string[];
    private noResultsValue : string[];
    private aboveMaxValue: string[];
    private belowMinValue: string[];
    private values: number[];
    private title:string;
    private variable:string;
    private steps:string;
    private derivedType: string;
    private paletteType: LegendType;
    private valueNature:ValueNature;
    private paletteDirection: LegendDirection;
    private valuePlacement: LegendValuePlacement;
    private titlePlacement: LegendTitlePlacement;
    private scale: string;
    private paletteElements: PaletteElement[];
    private ticks: LegendTicsType;
    private gap:number;

    constructor() {
        this.position = { x: 50, y: 50 };
        this.noResultColorPosition = { m: 50, n: 50 };
        this.aboveMaxColorPosition = { m: 50, n: 50 };
        this.belowMinColorPosition = { m: 50, n: 50 };
        this.bandWidth = 0;
        this.noResultsColorBandWidth =0;
        this.aboveMaxColorBandwidth = 0;
        this.belowMinColorBandwidth = 0;
        this.bandHeight = 0;
        this.noResultsColorBandHeight = 0;
        this.aboveMaxColorBandHeight = 0;
        this.belowMinColorBandHeight = 0;
        this.baseline = 'middle';
        this.colors = ['#ee4035', '#f37736', '#fdf498', '#7bc043', '#ee4035', '#f37736', '#fdf498'];
        this.noResultsColor = ['#ee4035', '#f37736', '#fdf498'];
        this.aboveMaxColor = ['#ee4035', '#f37736', '#fdf498'];
        this.belowMinColor = ['#ee4035', '#f37736', '#fdf498'];
        this.noResultsValue = ['30'];
        this.aboveMaxValue = ['10'];
        this.belowMinValue = ['10'];
        this.values = [100, 50, 30, 0, 10, 15, 20];
        this.title = "Legend";
        this.variable = "";
        this.steps = "";
        this.derivedType = "";
        this.paletteType = LegendType.DISCRETE;
        this.valueNature = ValueNature.MAXMIN;
        this.ticks = LegendTicsType.RUNNING_ACROSS;
        this.paletteDirection = LegendDirection.VERTICAL;
        this.valuePlacement = LegendValuePlacement.RIGHT;
        this.titlePlacement = LegendTitlePlacement.TOP;
        this.gap = 0;
        this.width = 0;
        this.height = 0;
        this.minMax = [0, 10];
        this.scale = 'linear';
        this.font = '12px Times New Roman'
        this.textColor = 'black';
        store.subscribe(this.setTextColorBasedOnTheme.bind(this));
        this.textAlign = 'middle';
        this.paletteElements = [];
    }


    draw(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number,selectedColorMap:any,derivedTypeName:string) {

        ctx.clearRect(0, 0, canvasWidth,canvasHeight);

        ctx.font = this.font;
        ctx.textAlign = this.textAlign as any;
        ctx.textBaseline = this.baseline as any;

        var xOffset = 0;
        var yOffset = 0;

        var NoResultColorxOffset = 0;
        var NoResultColoryOffset = 0;

        var AboveMaxColorxOffset = 0;
        var AboveMaxColoryOffset = 0;

        var BelowMinColorxOffset = 0;
        var BelowMinColoryOffset = 0;


        if(this.colors.length === 1)
            this.paletteType = LegendType.DISCRETE

        let continueColors = [];
        if(this.paletteType === LegendType.CONTINUOUS){        
            let piecewiseColor = d3.piecewise(d3.interpolateHsl, (this.colors));
            let colorCnt =  this.colors.length;
            for(let i=0;i <= colorCnt; i++) 
                continueColors.push(piecewiseColor(i/colorCnt));              
        } 
     
        const colorCount = this.paletteType === LegendType.CONTINUOUS ? this.colors.length : this.colors.length;
        const noResultColorCount = this.paletteType === LegendType.CONTINUOUS ? this.noResultsColor.length : this.noResultsColor.length;

        const aboveMaxColorCount = this.paletteType === LegendType.CONTINUOUS ? this.aboveMaxColor.length : this.aboveMaxColor.length;

        const belowMinColorCount = this.paletteType === LegendType.CONTINUOUS ? this.belowMinColor.length : this.belowMinColor.length;

        // const totalColors = this.colors.length + this.aboveMaxColor.length + this.belowMinColor.length + this.noResultsColor.length
        const totalColorCount = colorCount + noResultColorCount + aboveMaxColorCount + belowMinColorCount;
       

        const bandHeight = (canvasHeight - 100) / totalColorCount;

        const totalHeightByILoop = aboveMaxColorCount * bandHeight;

        const totalHeightByLLoop = colorCount * bandHeight;

        const totalHeightByJLoop = belowMinColorCount * bandHeight;
        
        
        if (this.paletteDirection === LegendDirection.VERTICAL) {

            this.bandWidth = canvasWidth/10;
            this.bandHeight = (canvasHeight - 100) / totalColorCount;
            this.noResultsColorBandWidth = canvasWidth/10;
            this.noResultsColorBandHeight = 15
            this.aboveMaxColorBandWidth = canvasWidth/10;
            this.aboveMaxColorBandHeight = 15
            this.belowMinColorBandWidth = canvasWidth/10;
            this.belowMinColorBandHeight = 15


            xOffset = 0;
            yOffset = this.bandHeight;

            NoResultColorxOffset = 0;
            NoResultColoryOffset = this.noResultsColorBandHeight

            AboveMaxColorxOffset = 0;
            AboveMaxColoryOffset = this.aboveMaxColorBandHeight

            BelowMinColorxOffset = 0;
            BelowMinColoryOffset = this.belowMinColorBandHeight


        }

        else if (this.paletteDirection === LegendDirection.HORIZONTAL || this.paletteDirection === LegendDirection.AUTO ) {

            this.bandWidth = (canvasWidth - 100)  / totalColorCount;
            this.bandHeight = canvasHeight - 100;
            this.noResultsColorBandWidth = 25
            this.noResultsColorBandHeight = canvasHeight - 100

            this.aboveMaxColorBandWidth = 25
            this.aboveMaxColorBandHeight = canvasHeight - 100

            this.belowMinColorBandWidth = 25
            this.belowMinColorBandHeight = canvasHeight - 100


            xOffset = this.bandWidth;
            yOffset = 0;

            NoResultColorxOffset = this.noResultsColorBandWidth;
            NoResultColoryOffset = 0;

            AboveMaxColorxOffset = this.aboveMaxColorBandWidth;
            AboveMaxColoryOffset = 0;

            BelowMinColorxOffset = this.belowMinColorBandWidth;
            BelowMinColoryOffset = 0;


        }

                    for (let k = 0; k < aboveMaxColorCount; k++) {
                        const options: PaletteElementOptions = {
                            x: this.position.x + k * AboveMaxColorxOffset,
                            y: this.position.y  + 15 + k * yOffset,
                            width: this.bandWidth,
                            height: this.bandHeight,
                            aboveMaxColor: this.aboveMaxColor[k],
                            horizontalAboveMaxColor: this.position.x + k * AboveMaxColorxOffset, // Calculate based on the current value of k
                            horizontalYBelowMinColor:this.paletteDirection === LegendDirection.VERTICAL ? (this.position.y + totalHeightByILoop+15 + k * BelowMinColoryOffset):(this.position.y+15 + BelowMinColoryOffset),
                            title: this.title,
                            variable: this.variable + selectedColorMap.variable,
                            steps: this.steps + selectedColorMap.step,
                            derivedType: this.derivedType + derivedTypeName,
                            aboveMaxText: this.aboveMaxValue[k],
                            textColor: this.textColor,
                            valueType: ValueType.FLOAT,
                            paletteDirection: this.paletteDirection,
                            paletteType: this.paletteType,
                            valueNature: this.valueNature,
                            valuePlacement: this.valuePlacement,
                            titlePlacement: this.titlePlacement,
                            ticks: this.ticks,
                        } as PaletteElementOptions;
                        const paletteElement = new PaletteElement(options);
                        paletteElement.aboveMaxColordraw(ctx, k, aboveMaxColorCount, this.gap);
                        paletteElement.setTitlePosition(ctx, k, this.gap, colorCount);
                    }
                    
                    for (let i = 0; i < colorCount; i++) {
                        const options: PaletteElementOptions = {
                            x: this.position.x + i * xOffset,
                            
                            y: this.paletteDirection === LegendDirection.VERTICAL ?  (this.position.y + totalHeightByILoop + 15 + i * yOffset) : (this.position.y+15 + i*yOffset),
                            // y: this.position.y + totalHeightByILoop + 15 + i * yOffset,
                            width: this.bandWidth,
                            height: this.bandHeight,
                            colorTop: this.paletteType === LegendType.CONTINUOUS ? continueColors[i] : this.colors[i],
                            horizontalAboveMaxColor: this.position.x + i * xOffset + this.bandWidth,
                            title: this.title,
                            variable: this.variable + selectedColorMap.variable,
                            steps: this.steps + selectedColorMap.step,
                            derivedType: this.derivedType + derivedTypeName,
                            colorBottom: this.paletteType === LegendType.CONTINUOUS ? continueColors[i + 1] : this.colors[i],
                            textTop: this.paletteType === LegendType.CONTINUOUS || LegendType.DISCRETE && i === 0 ? (this.values[i]) : null,
                            textCenter: this.paletteType === LegendType.DISCRETE || LegendType.CONTINUOUS ? (this.values[i]) : null,
                            textBottom: this.paletteType === LegendType.CONTINUOUS || LegendType.DISCRETE ? (this.values[i + 1]) : null,
                            textColor: this.textColor,
                            valueType: ValueType.FLOAT,
                            paletteDirection: this.paletteDirection,
                            paletteType: this.paletteType,
                            valueNature: this.valueNature,
                            valuePlacement: this.valuePlacement,
                            titlePlacement: this.titlePlacement,
                            ticks: this.ticks,
                        } as PaletteElementOptions;
                        const paletteElement = new PaletteElement(options);
                        paletteElement.draw(ctx, i, colorCount, this.gap);
                      
                        const horizontalBelowMinColor = this.position.x + i * xOffset + this.bandWidth;

                    }
        
        for (let l = 0; l < belowMinColorCount; l++) {
            const options: PaletteElementOptions = {
                x: this.position.x + l * BelowMinColorxOffset,
                y: this.position.y + totalHeightByILoop+15 + totalHeightByLLoop + l * BelowMinColoryOffset,
                width: this.bandWidth,
                height: this.bandHeight,
                belowMinColor: this.belowMinColor[l],
                horizontalBelowMinColor: this.position.x + l * BelowMinColorxOffset + ((colorCount+aboveMaxColorCount) * xOffset), // Still calculated based on the current value of l
                horizontalYBelowMinColor: this.paletteDirection === LegendDirection.VERTICAL ?  (this.position.y + totalHeightByILoop+15 + l * BelowMinColoryOffset) : (this.position.y+15 + BelowMinColoryOffset),
                title: this.title,
                variable: this.variable + selectedColorMap.variable,
                steps: this.steps + selectedColorMap.step,
                derivedType: this.derivedType + derivedTypeName,
                belowMinText: this.belowMinValue[l],
                textColor: this.textColor,
                valueType: ValueType.FLOAT,
                paletteDirection: this.paletteDirection,
                paletteType: this.paletteType,
                valueNature: this.valueNature,
                valuePlacement: this.valuePlacement,
                titlePlacement: this.titlePlacement,
                ticks: this.ticks,
            } as PaletteElementOptions;
            const paletteElement = new PaletteElement(options);
            paletteElement.belowMinColordraw(ctx, l, belowMinColorCount, this.gap);
        }

        for (let j = 0; j < noResultColorCount; j++) {
            const options:PaletteElementOptions = {
                x: this.position.x + j * NoResultColorxOffset,
                y: this.position.y + totalHeightByILoop+25 + totalHeightByLLoop + totalHeightByJLoop+ j * BelowMinColoryOffset,
                // y: this.position.y +((canvasHeight -100) / this.colors.length) * this.colors.length + j*NoResultColoryOffset ,
                width: this.bandWidth,
                height: this.bandHeight,
                 noResultsColor: this.noResultsColor[j],
                 horizontalNoResultcolor:this.position.x + j * NoResultColorxOffset +((colorCount+aboveMaxColorCount+belowMinColorCount   ) * xOffset+(this.gap+5)) ,
                 horizontalYBelowMinColor:this.paletteDirection === LegendDirection.VERTICAL ? (this.position.y + totalHeightByILoop+15 + j * BelowMinColoryOffset):(this.position.y + 15 + BelowMinColoryOffset ),
                 title:this.title,
                variable:this.variable+selectedColorMap.variable,
                steps:this.steps+selectedColorMap.step,
                derivedType:this.derivedType+derivedTypeName,
                 noResultText:this.noResultsValue[j],
                  textColor: this.textColor,
                valueType: ValueType.FLOAT,
                paletteDirection: this.paletteDirection,
                paletteType: this.paletteType,
                valueNature:this.valueNature,
                 valuePlacement: this.valuePlacement,
                 titlePlacement: this.titlePlacement,
                ticks: this.ticks
            } as PaletteElementOptions;
            const paletteElement = new PaletteElement(options);
            paletteElement.noResultsColordraw(ctx, j, noResultColorCount ,this.gap);
        }

       

       

    }

    // Set selected legend settings data 

    setPaletteType(type: any) {

        if (type === LegendType.AUTO) {

            this.paletteType = LegendType.DISCRETE;

        }
        else if (type === LegendType.CONTINUOUS) {

            this.paletteType = LegendType.CONTINUOUS;

        }
        else if (type === LegendType.DISCRETE) {

            this.paletteType = LegendType.DISCRETE;

        }
    }

    setValueNature(type: any){
        this.valueNature = type;
    }

    setPaletteDirection(direction: any) {

        if (direction === LegendDirection.AUTO) {

            this.paletteDirection = LegendDirection.HORIZONTAL;

        }
        else if (direction === LegendDirection.HORIZONTAL) {

            this.paletteDirection = LegendDirection.HORIZONTAL;

        }
        else if (direction === LegendDirection.VERTICAL) {

            this.paletteDirection = LegendDirection.VERTICAL;


        }
    }

    setPaletteTickPosition(tick: any) {

        if (tick === LegendTicsType.NO_TICS) {

            this.ticks = LegendTicsType.NO_TICS;
        }
        else if (tick === LegendTicsType.INSIDE) {

            this.ticks = LegendTicsType.INSIDE;

        }
        else if (tick === LegendTicsType.OUTSIDE) {

            this.ticks = LegendTicsType.OUTSIDE;

        }

        else if (tick === LegendTicsType.RUNNING_ACROSS) {

            this.ticks = LegendTicsType.RUNNING_ACROSS;
        }

    }

    setPaletteTittlePlacement(tittle: any) {

         if (tittle === LegendTitlePlacement.BOTTOM) {

            this.titlePlacement = LegendTitlePlacement.BOTTOM;

        }
        else if (tittle === LegendTitlePlacement.BOTTOM_LEFT) {

            this.titlePlacement = LegendTitlePlacement.BOTTOM_LEFT;

        }

        else if (tittle === LegendTitlePlacement.BOTTOM_MIDDLE) {

            this.titlePlacement = LegendTitlePlacement.BOTTOM_MIDDLE;
        }

        else if (tittle === LegendTitlePlacement.BOTTOM_RIGHT) {

            this.titlePlacement = LegendTitlePlacement.BOTTOM_RIGHT;
        }

        else if (tittle === LegendTitlePlacement.TOP) {

            this.titlePlacement = LegendTitlePlacement.TOP;
        }

        else if (tittle === LegendTitlePlacement.TOP_LEFT) {

            this.titlePlacement = LegendTitlePlacement.TOP_LEFT;
        }

        else if (tittle === LegendTitlePlacement.TOP_MIDDLE) {

            this.titlePlacement = LegendTitlePlacement.TOP_MIDDLE;
        }

        else if (tittle === LegendTitlePlacement.TOP_RIGHT) {

            this.titlePlacement = LegendTitlePlacement.TOP_RIGHT;
        }

    }

    setPaletteValuePlacement(value: any) {

        if (value === LegendValuePlacement.BOTTOM) {

            this.valuePlacement = LegendValuePlacement.BOTTOM;

        }
        else if (value === LegendValuePlacement.LEFT) {

            this.valuePlacement = LegendValuePlacement.LEFT;

        }

        else if (value === LegendValuePlacement.RIGHT) {

            this.valuePlacement = LegendValuePlacement.RIGHT;
        }

        else if (value === LegendValuePlacement.TOP) {

            this.valuePlacement = LegendValuePlacement.TOP;
        }

        else if (value === LegendValuePlacement.ALTERNATING) {

            this.valuePlacement = LegendValuePlacement.ALTERNATING;
        }


    }

    setPaletteColor(colors:any) {

        this.colors = colors;

    }
    setNoResultsPaletteColor(noResultsColor:any) {

        this.noResultsColor = noResultsColor;

    }
    setAboveMaxPaletteColor(aboveMaxColor:any) {

        this.aboveMaxColor = aboveMaxColor;

    }
    setBelowMinPaletteColor(belowMinColor:any) {

        this.belowMinColor = belowMinColor;

    }
    setNoResultsComputedValues(noResultsValue:any){
        this.noResultsValue = noResultsValue
    }
    setAboveMaxComputedValues(aboveMaxValue:any){
        this.aboveMaxValue = aboveMaxValue
    }

    setBelowMinComputedValues(belowMinValue:any){
        this.belowMinValue = belowMinValue
    }

    setTextColorBasedOnTheme() {
        const themes = selectThems(store.getState());
        const currentTheme = themes.find((theme) => theme.applied === true);
        if (currentTheme?.name === 'Light') {
          this.textColor = 'rgba(0, 0, 0, .89)';
        } else {
          this.textColor = 'rgba(255, 255, 255, 1)';
        }
      }

    setPaletteValue(values:any) {

        this.values = values


    }

    setPaletteGap(Gap:number) {

        this.gap = Gap;
    }

    setLegendTitle(title:any) {

        this.title = title;
    }


}

export class PaletteBuilder {

    palette: Palette;
    constructor() {
        this.palette = new Palette();
    }
    build() {
        return this.palette
    }
}