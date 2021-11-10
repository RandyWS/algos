import React from "react";

const App = () => {
  class GraphNode {
    constructor(value) {
      this.value = value;
      this.adjacents = [];
    }
    addAdjacent(node) {
      this.adjacents.push(node);
    }
    removeAdjacent(node) {
      const index = this.adjacents.indexOf(node);
      if (index > -1) {
        this.adjacents.splice(index, 1);
        return node;
      }
    }
    getAdjacents() {
      return this.adjacents;
    }
    isAdjacent(node) {
      return this.adjacents.indexOf(node) > -1;
    }
  }

  class Graph {
    constructor() {
      this.nodes = new Map();
    }
    addEdge(source, destination) {
      const sourceNode = this.addVertex(source);
      const destinationNode = this.addVertex(destination);
      sourceNode.addAdjacent(destinationNode);
      return [sourceNode, destinationNode];
    }
    addVertex(value) {
      if (this.nodes.has(value)) {
        return this.nodes.get(value);
      } else {
        const vertex = new GraphNode(value);
        this.nodes.set(value, vertex);
        return vertex;
      }
    }
    removeVertex(value) {
      const current = this.nodes.get(value);
      if (current) {
        for (const nodes of this.nodes.values()) {
          nodes.removeAdjacent(current);
        }
      }
      return this.nodes.delete(value);
    }
    removeEdge(source, destination) {
      const sourceNode = this.nodes.get(source);
      const destinationNode = this.nodes.get(destination);
      if (sourceNode && destinationNode) {
        sourceNode.removeAdjacent(destinationNode);
      }
      return [sourceNode, destinationNode];
    }
  }

  const projects = ["a", "b", "c", "d", "e", "f"];
  const dependencies = [
    ["a", "d"],
    ["f", "b"],
    ["b", "d"],
    ["f", "a"],
    ["d", "c"],
  ];
  const buildProject = (projects, dependencies) => {
    let projectsGraph = new Graph();
    for (let i = 0; i < projects.length; i++) {
      projectsGraph.addVertex(projects[i]);
    }

    for (let j = 0; j < dependencies.length; j++) {
      projectsGraph.addEdge(dependencies[j][0], dependencies[j][1]);
    }

    return projectsGraph;
  };

  let projectsGraph = buildProject(projects, dependencies);

  const projectBuilder = (graph) => {
    console.log(graph);
    let order = [];

    for (const [key, value] of graph) {
      console.log(value.getAdjacents());
    }
  };
  console.log(projectBuilder(projectsGraph));

  return <div></div>;
};

export default App;
