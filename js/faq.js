// JavaScript Document

//Selecting Arrow button
const buttons = document.querySelectorAll('button');

//Indivial div will show up by sliding down when clicking
buttons.forEach( button =>{
    button.addEventListener('click',()=>{
        const faq = button.nextElementSibling;
        const icon = button.children[1];
//When individual div shows up, the arrow will change direction displaying "opening" and "closing" of tab
        faq.classList.toggle('show');
        icon.classList.toggle('rotate');
    })
} )

