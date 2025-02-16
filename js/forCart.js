class Cart {
    constructor() {
        console.log("Cart 初始化");
        // 如果 localStorage 沒有購物車資料，初始化為空物件
        this.cart = JSON.parse(localStorage.getItem("cart")) || {};
        this.renderCart();
    }

    // 新增產品：傳入產品名稱、圖片、價格
    put(productName, img, price) {
        if (this.cart[productName]) {
            this.cart[productName].quantity++;
        } else {
            this.cart[productName] = {
                name: productName,
                img: img,
                price: price,
                quantity: 1,
            };
        }
        this.saveCart();
        this.renderCart();
        alert(productName + " 已加入購物車！");
    }

    // 增加數量
    increase(productName) {
        if (this.cart[productName]) {
            this.cart[productName].quantity++;
            this.saveCart();
            this.renderCart();
        }
    }

    // 減少數量
    decrease(productName) {
        if (this.cart[productName]) {
            this.cart[productName].quantity--;
            if (this.cart[productName].quantity <= 0) {
                delete this.cart[productName];
            }
            this.saveCart();
            this.renderCart();
        }
    }

    // 完全移除該商品
    remove(productName) {
        if (this.cart[productName]) {
            delete this.cart[productName];
            this.saveCart();
            this.renderCart();
        }
    }

    // 清空購物車
    clearCart() {
        if (confirm("確定要清空購物車嗎?")) {
            this.cart = {};
            this.saveCart();
            this.renderCart();
        }
    }


    // 將購物車資料存入 localStorage
    saveCart() {
        localStorage.setItem("cart", JSON.stringify(this.cart));
    }

    // 使用 Bootstrap 的 table 呈現購物車內容
    renderCart() {
        let cartContainer = document.getElementById("cartList");
        if (!cartContainer) return;
        let html = "";
        if (Object.keys(this.cart).length === 0) {
            html = `<div class="alert alert-info" role="alert">
                    購物車空空如也
                  </div>`;
        } else {
            html = `<div class="table-responsive">
                    <table class="table table-bordered table-sm align-middle">
                      <thead class="table-light">
                        <tr>
                          <th>商品圖</th>
                          <th>商品名稱</th>
                          <th>單價</th>
                          <th>數量</th>
                          <th>小計</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>`;
            let total = 0;
            for (let productName in this.cart) {
                let product = this.cart[productName];
                let price = parseFloat(product.price);
                let subtotal = price * product.quantity;
                total += subtotal;
                html += `<tr>
                       <td>
                         <img src="${product.img}" alt="${product.name}" style="width:100px; height:100px; object-fit:cover;">
                       </td>
                       <td>${product.name}</td>
                       <td>${price.toFixed(0)}</td>
                       <td style="width: 80px;">
                         <div class="d-flex align-items-center justify-content-center">
                           <button class="btn btn-sm btn-secondary" style="padding: 0.25rem 0.5rem;" onclick="cart.decrease('${product.name}')">-</button>
                           <span class="mx-1 text-center" style="min-width: 30px; display: inline-block;">${product.quantity}</span>
                           <button class="btn btn-sm btn-secondary" style="padding: 0.25rem 0.5rem;" onclick="cart.increase('${product.name}')">+</button>
                         </div>
                       </td>
                       <td>${subtotal.toFixed(0)}</td>
                       <td>
                         <button class="btn btn-sm btn-danger" onclick="cart.remove('${product.name}')">刪除</button>
                       </td>
                     </tr>`;
            }
            html += `</tbody>
                   <tfoot>
                     <tr>
                       <td colspan="4" class="text-end">總價：</td>
                       <td>${total.toFixed(0)}</td>
                       <td></td>
                     </tr>
                   </tfoot>
                   </table>
                 </div>`;
            html += `<div class="mt-3">
                     <button class="btn btn-warning" onclick="cart.clearCart()">清空購物車</button>
                   </div>`;
        }
        cartContainer.innerHTML = html;
    }
}

// 用 DOMContentLoaded 確保 DOM 載入完成再初始化
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById("cartList") && typeof cart === 'undefined') {
        window.cart = new Cart();
    }
});
