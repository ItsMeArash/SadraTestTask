/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { faker } from "@faker-js/faker";
import { UndirectedGraph } from "graphology";
import erdosRenyi from "graphology-generators/random/erdos-renyi";

export const LoadGraph = ({ useStore }) => {
  const { newNode } = useStore();
  const loadGraph = useLoadGraph();

  const randomColor = useMemo(() => {
    return () => {
      const digits = "0123456789abcdef";
      let code = "#";
      for (let i = 0; i < 6; i++) {
        code += digits.charAt(Math.floor(Math.random() * 16));
      }
      return code;
    };
  }, []);

  useEffect(() => {
    const graph = erdosRenyi(UndirectedGraph, {
      order: 2,
      probability: 0.2,
    });

    graph.nodes().forEach((node) => {
      graph.mergeNodeAttributes(node, {
        label: faker.person.fullName(),
        size: Math.floor(Math.random() * 15) + 5,
        color: randomColor(),
        x: Math.random(),
        y: Math.random(),
      });
    });

    if(Object.keys(newNode).length) {
      graph.addNode(newNode.nodeLabel.toLowerCase().replace(" ", "-"), {
        label: newNode.nodeLabel,
        size: newNode["input-number"],
        color: `#${newNode["color-picker"].toHex()}`,
        x: Math.random(),
        y: Math.random(),
      })
    }

    graph.edges().forEach((edge) => {
      graph.mergeEdgeAttributes(edge, {
        weight: Math.random(),
      });
    });
    loadGraph(graph);
  }, [loadGraph, newNode]);
};

export const DisplayGraph = ({useStore}) => {
  return (
    <SigmaContainer style={{ height: "100vh", width: "100vw" }}>
      <LoadGraph useStore={useStore}/>
    </SigmaContainer>
  );
};

DisplayGraph.propTypes = {
  useStore: PropTypes.func.isRequired,
};