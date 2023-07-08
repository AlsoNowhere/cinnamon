import { Aperture } from "../models/Aperture.model";

export const generateAperture = (
  aperture: number,
  width: number,
  height: number
): Aperture => {
  const ratio = width / height;

  const x = ratio > 1 ? aperture : aperture * ratio;
  const y = ratio < 1 ? aperture : aperture / ratio;

  return new Aperture(x, y);
};
