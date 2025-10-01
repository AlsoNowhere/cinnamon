import { ILineEndInView } from "../interfaces/ILineEndInView.interface";
import { ILineNoneInView } from "../interfaces/ILineNoneInView.interface";
import { ILineStartInView } from "../interfaces/ILineStartInView.interface";
export type TLinePoint = ILineStartInView | ILineEndInView | ILineNoneInView;
