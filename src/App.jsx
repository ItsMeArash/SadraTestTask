import { DisplayGraph } from "./components/Graph";
import UserNodeInput from "./components/userNodeInput";
import { create } from "zustand";

const useStore = create((set) => ({
  nodes: [],
  setNodes: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
}));

const App = () => {
  return (
    <>
      <h1>Relation Graph</h1>
      <UserNodeInput useStore={useStore} />
      <DisplayGraph useStore={useStore} />
    </>
  );
};

export default App;
