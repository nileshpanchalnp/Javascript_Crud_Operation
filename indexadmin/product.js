const getAllcategory = () => {
    let data = JSON.parse(localStorage.getItem("catinfo"));
    let opt = "<option>select name</option>";
    data.forEach((i) => {
        opt += `<option value = "${i.id}">${i.catname}<option/>`;
    });
    document.getElementById("catid").innerHTML = opt;
};
getAllcategory();
let arr = [];
let addProduct = () => {
    let name = document.getElementById('name').value;
    let price = document.getElementById('price').value;
    let cid = document.getElementById('catid').value;
    let pid = document.getElementById('pid').value;
    let getdata = JSON.parse(localStorage.getItem("prodinfo"));
    let prImage = JSON.parse(localStorage.getItem("prodImage"));


    if (pid != "") {
        if (prImage != null) {
            getdata.map((i) => {
                if (i.id == pid) {
                    i.name = name;
                    i.price = price;
                    i.cid = cid;
                    i.image = prImage;
                }
            });
        } else {
            getdata.map((i) => {
                if (i.id == pid) {
                    i.name = name;
                    i.price = price;
                    i.cid = cid;
                }
            });
        }
        //updet
        arr = getdata;
    } else {
        //insert
        let len = getdata != null ? getdata.length : 0;
        let obj = {
            "id": len + 1,
            "name": name,
            "price": price,
            "cid": cid,
            "image": prImage,
        };
        arr.push(obj);
    }

    localStorage.setItem("prodinfo", JSON.stringify(arr));
    document.getElementById('name').value = "";
    document.getElementById('price').value = "";
    document.getElementById('catid').value = "";
    document.getElementById('pid').value = "";
    document.getElementById('img').src = "";
    localStorage.removeItem("prodImage")


    dispProduct();
};

const dispProduct = () => {
    let tr = "";
    let data = JSON.parse(localStorage.getItem("prodinfo"));
    let catdata = JSON.parse(localStorage.getItem("catinfo"));

    if (data != null) {
        data.forEach((i, index) => {
            catdata.map((j) => {
                if (j.id == i.cid) {
                    i.category = j.catname;
                }
            });
            tr += `<tr>
             <td>${i.id}</td>
             <td>${i.category}</td>
             <td>${i.name}</td>
             <td>${i.price}</td>
             <td><img src="${i.image}" height="50px" width="50px"></td>
             <td <button type="button" class="btn btn-primary" onclick="editData(${i.id})">Edit</button></td>
             <td <button type="button" style="width:80px;" class="btn btn-danger" onclick="delData(${index})">Delete</button></td>
             </tr>`;
        });
    }
    document.getElementById("allProdData").innerHTML = tr;
};

const delData = (id) => {
    let data = JSON.parse(localStorage.getItem("prodinfo"));
    data.splice(id, 1);
    let n = 1;
    let res = data.map((i) => {
        i.id = n++;
        return i;
    });
    localStorage.setItem("prodinfo", JSON.stringify(res));
    dispProduct();
};

const editData = (id) => {
    let data = JSON.parse(localStorage.getItem("prodinfo"));

    data.map((i) => {
        if (i.id == id) {
            document.getElementById('name').value = i.name;
            document.getElementById('price').value = i.price;
            document.getElementById('catid').value = i.cid;
            document.getElementById('pid').value = i.id;
            document.getElementById('img').src = i.image;
        }
    });
};

const displayImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = function(event) {
        document.prodfrm.img.src = event.target.result;
        localStorage.setItem("prodImage", JSON.stringify(event.target.result));
    };
};
dispProduct();