// delayNode.js

import { Position } from 'reactflow';
import { NodeBase } from './NodeBase';

export const DelayNode = ({ id, data }) => {
  const fields = [
    { key: 'ms', label: 'Delay (ms):', type: 'text', inputType: 'number', placeholder: '1000', validate: (v) => (isNaN(Number(v)) ? 'Number' : undefined) },
  ];

  return (
    <NodeBase
      nodeId={id}
      data={data}
      title="Delay"
      width={200}
      height={100}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-in` },
        { type: 'source', position: Position.Right, id: `${id}-out` },
      ]}
      fields={fields}
    />
  );
}


