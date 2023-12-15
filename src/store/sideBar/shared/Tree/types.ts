//import { ITreeNode } from "../../../../components/shared/RsTreeTable";
import { ITreeNode } from "../../../../components/shared/RcTree";
export interface TreeNode extends ITreeNode {
    customData?: {
       displayId: string, 
       pickandmoveMatrix?:number[]
    }
}
export interface ITreeState {
    data: {[id:string]:TreeNode},
    rootIds: string[]
}

export enum Trees {

}