const pre = document.getElementById("pre");
const getc = document.getElementById("getCity");
const cho = document.getElementById("cho");
const cel = document.getElementById("cel");
const spa = document.getElementById("spa");
const lab = document.querySelector(".lab");
const url =
  "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=haifa";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "Your Apikey ", //your apikey
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};
var city = "Dor";
var lat;
var lon;
const wheater = () => {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&Your Apikey` //your apikey
  ).then((respone) => {
    respone.json().then((data) => {
      lat = data[0].lat;
      lon = data[0].lon;
      getc.textContent = `${data[0].name}   ${data[0].country} `;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&Your Apikey`
      ).then((respone) => {
        respone.json().then((data) => {
          let iscloude = true;
          if (data.clouds.all != 0) {
            iscloude = "Yes";
          } else {
            iscloude = "No";
          }

          cel.innerHTML = `Name: ${data.name} <br/> What Status?: ${data.weather[0].main} <br/> Is cloud? : ${iscloude} `;
          try {
            fetch(
              `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`,
              options
            ).then((respone) => {
              respone.json().then((data) => {
                if (data.error == "An unexpected error occured.") {
                  spa.textContent = `Temp : Error , Maybe not city?`;
                } else {
                  spa.textContent = `temp: ${data.temp}C`;
                }
              });
            });
          } catch (error) {
            console.log(error);
          }
        });
      });
    });
  });
};
pre.addEventListener("click", () => {
  city = cho.value;
  wheater();
});
cho.addEventListener("focusin", () => {
  lab.style.color = "black";
  lab.style.left = "84px";
  lab.style.top = "11px";
});
cho.addEventListener("focusout", () => {
  if (cho.value != "") {
  } else {
    lab.style.color = "";
    lab.style.left = "49px";
    lab.style.top = "47px";
  }
});
