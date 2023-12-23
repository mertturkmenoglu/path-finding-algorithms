import { HomeIcon, Crosshair1Icon } from '@radix-ui/react-icons';

export function useBoxElement() {
  return (ch: string) => {
    if (ch === 'S') {
      return <HomeIcon className="text-pink-600 w-6 h-6" />;
    }

    if (ch === 'E') {
      return <Crosshair1Icon className="text-pink-600 w-6 h-6" />;
    }

    return !['B', 'P', 'V'].includes(ch) ? ch : '';
  };
}
