/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import Graph from "graphology";

export const LoadGraph = ({ useStore }) => {
  const { nodes } = useStore();
  const loadGraph = useLoadGraph();
  const graph = useMemo(() => new Graph(), []);

  const newNode = nodes[nodes.length - 1];

  useEffect(() => {
    if (newNode) {
      try {
        graph.addNode(newNode.nodeLabel.toLowerCase().replace(" ", "-"), {
          label: newNode.nodeLabel,
          size: newNode["input-number"],
          color: `#${newNode["color-picker"].toHex()}`,
          x: Math.random(),
          y: Math.random(),
        });
        console.log(graph.nodes(), nodes);
      } catch {
        alert("Error in adding node");
      }
    }

    nodes.forEach((node) => {
      if (node["select-multiple"]) {
        node["select-multiple"].forEach((relation) => {
          const sourceNode = node.nodeLabel.toLowerCase().replace(" ", "-");
          const targetNode = relation.toLowerCase().replace(" ", "-");

          if (!graph.hasEdge(sourceNode, targetNode)) {
            graph.addEdgeWithKey(
              `${sourceNode}-${targetNode}`,
              sourceNode,
              targetNode,
              { label: `${sourceNode}-${targetNode}` }
            );
          }
        });
      }
    });

    loadGraph(graph);
  }, [loadGraph, nodes]);
};

export const DisplayGraph = ({ useStore }) => {
  return (
    <SigmaContainer style={{ height: "100vh", width: "100vw" }}>
      <LoadGraph useStore={useStore} />
    </SigmaContainer>
  );
};

DisplayGraph.propTypes = {
  useStore: PropTypes.object.isRequired,
};
