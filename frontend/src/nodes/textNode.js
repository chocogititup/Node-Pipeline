// textNode.js

import { useMemo } from 'react';
import { Position } from 'reactflow';
import { NodeBase } from './NodeBase';

export const TextNode = ({ id, data }) => {
  const textValue = data?.text || '';
  const minWidth = 220;
  const minHeight = 100;

  const { nodeWidth, nodeHeight, rows } = useMemo(() => {
    // crude sizing: width grows with longest line, height grows with number of lines
    const lines = String(textValue).split('\n');
    const longest = lines.reduce((m, l) => Math.max(m, l.length), 0);
    const approxCharWidth = 7; // px
    const padding = 80; // labels + padding
    const computedWidth = Math.max(minWidth, Math.min(600, longest * approxCharWidth + padding));
    const computedRows = Math.max(2, Math.min(12, lines.length));
    const lineHeight = 22; // px
    const computedHeight = Math.max(minHeight, Math.min(320, 60 + computedRows * lineHeight));
    return { nodeWidth: computedWidth, nodeHeight: computedHeight, rows: computedRows };
  }, [textValue]);

  // Extract unique variable names like {{ varName }} where varName is a valid JS identifier
  const variableHandles = useMemo(() => {
    const re = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;
    const set = new Set();
    let m;
    while ((m = re.exec(textValue)) !== null) {
      set.add(m[1]);
    }
    const names = Array.from(set);
    const count = names.length || 1;
    // Distribute handles vertically along the left edge
    return names.map((name, idx) => ({
      type: 'target',
      position: Position.Left,
      id: `${id}-${name}`,
      style: { top: `${((idx + 1) * 100) / (count + 1)}%` },
    }));
  }, [textValue, id]);

  const fields = [
    {
      key: 'text',
      label: 'Text:',
      type: 'textarea',
      placeholder: '{{input}}',
      rows,
    },
  ];

  return (
    <NodeBase
      nodeId={id}
      data={data}
      title="Text"
      width={nodeWidth}
      height={nodeHeight}
      handles={[...variableHandles, { type: 'source', position: Position.Right, id: `${id}-output` }]}
      fields={fields}
    />
  );
}
