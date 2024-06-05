//display all category
const dispCat = () => {
    let tr = "";
    let pr = "";
    let data = JSON.parse(localStorage.getItem("catinfo"));
    let productData = JSON.parse(localStorage.getItem("prodinfo"));
    if (data != null) {
        data.map((i) => {
            tr += `<li class="nav-item ${i.id ==1?'active':''}">
                      <a class="d-flex py-2 m-2 bg-light rounded-pill ${i.id ==1?'active':''}" data-bs-toggle="pill" href="#tab-${i.id}">
                          <span class="text-dark" style="width: 130px;">${i.catname}</span>
                      </a>
                  </li>`;

            pr += `<div id="tab-${i.id}" class="tab-pane fade show p-0 ${i.id ==1?'active':''}">
                  <div class="row g-4">
                    <div class="col-lg-12">
                      <div class="row g-4">`
            productData.map((p) => {
                if (p.cid == i.id) {
                    pr += `<div class="col-md-6 col-lg-4 col-xl-3" >
                          <div class="rounded position-relative fruite-item">
                            <div class="fruite-img">
                              <img src="${p.image}" class="img-fluid w-100 rounded-top" style="width:100px; height:200px;" />
                            </div>
                            <div
                              class="p-4 border border-secondary border-top-0 rounded-bottom">
                              <h4>${p.name}</h4>
                              <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing
                                elit sed do eiusmod te incididunt
                              </p>
                              <div class="d-flex justify-content-between flex-lg-wrap">
                                <p class="text-dark fs-5 fw-bold mb-0">
                                  $${p.price} / kg
                                </p>
                                <a  class="btn border border-secondary rounded-pill px-3 text-primary" onclick="addtoCard(${p.id})">
                                <i class="fa fa-shopping-bag me-2 text-primary"></i>Add to cart</a>
                              </div>
                            </div>
                          </div>
                          </div>`
                }
            })
            pr += `</div>
                  </div>
                  </div>
                  </div>`
        });
    }
    document.getElementById("allcat").innerHTML = tr;
    document.getElementById("productlist").innerHTML = pr;
};

let cartData = [];
const addtoCard = (id) => {
    let productData = JSON.parse(localStorage.getItem("prodinfo"));
    let cart = JSON.parse(localStorage.getItem("cartDetail"));
    let len = cart != null ? cart.length + 1 : 1;
    let info = {}
    let qyt = 1;

    productData.forEach(i => {
        if (i.id == id) {
            info.id = len;
            info.name = i.name;
            info.price = i.price;
            info.cid = i.cid;
            info.pid = id;
            info.image = i.image;
            info.qyt = qyt
        }
    });

    if (cart != null) {
        //if pid alredy exit then only qty + 
        //else new record push in cart

        let dt = cart.filter((i) => {
            return i.pid == id
        });
        if (dt.length > 0) {
            cart.forEach((i) => {
                if (i.pid == id) {
                    i.qyt = i.qyt + 1;
                }
            })
        } else {
            cart.push(info);
        }
        localStorage.setItem('cartDetail', JSON.stringify(cart))
    } else {
        cartData.push(info)
        localStorage.setItem('cartDetail', JSON.stringify(cartData))
    }
}

dispCat();