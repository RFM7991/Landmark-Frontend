import React from "react";
import StickyFooter from 'react-sticky-footer';

const darkBg = 'rgb(16,38,51)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'
const navBg = 'rgb(36,38,53)'

const Footer = () => {
  return (
    <StickyFooter
    stickAtThreshold={0.01}
    bottomThreshold={50}
    normalStyles={{
    backgroundColor:  navBg,
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