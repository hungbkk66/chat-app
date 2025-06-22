import HomPage from "./pages/HomPage"
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import NotificationsPage from "./pages/NotificationsPage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import OnBoardingPage from "./pages/OnBoardingPage";
import { Toaster } from "react-hot-toast";
import { Route, Routes, Navigate } from "react-router-dom";
import useAuthUser from "./hooks/useAuthUser";
import Layout from "./components/Layout";
import { useThemeStore } from "./store/useThemeStore";


function App() {
  const { isLoading, authUser } = useAuthUser();

  const { theme } = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnBoarded = authUser?.isOnBoarded;
  if (isLoading) return <PageLoader />;
  return (
    <div className=" h-screen " data-them={theme}>
      <Routes>
        <Route path='/' element={isAuthenticated && isOnBoarded ?
          (<Layout showSidebar={true}>
            <HomPage />
          </Layout>)
          :
          (<Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />)} />
        <Route
          path='/signup'
          element={!isAuthenticated ? <SignupPage /> : <Navigate to={isOnBoarded ? '/' : '/onboarding'} />} />
        <Route
          path='/login'
          element={!isAuthenticated ? <LoginPage /> : <Navigate to={isOnBoarded ? '/' : '/onboarding'} />} />
        <Route
          path='/notifications'
          element={
            isAuthenticated && isOnBoarded ? (
              <Layout showSidebar={true}>
                <NotificationsPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          } />
        <Route path='/call/:id'
          element={
            isAuthenticated && isOnBoarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          } />
        <Route path='/chat/:id'
          element={
            isAuthenticated && isOnBoarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          } />
        <Route path='/onboarding' element={isAuthenticated ?
          (!isOnBoarded ? (
            <OnBoardingPage />
          ) : (
            <Navigate to="/" />
          ))
          :
          (<Navigate to="/login" />)} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
