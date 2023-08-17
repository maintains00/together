// import every function form common.js
import * as commonModule from './common.js';

const returnAddress = '../../kiosk/order_mission.html';

/* ========= preset ========= */
// map each items of menu with the increasing numbers
const menu = new Map();

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('mega_start_img').style.display = 'none'; // remove first image and replace with level selection page

  //- menu for drinks - add all menus in this menu(map) to select random drinks.
  let idCount = 1;
  const rowDivs = document.querySelectorAll(".row");
  for (const rowDiv of rowDivs) {
    const menuItems = rowDiv.querySelectorAll("div");
    for (const menuItem of menuItems) {
      if (menuItem.hasAttribute("id")) {
        menu.set(idCount++, menuItem.id);
      }
    }
  }
});
/* ========= preset ========= */


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
  const levelButtons = document.querySelectorAll('button[id^="level"]'); // buttons for selecting level of missions
  const deleteButtons = document.querySelectorAll('.delete_button'); // delete selected items from the oreder_list
  const minusButton = document.querySelectorAll('.minus_button');// add selected items from the oreder_list
  const plusButton = document.querySelectorAll('.plus_button');// remove selected items from the oreder_list
  const eatInButton = document.getElementById('먹고가기');
  const couponButton = document.getElementById('쿠폰사용');
  /* -------------- event listener ---------- */
  // use coupon when the user pays
  let couponUsed = false;
  couponButton.addEventListener('click', function () {
    commonModule.useCoupon();
    couponUsed = true;
  });
  // select eatin when the user pays
  let eatInSelected = false;
  eatInButton.addEventListener('click', function () {
    eatInSelected = true;
  });
  // delete selected items from the oreder_list
  deleteButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const target = this.getAttribute('id');
      const number = target[target.search('[0-9]')];
      const content = document.getElementById('range_' + number);
      commonModule.delete_button(content.id, order_list);
      let id = content.innerText.substring(3);
      let mission = 0;
      missionItems.forEach((value) => {
        mission++;
        if (id == value) {
          const checkbox = document.getElementById('item_' + (mission));
          checkbox.disabled = false;
          checkbox.checked = false;
          checkbox.disabled = true;
        }
      });
    });
  });
  // add selected items from the oreder_list
  minusButton.forEach((button) => {
    button.addEventListener('click', function () {
      const target = this.getAttribute('id');
      const number = target[target.search('[0-9]')];
      const content = document.getElementById('range_' + number);
      commonModule.remove_button(content.id, order_list);


      let id = content.innerText.substring(3);
      let mission = 0;

      if (order_list.length == 0) {
        missionItems.forEach((value) => {
          mission++;
          if (value == id) {
            const checkbox = document.getElementById('item_' + (mission));
            checkbox.disabled = false;
            checkbox.checked = false;
            checkbox.disabled = true;
          }
        });
      }

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
    function buy_item() {
      if (missionCompleted == true) {
        alert(
          "축하합니다. " +
          successMessage
          + "성공!"
        );
        location.href = "../../kiosk/quiz/";
      } else {
        alert(
          errorMessage
          +
          "실패!" + " 다시 도전해보세요."
        );
        location.href = "../../kiosk/quiz/";
      }
    }

    // it shows whether the user passed the mission or not.
    let missionCompleted = false;
    let missionItemAllPicked = false;
    let successMessage = '음료 미션\n';
    let errorMessage = '음료 미션\n';
    let count = 0;
    for (let i = 1; i <= missionItems.length; i++) {
      let success = document.getElementById('item_' + i).checked;
      if (success == true)
        count++;
    }
    if (missionItems.length == count)
      missionItemAllPicked = true;

    // depends on mission level, different standard
    switch (missionItems.length) {
      case 1: {
        if (missionItemAllPicked) { //beginner
          missionCompleted = true;

        } break;
      }
      case 2: {
        if (eatInSelected && missionItemAllPicked) { // intermedate
          missionCompleted = true;
          successMessage += '먹고가기 미션\n';

        } else {
          if (missionItemAllPicked)
            errorMessage = '먹고가기 미션\n';

        } break;
      }
      case 3: {
        if (eatInSelected && missionItemAllPicked && couponUsed) {
          missionCompleted = true;
          successMessage += '먹고가기 미션\n쿠폰사용 미션\n';
        }
        else {
          if (missionItemAllPicked) errorMessage = '';
          if (!eatInSelected) errorMessage += '먹고가기 미션\n';
          if (!couponUsed) errorMessage += '쿠폰사용 미션\n';
        }
        break;
      }
      default: throw Error('out of range');
    }
    buy_item(); // buy items final check out
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
    location.href = "../../kiosk/quiz/";
  });
  //start button
  megaStartBtn.addEventListener('click', function () {
    commonModule.start_btn();
  });
  //button for selecting level to get random mission
  levelButtons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
  });

});

/* --- button listner ----- */
//to avoid duplication of menu, get only the unique numbers according to the mission level.
const uniqueNumbers = new Set();
// list of items the user has to order.
const missionItems = [];

//creaete unique random numbers to avoid duplication of same drinks.
function generateUniqueRandomNumbers(count, max) {
  while (uniqueNumbers.size < count) {
    const randomNumber = Math.floor(Math.random() * max) + 1;
    uniqueNumbers.add(randomNumber);
  }
}
// when level button clicked.
function handleButtonClick(event) {
  // the number of drinks that the user has to order.
  const buttonValue = event.target.value;
  // create the unique random numbers to get random drinks.
  generateUniqueRandomNumbers(buttonValue, menu.size);

  // create missionItem list with the unique random number.
  // get items' names from the map with the numbers.
  uniqueNumbers.forEach((value) => missionItems.push(menu.get(value)));

  //hide level selecting button to start the mission.
  const levelButtons = document.getElementsByClassName('level_button');
  for (let i = 0; i < levelButtons.length; i++) {
    levelButtons[i].style.display = 'none';
  }
  //display deciription on the right bar 
  // so the user can understand the rule or misson.
  let decription = document.getElementById("level_" + buttonValue);
  decription.style.display = "block";


  // display a list of mission items so the user knows what to order.
  const targetElement = decription.querySelector(".target");
  let itemNumber = 1;
  let itemList = "";
  missionItems.forEach((value) => {
    itemList +=
      '<div>' +
      '<label for = "item_' + itemNumber + '">' + itemNumber + '. ' + value + '</label>' +
      '<input type="checkbox" id = "item_' + itemNumber++ + '" name = "' + value + '"disabled>'
      + '</div>';
  });
  targetElement.innerHTML = itemList;

  // mission start.
  commonModule.start_btn();
}


/*==================== 3. pick & count & coloring itmes ====================*/
//get item infromation from HTML
function itemGet(name, price) {
  this.name = name; // name of selected item
  this.number = 1; // number count for how many items are selecting for each.
  this.price = parseInt(price); // price of selected item
}

let order_list = [];


// when the user clicks any image of the item on the menu table.
// add selected items to the order_list array;
function pick_item(id, price) {
  let drink = document.getElementById(id); //
  let order = new itemGet(id, price);
  let found = false;

  let checked = new Map();
  missionItems.forEach((value) => {
    checked.set(value, false);
  });

  let mission = 0;
  missionItems.forEach((value) => {
    mission++;
    if (id == value) {
      const checkbox = document.getElementById('item_' + (mission));
      checkbox.disabled = false;
      checkbox.checked = true;
      checkbox.disabled = true;
    }
  });


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