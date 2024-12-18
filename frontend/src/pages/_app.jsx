import "@/styles/globals.css"

const App = ({ Component, pageProps }) => (
  <div className="min-h-screen bg-gray-100">
    <header className="bg-blue-500 text-white py-4 text-center">
      <h1 className="text-2xl font-bold">TODO APP</h1>
    </header>
    <main className="max-w-4xl mx-auto p-4">
      <Component {...pageProps} />
    </main>
  </div>
)

export default App
