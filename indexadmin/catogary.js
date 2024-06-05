let arr = [];
let addCard = () => {
        let cname = document.getElementById('catfrm').value;
        let cid = document.getElementById('catid').value;

        let data = JSON.parse(localStorage.getItem("catinfo"));
        let len = (data != null) ? data.length : 0;

        if (cid != "") {
            //updet
            data.forEach((i) => {
                if (i.id == cid) {
                    i.catname = cname
                }
            });
            arr = data;
        } else {
            //insert
            let obj = {
                "id": len + 1,
                "catname": cname
            };
            arr.push(obj);
        }

        localStorage.setItem("catinfo", JSON.stringify(arr));
        document.getElementById('catfrm').value = "";
        document.getElementById('catid').value = "";

        dispCat();
    }
    // Display All category from Localstorage ..
const dispCat = () => {
    let tr = "";
    let data = JSON.parse(localStorage.getItem("catinfo"));
    if (data != null) {
        data.forEach((i) => {
            tr += `<tr>
             <td>${i.id}</td>
             <td>${i.catname}</td>
             <td <button type="button" class="btn btn-primary" onclick="editData(${i.id})">Edit</button></td>

             <td <button type="button" style="width:80px;" class="btn btn-danger" onclick="delData(${i.id})">Delete</button></td>
             </tr>`;
        });
    }

    document.getElementById("allCatData").innerHTML = tr;
}
dispCat();
// Delet
const delData = (id) => {
    let data = JSON.parse(localStorage.getItem("catinfo"));
    let finalReusult = data.filter((i) => {
        return i.id != id;
    });

    let n = 1;
    let res = finalReusult.map((i) => {
        i.id = n++;
        return i;
    });

    localStorage.setItem("catinfo", JSON.stringify(res));
    dispCat();

};
// Edit recods 

const editData = (id) => {
    let data = JSON.parse(localStorage.getItem("catinfo"));
    let finalReusult = data.filter((i) => {
        return i.id == id;
    });
    finalReusult.map((i) => {
        document.getElementById('catfrm').value = i.catname;
        document.getElementById('catid').value = i.id;

    })

}