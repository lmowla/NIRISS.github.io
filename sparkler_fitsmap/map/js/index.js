// Image layers ================================================================
const ss_f090w_sci_20mas = L.tileLayer("ss_f090w_sci_20mas/{z}/{y}/{x}.png", { attribution:"<a href='https://github.com/ryanhausen/fitsmap'>FitsMap</a>", minZoom: 0, maxZoom: 10, maxNativeZoom: 5 });
const ss_f150w_sci_20mas = L.tileLayer("ss_f150w_sci_20mas/{z}/{y}/{x}.png", { attribution:"<a href='https://github.com/ryanhausen/fitsmap'>FitsMap</a>", minZoom: 0, maxZoom: 10, maxNativeZoom: 5 });
const ss_f200w_sci_20mas = L.tileLayer("ss_f200w_sci_20mas/{z}/{y}/{x}.png", { attribution:"<a href='https://github.com/ryanhausen/fitsmap'>FitsMap</a>", minZoom: 0, maxZoom: 10, maxNativeZoom: 5 });
const ss_f277w_sci_40mas = L.tileLayer("ss_f277w_sci_40mas/{z}/{y}/{x}.png", { attribution:"<a href='https://github.com/ryanhausen/fitsmap'>FitsMap</a>", minZoom: 0, maxZoom: 10, maxNativeZoom: 5 });
const ss_f356w_sci_40mas = L.tileLayer("ss_f356w_sci_40mas/{z}/{y}/{x}.png", { attribution:"<a href='https://github.com/ryanhausen/fitsmap'>FitsMap</a>", minZoom: 0, maxZoom: 10, maxNativeZoom: 5 });
const ss_f435w_sci_40mas = L.tileLayer("ss_f435w_sci_40mas/{z}/{y}/{x}.png", { attribution:"<a href='https://github.com/ryanhausen/fitsmap'>FitsMap</a>", minZoom: 0, maxZoom: 10, maxNativeZoom: 5 });
const ss_f444w_sci_40mas = L.tileLayer("ss_f444w_sci_40mas/{z}/{y}/{x}.png", { attribution:"<a href='https://github.com/ryanhausen/fitsmap'>FitsMap</a>", minZoom: 0, maxZoom: 10, maxNativeZoom: 5 });
const ss_f606w_sci_40mas = L.tileLayer("ss_f606w_sci_40mas/{z}/{y}/{x}.png", { attribution:"<a href='https://github.com/ryanhausen/fitsmap'>FitsMap</a>", minZoom: 0, maxZoom: 10, maxNativeZoom: 5 });
const ss_f090w_f150w_f200w = L.tileLayer("ss_f090w_f150w_f200w/{z}/{y}/{x}.png", { attribution:"<a href='https://github.com/ryanhausen/fitsmap'>FitsMap</a>", minZoom: 0, maxZoom: 10, maxNativeZoom: 5 });
const ss_f277w_f356w_f444w = L.tileLayer("ss_f277w_f356w_f444w/{z}/{y}/{x}.png", { attribution:"<a href='https://github.com/ryanhausen/fitsmap'>FitsMap</a>", minZoom: 0, maxZoom: 10, maxNativeZoom: 5 });

// Marker layers ===============================================================

// Basic map setup =============================================================
L.CRS.FitsMap = L.extend({}, L.CRS.Simple, {
    transformation: new L.Transformation(1/32, 0, -1/32, 256)
});

const map = L.map("map", {
    crs: L.CRS.FitsMap,
    minZoom: 0,
    preferCanvas: true,
    layers: [ss_f090w_sci_20mas]
});

const layerControl = L.control.layers(
    {"ss_f090w_sci_20mas":ss_f090w_sci_20mas,"ss_f150w_sci_20mas":ss_f150w_sci_20mas,"ss_f200w_sci_20mas":ss_f200w_sci_20mas,"ss_f277w_sci_40mas":ss_f277w_sci_40mas,"ss_f356w_sci_40mas":ss_f356w_sci_40mas,"ss_f435w_sci_40mas":ss_f435w_sci_40mas,"ss_f444w_sci_40mas":ss_f444w_sci_40mas,"ss_f606w_sci_40mas":ss_f606w_sci_40mas,"ss_f090w_f150w_f200w":ss_f090w_f150w_f200w,"ss_f277w_f356w_f444w":ss_f277w_f356w_f444w},
    {}
).addTo(map);

// Search ======================================================================


// Map event setup =============================================================
ss_f090w_sci_20mas.on("load", () => {
    document.getElementById("loading-screen").style.visibility = "hidden";
    document.getElementById("map").style.visibility = "visible";
});
map.on("moveend", updateLocationBar);
map.on("zoomend", updateLocationBar);

if (urlParam("zoom")==null) {
    map.fitBounds(L.latLngBounds([[0, 0], [4590, 4590]]));
} else {
    panFromUrl(map);
}