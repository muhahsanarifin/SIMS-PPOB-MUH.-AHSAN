import Header from "../components/Header";

import * as Bio from "../components/Bio";

const Account = () => {
  return (
    <main>
      <section className="relative">
        <Header onDisable="account" />
      </section>
      <section className="px-32 flex flex-col py-4">
        <Bio.Account />
      </section>
    </main>
  );
};

export default Account;
