
const getGradient = (x,y) => y/x;
export const getLineGradient = (lineA,lineB) => getGradient(lineB.y - lineA.y, lineB.x - lineA.x);

const getIntercept = (y,x,m) => y - m * x;
export const getLineIntercept = line => getIntercept(line.y, line.x, line.m);
