const checkout = () => {
    let tr = "";
    let data = JSON.parse(localStorage.getItem("cartDetail"));
    let subtotal = 0
    if (data != null) {
        data.map((p) => {
            tr += `<tr>
           <td> <img src="${p.image}" class="img-fluid rounded-circle" style="width:100px; height:100px;"</td>
            
            <td class="py-5">${p.name}</td>
            <td class="py-5">${p.price}</td>
            <td class="py-5">${p.qyt}</td>
            <td class="py-5">${p.qyt * p.price}</td>
            </tr>`
            subtotal += p.qyt * p.price;
        });
        tr += `  <tr>
            <th scope="row">
            </th>
            <td class="py-5"></td>
            <td class="py-5"></td>
            <td class="py-5">
                <p class="mb-0 text-dark py-3">Subtotal</p>
            </td>
            <td class="py-5">
                <div class="py-3 border-bottom border-top">
                    <p class="mb-0 text-dark">${subtotal} </p>
                </div>
            </td>
        </tr>`
    };
    document.getElementById("checkout").innerHTML = tr;

};
checkout();