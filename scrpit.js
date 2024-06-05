const counter2 = [];

function dropdown() {
    let list = document.getElementById("dropdown-content").classList;
    if (list.contains("opacity-0")) {
        list.add("opacity-100");
        list.add('top-0');
        list.remove("opacity-0");
        list.remove('-top-[10px]');
    } else {
        list.add("opacity-0");
        list.add('-top-[10px]')
        list.remove("opacity-100");
        list.remove('top-0');
    }
}

document.addEventListener('click', (event) => {
    let list = document.getElementById("dropdown-content").classList;
    if (event.target !== document.getElementById("dropdown-content") && event.target !== document.getElementById("dropdown-btn")) {
        list.remove('opacity-100');
        list.add('opacity-0')
        list.add('-top-[10px]')
        list.remove('top-0');
    }
});
function switchMenu(num1) {
    let ele = document.getElementsByClassName('menu')
    let ele2 = document.getElementsByClassName('menu-H')
    for (let i of ele2) {
        i.classList.remove('gradient');
    }
    for (let i of ele) {
        i.classList.add('-top-[1000%]');
        i.classList.add('opacity-0');
        i.classList.remove('opacity-100');
    }
    ele[num1 - 1].classList.remove('-top-[1000%]');
    ele[num1 - 1].classList.add('opacity-100');
    ele[num1 - 1].classList.remove('opacity-0');
    if (num1 == 3) {
        num1++
    } else if (num1 == 6) {
        num1 -= 5
    } else if (num1 == 5) {
        num1 -= 3
    } else if (num1 == 4) {
        num1--
    } else if (num1 == 2) {
        num1 += 3
    } else if (num1 == 1) {
        num1 += 5
    }
    ele2[num1 - 1].classList.add('gradient')
}
function display() {
    document.getElementById("offcanvasBottom2").style.display = "flex";
    document.getElementById("lang-cover").style.display = "block";
    let ele3 = document.getElementById("offcanvasBottom2");
    ele3.classList.add("transition2");
    ele3.style.bottom = "0";
}
function display2(type) {
    let drawer = document.getElementById('signin-form');
    let drawer_cover = document.getElementById('signin-cover');
    drawer_cover.classList.remove('hidden');
    if (type == 'open') {
        drawer.classList.remove('-top-[140%]');
        drawer.classList.add('top-[10%]');
        drawer.classList.add('bottom-[10%]');
    }
    else {
        drawer.classList.remove('top-[10%]');
        drawer.classList.remove('bottom-[10%]');
        drawer.classList.add('-top-[140%]');
        drawer_cover.classList.add('hidden');
    }
}



function handelDrawer(type) {
    let drawer = document.getElementById('drawer');
    let drawer_cover = document.getElementById('drawer-cover');
    if (type == 'open') {
        drawer.classList.add('bottom-0');
        drawer.classList.remove('-bottom-[200px]');
        drawer_cover.classList.add('bottom-0')
        drawer_cover.classList.remove('bottom-[100%]')
    }
    else {
        drawer.classList.add('-bottom-[200px]');
        drawer.classList.remove('bottom-0');
        drawer_cover.classList.add('bottom-[100%]');
        drawer_cover.classList.remove('bottom-0');
    }
}
function changeForm(type) {
    let form1 = document.getElementById('form1');
    let form2 = document.getElementById('form2');
    if (type == 1) {
        form1.classList.remove('hidden');
        document.getElementById('form1-btn').classList.add('bg-[#89684c]')
        document.getElementById('form2-btn').classList.remove('bg-[#89684c]')
        form2.classList.add('hidden');
    } else {
        form2.classList.remove('hidden');
        document.getElementById('form2-btn').classList.add('bg-[#89684c]')
        document.getElementById('form1-btn').classList.remove('bg-[#89684c]')
        form1.classList.add('hidden');
    }
}

function displayCart() {
    document.getElementById('offCanvas').classList.remove('-left-[300%]');
    document.getElementById('offCanvas').classList.add('left-0');
}

function closeCart() {
    document.getElementById('offCanvas').classList.add('-left-[300%]');
    document.getElementById('offCanvas').classList.remove('left-0');
}

let count = 0;
let productList = [];

function counter(name, price, type, num) {
    let newPrice = price * count;
    if (type == 'inc') {
        if (productList.length == 0) {
            productList.push({
                "name": name,
                "countOfFoods": count,
                "price": newPrice,
            });
        }
        count++;
        displayCount(count, num);
        newPrice = price * count;
        for (let i = 0; i < productList.length; i++) {
            if (productList[i]?.name == name) {
                productList[i].countOfFoods++;
                productList[i].price = newPrice;
            }
        }
        if (!(productList.some(el => el.name === name))) {
            productList.push({
                "name": name,
                "countOfFoods": count,
                "price": newPrice,
            });
        }
        updateCart(productList);
    }
    if (type == 'dec') {
        if (count > 0) {
            count--;
            displayCount(count, num);
        }
        newPrice = price * count;

        for (let i = 0; i < productList.length; i++) {
            if (productList[i]?.name == name && productList[i].countOfFoods == 1) {
                productList.splice(i, 1);
            }
            if (productList[i]?.name == name && productList[i].countOfFoods != 1) {
                productList[i].countOfFoods--;
                productList[i].price = newPrice;
            }
        }

        updateCart(productList);
    }

    displayCart();
    if (count == 0) {
        closeCart();
    }

    document.querySelectorAll(".btnDelete").forEach(btn => {
        btn.addEventListener('click', () => {
            for (let i = 0; i < productList.length; i++) {
                if (productList[i]?.name == name && productList[i].countOfFoods == 1) {
                    productList.splice(i, 1);
                }
            }
        })
    })
}

function updateCart(list) {
    let HTML = `<button class="text-white" onclick="closeCart()">X</button>`;

    list.map(product => {
        HTML += `
            <div class="flex justify-center items-center rtl w-fit">
                <img src="/images/64816b40c064a.jpeg" class="w-1/3" alt="" />
                <div class="flex flex-col items-start mx-5">
                    <h1>${product.name}</h1>
                    <p>${product.price}</p >
            <p>${product.countOfFoods}</p>
                </div >
            <button class="btnDelete">
                <svg fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" width="48px" height="48px"
                    viewBox="-242.5 -242.5 970.00 970.00" xml:space="preserve" stroke="#ffffff" stroke-width="0.00485">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <g>
                            <g>
                                <rect x="67.224" width="350.535" height="71.81"></rect>
                                <path
                                    d="M417.776,92.829H67.237V485h350.537V92.829H417.776z M165.402,431.447h-28.362V146.383h28.362V431.447z M256.689,431.447 h-28.363V146.383h28.363V431.447z M347.97,431.447h-28.361V146.383h28.361V431.447z">
                                </path>
                            </g>
                        </g>
                    </g>
                </svg>
            </button>
            </div >
            `;
    })

    let offCanvas = document.getElementById("offCanvas");
    offCanvas.innerHTML = HTML;
}
function displayCount(count, num) {
    document.getElementById("count" + num).innerText = count;
}