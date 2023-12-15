
export const calcCount = (titleList:any) => {
    if(titleList.length > 0){
        const str = titleList.reduce((a:string,b:string) => a+b);
        const num = str?.match(/\d+/g)?.map(Number)
        const maxNum = num?.reduce((a,b) => (a>b)?a:b)
        const count  = (maxNum && maxNum>titleList.length)? maxNum+1 : (titleList.length + 1 );
        return count;
    } else return (titleList.length + 1);
}

export const LeafCounter = (arr:any,pid:string) => {
    const titleList = arr.data[pid].children.map((i:any) => arr.data[i].title)
    return calcCount(titleList);   
}

export const RootCounter =(arr:any) =>{
    const titleList = arr.rootIds.map((i:any) => arr.data[i].title);
    return calcCount(titleList);
}