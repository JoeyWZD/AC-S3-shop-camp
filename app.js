// 選取step 陣列
const stepGroup = document.querySelectorAll('.main__header__container__steps__group')

// 選取按紐群組
const buttonPanel = document.querySelector('.main__step')
const preButton = document.querySelector('.main__step__container__up')
const nextButton = document.querySelector('.main__step__container__down')

// 選取主要抽換區
const parts = document.querySelectorAll('.part')

// 選擇行動版漢堡排
const navLebel = document.querySelector('.nav__container__lebel')
const mainWrap = document.querySelector('.main')



//函式區
// 點擊漢堡排後，關閉其他區塊

function closeMainWrap(event) {
  if (event.target.matches('.nav__container__lebel')) {
    if (mainWrap.matches('.d-none')) {
      mainWrap.classList.remove('d-none')
    } else {
      mainWrap.classList.add('d-none')
    }
  }
}




// 在上下步按鈕裝設監聽器，調整step 和 part 內容
let count = 0

function onButtonControl(event) {
  event.preventDefault();

  const nowStep = stepGroup[count]
  const nowPart = parts[count]

  if (event.target.matches('.down') && count < 2) {
    const nextStep = stepGroup[count + 1]
    const nextPart = parts[count + 1]

    // 更改 step 樣式
    nowStep.classList.add('checked')
    nowStep.classList.remove('active')
    nextStep.classList.add('active')
    nextStep.classList.add('here')

    // 更改 part 樣式
    nowPart.classList.toggle('d-none')
    nextPart.classList.toggle('d-none')

    count += 1
  } else if (event.target.matches('.up') && count > 0) {
    const preStep = stepGroup[count - 1]
    const prePart = parts[count - 1]
    // 更改 step 樣式
    nowStep.classList.remove('active')
    nowStep.classList.remove('here')
    preStep.classList.remove('checked')
    preStep.classList.add('active')

    // 更改 part 樣式
    nowPart.classList.toggle('d-none')
    prePart.classList.toggle('d-none')
    count -= 1

    if (count === 0) {
      preStep.classList.remove('active')
    }
  }



  changeButtonStyle(count)
}


function changeButtonStyle(count) {
  if (count === 0) {
    preButton.classList.add('d-none')
    nextButton.classList.add('w-100')
    nextButton.innerHTML = "下一步&emsp;&rarr;"
  }

  if (count === 1) {
    preButton.classList.remove('d-none')
    nextButton.classList.remove('w-100')
    nextButton.innerHTML = "下一步&emsp;&rarr;"
  }

  if (count === 2) {
    nextButton.innerHTML = "確認下單"
  }

}

// 點擊運送方式修改運送費用
// 運送費用
let shipPrice = document.querySelector('.main__backet__container__total__ship__price')
const freeShipPrice = document.querySelector('.main__ship__container__group__items__price').innerHTML


// 選擇運送方式
// 選取運送方式區域
const shipGroup = document.querySelector('.main__ship__container__group')
// 選取運送項目
const shipFreeTip = document.querySelector('.free')
const shipDhlTip = document.querySelector('.dhl')
const shipFreeRadio = document.querySelector('.free-radio')
const shipDhlRadio = document.querySelector('.dhl-radio')

function selectShipTip(event) {
  if (event.target.matches('.free') || event.target.parentNode.matches('.free')) {
    // 控制radio的checked狀態
    shipFreeRadio.checked = true
    shipDhlRadio.removeAttribute('checked')

    // 控制表格狀態
    shipFreeTip.classList.add('checked')
    shipDhlTip.classList.remove('checked')

    // 調整運送費用的數字
    shipPrice.innerHTML = document.querySelector('.free-price').innerHTML
  }

  if (event.target.matches('.dhl') || event.target.parentNode.matches('.dhl')) {
    // 控制radio的checked狀態
    shipDhlRadio.checked = true
    shipFreeRadio.removeAttribute('checked')

    // 控制表格狀態
    shipDhlTip.classList.add('checked')
    shipFreeTip.classList.remove('checked')

    // 調整運送費用的數字 
    shipPrice.innerHTML = document.querySelector('.dhl-price').innerHTML
  }
  allPrice()
}


// 點擊購物籃 + - 按紐 改變物品數量
const backetGroup = document.querySelector('.main__backet')
//  + 按紐
const addButton = document.querySelector('.main__backet__container__item__info__count__addBtn')
//  - 按紐
const reduceButton = document.querySelector('.main__backet__container__item__info__count__reduceBtn')

function changeItemCount(event) {
  event.preventDefault();

  if (event.target.matches('.add')) {
    // 選擇下一位元素(商品數量)
    let itemCounts = event.target.nextElementSibling;
    itemCounts.innerHTML++
  }

  if (event.target.matches('.reduce')) {
    // 選擇下一位元素(商品數量)
    let itemCounts = event.target.previousElementSibling;
    if (itemCounts.innerHTML > 0) {
      itemCounts.innerHTML--
    }
  }

  allPrice()
}

// 以下為 商品籃的html 統一時，可能可以用的總金額算法 待確認
// 商品單價 商品數量 的陣列 [1299 , 2499] ,  [2, 4]
// const itemPriceArr = document.querySelectorAll('.main__backet__container__item1__info__price')
// const itemCountArr = document.querySelectorAll('.main__backet__container__item1__info__count__num')
// 商品數量陣列的數量 [2 ,4] =2
// const itemsNum = itemCountArr.length

// function itemTotalPrice (){
//   for ( let i = 0 ; i < itemsNum ; i++){
//     let itemsTotalPrice = itemPriceArr[i]*itemCountArr[i]
//     i++
//   }
// }



function allPrice() {
  // 商品0 金額 數量
  const itemPrice = document.querySelector('.main__backet__container__item__info__price').innerHTML
  const itemCount = document.querySelector('.main__backet__container__item__info__count__num').innerHTML

  // 商品1 金額 數量
  const item1Price = document.querySelector('.main__backet__container__item1__info__price').innerHTML
  const item1Count = document.querySelector('.main__backet__container__item1__info__count__num').innerHTML

  // 商品價格總和     replace(/[^\d]/g, "") 取數字的另一種寫法
  let itemtotalCost = Number(itemPrice.replace(/[^0-9]/ig, "")) * Number(itemCount) + Number(item1Price.replace(/[^0-9]/ig, "")) * Number(item1Count)

  // 總金額
  const totalPrice = document.querySelector('.main__backet__container__total__note__price')

  if (shipPrice.innerHTML.includes('$')) {
    let allPrices = Number(shipPrice.innerHTML.replace(/[^0-9]/ig, "")) + itemtotalCost
    totalPrice.innerHTML = `$${allPrices}`
  } else {
    totalPrice.innerHTML = `$${itemtotalCost}`
  }
}


navLebel.addEventListener('click', closeMainWrap)
buttonPanel.addEventListener('click', onButtonControl)
shipGroup.addEventListener('click', selectShipTip)
backetGroup.addEventListener('click', changeItemCount)