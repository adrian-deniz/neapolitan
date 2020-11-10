// window.history.replaceState( null, null, window.location.href );

let formContainer = document.getElementById('form-container');
let contactForm = document.getElementById('contact-form');


contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    //--------------------Google Recaptcha--------------------\\
    const recaptchaToken = document.getElementById('g-recaptcha-response').value;
    // if(recaptchaToken === '') {
    //     alert('Please confirm you’re not a robot.');
    // }
    // else {
    //--------------------Convert Form Data to JSON String--------------------\\
    let formData = new FormData(contactForm);

    let formDataObject = {
        name: formData.get('Name'),
        email: formData.get('Email'),
        message: formData.get('Message'),
        recaptchaToken:  recaptchaToken
    }
    let formDataJSON = JSON.stringify(formDataObject) 
     //--------------------End-Of-Code--------------------\\
    
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/form', true);
    xhr.send(formDataJSON);

    contactForm.reset(); 
    contactForm.remove();

    let div = document.createElement("div")
    div.className = 'success-message';

    let p = document.createElement("p")
    p.innerHTML = 'Thank you! Your submission has been received!';
    div.append(p);

    formContainer.append(div);
    // }
 
});





