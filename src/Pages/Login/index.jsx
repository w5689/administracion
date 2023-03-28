import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { login } from "../../contex/globalvars";
import "./login.css";

export default function Login() {
  const [error, setError] = useState({ user: false, pass: false });
  // guardar en session.store en variable user el apikey.
  /*
    administrador
    abc123...
  */

  async function handleLogin(e) {
    const username = e.target[0].value;
    const password = e.target[1].value;

    if (validate(username, password)) {
      await fetch(login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          if (data.found === 0)
            toast.error("El usuario o la contraseña son invalidos.");
          else {
            sessionStorage.setItem("user", data.api);
            sessionStorage.setItem("isLoggedIn", true);

            location.reload();
          }
        })
        .catch((error) => console.error(error));
    }
  }

  function validate(user, pass) {
    const msg = [];
    const err = { user: false, pass: false };

    /*
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    */

    if (user === "") {
      msg.push("• El correo no puede estar vacio.");
      err.user = true;
    }

    /*
    else if (!user.match(emailRegex))
      msg.push("• Debe introducir un correo valido.\n");
    */

    if (pass === "") {
      msg.push("• La contraseña no puede estar vacia.");
      err.pass = true;
    }

    setError(err);

    if (msg.length !== 0) {
      toast.error(() => (
        <div>
          {msg.map((value, k) => (
            <p key={k} style={{ textAlign: "left", marginBottom: "5px" }}>
              {value}
            </p>
          ))}
        </div>
      ));

      return false;
    }

    return true;
  }

  useEffect(() => {
    backgroudAnimation();

    function backgroudAnimation() {
      let currentImg = 0;

      setInterval(() => {
        const html = document.getElementById("login-container");

        if (currentImg === 0) currentImg = 1;
        else currentImg = 0;

        html.setAttribute(
          "style",
          `background: url(../login${currentImg}.jpg) 20vw center / cover no-repeat; transition: background-image 1000ms`
        );
      }, 10000);
    }
  }, []);

  return (
    <Grid padded id="login-container">
      <Grid.Column id="loginColumn-container" computer={8} mobile={16}>
        <Grid id="loginColumn" textAlign="center" verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <ToastContainer
              pauseOnHover
              limit={2}
              autoClose={3000}
              position="top-center"
            />

            <Segment raised>
              <Header
                as="h2"
                color="teal"
                textAlign="center"
                content="Inicio de Sesion"
              />

              <Form size="large" onSubmit={handleLogin}>
                <Segment>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Correo Electronico"
                    error={error.user}
                  />

                  <Form.Input
                    fluid
                    icon="lock"
                    type="password"
                    iconPosition="left"
                    placeholder="Contraseña"
                    error={error.pass}
                  />

                  <Button color="teal" fluid size="large" content="Siguiente" />
                </Segment>
              </Form>

              <Message>
                ¿No tienes una Cuenta? <a href="#">Registrarse</a>
              </Message>
            </Segment>
          </Grid.Column>
        </Grid>
      </Grid.Column>
    </Grid>
  );
}
