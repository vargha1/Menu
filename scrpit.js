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
let idCount = 1;
let productList = [];

function counter(name, price, type, num) {
    let newPrice = price * count;
    if (type == 'inc') {
        if (productList.length == 0) {
            productList.push({
                "id": idCount,
                "name": name,
                "countOfFoods": count,
                "price": newPrice,
            });
            idCount++;
        }
        count++;
        newPrice = price * count;
        for (let i = 0; i < productList.length; i++) {
            if ((productList[i]?.name == name) && productList[i].id == num) {
                productList[i].countOfFoods++;
                productList[i].price = newPrice;
            }
        }
        if (!(productList.some(el => (el.name === name) && (el.id == num)))) {
            productList.push({
                "id": idCount,
                "name": name,
                "countOfFoods": count,
                "price": newPrice,
            });
        }
        updateCart(productList, num);
        displayCount(count, num);
    }
    if (type == 'dec') {
        if (count > 0) {
            count--;
        }
        newPrice = price * count;

        for (let i = 0; i < productList.length; i++) {
            if ((productList[i]?.name == name) && (productList[i].countOfFoods == 1) && (productList[i].id == num)) {
                productList.splice(i, 1);
            }
            if ((productList[i]?.name == name) && (productList[i].countOfFoods != 1) && (productList[i].id == num)) {
                productList[i].countOfFoods--;
                productList[i].price = newPrice;
            }
        }

        updateCart(productList, num);
        displayCount(count, num);
    }

    for (let i = 0; i < productList.length; i++) {
        if ((productList[i]?.name == name) && (productList[i].countOfFoods == 1) && (productList[i].id == num)) {
            updateCart(productList, num, "hidden");
        }
    }

    displayCart();
    if (count == 0) {
        closeCart();
    }

}

function removeItem(num) {
    productList.splice(num, 1);
}

function updateCart(list, num, state = "") {
    let HTML = `<button class="text-white" onclick="closeCart()">X</button>`;

    list.map((product, index) => {
        HTML += `
            <div class="flex justify-center items-center rtl w-fit wrapper1">
                <img src="../images/64816b40c064a.jpeg" class="w-1/3" alt="" />
                <div class="flex flex-col items-start mx-5">
                    <h1>${product.name}</h1>
                    <p>${product.price}</p >
                </div >
                <div class="flex justify-center ${state}">
                    <p class="mx-2 button text-[15px] text-white cursor-pointer"
                    onclick="counter('${product.name}',${product.price / product.countOfFoods},'dec', ${index + 1})">—
                    </p>
                    <p class="text-white h-[0px] count${num}">0</p>
                    <p class="mx-2 button text-[20px] text-white relative bottom-[3px] cursor-pointer"
                        onclick="counter('${product.name}',${product.price / product.countOfFoods},'inc', ${index + 1})">+
                    </p>
                </div>
                ${state == "hidden" ? (
                `<button class="px-5 py-2 bg-[red]" onclick='removeItem(${num - 1})'>Delete</button>`
            ) : ("")}
            </div >
            `;
    })

    let offCanvas = document.getElementById("offCanvas");
    offCanvas.innerHTML = HTML;
}
function displayCount(count, num) {
    document.querySelectorAll(".count" + num).forEach(elem => {
        elem.innerHTML = count;
    })
}