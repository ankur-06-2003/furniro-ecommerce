import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthProvider from "@/providers/authProvider";

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-16" />
      <div className="min-h-[calc(100vh-60px)]">{children}</div>
      <Footer />
    </AuthProvider>
  );
}
