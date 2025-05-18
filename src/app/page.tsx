// import Image from "next/image";

import FormComparer from "./form/page";

export default function Home() {
  return (
    <div className="font-mono">
      <nav className="flex flex-row p-4 justify-between bg-blue-500 text-white text-xl">
        <div className="text-2xl">Doc-Compare</div>
        <a>About</a>
        <button>Try Out</button>
      </nav>

      <div className="min-h-screen p-8 bg-green-50 font-mono">
        <div className="flex flex-col justify-center items-center text-center px-4 mt-12">
          <div className="text-4xl">
            Compare Documents for Security breaches
          </div>
          <span className="py-4"></span>
          <p className="text-2xl max-w-2xl">
            Use our side by side document compare tool built with high security
            algorithms
          </p>
        </div>

        <div className="mt-4">---- <p className="italic">The attacker only needs to find one vulnerability. The defender must find them all.</p> ----</div>
        <div className="flex justify-center items-center mt-8">
          <FormComparer />
        </div>
      </div>
    </div>
  );
}
