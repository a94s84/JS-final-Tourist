

var xhr = new XMLHttpRequest();
xhr.open('get', 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json', true);
xhr.send(null);
xhr.onload = function () {
  if (xhr.status !== 200) { return; };
  var data = JSON.parse(xhr.responseText).result.records




  // 載入頁面初始化設定
  function init() {
    zoneSelect();
    // Default: show all data
    selectData('all');
  }

  // 定義變數
  let showZone = document.querySelector('.showZone');
  let show = document.querySelector('.show');
  let selectBar = document.getElementById('selectBar')
  let hotZones = document.querySelectorAll('.box')
  let selectTouristData = [];
  let selectPage = 1;
  let pageSelect = document.querySelector('.page-number');

  // 點選單或熱門區域後，篩選資料後存入　selectTouristData
  function selectData(zone) {
    let touristList = zone === 'all' ? data : data.filter(item => item.Zone === zone);
    selectTouristData = touristList;
    showZone.innerHTML = zone === 'all' ? '全部景點' : zone;

    // 渲染頁面 Default show the first page(no.1~no.8 data)
    renderPageNumber(1);
    selectPageData(1)
    selectPage = 1;
  }

  function changePage(e) {
    let pageNum = Number(e.target.innerText);
    let totalpage = Math.ceil(selectTouristData.length / 8);

    // click page number
    if (e.target.className === "page-number-item") {
      selectPageData(pageNum);
      renderPageNumber(pageNum);
      selectPage = pageNum;
    }

    // click prev page
    if (e.target.className === "page-item prev") {
      const prevPage = (selectPage - 1 === 0) ? selectPage : (selectPage - 1);
      selectPage = prevPage;
      selectPageData(prevPage);
      renderPageNumber(prevPage);
    }

    // click next page
    if (e.target.className === "page-item next") {
      const nextPage = (selectPage + 1 > totalpage) ? selectPage : (selectPage + 1);
      selectPage = nextPage;
      selectPageData(nextPage);
      renderPageNumber(nextPage);
    }
  }

  function selectPageData(pageNum) {
    let pageData = selectTouristData.slice((pageNum - 1) * 8, pageNum * 8);
    renderTouristList(pageData);
  }

  function renderPageNumber(pageNum) {
    let totalpage = Math.ceil(selectTouristData.length / 8);
    let prevPage = `<li class="page-item prev">◀ Prev </li>`;
    let nextPage = `<li class="page-item next">Next ▶</li>`;
    let str = '';

    for (let i = 1; i <= totalpage; i++) {
      str += (i === pageNum) ?
        `<li class="page-number-item active">${i}</li>`
        :
        `<li class="page-number-item">${i}</li>`
    }
    pageSelect.innerHTML = (totalpage > 1) ? prevPage + str + nextPage : str;
  }


  // 製作內容分頁
  function renderTouristList(touristList) {
    let str = '';
    touristList.forEach((item) => {
      var content = `<div class="card"><div class="card-header">
      <img src= ${item.Picture1}>
      <ul><li><h2>${item.Name}</h2></li><li style:font-size:25px>${item.Zone}</li></ul></div>
      <div class="card-body"><ul>
      <li><img src="img/icons_clock.png">${item.Opentime}</li>
      <li><img src="img/icons_pin.png">${item.Add}</li>
      <li><img src="img/icons_phone.png">${item.Tel}</li></ul>
      <ul class=ticket><li><img src="img/icons_tag.png">${item.Ticketinfo}</li></ul></div></div>`
      str += content
    });
    showZone.innerHTML = '<h3>高雄旅遊景點</h3>'
    show.innerHTML = str;
  }



  // 選單內容自動呈現
  function zoneSelect(e) {
    let AryZone = new Array();
    let selectBar = document.getElementById('selectBar')
    let str2 = '<option value="" disabled="disabled" selected>--請選擇行政區--</option>'
    for (var i = 0; i < data.length; i++) {
      AryZone.push(data[i].Zone);
      AryZone = ([...new Set(AryZone)]);
    }

    for (var x = 0; x < AryZone.length; x++) {
      let select = '<option value="' + AryZone[x] + '">' + AryZone[x] + '</option>';
      str2 += select;
    }
    selectBar.innerHTML = str2
  }


  // function: changePlace -> showZone依照選去內容改變顯示地區名稱
  function changePlace(e) {
    showZone.innerHTML = '<h3>' + e.target.value + '</h3>';
  }

  // function changeSelectbar(e) {

  //   var AryZone = new Array();
  //   var selectBar = document.getElementById('selectBar')
  //   var str2 = '<option value="" disabled="disabled" selected>--請選擇行政區--</option>'
  //   for (var i = 0; i < data.length; i++) {
  //     AryZone.push(data[i].Zone);
  //     AryZone = ([...new Set(AryZone)]);
  //   }

  //   for (var x = 0; x < AryZone.length; x++) {
  //     var select = '<option value="' + AryZone[x] + '">' + AryZone[x] + '</option>';
  //     str2 += select;
  //   }
  //   selectBar.innerHTML = str2
  // }

  // function: changeDate -> showZone渲染地區的資料畫面
  function changeDate(e) {
    selectData(e.target.value);
  }
  // 選擇區域change觸發changeData、changePlace事件
  selectBar.addEventListener('change', function (e) { changeDate(e), changePlace(e) }, false);

  // 熱門行政區click觸發changeData、changePlace事件
  for (var i = 0; i < hotZones.length; i++) {
    hotZones[i].addEventListener('click', function (e) { changeDate(e), changePlace(e) }, false);
  }

  // 分頁頁碼click觸發changePage事件
  pageSelect.addEventListener('click', changePage, false);

  init();
}
