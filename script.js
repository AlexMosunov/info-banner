// 20191127104356
// https://my-json-server.typicode.com/ilyalytvynov/ads-box-server/ads
const urlAds =
  "https://my-json-server.typicode.com/ilyalytvynov/ads-box-server/ads/";

class DataAds {
  constructor(url) {
    this.url = url;
  }
  async getData() {
    try {
      const result = await fetch(this.url);
      const data = await result.json();
      console.log(data);
      return data;
      //console.log(this.data);
    } catch (err) {
      throw new Error("Could not get data");
    }
  }
}

(async () => {
  let dataAds = new DataAds(urlAds);
  try {
    const adsData = await dataAds.getData();
    renderAd(adsData[0]);
    elements.nextBtn.addEventListener("click", e => {
      const btn = e.target.closest(".scroll-btn");
      if (btn) {
        clearReasults();
        console.log(adsData);
        nextPage(adsData);
      }
    });

    elements.prevBtn.addEventListener("click", e => {
      const btn = e.target.closest(".scroll-btn");
      if (btn) {
        clearReasults();
        console.log(adsData);
        prevPage(adsData);
      }
    });

    elements.nextTwoBtn.addEventListener("click", e => {
      const btn = e.target.closest(".scroll-btn");
      if (btn) {
        clearReasults();
        console.log(adsData);
        nextTwoPages(adsData);
      }
    });

    elements.prevTwoBtn.addEventListener("click", e => {
      const btn = e.target.closest(".scroll-btn");
      if (btn) {
        clearReasults();
        console.log(adsData);
        prevTwoPages(adsData);
      }
    });

    elements.toggle.addEventListener("click", e => {
      document.querySelector(".description").textContent =
        adsData[num].description;
    });
  } catch (err) {
    console.log(err);
  }
})();

const elements = {
  textBox: document.querySelector(".text-box"),
  nextBtn: document.querySelector(".btn--next"),
  prevBtn: document.querySelector(".btn--prev"),
  nextTwoBtn: document.querySelector(".btn--next-two"),
  prevTwoBtn: document.querySelector(".btn--prev-two"),
  toggle: document.querySelector(".toggle-btn")
};

function clearReasults() {
  elements.textBox.innerHTML = "";
}

function renderAd(ad) {
  const markup = `
      <div class='text-box'>
          <img src="${ad.img}" alt="Ads image">
          <h1>${ad.title}</h1>
          <p class='description'>${limitDescription(ad.description)}</p>
      </div>
`;
  elements.textBox.insertAdjacentHTML("afterbegin", markup);
}

// const renderResults = data => {
//     data.forEach(renderAd);
//   };

let num = 0;
const nextPage = data => {
  if (num < 3) {
    num += 1;
  } else {
    num = 0;
  }
  console.log(num);
  renderAd(data[num]);
};

const prevPage = data => {
  if (num > 0) {
    num -= 1;
  } else {
    num = 3;
  }
  console.log(num);
  renderAd(data[num]);
};

const nextTwoPages = data => {
  if (num < 2) {
    num += 2;
  } else {
    num = 0;
  }
  console.log(num);
  renderAd(data[num]);
};

const prevTwoPages = data => {
  if (num > 1) {
    num -= 2;
  } else {
    num = 3;
  }
  console.log(num);
  renderAd(data[num]);
};

const limitDescription = (title, limit = 45) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);

    // Return the result
    return `${newTitle.join(" ")} ...`;
  }
  return title;
};
