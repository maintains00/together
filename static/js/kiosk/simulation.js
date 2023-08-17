// import every function form common.js
// import * as commonModule from '../../js/kiosk/common.js';
import * as commonModule from './common.js';

//after all content loaded.
document.addEventListener('DOMContentLoaded', function () {
  /* -------------- get elements ---------- */
  const megaStartBtn = document.getElementById('mega_start_btn'); //start button
  const megaHomeIcon = document.getElementById('mega_top_bar_home'); // home icon
  const leftArrowMenuBar = document.getElementById('menu_bar_left'); // left arrow of menu bar
  const rightArrowMenuBar = document.getElementById('menu_bar_right'); // right arrow of menu bar
  const menuBar1 = document.querySelectorAll('.mega_menu_1'); // first menu bar (page1)
  const menuBar2 = document.querySelectorAll('.mega_menu_2') // seoond menu bar (page2)
  const pickItems = document.querySelectorAll('.pick_item'); // for picking items
  const openPaymentWindow = document.getElementById('total_price'); // open payment window
  const closePaymentWindow = document.querySelectorAll('.close_window_pay'); // close payment window
  const paymentWindow = document.querySelectorAll('.change_window_btn'); // pay start
  const backButton = document.getElementById('돌아가기_2'); // back button before final payment.
  const payWithCardButton = document.getElementById('카드결제'); // button  for card payment
  const payCancelButtons = document.querySelectorAll('.close_w_카드결제'); // x button for total cancellation.
  const confirmPayButton = document.getElementById('승인요청'); // confirmButton to scroll down the window page
  const cardMovingButton = document.getElementById('insert_card_moving'); // moving card
  const deleteButtons = document.querySelectorAll('.delete_button'); // delete selected items from the oreder_list
  const minusButton = document.querySelectorAll('.minus_button');// add selected items from the oreder_list
  const plusButton = document.querySelectorAll('.plus_button');// remove selected items from the oreder_list
  const couponButton = document.getElementById('쿠폰사용');

  /* -------------- event listener ---------- */

    // use coupon when the user pays
    couponButton.addEventListener('click',function(){
      commonModule.useCoupon();
    });
  // delete selected items from the oreder_list
  deleteButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const target = this.getAttribute('id');
      const number = target[target.search('[0-9]')];
      const content = document.getElementById('range_' + number);
      commonModule.delete_button(content.id, order_list);
    });
  });
  // add selected items from the oreder_list
  minusButton.forEach((button) => {
    button.addEventListener('click', function () {
      const target = this.getAttribute('id');
      const number = target[target.search('[0-9]')];
      const content = document.getElementById('range_' + number);
      commonModule.remove_button(content.id, order_list);
    });
  });
  // remove selected items from the oreder_list
  plusButton.forEach((button) => {
    button.addEventListener('click', function () {
      const target = this.getAttribute('id');
      const number = target[target.search('[0-9]')];
      const content = document.getElementById('range_' + number);
      commonModule.add_button(content.id, order_list);
    });
  });
  // moving card
  cardMovingButton.addEventListener('click', function () {
    alert("감사합니다. 결제가 완료되었습니다. 교환권과 카드를 챙겨가세요.");
    location.href = "../../kiosk/simulator/";
  });
  // confirmButton to scroll down the window page
  confirmPayButton.addEventListener('click', function () {
    commonModule.windowScrollToBottom();
    alert('아래 카드를 클릭해주세요!');
  });
  // x button for total cancellation.
  payCancelButtons.forEach(cancelButton => {
    cancelButton.addEventListener('click', function () {
      commonModule.close_w_카드결제();
    });
  });
  // button clicked for card payment
  payWithCardButton.addEventListener('click', function () {
    commonModule.open_w_카드결제();
  });
  //back button before final payment
  backButton.addEventListener('click', function () {
    commonModule.back_2_window_btn();
  });
  // pay start 
  paymentWindow.forEach(payButton => {
    payButton.addEventListener('click', function () {
      commonModule.change_window_btn();
    });
  });
  // close payement widnow
  closePaymentWindow.forEach(closeButton => {
    closeButton.addEventListener('click', function () {
      commonModule.close_window_pay();
    })
  });
  // open payment window
  openPaymentWindow.addEventListener('click', function () {
    commonModule.open_window_pay(order_list);
  });
  // for picking items
  pickItems.forEach(selectedItem => {
    selectedItem.addEventListener('click', function () {
      const id = this.getAttribute('id');
      const price = this.getAttribute('data-price');
      pick_item(id, price);
    }
    )
  });
  // first menu bar (page1)
  menuBar1.forEach(menuItem1 => {
    menuItem1.addEventListener('click', function () {
      const title = this.getAttribute('title');
      commonModule.open_menu_table(title);
    });
  });
  // seoond menu bar (page2)
  menuBar2.forEach(menuItem2 => {
    menuItem2.addEventListener('click', function () {
      const title = this.getAttribute('title');
      commonModule.open_menu_table(title);
    });
  });
  // right arrow of menu bar
  rightArrowMenuBar.addEventListener('click', function (event) {
    const id = event.target.id;
    commonModule.turn_menu_page(id);
  });
  // left arrow of menu bar
  leftArrowMenuBar.addEventListener('click', function (event) {
    const id = event.target.id;
    commonModule.turn_menu_page(id);
  });
  // home icon
  megaHomeIcon.addEventListener('click', function () {
    commonModule.href_home();
  });
  //start button
  megaStartBtn.addEventListener('click', function () {
    commonModule.start_btn();
  });
});


/*==================== 3. pick & count & coloring itmes ====================*/
//get item infromation from HTML
function itemGet(name, price) {
  this.name = name; // name of selected item
  this.number = 0; // number count for how many items are selecting for each.
  this.price = parseInt(price); // price of selected item
}

const order_list = [];
const colorCount = commonModule.colorCount;

// when the user clicks any image of the item on the menu table.
// add selected items to the order_list array;
function pick_item(id, price) {
  let drink = document.getElementById(id); //
  let order = new itemGet(id, price);
  let found = false;
  order.number += 1;

  for (let i in order_list) {
    //if seleted item was selected before.
    if (order.name == order_list[i].name) {
      order_list[i].number += 1; // item count for each item ex) x2 or x3
      found = true; //
      break;
    }
  }
  if (!found) {
    if (commonModule.getColorCount() == 7) {
      maxItems();
      return;
    }

    commonModule.addColorCount();
    drink.style.borderStyle = "solid";
    drink.style.borderColor = "red";
    order_list.push(order);
  }

  commonModule.open_order_list(order_list);
  commonModule.scrollDown();
}

function maxItems() {
  alert("7개 이상의 아이템을 선택하셨습니다. 추가 선택이 불가합니다.");
}
/*==================== 3. pick & count & coloring itmes ====================*/