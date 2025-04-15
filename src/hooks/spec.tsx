import { renderHook } from '@testing-library/react';
import useAnchorPosition from './useAnchorPosition';
import { RefObject } from 'react';

type Anchor = 'top' | 'bottom' | 'left' | 'right';

const createMockRefs = (
  inputRect: Partial<DOMRect>,
  popupSize: { offsetWidth: number; offsetHeight: number }
) => {
  const inputRef = {
    current: {
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        toJSON: () => '',
        ...inputRect,
      }),
    },
  } as unknown as RefObject<HTMLButtonElement>;

  const popupRef = {
    current: {
      offsetWidth: popupSize.offsetWidth,
      offsetHeight: popupSize.offsetHeight,
    },
  } as unknown as RefObject<HTMLDivElement>;

  return { inputRef, popupRef };
};

describe('useAnchorPosition', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 800 });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 600,
    });
  });

  it.each([
    {
      anchor: 'left',
      inputRect: { left: 50 },
      popupSize: { offsetWidth: 100, offsetHeight: 100 },
      expected: 'right',
    },
    {
      anchor: 'right',
      inputRect: { right: 750 },
      popupSize: { offsetWidth: 100, offsetHeight: 100 },
      expected: 'left',
    },
    {
      anchor: 'top',
      inputRect: { top: 50 },
      popupSize: { offsetWidth: 100, offsetHeight: 100 },
      expected: 'bottom',
    },
    {
      anchor: 'bottom',
      inputRect: { bottom: 590 },
      popupSize: { offsetWidth: 100, offsetHeight: 100 },
      expected: 'top',
    },
    {
      anchor: 'bottom',
      inputRect: { bottom: 400 },
      popupSize: { offsetWidth: 100, offsetHeight: 100 },
      expected: 'bottom',
    },
  ])(
    'should adjust anchor from $anchor to $expected when needed',
    async ({ anchor, inputRect, popupSize, expected }) => {
      const { inputRef, popupRef } = createMockRefs(inputRect, popupSize);

      const { result, rerender } = renderHook(() =>
        useAnchorPosition({
          anchor: anchor as Anchor,
          isOpen: true,
          inputRef,
          popupRef,
        })
      );

      rerender();

      expect(result.current).toBe(expected);
    }
  );
});
