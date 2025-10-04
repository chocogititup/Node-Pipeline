// inputNode.js

import { useMemo } from 'react';
import { Position } from 'reactflow';
import { NodeBase } from './NodeBase';

export const InputNode = ({ id, data }) => {
  const defaultName = useMemo(() => id.replace('customInput-', 'input_'), [id]);

  const fields = [
    {
      key: 'inputName',
      label: 'Name:',
      type: 'text',
      placeholder: defaultName,
      validate: (v) => (!v ? 'Required' : undefined),
    },
    {
      key: 'inputType',
      label: 'Type:',
      type: 'select',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'File' },
      ],
    },
  ];

  return (
    <NodeBase
      nodeId={id}
      data={data}
      title="Input"
      width={220}
      height={110}
      handles={[{ type: 'source', position: Position.Right, id: `${id}-value` }]}
      fields={fields}
    />
  );
}
