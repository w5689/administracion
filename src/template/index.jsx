import React, { useState, useEffect } from "react";
import { datauser } from "../contex/globalvars";
import { Route, Routes, NavLink } from "react-router-dom";

import { Card, Image, Menu, Segment, Sidebar, Accordion, Icon } from "semantic-ui-react";
import NotFound from "../Pages/NotFound";
import perfil from "../assets/matthew.png";
import Home from "../Pages/Home";
import TopMenu from "../Components/TopMenu";

export function Template() {
  const [active, setActive] = useState(-1);
  const [user, setUser] = useState([]);
  const [visible, setVisible] = useState(false);

  const dataloginuser = async () => {
    let user = sessionStorage.getItem("user");

    var jsonData = {
      apikey: user,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData),
    };

    var t = 0;
    await fetch(datauser, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        /*
        if (data.found == 0) {
          sessionStorage.setItem("isLoggedIn", false);
          sessionStorage.setItem("user", "");
          location.href = "./";
        }
        */
        setUser(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const loadDatos = async () => await dataloginuser();
    loadDatos();
  }, []);

  const activeItem = (v) => {
    let cnt = v;
    if (cnt === active) {
      cnt = -1;
    }

    setActive(cnt);
  };

  return (
    <>
      <TopMenu user={user} setVisible={setVisible} visible={visible}></TopMenu>
      <Sidebar.Pushable as={Segment} style={{ top: "-15px" }}>
        <Sidebar as={Menu} animation="push" vertical visible={visible} width="thin">
          <Menu.Header>
            <Card>
              <Card.Content extra>
                <Image src={perfil} wrapped circular />
                {user.TBUSER_Username}
              </Card.Content>
            </Card>
          </Menu.Header>

          <Menu.Item
            active={active === "inicio"}
            name="Inicio"
            as={NavLink}
            to="/"
            icon="home"
            onClick={(e) => activeItem(1)}
          />
          <Accordion>
            <Menu.Item>
              <Accordion.Title
                active={active === 0}
                content="Administrar"
                index={0}
                onClick={(e) => activeItem(0)}
              />
              <Accordion.Content active={active === 0}>
                <Menu.Item
                  active={active === "administrar"}
                  name="Administrar"
                  as={NavLink}
                  to="/administrar"
                  onClick={(e) => activeItem(1)}
                >
                  Administrar
                </Menu.Item>

                <Menu.Item
                  active={active === "cuentas"}
                  as={NavLink}
                  to="/cuentas/1"
                  onClick={(e) => activeItem(2)}
                >
                  Cuentas
                </Menu.Item>

                <Menu.Item
                  active={active === "cuentas"}
                  as={NavLink}
                  to="/productos/1"
                  onClick={(e) => setActive(0)}
                >
                  Productos
                </Menu.Item>
              </Accordion.Content>
            </Menu.Item>
          </Accordion>
          <Accordion as={Menu} vertical>
            <Menu.Item>
              <Accordion.Title
                active={active === 1}
                content="Inventario"
                index={1}
                onClick={(e) => setActive(1)}
              />
              <Accordion.Content active={active === 1}>
                <Menu.Item as="a">
                  <Icon name="box" /> Productos
                </Menu.Item>
                <Menu.Item as="a">
                  <Icon name="archive" /> Depositos
                </Menu.Item>
              </Accordion.Content>
            </Menu.Item>
          </Accordion>
        </Sidebar>

        <Sidebar.Pusher
          style={{
            height: window.innerHeight - 60 + "px",
            overflowY: "auto",
          }}
        >
          <Segment style={{ background: "#cbcbcb" }}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="*" element={<NotFound />} />
            </Routes>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  );
}
