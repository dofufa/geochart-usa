/*
the one where the zoom focuses on the whole nation
*/

google.charts.load('current', {
  'packages': ['geochart'],
});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {

  var snip = window.location.hash.substr(1);
  var f = snip || 'US-CA'; // default is California

  console.log(f);
  var g = findRegion(f);

  const arr = getNullRows();

  console.log(arr);

  const r = 'US-' + g;
  arr.forEach(function(a,i){
//    console.log(a[0]);
//    console.log(r);

    if(a[0] === r) {
      arr[i][1] = 1;
      console.log('!!!!', a[0], r);
    }
  });

  var data = google.visualization.arrayToDataTable(arr);

  // reference:
  // https://en.wikipedia.org/wiki/ISO_3166-2:US

  var options = {

    colorAxis: {
      colors: [ 'maroon' ],
    },

    tooltip:
    {
      trigger: 'none'
    },

    // when data value is 'null'
    defaultColor: '#ff88aa',

    legend: 'none',

    // country code works
    region: 'US',

    // state-level
    resolution: 'provinces'
  };

  const imgmap = document.getElementById('pngpng');
  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  google.visualization.events.addListener(chart, 'ready', function () {
    imgmap.src = chart.getImageURI();
  });


  chart.draw(data, options);

}

// um... hmm
window.onhashchange = function() {
  window.location.reload();
}


// add states with default null color
function getNullRows() {

  const arr = [];
  const regions = getRegions();

  arr.push([ 'code', 'name' ])
  regions.forEach(function(a) {
    const b = a.split(',');
    arr.push(['US-' + b[0], null]);
  });

  return arr;
}

// converts string to index tag
function toTag(str) {
  return str.replace(/[-\s]/ig, '').toLowerCase();
}


// returns region code if available; otherwise, returns false
function findRegion(str) {

  str = str || false;
  var code = false;

  const regions = getRegions();

  switch(str.length) {
    case 2:
      const result = regions.find(r => r.startsWith(str.toUpperCase()));
      if(!!result) {
        return result.substr(0,2);
      }

      break;
    default:
      regions.forEach(function(r) {

        const n = r.split(',');
        const tag = toTag(n[1]);

        if(toTag(str) === tag) {
          code = n[0];
          return false;
        }
      });
      break;
  }

  return code;
}

// returns an array of regions
function getRegions() {

  // 50 states + capital
  return regions = `
AL,Alabama
AK,Alaska
AZ,Arizona
AR,Arkansas
CA,California
CO,Colorado
CT,Connecticut
DE,Delaware
FL,Florida
GA,Georgia
HI,Hawaii
ID,Idaho
IL,Illinois
IN,Indiana
IA,Iowa
KS,Kansas
KY,Kentucky
LA,Louisiana
ME,Maine
MT,Montana
NE,Nebraska
NV,Nevada
NH,New Hampshire
NJ,New Jersey
NM,New Mexico
NY,New York
NC,North Carolina
ND,North Dakota
OH,Ohio
OK,Oklahoma
OR,Oregon
MD,Maryland
MA,Massachusetts
MI,Michigan
MN,Minnesota
MS,Mississippi
MO,Missouri
PA,Pennsylvania
RI,Rhode Island
SC,South Carolina
SD,South Dakota
TN,Tennessee
TX,Texas
UT,Utah
VT,Vermont
VA,Virginia
WA,Washington
WV,West Virginia
WI,Wisconsin
WY,Wyoming
DC,Washington DC
`.trim().split(/\n/);
}


// returns data row of regions
// unused
/*
function getDataRows() {

  const arr = [];
  const regions = getRegions();

  regions.forEach(function(a) {
    const b = a.split(',');
    arr.push([b[0], b[1]]);
  });

  return arr;
}
*/
