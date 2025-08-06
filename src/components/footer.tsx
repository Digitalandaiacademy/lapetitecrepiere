export function Footer() {
  return (
    <footer className="bg-brown text-cream mt-16">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">© {new Date().getFullYear()} La Petite Crêpière</p>
        <p className="text-sm">Yaoundé, Cameroun</p>
      </div>
    </footer>
  );
}