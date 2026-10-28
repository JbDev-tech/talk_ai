import UrlForm from "./components/UrlForm";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold">talk_ai</h1>
      <p className="max-w-md text-base-content/70">
        Colle l'adresse d'une page web, puis pose tes questions : l'IA répond à partir de son contenu.
      </p>
      <UrlForm />
    </main>
  );
}