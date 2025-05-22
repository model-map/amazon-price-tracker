import Dashboard from "@/components/Dashboard";
import Features01Page from "@/components/features-01/features-01";
import Footer05Page from "@/components/footer-05/footer-05";
import Hero01 from "@/components/hero-01/hero-01";
import Navbar02Page from "@/components/navbar-02/navbar-02";
import Testimonial01 from "@/components/testimonial-01/testimonial-01";
import getSession from "@/lib/session";

export default async function Home() {
  const session = await getSession();
  return (
    <div className="space-y-16 md:space-y-0">
      {/* ONLY SHOW THIS IN DEVELOPMENT ENVIRONMENT */}
      {/* {process.env.ENVIRONMENT === "development" && (
        <pre className="border-2 mx-4 py-6 rounded-lg bg-muted">
          [in /app/page.tsx]
          <br />
          DEVELOPMENT ENVIRONMENT ONLY!
          <br />
          SESSION:
          <br />
          {JSON.stringify(session, null, 2)}
        </pre>
      )} */}

      {!session && (
        <>
          <Hero01 />
          <Features01Page />
          <Testimonial01 />
        </>
      )}

      {session && <Dashboard />}
    </div>
  );
}
