import { IntroCompontent } from "./components/IntroCompontent";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100  dark:bg-gray-800">
      {/* NAVBAR */}
      <header className="pt-10">
        <Navbar />
      </header>

      {/* MAIN CONTENT: grows to fill available space */}
      <main className="flex-grow pt-8 pb-8">
        <IntroCompontent />
      </main>

      {/* FOOTER: stays at bottom */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
