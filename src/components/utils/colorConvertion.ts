export const hexToRgb = (hex:string, return_object  = false ) => {
    let alpha:number = 1;
    hex   = hex.replace('#', '');
    var r = parseInt(hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
    var g = parseInt(hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
    var b = parseInt(hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);
    if (return_object) {
        return {'r':r,'g':g,'b':b,'a':alpha}
    } else {
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    }

 }

export const rgbToHex = (color:string) => {

    const rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
    const hex = `#${((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1)}`;
    
    return hex;
}