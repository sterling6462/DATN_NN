import { ReactNode } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

export type LayoutProps = {
  title?: string | "Layout";
  children?: ReactNode;
};

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
