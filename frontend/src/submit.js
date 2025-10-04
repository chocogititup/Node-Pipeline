// submit.js

import { useEffect, useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState(null);
    const [toast, setToast] = useState(null);
    const nodes = useStore((s) => s.nodes);
    const edges = useStore((s) => s.edges);

    const handleSubmit = async () => {
        if (submitting) return;
        setSubmitting(true);
        setResult(null);
        try {
            const apiBase = process.env.REACT_APP_API_BASE || 'http://127.0.0.1:8000';
            const res = await fetch(`${apiBase}/pipelines/parse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });
            const data = await res.json();
            setResult(data);
            if (res.ok && typeof data?.num_nodes !== 'undefined') {
                setToast({
                    title: 'Pipeline analysis',
                    num_nodes: data.num_nodes,
                    num_edges: data.num_edges,
                    is_dag: !!data.is_dag,
                });
            } else if (!res.ok) {
                setToast({ title: 'Request failed' });
            }
        } catch (err) {
            setResult({ error: String(err) });
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 3500);
        return () => clearTimeout(t);
    }, [toast]);

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'}}>
            <button type="button" onClick={handleSubmit} disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit'}
            </button>
            {result && (
                <span style={{ fontFamily: 'monospace' }}>
                    {result?.error ? 'Error' : 'OK'}
                </span>
            )}
            {toast && (
                <div style={{ position: 'fixed', right: 16, bottom: 16, maxWidth: 320, background: '#111827', color: '#F9FAFB', padding: '12px 14px', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.25)', fontSize: 14 }}>
                    <div style={{ fontWeight: 600, marginBottom: 6 }}>{toast.title}</div>
                    {typeof toast.num_nodes !== 'undefined' && (
                        <div>
                            <div>- Nodes: {toast.num_nodes}</div>
                            <div>- Edges: {toast.num_edges}</div>
                            <div>- Is DAG: {toast.is_dag ? 'Yes' : 'No'}</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
