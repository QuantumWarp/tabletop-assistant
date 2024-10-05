import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainView from "./components/MainView";
import LayoutPage from "./pages/LayoutPage";
import LayoutConfigPage from "./pages/LayoutConfigPage";
import ActionPage from "./pages/ActionPage";
import NotesPage from "./pages/NotePage";
import HistoryView from "./pages/HistoryPage";
import EntityInstancePage from "./pages/EntityInstancePage";
import EntityPage from "./pages/EntityPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/tabletop/:tabletopId",
    element: <MainView />,
    children: [
      {
        path: "layout",
        element: <LayoutPage />,
      },
      {
        path: "layout-config",
        element: <LayoutConfigPage />,
      },
      {
        path: "action",
        element: <ActionPage />,
      },
      {
        path: "notes",
        element: <NotesPage />,
      },
      {
        path: "history",
        element: <HistoryView />,
      },
      {
        path: "objects",
        element: <EntityInstancePage />,
      },
      {
        path: "custom-objects",
        element: <EntityPage />,
      },
    ]
  },
]);

export default router;
