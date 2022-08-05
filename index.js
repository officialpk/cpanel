

const urlParam = window.location.href;
console.log(urlParam);
const userMobileNumber = urlParam.split('=')[1].split('&')[0];
console.log(userMobileNumber);
const noOfAddress = urlParam.split('&')[1].split('=')[1];
console.log(noOfAddress);



var key = "AIzaSyBi0U2gDg4mLDmkaSOATTtA4m4keRRejvU"

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
                   // const updateUrl = "http://3.23.36.177:4000/v1/updateUserAddress";
                   
                   const updateUrl = "https://api.chattybao.com/v1/updateUserAddress";
                    const response0 = await fetch(updateUrl, {
                        method: 'post',
                        body: JSON.stringify(addressUpdate),
                        headers: { 'Content-Type': 'application/json'}
                    });
                    const data = await response0;
                    console.log(response0);
                });
            } 
            updateAddress().then(window.location.href=`https://api.whatsapp.com/send?phone=919289454472&text=Name:%20${fName}.%20Address:%20${b}`)
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
                    //const addressUrl = "http://3.23.36.177:4000/v1/updateUserAddress";
                    const addressUrl = "https://api.chattybao.com/v1/updateUserAddress";
                    const response2 = await fetch(addressUrl, {
                        method: 'post',
                        body: JSON.stringify(addressFields),
                        headers: { 'Content-Type': 'application/json'}
                    });
                    const data = await response2;
                    console.log(response2);
                });
            }
            updateAddress2().then(window.location.href=`https://api.whatsapp.com/send?phone=919289454472&text=Name:%20${fName}.%20Address:%20${b}`)   
        }



    }
    else{
        alert("Please accept the Terms and condition to submit the form")
    }
    
}



