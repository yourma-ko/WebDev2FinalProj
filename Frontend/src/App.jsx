import AppRouter from "./core/AppRouter";
import Layout from "./core/Layout";
import "./assets/styles/style.css";

function App() {
  return (
    <>
   <Layout>
      <AppRouter />
    </Layout>
    </>
  );
}

export default App;
