import Header from "./Header";
import Footer from "./Footer";
import Convertion from "./Convertion";

export default function HomePage() {
  return (
    <>
      <section className="section-header">
        <Header />
      </section>
      <section className="section-currency-conversion">
        <Convertion />
      </section>
      <section className="section-footer">
        <Footer />
      </section>
    </>
  );
}
