import Header from "../components/Header";
import * as Bio from "../components/Bio";
import * as Card from "../components/Card";
import * as Table from "../components/Table";

const Transaction = () => {
  return (
    <main className="min-h-screen">
      <section className="relative md:sticky md:top-0 md:z-50">
        <Header onDisable="transaction" />
      </section>
      <section className="px-32 flex py-4 my-4 lg:px-14 md:px-4">
        <Bio.Profile />
        <Card.Saldo />
      </section>
      <section className="px-32 flex flex-col py-4 my-4 lg:px-14 md:px-4">
        <Table.Transaction />
      </section>
    </main>
  );
};

export default Transaction;
