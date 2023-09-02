import Header from "../components/Header";
import * as Feature from "../components/Feature";
import * as Bio from "../components/Bio";
import * as Card from "../components/Card";
import * as Banner from "../components/Banner";
import * as Input from "../components/Input";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const Home = () => {
  const purchase = useSelector(
    (state: RootState) => state.transaction.purchase
  );

  return (
    <main className="min-h-screen">
      <section className="relative md:sticky md:top-0 md:z-50">
        <Header onDisable="home" />
      </section>
      <section className="px-32 flex py-4 my-4 lg:px-14 md:px-4">
        <Bio.Profile />
        <Card.Saldo />
      </section>
      {purchase?.isFulfilled ? (
        <section className="relative px-32 flex flex-col py-4 my-4 lg:px-14 md:px-4">
          <Input.Payment />
        </section>
      ) : (
        <>
          <section className="px-32 flex py-4 my-4 lg:px-14 md:px-4">
            <Feature.Home />
          </section>
          <section className="px-32 lg:px-14 md:px-4">
            <Banner.Home />
          </section>
        </>
      )}
    </main>
  );
};

export default Home;
