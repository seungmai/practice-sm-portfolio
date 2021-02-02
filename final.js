'use strict'

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    console.log(window.scrollY);
    console.log(`navbarHeight: ${navbarHeight}`);
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});

const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if(link === null) {
        return;
    }
    console.log(event.target.dataset.link); // 클릭이 되는 아이템의 이벤트에 target은 우리가 클릭한 요소가 출력이 될 것이다. 타겟이 되는 아이가 이렇게 우리의 요소가 출력이 된다. dataset이라는 것에 우리가 정의한 변수들이 다 할당이 되어지는데, dataset안에 우리가 data-link라고 했으니까 link도 적어주면 우리가 정의한 아이디가 나오게 된다. null이 아닌경우에만 여기서 처리를 해줄 것이다.
    const scrollTo = document.querySelector(link); // scrollTo라는 변수를 선언해주고 link라는 앨리먼트를 받아서
    scrollTo.scrollIntoView({behavior: "smooth"}); // scrollIntoView를 이용하여 자연스럽게 내릴수 있도록 해준다.
});

const navbarMenu = document.querySelector('navbar__manu');
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if (link === null) {
        return;
    }
    const scrollTo = document.querySelector(link);
    scrollTo.scrollIntoView();
})