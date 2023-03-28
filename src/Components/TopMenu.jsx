import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Dropdown, Menu, Icon, Button } from "semantic-ui-react";
export default function TopMenu({ user, setVisible, visible }) {
  const logaut = () => {
    sessionStorage.setItem("isLoggedIn", false);
    location.reload();
  };
  const navigate = useNavigate();
  return (
    <>
      <Menu pointing>
        <Menu.Item
          style={{ borderRight: "solid 1px #CACACA", width: "10.7em" }}
        >
          Store
        </Menu.Item>
        <Menu.Item>
          <Button basic icon="sidebar" onClick={(e) => setVisible(!visible)} />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item style={{ padding: 0 }}>
            <Dropdown
              item
              icon={<Icon name="user outline" size="large" />}
              className="icon"
              text={user.TBUSER_Username}
            >
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate("/myaccount")}>
                  <Icon name="clipboard outline" />
                  Mi Cuenta
                </Dropdown.Item>

                <Dropdown.Item onClick={logaut}>
                  <Icon name="power off" />
                  Cerrar sesion
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </>
  );
}
