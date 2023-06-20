export const getGraph = (elem: SVGGElement | undefined) => {
  if (!elem) {
    return undefined;
  }

  return elem.querySelectorAll('path,polygon,ellipse');
};
