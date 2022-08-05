
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import LOGO from './LOGO.png';
import './cpanel.css';




const Cpanel = props => {

const [listItem1,setlistItem1] = useState('');
  const urlParam = window.location.href;
  const userMob = urlParam.split('=')[1].split('&')[0];
  const noOfAddress = urlParam.split('&')[1].split('=')[1];
  var redNum = 919289454472;
  const conv = urlParam.split('=')[0];
  if(conv.endsWith('m')){
      redNum = 919289454473;
  }
  
  const userMobileNumber = atob(userMob);
  
  
  var key = "AIzaSyBi0U2gDg4mLDmkaSOATTtA4m4keRRejvU"
  var cityArrayResponse;
  var cityArray= [];
  var i=0;
  
  //getcities api call
  async function cityname() {
      return new Promise(async function (resolve, reject) {
          const response = await fetch(window.baseUrl+"getCities");
          const data = await response.json();
          cityArrayResponse = data.data;
          
          cityArrayResponse.map(x=>{
              cityArray.push(x.city)
          })
          //console.log(cityArray);
  
      })
      
  }
  
  cityname()
  //function execute on keyup
  const handleChange = (event) => {
   
   var input = event.target.value;
  
//   var input = document.querySelector('input[id="City"]')
  const list = document.getElementById('city');
  
  let filteredArray = cityArray.filter((x)=>{
   
              if (x.match(new RegExp(input, "gi")) && x.toLowerCase().startsWith(input.toLowerCase()) && input != "") {
                
               return x;
              }
           // return x;
            })
            
            document.querySelector('datalist').innerHTML = "";
                  let listItem ='';
                  filteredArray.map(item=>{
                      listItem += `<option value=${item}>`;
                  })
                  setlistItem1(listItem);
                 // document.querySelector('datalist').innerHTML = listItem;
  }
  
  
  //keyup eventlistener
//   input.addEventListener('keyup', ()=>{
//       let filteredArray = cityArray.filter((x)=>{
//           if (x.match(new RegExp(input.value, "gi")) && x.toLowerCase().startsWith(input.value.toLowerCase()) && input.value != "") {
//               return x;
//           }
//       })
  
     // document.querySelector('datalist').innerHTML = "";
//       let listItem ='';
//       filteredArray.map(item=>{
//           listItem += `<option value=${item}>`;
//       })
//       document.querySelector('datalist').innerHTML = listItem;
//   })

  
  async function call(){
  
      // data validation
      var checkbox = document.querySelector('input[type="checkbox"]')
      if(checkbox.checked){
  
          var textbox = document.querySelectorAll('input[type="text"]')
          if(textbox[0].value==''){
              alert("FullName field is mandatory");
              return;
          }
          if(textbox[1].value==''){
              alert("Address Line1 field is mandatory");
              return;
          }
          
          if(textbox[2].value==''){
              alert("Address Line2 field is mandatory");
              return;
          }
          
          if(textbox[3].value==''){
              alert("City field is mandatory");
              return;
          }
          if(textbox[4].value==''){
              alert("Pincode field is mandatory");
              return;
          }
          if(!cityArray.includes(textbox[3].value)){
              alert("Hey, Looks like your city is not in our service list. Please choose nearest city from the suggestion");
              return;
          }
          
          let fName = textbox[0].value
          let al1 = textbox[1].value
          let al2 = textbox[2].value
          let city = textbox[3].value
          let pincode = textbox[4].value
          console.log(pincode);
          var b = al1+", "+al2+", "+city+", "+pincode
          console.log(b)
          
          if(noOfAddress==0){
              async function updateAddress() {
                  return new Promise(async function (resolve, reject) {
                      const addressUpdate = {
                          "userMobileNumber": userMobileNumber,
                          "address1": b,
                          "priority": 1
                          // "latitude": lat,
                          // "longitude": lng
                      };
                      const updateUrl = window.baseUrl+"updateUserAddress";
                      const response0 = await fetch(updateUrl, {
                          method: 'post',
                          body: JSON.stringify(addressUpdate),
                          headers: { 'Content-Type': 'application/json'}
                      });
                      const data = await response0;
                      console.log(response0);
                  });
              } 
              updateAddress().then(window.location.href=`https://api.whatsapp.com/send?phone=${redNum}&text=Name:%20${fName}.%20Address:%20${b}`)
          }
          
  
  
          // updating address 2 fields for users having 1 or more address fields
          else{
              async function updateAddress2() {
                  return new Promise(async function (resolve, reject) {
                      const addressFields = {
                          "userMobileNumber": userMobileNumber,
                          "address2": b,
                          "priority": 2
                          // "latitude": lat,
                          // "longitude": lng
                      };
                      const addressUrl = window.baseUrl+"updateUserAddress";
                      const response2 = await fetch(addressUrl, {
                          method: 'post',
                          body: JSON.stringify(addressFields),
                          headers: { 'Content-Type': 'application/json'}
                      });
                      const data = await response2;
                      console.log(response2);
                  });
              }
              updateAddress2().then(window.location.href=`https://api.whatsapp.com/send?phone=${redNum}&text=Name:%20${fName}.%20Address:%20${b}`)   
          }
  
  
  
      }
      else{
          alert("Please accept the Terms and condition to submit the form")
      }
      
  
  }





  return (

    <div className="cpanel_container d-flex align-items-center justify-content-center">
      <div className="icon">
        <img className="cpanel_img" src={LOGO} alt="icon" />
      </div>

      <div className="user-content">
        <h1 id="heading">Please provide address for home delivery</h1>
        <hr className="line_hr" />
        <div className="floating">
          <input type="text" className="floating__input" id="FullName" placeholder="Full name" />
          <label htmlFor="inputId" className="floating__label" data-content="Full name">
          </label>
        </div>
        <div id="Address 1" className="tabcontent">
          <div className="floating">
            <input type="text" className="floating__input" id="Address Line1" placeholder="House/ Flat/ Society" />
            <label htmlFor="inputId" className="floating__label" data-content="House/ Flat/ Society">
            </label>
          </div>
          <div className="floating">
            <input type="text" className="floating__input" id="Address Line2" placeholder="Road/ Sector/ Block/ Area/ Phase" />
            <label htmlFor="inputId" className="floating__label" data-content="Road/ Sector/ Block/ Area/ Phase">
            </label></div>
          <div className="floating">
            <input type="text" className="floating__input" id="City" placeholder="City" onChange={handleChange}  />
            <label htmlFor="inputId" className="floating__label" data-content="City">
               <datalist id ="city">
                {listItem1}
            </datalist>
            </label></div>
          <div className="floating">
            <input type="text" className="floating__input" placeholder="Pincode" id="pincode" />
            <label htmlFor="inputId" className="floating__label" data-content="Pincode">
            </label></div>
        </div>
        <div className="category" style={{ justifyContent: 'flex-start' }}>
          <input type="checkbox" name="Iagree" id="Iagree" checked />&nbsp;&nbsp;&nbsp;&nbsp;
          <div> I Agree to  <a href="https://chattybao.com/user-agreement" target="_blank"><span class="blueText">Terms &
            Conditions</span></a><br/><a href="https://chattybao.com/privacy-policy" target="_blank"><span className="blueText">Privacy Policy</span></a></div>
        </div>
        <div className="category-button">
          <button className="cpanel_button" onClick={call}>Submit</button>
        </div>
      </div>
    </div>

  );
};

const Dashboard = withRouter(Cpanel);
export default Dashboard