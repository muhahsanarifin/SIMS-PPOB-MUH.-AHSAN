import Header from "../components/Header";

import * as Bio from "../components/Bio";

const Account = () => {
  return (
    <main>
      <section className="relative md:sticky md:top-0 md:z-50 lg:px-0">
        <Header onDisable="account" />
      </section>
      <section className="px-32 flex flex-col py-4 lg:px-0">
        <Bio.Account />
      </section>
    </main>
  );
};

export default Account;
