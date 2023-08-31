import * as Form from "../components/Form";
import * as Banner from "../components/Banner";

const Login = () => {
  return (
    <main>
      <section className="relative h-screen flex">
        <Form.Login />
        <Banner.Auth />
      </section>
    </main>
  );
};

export default Login;
