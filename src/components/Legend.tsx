import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { useBoxColor } from '../hooks/useBoxColor';
import { useBoxElement } from '../hooks/useBoxElement';

interface LegendElement {
  bgColor: string;
  inner?: React.ReactNode;
  description: string;
}

function LegendElement({
  bgColor,
  inner,
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
        {inner ?? <></>}
      </div>
      <span className="text-xs font-light text-black">{description}</span>
    </div>
  );
}

function Legend(): React.ReactElement {
  const color = useBoxColor();
  const element = useBoxElement();
  return (
    <div className="mt-2 mx-auto flex justify-center space-x-4">
      <LegendElement
        bgColor={color('Block')}
        inner=""
        description="Block"
      />

      <LegendElement
        bgColor={color('Path')}
        inner=""
        description="Path"
      />

      <LegendElement
        bgColor={color('Visited')}
        inner=""
        description="Visited"
      />

      <LegendElement
        bgColor={color('Start')}
        inner={element('S')}
        description="Start"
      />

      <LegendElement
        bgColor={color('End')}
        inner={element('E')}
        description="End"
      />
    </div>
  );
}

export default Legend;
