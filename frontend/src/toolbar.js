// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="toolbar">
            <div className="toolbar-grid">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='condition' label='Condition' />
                <DraggableNode type='delay' label='Delay' />
                <DraggableNode type='template' label='Template' />
                <DraggableNode type='http' label='HTTP' />
            </div>
        </div>
    );
};
