class Product {
    constructor(pid) {
        this.pid = pid
        this.quantity = 1
    }
}

class Cart {
    constructor() {
        this.products = []
    }

    modify(pid, quantity) {
     const index = this.products.findIndex(product => product.pid === pid)
        if (quantity == 0) {
            this.products.splice(index, 1)
        } else {
            this.products[index].quantity =quantity
        }
        console.log(this.products)
        // 呼叫後端將資料儲存到資料庫
    }

    put(pid) {
        const product = this.products.find(product => product.pid === pid)
        if (product) {
            // 購物車已經有此商品
            product.quantity += 1
        } else {
            // 購物車沒有此商品
            this.products.push(new Product(pid))
        }
        console.log(this.products)
        // 呼叫後端將資料儲存到資料庫
    }

    show(htmlProductsList, htmlCartList, products) {
        document.getElementById(htmlProductsList).style.display = 'none'
        document.getElementById(htmlCartList).style.display = 'block'
        const cartList = document.getElementById(htmlCartList)

        let html = ''
        html += `
            <button onclick="
                document.getElementById('${htmlProductsList}').style.display = 'block';
                document.getElementById('${htmlCartList}').style.display = 'none';
            ">繼續購物</button> 
        `
        html += `
            <p>
            <table border="1">
            <tr>
                <th>商品名稱</th>
                <th>商品價格</th>
                <th>總價</th>
                <th>操作</th>
            </tr>
        `
        this.products.forEach(product => {
            html += `
            <tr>
                <td>${product.pid}</td>
                <td>${products.find(p=>p.pid == product.pid ).name}</td>
                <td>${products.find(p=>p.pid == product.pid ).price}</td>
                <td>${product.quantity}</td>
                <td>${products.find(p=>p.pid == product.pid ).price * product.quantity}</td>
                <td>
                    <button onclick="modify(this, 1)">+</button>
                    <button onclick="modify(this, -1)">-</button>
                </td>
            </tr>
            `
        })
        html += '</table>'
        cartList.innerHTML = html

        this.cartListDecorator(htmlCartList)
    }

    cartListDecorator(htmlCartList) {
        const cartList = document.getElementById(htmlCartList)
        const tbody = cartList.lastElementChild.firstElementChild
        tbody.firstElementChild.style.backgroundColor = 'lightgray'
        for(let i = 2; i < tbody.children.length; i+=2) {
            tbody.children[i].style.backgroundColor = 'lightgreen'
        }
    }
}

function modify(button, num) {
    const pid = button
    .parentElement
    .parentElement
    .firstElementChild

    const price = button
    .parentElement
    .previousElementSibling
    .previousElementSibling
    .previousElementSibling

    const quantity = button
    .parentElement
    .previousElementSibling
    .previousElementSibling

    const total = button
    .parentElement
    .previousElementSibling

    let quantityValue = parseInt(quantity.textContent) + num
    if (quantityValue == 0) {
        if (confirm('本商品將被刪除')) {
            button
            .parentElement
            .parentElement
            .remove()

            cart.modify(pid.textContent, quantityValue)
            cart.cartListDecorator('cartList')
            return
        }
        quantityValue += 1
    }
    const priceValue = parseInt(price.textContent)

    quantity.textContent = quantityValue
    total.textContent = priceValue * quantityValue
    cart.modify(pid.textContent, quantityValue)
}

