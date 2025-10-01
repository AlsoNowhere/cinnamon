export const clearCanvas = (target: HTMLCanvasElement) => {
  const context = target.getContext("2d");
  if (context === null) return;
  target.style.backgroundColor = "transparent";
  context.clearRect(0, 0, target.width, target.height);
};
