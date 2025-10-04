from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend dev server to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

class Pipeline(BaseModel):
    nodes: list = []
    edges: list = []


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    # Compute counts
    num_nodes = len(pipeline.nodes or [])
    num_edges = len(pipeline.edges or [])

    # Collect node ids from provided nodes and from edges to be robust
    node_ids = set()
    for n in (pipeline.nodes or []):
        nid = n.get('id') if isinstance(n, dict) else None
        if nid is not None:
            node_ids.add(nid)

    # Build graph from edges with 'source' and 'target'
    adjacency = {nid: [] for nid in node_ids}
    indegree = {nid: 0 for nid in node_ids}

    for e in (pipeline.edges or []):
        if not isinstance(e, dict):
            continue
        src = e.get('source')
        tgt = e.get('target')
        if src is None or tgt is None:
            continue
        # Ensure nodes referenced by edges are included
        if src not in adjacency:
            adjacency[src] = []
            indegree[src] = indegree.get(src, 0)
        if tgt not in adjacency:
            adjacency[tgt] = []
            indegree[tgt] = indegree.get(tgt, 0)
        adjacency[src].append(tgt)
        indegree[tgt] = indegree.get(tgt, 0) + 1

    # Kahn's algorithm to check DAG
    from collections import deque
    q = deque([nid for nid, deg in indegree.items() if deg == 0])
    visited = 0
    indegree_mut = indegree.copy()
    while q:
        u = q.popleft()
        visited += 1
        for v in adjacency.get(u, []):
            indegree_mut[v] -= 1
            if indegree_mut[v] == 0:
                q.append(v)

    total_nodes_in_graph = len(indegree)
    is_dag = visited == total_nodes_in_graph

    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}
