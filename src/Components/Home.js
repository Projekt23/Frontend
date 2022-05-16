import React from "react"
import DesktopComponent from './HomeComponents/HomeDesktop';
import MobileComponent from './HomeComponents/HomeMobile';

export default function Home() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 800;

  React.useEffect(() => {
    /* Inside of a "useEffect" hook add an event listener that updates
       the "width" state variable when the window size changes */
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);
  return (
    width < breakpoint ? <MobileComponent /> : <DesktopComponent />
  )
}

