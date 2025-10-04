// httpNode.js

import { Position } from 'reactflow';
import { NodeBase } from './NodeBase';

export const HttpNode = ({ id, data }) => {
  const fields = [
    { key: 'method', label: 'Method:', type: 'select', options: [
      { value: 'GET', label: 'GET' },
      { value: 'POST', label: 'POST' },
      { value: 'PUT', label: 'PUT' },
      { value: 'DELETE', label: 'DELETE' },
    ]},
    { key: 'url', label: 'URL:', type: 'text', placeholder: 'https://api.example.com' },
  ];

  return (
    <NodeBase
      nodeId={id}
      data={data}
      title="HTTP"
      width={300}
      height={130}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-response` },
      ]}
      fields={fields}
    />
  );
}


