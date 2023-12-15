export const generateTitle = (titleString:string,data:any[]) => {

    let titleNumber:any[] = [];
    let finalTitle:string = ''

    data.forEach((item) => {
        let filteredTitle =  splitTitle(item.title);
        let dynamicTitleSplit = item.title.split(/(\d+)/);
        if(filteredTitle) {
            if(dynamicTitleSplit[0] === filteredTitle.title) {
                titleNumber.push(filteredTitle.number);
            }
        }

    })

    finalTitle = getTitle(titleString,titleNumber);

    return finalTitle
}

const splitTitle = (title:string)=> {
   
    let splitText = title.split(/(\d+)/);
    if(splitText) {
        let splitedText = splitText[0];
        let splitedNumber = Number(splitText[1]);
        return({number:splitedNumber,title:splitedText})
    }

}

const getTitle = (title:string,totalCount:number[]) => {

    const max:number = Math.max(... totalCount);
    const nextCount = max+1;

    return title+' '+ nextCount;

}