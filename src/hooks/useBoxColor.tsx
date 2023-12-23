import { GridElement } from '../../lib/Grid';

export function useBoxColor() {
  return (el: GridElement) => {
    if (el === 'Block') {
      return '#2A2A2A';
    }

    if (el === 'Visited') {
      return '#CBD5E1';
    }

    if (el === 'Path') {
      return '#DB2777';
    }

    return '#FFFFFF';
  };
}
