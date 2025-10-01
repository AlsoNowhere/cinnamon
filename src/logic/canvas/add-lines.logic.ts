import { IResolvedLine } from "../../interfaces/IResolvedLine.interface";

export const addLinesCanvas = (target: HTMLCanvasElement, lines: Array<IResolvedLine>) => {
  for (let line of lines) {
    const context = target.getContext("2d");
    if (context === null) return;
    const {
      start: { width: x1, height: y1 },
      end: { width: x2, height: y2 },
    } = line;
    context.strokeStyle = line.line.colour;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  }
};
