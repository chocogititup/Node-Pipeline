// llmNode.js

import { Position } from 'reactflow';
import { NodeBase } from './NodeBase';

export const LLMNode = ({ id, data }) => {
  const fields = [
    {
      key: 'system',
      label: 'System:',
      type: 'text',
      placeholder: 'You are a helpful assistant',
    },
    {
      key: 'prompt',
      label: 'Prompt:',
      type: 'text',
      placeholder: 'Say hello to {{name}}',
      validate: (v) => (!v ? 'Required' : undefined),
    },
  ];

  return (
    <NodeBase
      nodeId={id}
      data={data}
      title="LLM"
      width={260}
      height={150}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: `${100/3}%` }},
        { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: `${200/3}%` }},
        { type: 'source', position: Position.Right, id: `${id}-response` },
      ]}
      fields={fields}
    />
  );
}
