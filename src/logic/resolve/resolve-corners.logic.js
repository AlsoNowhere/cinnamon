// const p = (width, height) => (w, h) => {
//   return {
//     resolvedPoint: {
//       width: w * width,
//       height: h * height,
//     },
//   };
// };

// export const resolveCorners = function (points, trail, previous, next) {
//   const pop = p(this.width, this.height);

//   if (
//     (previous.plane === "top" && next.plane === "right") ||
//     (previous.plane === "right" && next.plane === "top")
//   ) {
//     points.push(pop(1, 0));
//   }

//   if (
//     (previous.plane === "right" && next.plane === "bottom") ||
//     (previous.plane === "bottom" && next.plane === "right")
//   ) {
//     points.push(pop(1, 1));
//   }

//   if (
//     (previous.plane === "bottom" && next.plane === "left") ||
//     (previous.plane === "left" && next.plane === "bottom")
//   ) {
//     points.push(pop(0, 1));
//   }

//   if (
//     (previous.plane === "left" && next.plane === "top") ||
//     (previous.plane === "top" && next.plane === "left")
//   ) {
//     points.push(pop(0, 0));
//   }

//   if (previous.plane === "left" && next.plane === "right") {
//     points.push(pop(0, 1), pop(1, 1));
//   }
//   if (previous.plane === "right" && next.plane === "left") {
//     points.push(pop(1, 1), pop(0, 1));
//   }
// };
