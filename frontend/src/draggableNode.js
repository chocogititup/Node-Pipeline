// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          minWidth: '96px', 
          height: '64px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '10px',
          backgroundColor: '#111827',
          border: '1px solid #1F2937',
          justifyContent: 'center', 
          flexDirection: 'column',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          transition: 'transform .12s ease, background-color .12s ease, border-color .12s ease',
        }} 
        draggable
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#0F172A';
          e.currentTarget.style.borderColor = '#3B82F6';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#111827';
          e.currentTarget.style.borderColor = '#1F2937';
          e.currentTarget.style.transform = 'none';
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'scale(0.98)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'none';
        }}
      >
          <span style={{ color: '#E5E7EB', fontWeight: 600 }}>{label}</span>
      </div>
    );
  };
  