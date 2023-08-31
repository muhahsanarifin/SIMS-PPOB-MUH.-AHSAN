import * as Form from "../components/Form";
import * as Banner from "../components/Banner";
const Register = () => {
  return (
    <main>
      <section className=" h-screen flex">
        <Form.Register />
        <Banner.Auth />
      </section>
    </main>
  );
};

export default Register;
