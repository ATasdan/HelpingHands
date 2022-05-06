const logo1 = document.getElementById("logo1").style;
const logo2 = document.getElementById("logo2").style;
const logoText1 = document.getElementById("logoText1").style;
const logoText2 = document.getElementById("logoText2").style;
const info = document.getElementById("info").style;
const button1 = document.getElementById("button1").style;
const button2 = document.getElementById("button2").style;
const button3 = document.getElementById("button3").style;
const button4 = document.getElementById("button4").style;
const teamContainer = document.querySelector(".teamContainer").style;
const demoContainer = document.querySelector(".demoContainer").style;
const reportsContainer = document.querySelector(".reportsContainer").style;
const posterContainer = document.querySelector(".posterContainer").style;

const init = () => {
  setTimeout(() => {
    logo1.transition = "1250ms";
    logo2.transition = "1250ms";
    logo1.transform = "translateX(75px) translateY(0)";
    logo2.transform = "translateX(55px) translateY(0)";
    logo1.color = "darkred";
    logo2.color = "darkred";
  }, 750);
  setTimeout(() => {
    logo1.transform = "translateX(-130px)";
    logo2.transform = "translateX(130px)";
  }, 1500);
  setTimeout(() => {
    logoText1.transition = "1500ms";
    logoText2.transition = "1500ms";
    logoText1.opacity = "1";
    logoText2.opacity = "1";
  }, 2500);

  setTimeout(() => {
    logo1.transition = "750ms";
    logo2.transition = "750ms";
    logo1.transform = "translateX(-130px) translateY(-300px)";
    logo2.transform = "translateX(130px) translateY(-300px)";
  }, 3000);

  setTimeout(() => {
    info.transition = "400ms";
    info.opacity = "1";
  }, 3750);

  setTimeout(() => {
    button1.transition = "400ms";
    button1.opacity = "1";
  }, 4000);
  setTimeout(() => {
    button2.transition = "400ms";
    button2.opacity = "1";
  }, 4150);
  setTimeout(() => {
    button3.transition = "400ms";
    button3.opacity = "1";
  }, 4300);
  setTimeout(() => {
    button4.transition = "400ms";
    button4.opacity = "1";
  }, 4450);
};

const showTeam = () => {
  teamContainer.transition = "750ms";
  demoContainer.transition = "750ms";
  reportsContainer.transition = "750ms";
  posterContainer.transition = "750ms";

  setTimeout(() => {
    teamContainer.visibility = "visible";
    teamContainer.opacity = "1";
  }, 500);
  demoContainer.visibility = "hidden";
  demoContainer.opacity = "0";
  reportsContainer.visibility = "hidden";
  reportsContainer.opacity = "0";
  posterContainer.visibility = "hidden";
  posterContainer.opacity = "0";
};

const showDemo = () => {
  teamContainer.transition = "750ms";
  demoContainer.transition = "750ms";
  reportsContainer.transition = "750ms";
  posterContainer.transition = "750ms";

  setTimeout(() => {
    demoContainer.visibility = "visible";
    demoContainer.opacity = "1";
  }, 500);
  teamContainer.visibility = "hidden";
  teamContainer.opacity = "0";
  reportsContainer.visibility = "hidden";
  reportsContainer.opacity = "0";
  posterContainer.visibility = "hidden";
  posterContainer.opacity = "0";
};

const showReports = () => {
  teamContainer.transition = "750ms";
  demoContainer.transition = "750ms";
  reportsContainer.transition = "750ms";
  posterContainer.transition = "750ms";

  setTimeout(() => {
    reportsContainer.visibility = "visible";
    reportsContainer.opacity = "1";
  }, 500);
  teamContainer.visibility = "hidden";
  teamContainer.opacity = "0";
  demoContainer.visibility = "hidden";
  demoContainer.opacity = "0";
  posterContainer.visibility = "hidden";
  posterContainer.opacity = "0";
};

const showPoster = () => {
  teamContainer.transition = "750ms";
  demoContainer.transition = "750ms";
  reportsContainer.transition = "750ms";
  posterContainer.transition = "750ms";

  setTimeout(() => {
    posterContainer.visibility = "visible";
    posterContainer.opacity = "1";
  }, 500);
  teamContainer.visibility = "hidden";
  teamContainer.opacity = "0";
  demoContainer.visibility = "hidden";
  demoContainer.opacity = "0";
  reportsContainer.visibility = "hidden";
  reportsContainer.opacity = "0";
};

init();
