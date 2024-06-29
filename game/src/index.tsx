import { createRoot } from "react-dom/client";
import Game from "./components/Game";

const element = document.getElementById("app");

if (!element) throw Error("Unable to find root element.");

createRoot(element).render(<Game />);
