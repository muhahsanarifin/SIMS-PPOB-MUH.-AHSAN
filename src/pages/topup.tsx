import Header from "../components/Header";
import * as Bio from "../components/Bio";
import * as Card from "../components/Card";

import * as Input from "../components/Input";

const TopUp = () => {
  return (
    <>
      <section className="relative">
        <Header onDisable="top-up" />
      </section>
      <section className="px-32 flex py-4 my-4">
        <Bio.Profile />
        <Card.Saldo />
      </section>
      <section className="px-32 flex flex-col py-4 my-4">
        <Input.TopUp/>
      </section>
    </>
  );
};

export default TopUp;
