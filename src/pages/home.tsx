import Header from "../components/Header";
import * as Feature from "../components/Feature";
import * as Bio from "../components/Bio";
import * as Card from "../components/Card";
import * as Banner from "../components/Banner";
import * as Input from "../components/Input";

const Home = () => {
  const condtition = true;
  return (
    <>
      <section className="relative">
        <Header onDisable="home" />
      </section>
      <section className="px-32 flex py-4 my-4">
        <Bio.Profile />
        <Card.Saldo />
      </section>
      {condtition ? (
        <>
          <section className="px-32 flex py-4 my-4">
            <Feature.Home />
          </section>
          <section className="px-32">
            <Banner.Home />
          </section>
        </>
      ) : (
        <section className="px-32 flex flex-col py-4 my-4">
          <Input.Payment/>
        </section>
      )}
    </>
  );
};

export default Home;
