// common features for kiosk
// 1. preset (timer, screenconversion, hide unneccessary elements)
// 2. menu_bar, menu_table movement (Toleft, Torigt, show Items in Table) : browsing menu
// 3. display Order_list (add selected items to list, Display List)
// 4. display windows for payment (final check for ordered list, card_insertion)
// 5. finish comment

export {
    start_btn,
    open_menu_table,
    turn_menu_page,
    open_window_pay,
    change_window_btn,
    close_window_pay,
    back_2_window_btn,
    open_w_카드결제,
    close_w_카드결제,
    href_home,
    windowScrollToBottom,
    open_order_list,
    delete_button,
    remove_button,
    add_button,
    getColorCount,
    addColorCount,
    minusColorCount,
    scrollDown,
    useCoupon,
};
export {
}

/*=============================== 1. preset =================================*/
//when the user press the "화면을 터치해주세요", move to the other orderScreen.
function start_btn() {
    //before touching screen.
    document.getElementById("mega_start_img").style.display = "none";
    document.getElementById("mega_start_btn").style.display = "none";

    //after touching screen.
    document.getElementById("mega_order").style.display = "block";
    document.getElementById("mega_menu_table").style.display = "block";
    document.getElementById("nextpage").style.display = "flex";
    document.getElementById("pay").style.display = "flex";
    hide_order_list(); //hide icons on order_list before any items added.
    timer_start(); // timer starts
    setTimeout(invalid, setTime); // duration of timer.
}

//hide icons on order_list before any items added. Because none of item was selected yet.
function hide_order_list() {
    let lists = document.getElementsByClassName("cart");
    for (let list of lists) list.style.display = "none";
}

/*---------- timer ----------*/

//time variables for timer.
let sec = 1000; //1sec
let min = sec * 60; //1min
let setTime = min * 3; //3min

//when timeOut method's called, sends the user to the beginning : ex) session expired.
function invalid() {
    location.reload(true);
    clearInterval(timer_start); // remove setInterval method.
}

//timer to see the time counting down.
function timer_start() {
    let mintutes = setTime / min; //3 min
    let seconds = 59; // starting from 59 sec
    let timer = document.getElementById("rest_time");

    timer.innerHTML = "남은 시간<br>" + mintutes-- + "분"; // display time for the first.

    //each seconds it overwrites updated String in the HTML of '#rest_time".
    return setInterval(() => {
        if (seconds == 0) mintutes--;
        if (seconds == -1) seconds = 59;
        timer.innerHTML = "남은 시간<br>" + mintutes + "분 " + seconds-- + "초";
    }, sec);
}
/*---------- timer ---------*/

/*=============================== 1. preset =================================*/

/*============================= 2. Browsing menu ============================*/

let menu_list = ["추천_음료"];

//show items on the table : (all those images of drinks)
function open_menu_table(id) {
    all_menu_none();
    document.getElementById(id).style.display = "block";
}

/* ------ conversion of menu_bar page----------*/
function turn_menu_page(btn) {
    let firstPage = "mega_menu_1";
    let secondPage = "mega_menu_2";

    //--when right arrow button pressed, move to next menu_bar page---
    if (btn == "menu_bar_right") {
        let past = document.getElementsByClassName(firstPage); // first menu_bar
        for (let menu of past) menu.style.display = "none"; // all categories from first menu_bar

        all_menu_none(); // hide displayed images on the menu table to show new items.

        // display all items on the menu table. (itmes from first menu category of second menu bar ).
        document.getElementById("스무디_프라페").style.display = "block";

        let menus = document.getElementsByClassName(secondPage); // second menu_bar
        for (let menu of menus) menu.style.display = "block"; // all categories from second menu_bar
    }

    //--when left arrow button pressed, return to first menu_bar page--
    if (btn == "menu_bar_left") {
        let past = document.getElementsByClassName(secondPage); // second menu_bar
        for (let menu of past) menu.style.display = "none"; // all categories from second menu_bar

        all_menu_none(); // hide displayed images on the menu table to show new items.

        // display all items on the menu table. (itmes from first menu category of first menu bar ).
        document.getElementById("커피_ICE").style.display = "block";

        let menus = document.getElementsByClassName(firstPage); // first menu_bar
        for (let menu of menus) menu.style.display = "block"; // all categories from first menu_bar
    }
}

// hide unneccssary menu when either right arrow or left arrow pressed to show new menu_bar
function all_menu_none() {
    document.getElementById("추천_음료").style.display = "none";
    document.getElementById("추천_디저트").style.display = "none";
    document.getElementById("커피_HOT").style.display = "none";
    document.getElementById("커피_ICE").style.display = "none";
    document.getElementById("스무디_프라페").style.display = "none";
    document.getElementById("에이드_주스").style.display = "none";
    document.getElementById("Tea").style.display = "none";
    document.getElementById("커피_콜드브루").style.display = "none";
    document.getElementById("Beverage").style.display = "none";
    document.getElementById("디저트").style.display = "none";
}

// For home_icon button. it sends the user to the beginning.
function href_home() {
    location.href = "../../kiosk/simulator/";
}

/*============================= 2. Browsing menu ============================*/

/*==================== 3. pick & count & coloring itmes ====================*/
let colorCount = 0;
function getColorCount() {
    return colorCount;
}
function addColorCount() {
    colorCount++;
}

function minusColorCount() {
    colorCount--;
}
// const order_list = [];


/*
//get item infromation from HTML
function itemGet(name, price) {
    this.name = name; // name of selected item
    this.number = 0; // number count for how many items are selecting for each.
    this.price = parseInt(price); // price of selected item
}



// when the user clicks any image of the item on the menu table.
// add selected items to the order_list array;
function pick_item(id, price) {
    let drink = document.getElementById(id); //
    let order = new itemGet(id, price);
    let found = false;
    order.number += 1;

    // missionItems.forEach((value)=> {if(id==value) mission++;});

    for (let i in order_list) {
        //if seleted item was selected before.
        if (order.name == order_list[i].name) {
            order_list[i].number += 1; // item count for each item ex) x2 or x3
            found = true; //
            break;
        }
    }
    if (!found) {
        if (colorCount > 7) {
            maxItems();
            return;
        }
        ++colorCount;
        drink.style.borderStyle = "solid";
        drink.style.borderColor = "red";
        order_list.push(order);
    }
   
    open_order_list(order_list);
}

function maxItems() {
    alert("7개 이상의 아이템을 선택하셨습니다. 추가 선택이 불가합니다.");
}
*/
/*==================== 3. pick & count & coloring itmes ====================*/

/*==================== 4. delete, add, minus itmes ====================*/

function delete_button(id, order_list) {
    /*parsing*/
    const target = document.getElementById(id); // bring content(drink) from range div
    const innerText = target.innerText.substring(3); // get substring without "number."
    const drink = document.getElementById(innerText); // get item image div on the table

    /*parsing*/
    // to erase the item from the order_list, and unmark the item with nomral boarder.
    for (let i = 0; i < order_list.length; i++) {
        //only matched item in the ordered_list.
        if (order_list[i].name == drink.id) {
            drink.style.borderStyle = "none";
            drink.style.borderColor = "none";
            colorCount--;
            order_list.splice(i, 1); // remove items from the list.

            break;
        }
    }
    open_order_list(order_list);
}
function add_button(id, order_list) {
    /*parsing*/
    const target = document.getElementById(id); // bring content(drink) from range div
    const innerText = target.innerText.substring(3); // get substring without "number."
    const drink = document.getElementById(innerText); // get item image div on the table

    /*parsing*/
    for (let i = 0; i < order_list.length; i++) {
        //only matched item in the ordered_list.
        if (order_list[i].name == drink.id) {
            order_list[i].number++;
            break;
        }
    }
    open_order_list(order_list);
}
function remove_button(id, order_list) {
    /*parsing*/
    const target = document.getElementById(id); // bring content(drink) from range div
    const innerText = target.innerText.substring(3); // get substring without "number."
    const drink = document.getElementById(innerText); // get item image div on the table

    /*parsing*/
    for (let i = 0; i < order_list.length; i++) {
        //only matched item in the ordered_list.
        if (order_list[i].name == drink.id) {
            if (order_list[i].number == 1) {
                drink.style.borderStyle = "none";
                drink.style.borderColor = "none";
                colorCount--; // 7 was max numbers to select.
                order_list.splice(i, 1); // remove items from the list.
                break;
            }
            else {
                order_list[i].number--;
                break;
            }

        }
    }
    open_order_list(order_list);

}

/*====================  4. delete, add, minus itmes ====================*/



/*======================== 5. display ordered list ========================*/
function scrollDown() {
    let content = document.getElementById('order_lsit');
    content.scrollTop = content.scrollHeight;
}

/*order_list에 표시하기*/
let total_list = [0, 0];

function open_order_list(order_list) {
    let total_num = 0;
    let total_price = 0;
    hide_order_list();
    for (let i = 0; i < order_list.length; i++) {
        let order_id = "order_" + (i + 1);
        document.getElementById(order_id).style.display = "flex";

        document.getElementById("range_" + (i + 1)).innerText =
            i + 1 + ". " + order_list[i].name;
        document.getElementById("amount_" + (i + 1)).innerText =
            order_list[i].number + "개";
        document.getElementById("item_price_" + (i + 1)).innerText =
            order_list[i].price * order_list[i].number + "원";

        total_num += order_list[i].number;
        total_price += order_list[i].price * order_list[i].number;
    }
    document.getElementById("item_number").innerHTML =
        "__________________<br>선택한 상품 " + total_num + "개";
    document.getElementById("total_price").innerHTML =
        total_price + "원<br>결제하기";
    total_list[0] = total_num;
    total_list[1] = total_price;
}
/*======================== 5. display ordered list ========================*/

/*======================== 6. display payment window =======================*/
/*---------------- payment window ------------------*/
function open_window_pay(order_list) {
    document.getElementById("window_pay").style.display = "block";
    document.getElementById("screen_to_window_pay").style.display = "block";
    write_order_list_window_pay(order_list);

    document.getElementById("w_total_number").innerText = total_list[0];
    document.getElementById("w_total_price").innerText = total_list[1];

    document.getElementById("돌아가기").style.display = "block";
    document.getElementById("먹고가기").style.display = "block";
    document.getElementById("가져가기").style.display = "block";

    document.getElementById("돌아가기_2").style.display = "none";
    document.getElementById("쿠폰사용").style.display = "none";
    document.getElementById("페이코").style.display = "none";
    document.getElementById("카드결제").style.display = "none";
}

function close_window_pay() {
    document.getElementById("window_pay").style.display = "none";
    document.getElementById("screen_to_window_pay").style.display = "none";
}

function write_order_list_window_pay(order_list) {
    for (let i = 0; i < order_list.length; i++) {
        let window_id = "window_" + (i + 1);
        document.getElementById(window_id).style.display = "flex";
        document.getElementById("w_order_" + (i + 1)).innerText =
            i + 1 + ". " + order_list[i].name;
        document.getElementById("w_number_" + (i + 1)).innerText =
            order_list[i].number +
            "개 " +
            order_list[i].price * order_list[i].number +
            "원";
    }
}

function change_window_btn() {
    document.getElementById("돌아가기").style.display = "none";
    document.getElementById("먹고가기").style.display = "none";
    document.getElementById("가져가기").style.display = "none";

    document.getElementById("돌아가기_2").style.display = "block";
    document.getElementById("쿠폰사용").style.display = "block";
    document.getElementById("페이코").style.display = "block";
    document.getElementById("카드결제").style.display = "block";
}

function back_2_window_btn() {
    document.getElementById("돌아가기").style.display = "block";
    document.getElementById("먹고가기").style.display = "block";
    document.getElementById("가져가기").style.display = "block";

    document.getElementById("돌아가기_2").style.display = "none";
    document.getElementById("쿠폰사용").style.display = "none";
    document.getElementById("페이코").style.display = "none";
    document.getElementById("카드결제").style.display = "none";
}

function open_w_카드결제() {
    document.getElementById("window_pay").style.display = "none";

    document.getElementById("w_카드결제").style.display = "block";
    document.getElementById("insert_card_moving").style.display = "block";
    document.getElementById("w_카드결제_total_price").innerText =
        total_list[1] + "원";
    windowScrollToBottom();
}

function close_w_카드결제() {
    document.getElementById("w_카드결제").style.display = "none";
    document.getElementById("screen_to_window_pay").style.display = "none";
    document.getElementById("insert_card_moving").style.display = "none";
}
function useCoupon() {
    let coupon = document.getElementById('barcode_scan');
    coupon.style.display = "block";
    alert('쿠폰의 바코드를 스캔해주세요 ( 바코드 클릭 )');
    windowScrollToBottom();
    coupon.addEventListener('click', function () {


        const destinationX = 0; // 이동할 x 좌표
        const destinationY = -120; // 이동할 y 좌표

        // 애니메이션 효과와 함께 이미지를 이동
        coupon.style.transform = `translate(${destinationX}%, ${destinationY}%)`;

        setTimeout(() => {
            alert('주문하신 내역이 30% 할인되었습니다.\n결제를 진행해주세요.');
        }, 2000);



    });
}
function windowScrollToBottom() {
    window.scrollTo(0, document.documentElement.scrollHeight);
}
/*======================== 6. display payment window =======================*/