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
    width: 330,
    height: 220,
    padding: 5,
    borderRadius: '1rem',
    overflow: 'visible',
    background: 'linear-gradient(to left, #f7ba2b 0%, #ea5358 100%)',
    position: 'relative',
    zIndex: 1,
    boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
    display: 'flex',
    flexDirection: 'column',
    color: resolvedTheme.colors.text,
    boxSizing: 'border-box',
  };

  const headerStyle = {
    background: resolvedTheme.colors.headerBg,
    color: resolvedTheme.colors.headerText,
    fontWeight: 700,
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

  // Modern text style for all node text
  const textStyle = {
    fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
    fontWeight: 600,
    color: '#181818',
    fontSize: 18,
    letterSpacing: '.03em',
    lineHeight: 1.3,
  };
  const labelStyle = {
    ...textStyle,
    fontSize: 15,
    color: '#ea5358',
    fontWeight: 700,
    marginRight: 6,
  };
  const inputStyle = {
    fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
    fontWeight: 500,
    fontSize: 15,
    color: '#181818',
    background: '#fff',
    border: '1px solid #f7ba2b',
    borderRadius: 6,
    padding: '4px 8px',
    outline: 'none',
    marginLeft: 2,
  };

  const renderField = (f) => {
    const value = data?.[f.key] ?? '';
    const onChange = (e) => updateNodeField(nodeId, f.key, e.target.value);
    const errorMsg = typeof f.validate === 'function' ? f.validate(value) : undefined;

    if (f.type === 'textarea') {
      return (
        <label key={f.key} style={{ display: 'flex', gap: 6, alignItems: 'center', width: '100%' }}>
          <span style={labelStyle}>{f.label}</span>
          <textarea
            placeholder={f.placeholder}
            value={value}
            onChange={onChange}
            rows={f.rows || 2}
            style={{ ...inputStyle, flex: 1, resize: 'none', minHeight: 48 }}
          />
          {errorMsg && <span style={{ color: resolvedTheme.colors.dangerText, fontSize: 16 }}>{errorMsg}</span>}
        </label>
      );
    }

    if (f.type === 'select') {
      return (
        <label key={f.key} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={labelStyle}>{f.label}</span>
          <select value={value} onChange={onChange} style={inputStyle}>
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
        <span style={labelStyle}>{f.label}</span>
        <input
          type={f.inputType || 'text'}
          placeholder={f.placeholder}
          value={value}
          onChange={onChange}
          style={inputStyle}
        />
        {errorMsg && <span style={{ color: resolvedTheme.colors.dangerText, fontSize: 12 }}>{errorMsg}</span>}
      </label>
    );
  };

  return (
    <div style={{ ...baseStyle, ...containerStyle }}>
      {/* Blurred background effect (like .card::after) */}
      <div
        style={{
          position: 'absolute',
          content: '""',
          top: 30,
          left: 0,
          right: 0,
          zIndex: -1,
          height: '100%',
          width: '100%',
          transform: 'scale(0.8)',
          filter: 'blur(25px)',
          background: 'linear-gradient(to left, #f7ba2b 0%, #ea5358 100%)',
          borderRadius: '1rem',
          opacity: 1,
          transition: 'opacity .5s',
        }}
      />
      <div style={{
        background: '#181818',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        overflow: 'visible',
        borderRadius: '.7rem',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 2,
      }}>
        <div style={{ fontWeight: 'bold', letterSpacing: '.1em', marginBottom: 8, ...textStyle, fontSize: 20, color: '#ea5358' }}>{title}</div>
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
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '1rem' }}>
            <span style={{ fontSize: 12 }}>Loading…</span>
          </div>
        )}
      </div>
    </div>
  );
};


