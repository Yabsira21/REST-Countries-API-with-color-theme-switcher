const countriesContainer = document.querySelector(".countries");
const contientChoice = document.querySelector(".contient");
const search = document.querySelector(".search--bar");
const toggler = document.querySelector(".toggler");
const searchContainer = document.querySelector(".search");
const countryDetail = document.querySelector(".country-detail");
const backBtn = document.querySelector(".back");

const borderContainer = document.querySelector(".border");

let allDatas = [];
let c = {};

const borderChecker = function (arr) {
  // if (arr.length == 0) {
  //   document.querySelector('.bor-1')
  // }
  // for (let a of arr) {

  // }
  borderContainer.innerHTML = "<p>Border-Countries:</p>";
  if (!arr) {
    return;
  }
  let i = 0;
  for (const a of arr) {
    if (i < 3) {
      let html = `<a href="#">${a}</a>`;
      borderContainer.insertAdjacentHTML("beforeend", html);
      i++;
    } else {
      break;
    }
  }
};

const getCountryData = function (num, id) {
  fetch("./data.json")
    .then((results) => results.json())
    .then((data) => {
      const html = `
      <div class="country" data-id="${id}">
          <img src="${data[num].flag}" alt="" />
          <div class="country__data">
              <h3 class="country__name">${data[num].name}</h3>
              <p class="country__row">Population: ${new Intl.NumberFormat(
                "ja-JP"
              ).format(data[num].population)}</p>
              <p class="country__row">Region: ${data[num].region}</p>
              <p class="country__row">Capital: ${data[num].capital}</p>
          </div>
      </div>
    `;
      countriesContainer.insertAdjacentHTML("beforeend", html);

      c.country = data[num].name;
      c.region = data[num].region;
      c.id = id;
      c.pop = new Intl.NumberFormat("ja-JP").format(data[num].population);
      c.navtive = data[num].nativeName;
      c.subregion = data[num].subregion;
      c.capital = data[num].capital;
      c.TLD = data[num].topLevelDomain[0];
      c.currency = data[num].currencies[0].name;
      c.languages = [];
      data[num].languages.forEach((a) => c.languages.push(a.name));
      c.borders = [];
      data[num].borders.forEach((a) => c.borders.push(a));
      c.flag = data[num].flag;

      allDatas.push(c);

      c = {};
    })
    .catch((error) => {
      console.log(error);
    });
};

for (let i = 0; i <= 250; i++) {
  getCountryData(i, i);
}

contientChoice.addEventListener("change", () => {
  const selectedOption = contientChoice.value;
  let countries = document.querySelectorAll(".country");
  if (selectedOption) {
    countries.forEach((c) => {
      c.classList.add("hidden");
    });
    countries = Array.from(countries);
    for (const country of allDatas) {
      if (selectedOption == country.region) {
        if (
          country.country.toLowerCase().startsWith(search.value.toLowerCase())
        ) {
          const selectedCon = countries.find((c) => c.dataset.id == country.id);
          selectedCon.classList.remove("hidden");
        }
      }
    }
  } else {
    let countries = document.querySelectorAll(".country");
    countries.forEach((c) => {
      c.classList.remove("hidden");
    });
  }
});

search.addEventListener("input", function name(e) {
  let countries = document.querySelectorAll(".country");
  countries.forEach((c) => {
    c.classList.add("hidden");
  });
  countries = Array.from(countries);
  allDatas.forEach((con) => {
    if (con.country.toLowerCase().startsWith(search.value.toLowerCase())) {
      if (contientChoice.value == "" || contientChoice.value == con.region) {
        const selectedCon = countries.find((c) => c.dataset.id == con.id);
        selectedCon.classList.remove("hidden");
      }
    }
  });
});

countriesContainer.addEventListener("click", function (e) {
  if (e.target.closest(".country")) {
    countriesContainer.classList.add("hidden");
    contientChoice.classList.add("hidden");
    countryDetail.classList.remove("hidden");
    searchContainer.classList.add("hidden");
    // const selectedCon = allDatas.find(
    //   (d) => e.target.closest(".country").dataset.id == d.id
    // );
    const selectedId = e.target.closest(".country").dataset.id;
    fetch("./data.json")
      .then((results) => results.json())
      .then((data) => {
        document.querySelector(".flag--img").src = data[selectedId].flag;
        document.querySelector(".d-name").textContent = data[selectedId].name;
        document.querySelector(".d-nn").textContent =
          data[selectedId].nativeName;
        document.querySelector(".d-pop").textContent = new Intl.NumberFormat(
          "ja-JP"
        ).format(data[selectedId].population);
        document.querySelector(".d-r").textContent = data[selectedId].region;
        document.querySelector(".d-s").textContent = data[selectedId].subregion;
        document.querySelector(".d-c").textContent = data[selectedId].capital;
        document.querySelector(".d-tld").textContent =
          data[selectedId].topLevelDomain[0];
        document.querySelector(".d-curr").textContent =
          data[selectedId].currencies[0].name;

        document.querySelector(".d-lang").textContent =
          data[selectedId].languages[0].name;

        borderChecker(data[selectedId].borders);
      })
      .catch((error) => {});
    // document.querySelector(".flag--img").src = selectedCon.flag;
  }
});
document.querySelector(".back").addEventListener("click", function () {
  countriesContainer.classList.remove("hidden");
  contientChoice.classList.remove("hidden");
  countryDetail.classList.add("hidden");
  searchContainer.classList.remove("hidden");
});

toggler.addEventListener("click", function () {
  document.body.classList.toggle("darkTheme");
  document
    .querySelectorAll(".country")
    .forEach((a) => a.classList.toggle("darkTheme--container"));
  document.querySelector("nav").classList.toggle("darkTheme--container");
  document
    .querySelector(".search--bar--container")
    .classList.toggle("darkTheme--container");
  // searchContainer.classList.toggle("darkTheme--container");
  document
    .querySelector(".search--bar")
    .classList.toggle("darkTheme--container");
  contientChoice.classList.toggle("darkTheme--container");
  backBtn.classList.toggle("darkTheme--container");
  document.querySelectorAll("a").forEach((a) => {
    a.classList.toggle("darkTheme--container");
  });
});
