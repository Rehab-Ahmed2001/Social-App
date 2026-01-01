import React, { useContext } from "react";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { FaHome, FaUserFriends, FaUser } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";

export default function AppNavbar() {
  const { token, setToken, userData } = useContext(AuthContext);

  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  return (
    <Navbar>
      <NavbarBrand as={Link} to="/">
        <span className="font-logo self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Kudo
        </span>
      </NavbarBrand>

      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img={
                userData?.photo ||
                "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              }
              rounded
            />
          }
        >
          {token ? (
            <>
              {userData && (
                <DropdownHeader>
                  <span className="block text-sm">{userData.name}</span>
                  <span className="block truncate text-sm font-medium">
                    {userData.email}
                  </span>
                </DropdownHeader>
              )}

              <DropdownItem as={Link} to="/profile">
                <div className="flex items-center gap-2">
                  <FaUser />
                  <span>Profile</span>
                </div>
              </DropdownItem>

              <DropdownDivider />

              <DropdownItem as="button" onClick={handleLogOut}>
                Sign out
              </DropdownItem>
            </>
          ) : (
            <>
              <DropdownItem as={Link} to="/login">Login</DropdownItem>
              <DropdownItem as={Link} to="/register">Register</DropdownItem>
            </>
          )}
        </Dropdown>

        {token && <NavbarToggle />}
      </div>

      {token && (
        <NavbarCollapse>
          <NavbarLink as={NavLink} to="/">
            <div className="flex items-center gap-2">
              <FaHome />
              <span>Home</span>
            </div>
          </NavbarLink>

          <NavbarLink as={NavLink} to="/profile">
            <div className="flex items-center gap-2">
              <FaUser />
              <span>Profile</span>
            </div>
          </NavbarLink>

          <NavbarLink as={NavLink} to="/friends">
            <div className="flex items-center gap-2">
              <FaUserFriends />
              <span>Friends</span>
            </div>
          </NavbarLink>
        </NavbarCollapse>
      )}
    </Navbar>
  );
}
