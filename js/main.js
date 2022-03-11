let data = [];
const elemCardBox = document.querySelector('#CardBox');
const elemTown = document.querySelector('#Town');
const elemCity = document.querySelector('#City');
const elemLoading = document.querySelector('#Loading');
let processedData = []
setInit();
setEvent();
async function setInit() {
  await getData();
  elemLoading.classList.add('js-loader');
  render();
}

function render() {
  elemCardBox.innerHTML = makeStr(data);
  elemCity.innerHTML = '<option class="form__option" value="" selected disabled>請選擇行政區域...</option>' + setOption(0);
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

function setOption(type, city, allArr = [], optArr = [], str='') {
  data.forEach((item) => {
    if (type === 0) {
      allArr.push(item.City);
      return;
    }
    if (item.City === city) {
      allArr.push(item.Town);
    }
  })
  allArr.forEach((item, index) => {
    if (allArr.indexOf(item) === index) {
      optArr.push(item);
    }
  })
  optArr.forEach((item) => {
    str += `<option value=${item} class="form__option">${item}</option>`;
  })
  return str;
}

function filter(e) {
  const self = e.target;
  let arr = [];
  if (self.id === 'City') {
    elemTown.innerHTML += setOption(1,self.value);
    data.forEach((item) => {
      if (item.City === self.value) {
        arr.push(item);
      }
    })
    elemCardBox.innerHTML = makeStr(arr);
    return;
  }
  data.forEach((item) => {
    if (item.Town === self.value) {
      arr.push(item);
    }
  })
  elemCardBox.innerHTML = makeStr(arr);
}

function makeStr(arr, str = '') {
  arr.forEach((item) => {
    str += `
			<div class="card">
        <div class="card__wrap">
          ${item.Url === '' ? '' : `<a href=${item.Url} class="card__link" target="_blank">`}
            <figure class="card__imgWrap">
            <img src=${item.PicURL} alt=${item.Name} class="card__img">
            </figure>
            <p class="card__tag">${item.City}</p>
            <div class="card__content">
              <em class="card__town">${item.Town}</em>
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
  elemTown.addEventListener('change', filter);
  elemCity.addEventListener('change', filter);
}