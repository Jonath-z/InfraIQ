import { useCallback, DragEvent } from "react";
import ReactFlow, {
  Node,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  ConnectionMode,
  Panel,
} from "reactflow";
import { Play, Square } from "lucide-react";
import "reactflow/dist/style.css";
import React from "react";

const nodeTypes = ["Timer", "SQL", "HTTP", "Router"];

const Canvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      // Get the position where the node was dropped
      const reactFlowBounds = document
        .querySelector(".react-flow")
        ?.getBoundingClientRect();
      if (!reactFlowBounds) return;

      const position = {
        x: event.clientX - reactFlowBounds.left - 75,
        y: event.clientY - reactFlowBounds.top - 25,
      };

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type: "default",
        position,
        data: { label: type },
        style: {
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "0.375rem",
          padding: "8px 16px",
          fontSize: "14px",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          width: 150,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="flex-1 bg-gray-50 flex flex-col">
      <div className="h-12 border-b bg-white flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-sm">
            <span className="font-medium">R101-Salesforce-Auth</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">test</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Play className="w-4 h-4 text-gray-600" />
            <Square className="w-4 h-4 text-gray-600" />
          </div>
          <button className="px-3 py-1 bg-purple-600 text-white text-sm rounded">
            Save
          </button>
        </div>
      </div>

      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          connectionMode={ConnectionMode.Loose}
          fitView
        >
          <Background />
          <Controls />
          <Panel
            position="top-left"
            className="bg-white p-4 rounded-lg shadow-lg"
          >
            <div className="flex flex-col space-y-2">
              {nodeTypes.map((type) => (
                <div
                  key={type}
                  draggable
                  onDragStart={(e) => onDragStart(e, type)}
                  className="w-36 py-2 px-4 bg-white rounded border shadow-sm flex items-center justify-center cursor-move hover:border-purple-500 transition-colors"
                >
                  {type}
                </div>
              ))}
            </div>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
};

export default Canvas;
