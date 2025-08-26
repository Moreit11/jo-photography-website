// //menu animation
// function loadMenu() {
//     const menuBtn = document.getElementById("menu-btn")
//     const navElement = document.getElementById("site-navigation");
//     menuBtn.addEventListener('click', ()=> {
//         navElement.classList.toggle('menu--active')
//     })
// }


// send form  via email.js 
function sendForm() {
    event.preventDefault() // Prevent page reload
    const cForm = document.forms['contact-form']
    const fname = cForm['f-name'].value
    const lname = cForm['l-name'].value
    const email = cForm['email'].value
    const phone= cForm['phone'].value
    const subject = cForm['subject'].value
    const message = cForm['message'].value
    const gdpr = cForm['gdpr'].value
    const time = new Date()

    const formParams = {
        fname: fname, 
        lname: lname, 
        email: email, 
        phone: phone, 
        subject: subject, 
        message: message, 
        consent: gdpr,
        time: time
    }
    emailjs.send("service_xmbw0c3","template_7iwolse", formParams, {});
    console.log("completed")
}
(function() {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init({
        publicKey: "rQ8SO2xTCB3JPxg19",
    });
})();
// Get SVG Arrow
async function ctaButton()    {
    const svgArrow = await  getTemplate('./media/svgs/arrow.svg')
    const buttons = document.querySelectorAll('.cta')
    for( button of buttons){
        let btnText = button.textContent
        button.innerHTML = btnText + svgArrow
    }
}
// get SVG Check symbol
async function checkSVG()    { 
    const arrowSvg = await  getTemplate('./media/svgs/check.svg')
    const checkWraps = document.querySelectorAll('.svg-check')
    for( checkWrap of checkWraps){
        checkWrap.innerHTML = arrowSvg
    }
}
// gets html templates
function getTemplate(templUrl){
    return fetch(templUrl) 
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser
        const parsed = parser.parseFromString(html,"text/html")
        const svgIcon = parsed.querySelector('body').innerHTML
        return svgIcon
    })
    
}
// animate elements
function animation() { 
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add the class when the element comes into view
            entry.target.classList.add('in-view');
          } else {
            entry.target.classList.remove('in-view');
          }
        });
      }, { threshold: 0.1 });
      const animateElements = document.querySelectorAll('.animate');
      animateElements.forEach(element => observer.observe(element))
}
// Fixed header on scroll
window.onscroll = function() {
    var header = document.getElementsByTagName('header')
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        header[0].classList.add("shrink");
    } else {
        if (header[0].classList.contains("shrink")) {
            header[0].classList.remove('shrink');
        }
    }
  }