/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";
import {
  SigmaContainer,
  useLoadGraph,
  useRegisterEvents,
} from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import Graph from "graphology";

export const LoadGraph = ({ useStore }) => {
  const { nodes } = useStore();
  const loadGraph = useLoadGraph();
  const graph = useMemo(() => new Graph(), []);

  const newNode = nodes[nodes.length - 1];

  const registerEvents = useRegisterEvents();

  useEffect(() => {
    registerEvents({
      clickNode: (event) => clickHandler(event),
    });
  }, [registerEvents]);

  const clickHandler = (event) => {
    const clickedNode = nodes.find(
      (node) => node.nodeLabel.toLowerCase().replace(" ", "-") === event.node
    );
    alert(
      `Node Label: ${clickedNode.nodeLabel}\nNode ID: ${clickedNode.nodeLabel
        .toLowerCase()
        .replace(" ", "-")}\nNode Size: ${
        clickedNode["input-number"]
      }\nNode Color: #${clickedNode["color-picker"].toHex()}\nRelated Nodes: ${
        clickedNode["select-multiple"]
          ? clickedNode["select-multiple"].map((relation) => relation)
          : "None"
      }`
    );
  };

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
