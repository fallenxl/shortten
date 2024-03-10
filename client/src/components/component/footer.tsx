export default function Footer() {
  return (
    <footer className="w-full grid gap-4 py-5 md:py-10 border-t border-gray-200 mt-4">
      <div className="w-full flex flex-col items-center justify-center gap-4 ">
        <span className="text-sm text-gray-500 dark:text-gray-400 text-center ">
          © 2024 Shortener. All rights reserved.
        </span>
        {/* Creado con amor por FallEn */}
        <span className="text-sm text-gray-500 dark:text-gray-400 text-center ">
          Powered by{" "}
          <a
            href="https://axlsantos.vercel.app/"
            className="text-primary underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            FallEn
          </a>
        </span>
      </div>
    </footer>
  );
}
