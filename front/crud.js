const URL = "http://localhost:3000/depenses";

export const show = () => {
  window.addEventListener("DOMContentLoaded", async () => {
    const res = await fetch(URL);
    const data = await res.json();

    const total = document.querySelector(".total");
    const depense = document.querySelector(".nb-depense");
    const rechette = document.querySelector(".nb-rechette");

    const tbody = document.querySelector("tbody");

    let totalNb = 0;
    let depenseNb = 0;
    let rechetteNb = 0;
    const renderData = data.map((item) => {
      totalNb = totalNb + item.montant;
      if (item.montant >= 0) {
        depenseNb += item.montant;
      } else {
        rechetteNb += item.montant;
      }
      return `
        <tr>
            <form action="" class="update">
              <th scope="row">
                <td >
              <input type="text" value="${item.id}" name="id" />
              </td>
              <td >
              <input type="text" value="${item.name}" name="name" />
              </td>
              <td>
              <input type="text" value="${item.montant}" name="montant" />
              </td>
              <td>
                <div>
                  <input class="btn btn-warning" type="submit" value="modifier" />
                  <input class="btn btn-danger" type="submit" value="delete" />
                </div>
              </td>
              </th>
            </form>
        </tr>
      `;
    });

    total.innerHTML = totalNb;
    depense.innerHTML = depenseNb;
    rechette.innerHTML = rechetteNb;
    tbody.innerHTML = renderData.join("");
  });
};

export const add = () => {
  const form = document.querySelector(".js-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      montant: parseFloat(e.target.montant.value),
    };
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await fetch(URL, options);
      console.log("success");
    } catch (err) {
      console.log(err);
    }
  });
};

export const update = () => {
  const listbox = document.querySelector(".js-update-form");
  console.log(listbox);

  listbox.addEventListener("click", async (e) => {
    e.preventDefault();

    if (e.target.classList.contains("btn-warning")) {
      const form = e.target.closest("tr").firstElementChild;

      console.log(form);

      const data = {
        id: form.id.value,
        name: form.name.value,
        montant: parseFloat(form.montant.value),
      };

      console.log(data);

      const options = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        await fetch(`http://localhost:3000/todo/${data.id}`, options);

        console.log(`successfully edited task ${data.id}`);
      } catch (err) {
        throw err;
      }
    }
  });
};

// export const remove = () => {
//   const listbox = document.querySelector(".js-update-form");
//   console.log(listbox);

//   listbox.addEventListener("click", async (e) => {
//     e.preventDefault();
//     if (e.target.classList.contains("btn-danger")){

//     }
//   });
// };
