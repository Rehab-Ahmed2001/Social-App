import React from 'react';
import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup
} from "flowbite-react";
import { Link } from 'react-router-dom';

export default function AppFooter() {
  return (
    <Footer container className="mt-10">
      <div className="w-full mx-auto px-4 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">

        <div className="w-full flex justify-center sm:justify-start mb-4 sm:mb-0">
          <FooterCopyright by="Rehab Ahmed" year={2025} />
        </div>

        <FooterLinkGroup className="hidden sm:flex flex-wrap sm:flex-nowrap gap-4 sm:gap-6">
          <FooterLink as={Link} to="/">Home</FooterLink>
          <FooterLink as={Link} to="/profile">Profile</FooterLink>
          <FooterLink as={Link} to="/login">Login</FooterLink>
          <FooterLink as={Link} to="/register">Register</FooterLink>
        </FooterLinkGroup>

      </div>
    </Footer>
  );
}
