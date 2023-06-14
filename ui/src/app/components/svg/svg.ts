const graphs = ['path', 'polygon', 'ellipse'];
export const getGraph = (elem: SVGGElement | undefined) => {
  if (!elem) {
    return undefined;
  }

  return elem.querySelectorAll('path,polygon,ellipse');
};

export const getBox = (elem: SVGGElement | undefined) => {
  if (!elem) {
    return undefined;
  }

  for (const tag of graphs.slice(1)) {
    const ret = elem.querySelector(tag);
    if (ret) {
      return ret;
    }
  }

  return undefined;
};
