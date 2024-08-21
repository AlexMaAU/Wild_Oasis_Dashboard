// npm install @tanstack/react-query@4 - @5 is the latest with some updates
// npm i @tanstack/react-query-devtools@4 - @5 is the latest with some updates

// If you want to use React Query v5, there are only two small things to change in the project:
// isLoading is now called isPending
// The cacheTime option is now called gcTime

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeContextProvider } from "./context/DarkModeContext";

// 创建React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 当设置为60秒，React Query会在60秒后自动去调用API来获取最新的数据，这样可以保证cache里的数据和后台数据保持同步
      // 当设置为0的时候，就是React Query会不停的调用API来获取最新数据，虽然这样可以保证数据的即时同步，但是也等于是没有用到cache
      // 所以styleTime设置为多久取决于项目的具体要求
      staleTime: 60 * 1000, // 设置cache刷新间隔为1分钟，60*1000毫秒
    },
  },
});

function App() {
  return (
    <DarkModeContextProvider>
      {/* 把所有组件用 QueryClientProvider 进行包裹 */}
      <QueryClientProvider client={queryClient}>
        {/* ReactQueryDevtools只有在development环境下才使用 */}
        {import.meta.env.VITE_ENVIRONMENT === "development" && (
          <ReactQueryDevtools initalIsOpen={false} />
        )}
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            {/* 所以把AppLayout放进Protected Route里就可以获得身份验证后才显示相应页面的功能 */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              {/* 下面的所有Route都是包裹在AppLayout这个Route里的 */}
              <Route index element={<Navigate to="login" replace />} />
              {/* <Route index element={<Navigate to="dashboard" replace />} /> */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checkin/:bookingId" element={<Checkin />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSie: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeContextProvider>
  );
}

export default App;

