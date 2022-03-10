let data = [];
const elemCardBox = document.querySelector('#CardBox');
const elemTown = document.querySelector('#Town');
const elemCity = document.querySelector('#City');
let processedData = []
setInit();
// setEvent();
async function setInit() {
  await getData();
  render();
}

function render() {
  elemCardBox.innerHTML = makeStr(data);
  elemCity.innerHTML = setCity();
}

async function getData() {
  const api = 'https://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvTravelFood.aspx';
  try {
    const res = await fetch(api);
    const json = await res.json();
    data = await json;
  } catch (e) {
    console.log('資料擷取失敗');
  }
}

function setCity(allCity = [], cityOpt = []) {
  let str = '<option class="form__option" value="" selected disabled>請選擇行政區域...</option>'
  data.forEach((item) => {
    allCity.push(item.City);
  })
  allCity.forEach((item, index) => {
    if (allCity.indexOf(item) === index) {
      cityOpt.push(item);
    }
  })
  cityOpt.forEach((item) => {
    str += `<option value=${item} class="form__option">${item}</option>`;
  })
  return str;
}

function setTown(city, allTwon = [], townOpt = []) {
  let str = '<option class="form__option" value="" selected disabled>請選擇鄉鎮區...</option>'
  data.forEach((item) => {
    if (item === city) {
      allTownArr.push(item.Town);
    }
  })
  allTwon.forEach((item) => {
    if (item.Town.indexOf(item)) {
      townOpt.push(item);
    }
  })
  townOpt.forEach((item) => {
    str += `<option value=${item} class="form__option">${item}</option>`;
  })
  return str;
}


function makeStr(arr, str = '') {
  arr.forEach((item) => {
    str += `
			<div class="card">
        <div class="card__wrap">
          ${item.Url === '' ? '' : `<a href=${item.Url} class="card__link">`}
            <figure class="card__imgWrap">
            <img src=${item.PicURL} alt=${item.Name} class="card__img">
            </figure>
            <p class="card__tag">${item.City}</p>
            <div class="card__content">
              <p class="card__town">${item.Town}</p>
              <h2 class="card__name">${item.Name}</h2>
              <p class="card__desc">${item.HostWords}</p>
            </div>
          ${item.Url === '' ? '' : '</a>'}
        </div>
      </div>`
  })
  return str;
}

function setEvent() {
  elemCity.addEventListener('change', filter);
  elemTown.addEventListener('change', filter);
}