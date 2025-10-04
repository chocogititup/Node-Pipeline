// NodeBase.js

import React from 'react';
import { Handle } from 'reactflow';
import { useStore } from '../store';

/**
 * Reusable base component for graph nodes.
 * Props:
 *  - nodeId: string id of the node
 *  - data: node data object (values live in store)
 *  - title: string displayed at top
 *  - width, height: numbers (px)
 *  - theme: optional overrides { colors, border, spacing }
 *  - containerStyle: style overrides for outer div
 *  - handles: array of { type: 'source' | 'target', position: Position, id: string, style?: object }
 *  - fields: array of { key, label, type: 'text'|'select', options?: [], placeholder?, validate?: (value)=>string|undefined }
 *  - loading: boolean shows overlay
 *  - error: string shows error banner
 *  - children: custom content after fields
 */
export const NodeBase = ({
  nodeId,
  data = {},
  title,
  width = 200,
  height = 80,
  theme = {},
  containerStyle = {},
  handles = [],
  fields = [],
  loading = false,
  error,
  children,
}) => {
  const updateNodeField = useStore((s) => s.updateNodeField);

  const resolvedTheme = {
    colors: {
      background: '#0F172A',
      border: '#1F2937',
      headerBg: '#111827',
      headerText: '#E5E7EB',
      text: '#E5E7EB',
      dangerBg: '#2B1111',
      dangerText: '#FCA5A5',
      ...((theme.colors) || {}),
    },
    spacing: { px: 10, radius: 10, gap: 8, ...((theme.spacing) || {}) },
    border: { width: 1, style: 'solid', ...((theme.border) || {}) },
  };

  const baseStyle = {
    width,
    height,
    border: `${resolvedTheme.border.width}px ${resolvedTheme.border.style} ${resolvedTheme.colors.border}`,
    borderRadius: `${resolvedTheme.spacing.radius}px`,
    backgroundColor: resolvedTheme.colors.background,
    color: resolvedTheme.colors.text,
    display: 'flex',
    flexDirection: 'column',
    padding: `${resolvedTheme.spacing.px - 2}px ${resolvedTheme.spacing.px}px`,
    boxSizing: 'border-box',
    position: 'relative',
    boxShadow: '0 8px 24px rgba(0,0,0,0.35)'
  };

  const headerStyle = {
    background: resolvedTheme.colors.headerBg,
    color: resolvedTheme.colors.headerText,
    fontWeight: 600,
    marginBottom: `${resolvedTheme.spacing.gap}px`,
    padding: '4px 6px',
    borderRadius: `${resolvedTheme.spacing.radius - 4}px`,
  };

  const fieldWrap = {
    display: 'flex',
    gap: `${resolvedTheme.spacing.gap}px`,
    alignItems: 'center',
    flexWrap: 'wrap',
  };

  const renderField = (f) => {
    const value = data?.[f.key] ?? '';
    const onChange = (e) => updateNodeField(nodeId, f.key, e.target.value);
    const errorMsg = typeof f.validate === 'function' ? f.validate(value) : undefined;

    if (f.type === 'textarea') {
      return (
        <label key={f.key} style={{ display: 'flex', gap: 6, alignItems: 'center', width: '100%' }}>
          {f.label}
          <textarea
            placeholder={f.placeholder}
            value={value}
            onChange={onChange}
            rows={f.rows || 2}
            style={{ flex: 1, resize: 'none' }}
          />
          {errorMsg && <span style={{ color: resolvedTheme.colors.dangerText, fontSize: 12 }}>{errorMsg}</span>}
        </label>
      );
    }

    if (f.type === 'select') {
      return (
        <label key={f.key} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {f.label}
          <select value={value} onChange={onChange}>
            {(f.options || []).map((opt) => (
              <option key={String(opt.value)} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errorMsg && <span style={{ color: resolvedTheme.colors.dangerText, fontSize: 12 }}>{errorMsg}</span>}
        </label>
      );
    }
    // default text input
    return (
      <label key={f.key} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {f.label}
        <input
          type={f.inputType || 'text'}
          placeholder={f.placeholder}
          value={value}
          onChange={onChange}
        />
        {errorMsg && <span style={{ color: resolvedTheme.colors.dangerText, fontSize: 12 }}>{errorMsg}</span>}
      </label>
    );
  };

  return (
    <div style={{ ...baseStyle, ...containerStyle }}>
      <div style={headerStyle}>
        <span>{title}</span>
      </div>

      {error && (
        <div style={{ background: resolvedTheme.colors.dangerBg, color: resolvedTheme.colors.dangerText, padding: '2px 6px', borderRadius: 6, marginBottom: 6 }}>
          {error}
        </div>
      )}

      <div style={fieldWrap}>
        {fields.map(renderField)}
        {children}
      </div>

      {handles.map((h) => (
        <Handle
          key={h.id}
          type={h.type}
          position={h.position}
          id={h.id}
          style={h.style}
        />
      ))}

      {loading && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: `${resolvedTheme.spacing.radius}px` }}>
          <span style={{ fontSize: 12 }}>Loading…</span>
        </div>
      )}
    </div>
  );
};


