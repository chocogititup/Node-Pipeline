// templateNode.js

import { Position } from 'reactflow';
import { NodeBase } from './NodeBase';

export const TemplateNode = ({ id, data }) => {
  const fields = [
    { key: 'template', label: 'Template:', type: 'text', placeholder: 'Hello {{name}}' },
    { key: 'variables', label: 'Vars (csv):', type: 'text', placeholder: 'name,age' },
  ];

  return (
    <NodeBase
      nodeId={id}
      data={data}
      title="Template"
      width={280}
      height={130}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-output` },
      ]}
      fields={fields}
    />
  );
}


