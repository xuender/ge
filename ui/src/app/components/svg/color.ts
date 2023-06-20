import * as Color from 'color';

export const negateHex = (hex: string | null | undefined) => {
  if (!hex) {
    return 'red';
  }

  try {
    const c = Color(hex).negate();
    return c.isLight() ? 'red' : c.hex();
  } catch {
    return 'red';
  }
};

export const darkenHex = (hex: string | null | undefined) => {
  if (!hex) {
    return 'red';
  }

  try {
    const c = Color(hex)
      // .negate();
      .alpha(0.5)
      .darken(0.5);
    return c.hex();
  } catch {
    return 'red';
  }
};

const attributes = ['fill', 'stroke'];
export const selectAttribute = (element: Element, isNode = true) => {
  for (const a of attributes) {
    const hex = element.getAttribute(a);
    element.setAttribute(
      a,
      isNode ? darkenHex(hex as string) : negateHex(hex as string)
    );
  }
};

export const selectParent = (element: HTMLElement, cs: string[]): any => {
  if (!cs.length) {
    return undefined;
  }

  if (cs.includes(element.getAttribute('class') as string)) {
    return element;
  }

  if (!element.parentElement) {
    return undefined;
  }

  return selectParent(element.parentElement, cs);
};
