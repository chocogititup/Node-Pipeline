// conditionNode.js

import { Position } from 'reactflow';
import { NodeBase } from './NodeBase';

export const ConditionNode = ({ id, data }) => {
  const fields = [
    { key: 'left', label: 'Left:', type: 'text', placeholder: '{{input}}' },
    {
      key: 'operator',
      label: 'Op:',
      type: 'select',
      options: [
        { value: '==', label: '==' },
        { value: '!=', label: '!=' },
        { value: '>', label: '>' },
        { value: '<', label: '<' },
      ],
    },
    { key: 'right', label: 'Right:', type: 'text', placeholder: 'value' },
  ];

  return (
    <NodeBase
      nodeId={id}
      data={data}
      title="Condition"
      width={260}
      height={150}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-true`, style: { top: '35%' } },
        { type: 'source', position: Position.Right, id: `${id}-false`, style: { top: '65%' } },
      ]}
      fields={fields}
    />
  );
}


