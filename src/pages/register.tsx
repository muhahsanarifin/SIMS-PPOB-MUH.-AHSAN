import * as Form from "../components/Form";
import * as Banner from "../components/Banner";
const Register = () => {
  return (
    <>
      <section className=" h-screen flex">
        <Form.Register />
        <Banner.Auth />
      </section>
    </>
  );
};

export default Register;
