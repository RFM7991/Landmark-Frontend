import React from "react";
import StickyFooter from 'react-sticky-footer';

const Footer = () => {
  return (
    <StickyFooter
    stickAtThreshold={0.01}
    bottomThreshold={50}
    normalStyles={{
    backgroundColor:  "rgba(53,58,54)",
    padding: "2rem",
    color: 'whitesmoke'
    }}
    stickyStyles={{
    backgroundColor: "rgba(53,58,54,.8)",
    padding: "2rem",
    visibility: 'hidden',
    margin: 'auto'
    }}
>
    © 3 R's LLC 2019
</StickyFooter>
  );
}

export default Footer;