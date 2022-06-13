import React, { useState, useEffect } from "react"
import { decodeToken } from "react-jwt";
import DesktopComponent from './HomeComponents/HomeDesktop';
import MobileComponent from './HomeComponents/HomeMobile';

function createData(designation, describtion, favorite) {
  return { designation, describtion, favorite };
}
function getUnique(arr, index) {

  const unique = arr
       .map(e => e[index])

       // store the keys of the unique objects
       .map((e, i, final) => final.indexOf(e) === i && i)

       // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);      

   return unique;
}
export default function Home() {
  const [favourites, setFavourites] = useState([])
  const [bookmarkRows, setBookmarkRows] = useState([
  ]);
  const [boName,setboName] = useState();
  const [boDescription,setboDescription] = useState();
  const [boID,setboID] = useState();

  const [lastSeen,setlastSeen] = useState([]);

  const [changeHistory,setChangeHistory] = useState([]);

  const [username,setusername] = useState();
  
  useEffect(() => {
    
  
  
  
  var id = decodeToken(localStorage.getItem("userID")).id;
  const server = process.env.REACT_APP_API_BACKEND;
  fetch(server+'/dashboard?userId='+id+'', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' },
    })
        .then(response => {
        response.text().then(value => {
            var responseJSON = JSON.parse(value);
            setboName(responseJSON["randomBo"]["boName"]);
            setboDescription(responseJSON["randomBo"]["boDescription"]);
            setboID(responseJSON["randomBo"]["boId"]);
            setlastSeen(getUnique(responseJSON["lastSeen"], "boId"))

            setChangeHistory(responseJSON["changeHistory"])
            console.log(responseJSON["changeHistory"])
            }).catch(err => {
            console.log(err);
            });
        });

        
      fetch(server+'/user/'+id+'', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' },
      })
          .then(response => {
          response.text().then(value => {
              var responseJSON = JSON.parse(value);
              
              setusername(responseJSON["username"]);
              }).catch(err => {
              console.log(err);
              });
          });
          fetch(server+'/favourite/all/'+id+'', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' },
        })
            .then(response => {
            response.text().then(value => {
                var responseJSON = JSON.parse(value);

                setBookmarkRows(responseJSON)
                console.log(favourites)
                }).catch(err => {
                console.log(err);
                });
            });
          
            
    }, [])


  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 900;

  React.useEffect(() => {
    /* Inside of a "useEffect" hook add an event listener that updates
       the "width" state variable when the window size changes */
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);
  return (
    width < breakpoint ? <MobileComponent boName = {boName} boDescription = {boDescription} boID = {boID} username={username} bookmarkRows = {bookmarkRows} lastSeen = {lastSeen} changeHistory ={changeHistory}/> : <DesktopComponent boName = {boName} boDescription = {boDescription} boID = {boID} username={username} bookmarkRows = {bookmarkRows} lastSeen = {lastSeen} changeHistory = {changeHistory}/>
  )
}

