import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { useBoxColor } from '../hooks/useBoxColor';

interface LegendElement {
  bgColor: string;
  text?: string;
  description: string;
}

function LegendElement({
  bgColor,
  text = '',
  description,
}: LegendElement): React.ReactElement {
  const ctx = useContext(AppContext);

  return (
    <div className="flex items-center space-x-1">
      <div
        className="border border-zinc-700 flex justify-center items-center"
        style={{
          width: ctx.resolution,
          height: ctx.resolution,
          backgroundColor: bgColor,
        }}
      >
        {text}
      </div>
      <span className="text-xs font-light text-black">{description}</span>
    </div>
  );
}

function Legend(): React.ReactElement {
  const color = useBoxColor();
  return (
    <div className="mt-2 mx-auto flex justify-center space-x-4">
      <LegendElement
        bgColor={color('Block')}
        text=""
        description="Block"
      />

      <LegendElement
        bgColor={color('Path')}
        text=""
        description="Path"
      />

      <LegendElement
        bgColor={color('Visited')}
        text=""
        description="Visited"
      />

      <LegendElement
        bgColor={color('Start')}
        text="S"
        description="Start"
      />

      <LegendElement
        bgColor={color('End')}
        text="E"
        description="End"
      />
    </div>
  );
}

export default Legend;
