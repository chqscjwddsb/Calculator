// 加
function add(num1, num2) {
    const m = solveDoubleFloat(num1, num2)
    return (Number(num1) * m + Number(num2) * m) / m
}
// 减
function del(num1, num2) {
    const m = solveDoubleFloat(num1, num2)
    return (Number(num1) * m - Number(num2) * m) / m
}
// 乘
function mul(num1, num2) {
    const m = solveDoubleFloat(num1, num2)
    return (num1 * Math.pow(m,2) * num2) / Math.pow(m,2)
}
// 除
function div(num1, num2) {
    const m = solveDoubleFloat(num1, num2)
    return (num1 * m) / (num2 * m)
}
// 求幂
function sqrt(num1, num2) {
    const m = solveDoubleFloat(num1, num2)
    return Math.sqrt(num1, num2 )
}
// 求方
function pow(num1, num2) {
    const m = solveDoubleFloat(num1, num2)
    return Math.pow(num1 , num2 )
}

// 解决双精度问题 降幂升幂
function solveDoubleFloat(num1, num2) {
    num1 = num1.toString()
    num2 = num2.toString()
    let length1 = 0
    let length2 = 0
    if (num1.indexOf('.') !== -1) {
        length1 = num1.split('.')[1].length

    }
    if (num2.indexOf('.') !== -1) {
        length2 = num2.split(".")[1].length


    }

    if (length1 >= length2) {
        return Math.pow(10, length1)
    } else {
        return Math.pow(10, length2)
    }

}


const map = new Map()
map.set('+', add)
map.set('-', del)
map.set('*', mul)
map.set('/', div)
map.set('^', pow)
map.set('√', sqrt)

const nums = document.querySelectorAll(".num")
const cal = document.querySelectorAll(".cal")
const input = document.querySelector('input')
const tip = document.querySelector(".tip")
const clear = document.querySelector('.clear')
const result = document.querySelector(".result")
let sum = 0

let num = ''
let str = ''
let arr = []
let resultSum = 0
for (let i = 0; i < nums.length; i++) {
    nums[i].addEventListener('click', function () {
        str += nums[i].textContent
        num += nums[i].textContent
        input.value = str
    })
}
for (let i = 0; i < cal.length; i++) {
    cal[i].addEventListener("click", function () {
        num === '' ? '' : arr.push(num)
        str += cal[i].textContent
        arr.push(cal[i].textContent)
        num = ''
        input.value = str
    })
}

function calculator(type) {
    const index = arr.indexOf(type)
    if (index !== -1) {
        resultSum = map.get(arr[index])(arr[index - 1], arr[index + 1])
        arr.splice(index - 1, 3, resultSum)
        calculator(type)
    } else {
        return
    }
}
// 判断输入格式是否正确
const reg = /^(\d*\.?\d*)([\+,\-,\*,\/,\^,\√]{1}((\d{1,}\.?\d*)))*$/
result.addEventListener("click", function () {
    num === '' ? '' : arr.push(num)
    if (arr.length >= 3 && reg.test(arr.join(''))) {
        // 先乘除后加减
        calculator("*")
        calculator("/")
        calculator("^")
        calculator("√")
        calculator("-")
        calculator("+")
        input.value = resultSum
        str = resultSum
        num = resultSum
    } else {
        tip.innerHTML = '输入格式不对'
    }
})

clear.addEventListener("click", function () {
    num = ''
    str = ''
    arr = []
    resultSum = 0
    tip.innerHTML = ''
    input.value = ''
})

