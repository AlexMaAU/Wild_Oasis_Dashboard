import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App.jsx";
import ErrorFallback from "./ui/ErrorFallback.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* react-error-boundary专门用来处理页面渲染时产生的错误。如果是业务逻辑错误或者API调用时报错，需要在代码块中处理 */}
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      // 因为需要强制刷新整个页面，所以不能使用react router的navigate
      // 如果使用 React Router 的 navigate 函数来进行页面跳转，它不会刷新整个页面，而是仅仅更新 URL，并在前端路由中做路径变更。这可能会导致一些问题，尤其是在需要从头开始重新加载页面状态或数据时。
      onReset={() => window.location.replace("/")}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

