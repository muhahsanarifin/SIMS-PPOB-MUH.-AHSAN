import Header from "../components/Header";

import * as Bio from "../components/Bio";

const Account = () => {
  return (
    <>
      <section className="relative">
        <Header onDisable="account" />
      </section>
      <section className="px-32 flex flex-col py-4">
        <Bio.Account/>
      </section>
    </>
  );
};

export default Account;
