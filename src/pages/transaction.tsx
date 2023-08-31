import Header from "../components/Header";
import * as Bio from "../components/Bio";
import * as Card from "../components/Card";
import * as Table from "../components/Table";

const Transaction = () => {
  return (
    <>
      <section className="relative">
        <Header onDisable="transaction" />
      </section>
      <section className="px-32 flex py-4 my-4">
        <Bio.Profile />
        <Card.Saldo />
      </section>
      <section className="px-32 flex flex-col py-4 my-4">
        <Table.Transaction/>
      </section>
    </>
  );
};

export default Transaction;
