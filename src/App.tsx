import { IntroCompontent } from "./components/IntroCompontent";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <div className="dark:bg-gray-800 bg-gray-100 min-h-screen pt-8 pb-8 dark">
        <Navbar />

        <div>
          <IntroCompontent />
        </div>

      </div>
    </>
  );
}

export default App;
