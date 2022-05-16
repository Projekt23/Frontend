import React from "react"
import DesktopComponent from './HomeComponents/HomeDesktop';
import MobileComponent from './HomeComponents/HomeMobile';

export default function Home() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 900;

  React.useEffect(() => {
    /* Inside of a "useEffect" hook add an event listener that updates
       the "width" state variable when the window size changes */
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);
  return (
    width < breakpoint ? <MobileComponent /> : <DesktopComponent />
  )
}

//retrive UserData from Backend, save to local storage
async function getUserData() {
  //backend call
  //placeholer 
  var id = "1";

  const server = "http://88.214.57.111:8081/api";
  return fetch(server+'/user/'+id+'', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' },
  })
    .then(response => {
      response.text().then(value => {
          var responseJSON = JSON.parse(value);

          localStorage.setItem('username', responseJSON["username"]);
          localStorage.setItem('name', responseJSON["name"]);
          localStorage.setItem('email', responseJSON["email"]);

        }).catch(err => {
          console.log(err);
        });
    });


  //create dummy for userdata
  localStorage.setItem('UserName', "Ralf Gärtner");

  //read userdata example
  //const UserName = localStorage.getItem('UserName');
}
