import "./app.css";
import { Header, InvoiceButtonCard, Login } from "./components";
function App() {
  return (
    <>
      <Header />

      <InvoiceButtonCard text={"New Invoice"} color={"black"} actions={null} />
    </>
  );
}

export default App;
