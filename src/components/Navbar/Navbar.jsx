import React from 'react'
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
import { Link, NavLink } from 'react-router-dom';
export default function AppNavbar() {
  return (
    <Navbar>
      <NavbarBrand as={Link} to="/">
        <span className="font-logo self-center whitespace-nowrap text-xl font-semibold dark:text-white">Kudo</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </DropdownHeader>
          <DropdownItem as={Link} to="/login">Login</DropdownItem>
          <DropdownItem as={Link} to="/register">Register</DropdownItem>
          <DropdownItem as={Link} to="/profile">Profile</DropdownItem>
          <DropdownDivider />
          <DropdownItem as="button">Sign out</DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink as={NavLink} to="/" active>
          Home
        </NavbarLink>
        <NavbarLink as={NavLink} to="/">Posts</NavbarLink>
        <NavbarLink as={NavLink} to="/friends">Friends</NavbarLink>
        <NavbarLink as={NavLink} to="/chats">Chats</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  )
}
