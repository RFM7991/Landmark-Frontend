import React from "react";
import StickyFooter from 'react-sticky-footer';

const darkBg = 'rgb(16,38,51)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'
const navBg = 'linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(6,6,73,1) 63%, rgba(0,212,255,1) 100%)'

const Footer = () => {
  return (
    <StickyFooter
    stickAtThreshold={0.01}
    bottomThreshold={50}
    normalStyles={{
    background:  navBg,
    padding: "2rem",
    color: 'whitesmoke',
    textAlign: 'center'
    }}
    stickyStyles={{
    backgroundColor: "rgba(53,58,54,.8)",
    padding: "2rem",
    visibility: 'hidden',
    }}
>
    © 3 R's LLC 2019
</StickyFooter>
  );
}

export default Footer;