// mathNode.js

import { Position } from 'reactflow';
import { NodeBase } from './NodeBase';

export const MathNode = ({ id, data }) => {
  const fields = [
    {
      key: 'operation',
      label: 'Op:',
      type: 'select',
      options: [
        { value: 'add', label: 'Add' },
        { value: 'sub', label: 'Subtract' },
        { value: 'mul', label: 'Multiply' },
        { value: 'div', label: 'Divide' },
      ],
    },
    { key: 'a', label: 'A:', type: 'text', inputType: 'number', placeholder: '0' },
    { key: 'b', label: 'B:', type: 'text', inputType: 'number', placeholder: '0' },
  ];

  return (
    <NodeBase
      nodeId={id}
      data={data}
      title="Math"
      width={240}
      height={150}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-a`, style: { top: '35%' } },
        { type: 'target', position: Position.Left, id: `${id}-b`, style: { top: '65%' } },
        { type: 'source', position: Position.Right, id: `${id}-result` },
      ]}
      fields={fields}
    />
  );
}


