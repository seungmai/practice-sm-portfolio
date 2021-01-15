'use strict' //자바스크립트 시작할 때 무조건 !!!


// Make navabar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    console.log(window.scrollY);
    // scrollY를 쓰면 스크롤 포지션을 알 수 있다.
    console.log(`navbarHeight: ${navbarHeight}`);
    // navbarHeight이 104로 나오게 된다.
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else{
        navbar.classList.remove('navbar--dark');
    }
});