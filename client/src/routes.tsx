import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MainView } from "./components/MainView";
import { LayoutPage } from "./pages/LayoutPage";
import { LayoutConfigPage } from "./pages/LayoutConfigPage";
import { ActionPage } from "./pages/ActionPage";
import { NotePage } from "./pages/NotePage";
import { HistoryPage } from "./pages/HistoryPage";
import { EntityPage } from "./pages/EntityPage";

export const router = createBrowserRouter([
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
        element: <NotePage />,
      },
      {
        path: "history",
        element: <HistoryPage />,
      },
      {
        path: "entities",
        element: <EntityPage />,
      },
    ]
  },
]);
