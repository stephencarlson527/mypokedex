import BounceImage from "./components/BounceImage";

export default function Home() {
  return (
    <div className="home-bg grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center">
        <h1 className="mb-6">Welcome to MyPokédex</h1>
        <BounceImage />

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a className="flex items-center gap-2 hover:underline hover:underline-offset-4" href="https://www.vecteezy.com/free-vector/pokedex" target="_blank">Pokedex Vectors by Vecteezy</a>
      </footer>
    </div>
  );
}
