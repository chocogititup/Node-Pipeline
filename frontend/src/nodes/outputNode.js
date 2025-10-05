// outputNode.js

import { Position } from 'reactflow';
import { NodeBase } from './NodeBase';

export const OutputNode = ({ id, data }) => {
  const fields = [
    {
      key: 'outputName',
      label: 'Name:',
      type: 'text',
      placeholder: id.replace('customOutput-', 'output_'),
      validate: (v) => (!v ? 'Required' : undefined),
    },
    {
      key: 'outputType',
      label: 'Type:',
      type: 'select',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'Image' },
      ],
    },
  ];

  return (
    <NodeBase
      nodeId={id}
      data={data}
      title="Output"
      width={240}
      height={120}
      handles={[{ type: 'target', position: Position.Left, id: `${id}-value` }]}
      fields={fields}
    />
  );
}
