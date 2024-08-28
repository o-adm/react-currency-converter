import { BrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";

export default function App() {
  return (
    <main>
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </main>
  );
}
