export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} CodeForgeNet - Email Analysis
              Tool
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
