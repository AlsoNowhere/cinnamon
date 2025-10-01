interface IArgs {
  distance: number;
  maxDistance?: number;
}

export const getMagnitude = ({ distance, maxDistance: _maxDistance }: IArgs) => {
  const maxDistance = _maxDistance ?? 100;

  let delta = maxDistance - distance;

  if (delta < 0) return 0;

  return delta / maxDistance;
};
