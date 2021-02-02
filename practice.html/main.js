'use strict' //use strict을 사용해서 우리가 미친 짓을 못 하도록 미연에 방지를 해준다.

// Make navbar transparent when it is on the top(navbar를 투명하게 만들건데 올라가면 투명 내려가면 색깔있는 걸로!)
const navbar = document.querySelector ('#navbar'); // 변수 navbar를 선언한 다음에 document에 있는 querySelector를 이용해서 우리의 앨리먼트 요소를 받아온다. html에 아이디로 되어있기 때문에 #navbar로 적어준다.
const navbarHeight = navbar.getBoundingClientRect().height; //#navbar 그리고 navbar의 height을 하려면 querySelector를 이용하게 되면 컨트롤 또는 커맨드를 이용해서 클릭하면 함수가 정의된 곳으로 갈 수 있다. 그래서 navbar에 querySelector를 이용해서 가져온 navbar요소의 높이를, 변수를 이용해서 할당한다. navbar에게 getBoundingClientRect()을 호출하면 여기안에 height가 있다.
document.addEventListener('scroll', () => { //EventListener를 document에 먼저 스크롤이 될 때마다 나에게 우리가 등록한 이 함수를 호출해줘! ()이것은 Arrow function이라고하는데, 즉 아무런 인자를 받지않고 우리가 원하는 블럭을 실행하는 것이다. 그래서 스크롤이 될 때마다 여기 블럭안에서 우리가 작성한 코드가 실행 되어지도록 하는 것이다.
    console.log(window.scrollY); // console.log에 window에 scrollY를 쓰면 스크롤 포지션을 알 수 있다.
    console.log(`navbarHeight: ${navbarHeight}`); // 높이를 지정할 때는 navbarHeight처럼 이름을 설정하고 백틱가호를 이용해서 사용하는 것이 좋다.
    if(window.scrollY > navbarHeight) { // window에 scrollY가 우리 navbar height보다 크면 즉 스크롤링이 navbar height 이상으로 스크롤링이 발생하면~ 
        navbar.classList.add ('navbar--dark'); //우리가 navbar에 있는 클래스 리스트를 추가(add)해 줄건데 navbar가 이루어지면 navbar의 dark.BEM의 Modifier를 이용해서 navbar가 어두어지게 만든다. 그래서 스크롤링이 클 때만 navbar--dark를 추가한다. classList는 add와 remove메소드를 이용하여 변형할 수 있다.
    } else {
        navbar.classList.remove('navbar--dark'); //스크롤링이 navbar height보다 작으면, 즉 스크롤링이 많이 되지 않았으면 navbar--dark를 없애줄 것이다.
    }
});

// Handle scrolling when tapping on the navbar menu(navbar menu를 누르면 자연스럽게 그 위치로 스크롤링이 되도록 만들어라!)
const navbarMenu = document.querySelector('.navbar__menu'); // navbarMenu를 선언하고 document의 querySelector를 이용해서 .navbar__menu라는 변수를 할당한다.
navbarMenu.addEventListener('click', (event) => { // navbarMenu에 이벤트를 추가해준다. click이 되면 우리가 등록한 함수가 호출되게 한다. 그리고 보통은 클릭이되면 클릭한 이벤트가 들어오게 된다. 
    const target = event.target; // target이라는 변수를 할당하고
    const link = target.dataset.link; // link라는 변수를 할당한 다음에 target에 있는 dataset에 있는 link!
    if (link === null) { // link가 없다면, link가 null이라면, undefined이거나 null이라면 아무것도 하지않고 
        return;
    }
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
    selectNavItem(target);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
});

// Handle click on "contact me" button on home
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
    scrollIntoView('#contact')
});

// Make home slowly fade to transparant as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll' , () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "arrow up" button when scrolling down
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    if (window.scrollY > homeHeight / 2) {
        arrowUp.classList.add('visible');
    } else {
        arrowUp.classList.remove('visible');
    }
});

// Handle click on the "arrow up" button
arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
});

// Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if (filter == null) {
        return;
    }

// Remove selection from the previous item and select the new one
const active = document.querySelector('.category__btn.selected');
active.classList.remove('selected');
const target = e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
target.classList.add('selected');


    projectContainer.classList.add('anim-out')
    setTimeout(() => {
        projects.forEach((project) => {
            console.log(project.dataset.type);
            if(filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    }, 300);
});

// 1. 모든 섹션 요소들과 메뉴아이템들을 가지고 온다.
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.

const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#testimonials',
    '#contact',
];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id =>
     document.querySelector(`[data-link="${id}"]`));

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: 'smooth'});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
    root: null,
    rootMargine: '0px',
    threshold: 0.3,
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
       if (!entry.isIntersecting && entry.intersectionRatio > 0) {
           const index = sectionIds.indexOf(`#${entry.target.id}`);
           // 스크롤링이 아래로 되어서 페이지가 올라옴
           if(entry.boundingClientRect.y < 0) {
            selectedNavIndex = index + 1;
           } else {
            selectedNavIndex = index - 1;
           }
       }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', () => {
    if(window.scrollY === 0) {
        selectedNavIndex = 0;
    } else if (
        Math.round(window.scrollY + window.innerHeight) ===
        document.body.clientHeight
    ) {
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});