import { DisplayGraph } from "./components/Graph";
import UserNodeInput from "./components/userNodeInput";

const App = () => {

  return (
    <>
      <h1>Relation Graph</h1>
      <UserNodeInput />
      <DisplayGraph />
    </>
  );
};

export default App;
