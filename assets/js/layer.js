//var center = [-8.098611, 112.165278];

var osm = L.tileLayer("//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap contributors" });
var esri = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
  attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
});
var topo = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
  attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community",
});
var map = L.map("map", {
  layers: [osm],
  center: [-8.098161, 112.165293],
  zoom: 13,
});

var baseTree = {
  label: " BaseLayers",
  noShow: true,
  children: [
    {
      label: " &#x1F30F BaseMap",
      // layer: osm,
      children: [
        { label: " OpenStreeMap", layer: osm, name: "OpenStreeMap B&W" },
        { label: " Esri Map", layer: esri, name: "OpenStreeMap B&W" },
        { label: " Topomap", layer: topo, name: "OpenStreeMap B&W" },
      ],
    },
  ],
};

var ctl = L.control.layers.tree(baseTree, null, {
  namedToggle: false,
  //   collapseAll: " + Tampilkan ",
  expandAll: "Expand",
  collapsed: false,
});

ctl.addTo(map).collapseTree().expandSelected();

var hasAllUnSelected = function () {
  return function (ev, domNode, treeNode, map) {
    var anySelected = false;
    function iterate(node) {
      if (node.layer && !node.radioGroup) {
        anySelected = anySelected || map.hasLayer(node.layer);
      }
      if (node.children && !anySelected) {
        node.children.forEach(function (element) {
          iterate(element);
        });
      }
    }
    iterate(treeNode);
    return !anySelected;
  };
};

// batas kota
var styleLn = {
  color: "blue",
  dashArray: "3",
  weight: 2,
  opacity: 1,
};

var ln = new L.GeoJSON.AJAX(["assets/geojson/administrasi_ln.geojson"], { style: styleLn });

ln.addTo(map);

//memecah warna kecamatan
function getColor(d) {
  return d == "SANANWETAN" ? "#F38484" : d == "KEPANJENKIDUL" ? "#D597F9" : d == "SUKOREJO" ? "#ACC715" : "#59FD02";
}

// popup
// function popUp(f, l) {
//   var out = [];
//   if (f.properties) {
//     for (key in f.properties) {
//       out.push(key + ": " + f.properties[key]);
//     }
//     l.bindPopup(out.join("<br />"));
//   }
// }

// // icon energi
// function createEnergiIcon(feature, latlng) {
//   let myIcon = L.icon({
//     iconUrl: "assets/icon/energi.png",
//     // shadowUrl: 'my-icon.png',
//     iconSize: [25, 25], // width and height of the image in pixels
//     shadowSize: [35, 20], // width, height of optional shadow image
//     iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
//     shadowAnchor: [12, 6], // anchor point of the shadow. should be offset
//     popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
//   });
//   return L.marker(latlng, { icon: myIcon });
// }

// let myLayerEnergi = {
//   pointToLayer: createEnergiIcon,
//   onEachfeature: popUp,
// };

// // icon perkantoran
// function createPerkantoranIcon(feature, latlng) {
//   let myIcon = L.icon({
//     iconUrl: "assets/icon/perkantoran.png",
//     // shadowUrl: 'my-icon.png',
//     iconSize: [25, 25], // width and height of the image in pixels
//     shadowSize: [35, 20], // width, height of optional shadow image
//     iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
//     shadowAnchor: [12, 6], // anchor point of the shadow. should be offset
//     popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
//   });
//   return L.marker(latlng, { icon: myIcon });
// }

// let myLayerPerkantoran = {
//   pointToLayer: createPerkantoranIcon,
// };

// // icon pendididkan
// function createPendidikanIcon(feature, latlng) {
//   let myIcon = L.icon({
//     iconUrl: "assets/icon/pendidikan.png",
//     // shadowUrl: 'my-icon.png',
//     iconSize: [25, 25], // width and height of the image in pixels
//     shadowSize: [35, 20], // width, height of optional shadow image
//     iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
//     shadowAnchor: [12, 6], // anchor point of the shadow. should be offset
//     popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
//   });
//   return L.marker(latlng, { icon: myIcon });
// }

// let myLayerPendidikan = {
//   pointToLayer: createPendidikanIcon,
// };

// // icon Kesehatan
// function createKesehatanIcon(feature, latlng) {
//   let myIcon = L.icon({
//     iconUrl: "assets/icon/kesehatan.png",
//     // shadowUrl: 'my-icon.png',
//     iconSize: [25, 25], // width and height of the image in pixels
//     shadowSize: [35, 20], // width, height of optional shadow image
//     iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
//     shadowAnchor: [12, 6], // anchor point of the shadow. should be offset
//     popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
//   });
//   return L.marker(latlng, { icon: myIcon });
// }

// let myLayerKesehatan = {
//   pointToLayer: createKesehatanIcon,
// };
// // icon Pertahanan
// function createPertahananIcon(feature, latlng) {
//   let myIcon = L.icon({
//     iconUrl: "assets/icon/pertahanan.png",
//     // shadowUrl: 'my-icon.png',
//     iconSize: [25, 25], // width and height of the image in pixels
//     shadowSize: [35, 20], // width, height of optional shadow image
//     iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
//     shadowAnchor: [12, 6], // anchor point of the shadow. should be offset
//     popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
//   });
//   return L.marker(latlng, { icon: myIcon });
// }

// let myLayerPertahanan = {
//   pointToLayer: createPertahananIcon,
// };

// // icon Peribadatan
// function createPeribadatanIcon(feature, latlng) {
//   let myIcon = L.icon({
//     iconUrl: "assets/icon/peribadatan.png",
//     // shadowUrl: 'my-icon.png',
//     iconSize: [25, 25], // width and height of the image in pixels
//     shadowSize: [35, 20], // width, height of optional shadow image
//     iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
//     shadowAnchor: [12, 6], // anchor point of the shadow. should be offset
//     popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
//   });
//   return L.marker(latlng, { icon: myIcon });
// }

// let myLayerPeribadatan = {
//   pointToLayer: createPeribadatanIcon,
// };

// // icon Olahraga
// function createOlahragaIcon(feature, latlng) {
//   let myIcon = L.icon({
//     iconUrl: "assets/icon/olahraga.png",
//     // shadowUrl: 'my-icon.png',
//     iconSize: [25, 25], // width and height of the image in pixels
//     shadowSize: [35, 20], // width, height of optional shadow image
//     iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
//     shadowAnchor: [12, 6], // anchor point of the shadow. should be offset
//     popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
//   });
//   return L.marker(latlng, { icon: myIcon });
// }

// let myLayerOlahraga = {
//   pointToLayer: createOlahragaIcon,
// };

// // icon SosialBudaya
// function createSosialIcon(feature, latlng) {
//   let myIcon = L.icon({
//     iconUrl: "assets/icon/sosialbudaya.png",
//     // shadowUrl: 'my-icon.png',
//     iconSize: [25, 25], // width and height of the image in pixels
//     shadowSize: [35, 20], // width, height of optional shadow image
//     iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
//     shadowAnchor: [12, 6], // anchor point of the shadow. should be offset
//     popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
//   });
//   return L.marker(latlng, { icon: myIcon });
// }

// let myLayerSosialbudaya = {
//   pointToLayer: createSosialIcon,
// };

// // icon Perdagangan
// function createPerdaganganIcon(feature, latlng) {
//   let myIcon = L.icon({
//     iconUrl: "assets/icon/perdagangan.png",
//     // shadowUrl: 'my-icon.png',
//     iconSize: [25, 25], // width and height of the image in pixels
//     shadowSize: [35, 20], // width, height of optional shadow image
//     iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
//     shadowAnchor: [12, 6], // anchor point of the shadow. should be offset
//     popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
//   });
//   return L.marker(latlng, { icon: myIcon });
// }

// let myLayerPerdagangan = {
//   pointToLayer: createPerdaganganIcon,
// };

// // icon Transportasi
// function createTransportIcon(feature, latlng) {
//   let myIcon = L.icon({
//     iconUrl: "assets/icon/transportasi.png",
//     // shadowUrl: 'my-icon.png',
//     iconSize: [25, 25], // width and height of the image in pixels
//     shadowSize: [35, 20], // width, height of optional shadow image
//     iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
//     shadowAnchor: [12, 6], // anchor point of the shadow. should be offset
//     popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
//   });
//   return L.marker(latlng, { icon: myIcon });
// }

// let myLayerTransportasi = {
//   pointToLayer: createTransportIcon,
// };

//Geojson Point & Icon
var markerEnergiIcon = L.icon({
  iconUrl: "assets/icon/energi.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

var markerEnergi = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: markerEnergiIcon,
    }).on({
      mouseover: function (e) {
        var content = "<b>" + feature.properties.Remarks + "</b>" + "<table>" + "<tr><th>Keterangan</th><td>" + feature.properties.Ket + "</td></tr>" + "<tr><th>Alamat</th><td>" + feature.properties.Alamat + "</td></tr>" + "</table>";
        this.bindPopup(content);
      },
      mouseout: function (e) {
        map.closePopup();
      },
    });
  },
});

//Memanggil data geojson
$.getJSON("assets/geojson/poi_jarEn.geojson", function (data) {
  markerEnergi.addData(data);
  //   map.addLayer(markerEnergi);
  // map.fitBounds(markerEnergi.getBounds());
});

var markerKesehatanIcon = L.icon({
  iconUrl: "assets/icon/kesehatan.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

var markerKesehatan = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: markerKesehatanIcon,
    }).on({
      mouseover: function (e) {
        var content = "<b>" + feature.properties.Remarks + "</b>" + "<table>" + "<tr><th>Keterangan</th><td>" + feature.properties.Ket + "</td></tr>" + "<tr><th>Alamat</th><td>" + feature.properties.Alamat + "</td></tr>" + "</table>";
        this.bindPopup(content);
      },
      mouseout: function (e) {
        map.closePopup();
      },
    });
  },
});

//Memanggil data geojson
$.getJSON("assets/geojson/poi_kesehatan.geojson", function (data) {
  markerKesehatan.addData(data);
  //map.addLayer(markerKesehatan);
  // map.fitBounds(markerKesehatan.getBounds());
});

var markerOlahragaIcon = L.icon({
  iconUrl: "assets/icon/olahraga.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

var markerOlahraga = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: markerOlahragaIcon,
    }).on({
      mouseover: function (e) {
        var content = "<b>" + feature.properties.Remarks + "</b>" + "<table>" + "<tr><th>Keterangan</th><td>" + feature.properties.Ket + "</td></tr>" + "<tr><th>Alamat</th><td>" + feature.properties.Alamat + "</td></tr>" + "</table>";
        this.bindPopup(content);
      },
      mouseout: function (e) {
        map.closePopup();
      },
    });
  },
});

//Memanggil data geojson
$.getJSON("assets/geojson/poi_olahraga.geojson", function (data) {
  markerOlahraga.addData(data);
  //map.addLayer(markerOlahraga);
  // map.fitBounds(markerOlahraga.getBounds());
});

var markerPendidikanIcon = L.icon({
  iconUrl: "assets/icon/pendidikan.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

var markerPendidikan = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: markerPendidikanIcon,
    }).on({
      mouseover: function (e) {
        var content = "<b>" + feature.properties.Remarks + "</b>" + "<table>" + "<tr><th>Keterangan</th><td>" + feature.properties.Ket + "</td></tr>" + "<tr><th>Alamat</th><td>" + feature.properties.Alamat + "</td></tr>" + "</table>";
        this.bindPopup(content);
      },
      mouseout: function (e) {
        map.closePopup();
      },
    });
  },
});

//Memanggil data geojson
$.getJSON("assets/geojson/poi_pendidikan.geojson", function (data) {
  markerPendidikan.addData(data);
  //map.addLayer(markerPendidikan);
  // map.fitBounds(markerPendidikan.getBounds());
});

var markerPerdaganganIcon = L.icon({
  iconUrl: "assets/icon/perdagangan.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

var markerPerdagangan = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: markerPerdaganganIcon,
    }).on({
      mouseover: function (e) {
        var content = "<b>" + feature.properties.Remarks + "</b>" + "<table>" + "<tr><th>Keterangan</th><td>" + feature.properties.Ket + "</td></tr>" + "<tr><th>Alamat</th><td>" + feature.properties.Alamat + "</td></tr>" + "</table>";
        this.bindPopup(content);
      },
      mouseout: function (e) {
        map.closePopup();
      },
    });
  },
});

//Memanggil data geojson
$.getJSON("assets/geojson/poi_perdagangan.geojson", function (data) {
  markerPerdagangan.addData(data);
  //map.addLayer(markerPerdagangan);
  // map.fitBounds(markerPerdagangan.getBounds());
});

var markerPeribadatanIcon = L.icon({
  iconUrl: "assets/icon/peribadatan.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

var markerPeribadatan = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: markerPeribadatanIcon,
    }).on({
      mouseover: function (e) {
        var content = "<b>" + feature.properties.Remarks + "</b>" + "<table>" + "<tr><th>Keterangan</th><td>" + feature.properties.Ket + "</td></tr>" + "<tr><th>Alamat</th><td>" + feature.properties.Alamat + "</td></tr>" + "</table>";
        this.bindPopup(content);
      },
      mouseout: function (e) {
        map.closePopup();
      },
    });
  },
});

//Memanggil data geojson
$.getJSON("assets/geojson/poi_peribadatan.geojson", function (data) {
  markerPeribadatan.addData(data);
  //map.addLayer(markerPeribadatan);
  // map.fitBounds(markerPeribadatan.getBounds());
});

var markerPerkantoranIcon = L.icon({
  iconUrl: "assets/icon/perkantoran.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

var markerPerkantoran = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: markerPerkantoranIcon,
    }).on({
      mouseover: function (e) {
        var content = "<b>" + feature.properties.Remarks + "</b>" + "<table>" + "<tr><th>Keterangan</th><td>" + feature.properties.Ket + "</td></tr>" + "<tr><th>Alamat</th><td>" + feature.properties.Alamat + "</td></tr>" + "</table>";
        this.bindPopup(content);
      },
      mouseout: function (e) {
        map.closePopup();
      },
    });
  },
});

//Memanggil data geojson
$.getJSON("assets/geojson/poi_perkantoran.geojson", function (data) {
  markerPerkantoran.addData(data);
  //map.addLayer(markerPerkantoran);
  //map.fitBounds(markerPerkantoran.getBounds());
});

var markerPertahananIcon = L.icon({
  iconUrl: "assets/icon/pertahanan.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

var markerPertahanan = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: markerPertahananIcon,
    }).on({
      mouseover: function (e) {
        var content = "<b>" + feature.properties.Remarks + "</b>" + "<table>" + "<tr><th>Keterangan</th><td>" + feature.properties.Ket + "</td></tr>" + "<tr><th>Alamat</th><td>" + feature.properties.Alamat + "</td></tr>" + "</table>";
        this.bindPopup(content);
      },
      mouseout: function (e) {
        map.closePopup();
      },
    });
  },
});

//Memanggil data geojson
$.getJSON("assets/geojson/poi_pertahanan.geojson", function (data) {
  markerPertahanan.addData(data);
  //map.addLayer(markerPertahanan);
  // map.fitBounds(markerPertahanan.getBounds());
});

var markerSosialbudayaIcon = L.icon({
  iconUrl: "assets/icon/sosialbudaya.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

var markerSosialbudaya = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: markerSosialbudayaIcon,
    }).on({
      mouseover: function (e) {
        var content = "<b>" + feature.properties.Remarks + "</b>" + "<table>" + "<tr><th>Keterangan</th><td>" + feature.properties.Ket + "</td></tr>" + "<tr><th>Alamat</th><td>" + feature.properties.Alamat + "</td></tr>" + "</table>";
        this.bindPopup(content);
      },
      mouseout: function (e) {
        map.closePopup();
      },
    });
  },
});

//Memanggil data geojson
$.getJSON("assets/geojson/poi_sosialbudaya.geojson", function (data) {
  markerSosialbudaya.addData(data);
  //map.addLayer(markerSosialbudaya);
  // map.fitBounds(markerSosialbudaya.getBounds());
});

var markerTransportasiIcon = L.icon({
  iconUrl: "assets/icon/transportasi.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

var markerTransportasi = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: markerTransportasiIcon,
    }).on({
      mouseover: function (e) {
        var content = "<b>" + feature.properties.Remarks + "</b>" + "<table>" + "<tr><th>Keterangan</th><td>" + feature.properties.Ket + "</td></tr>" + "<tr><th>Alamat</th><td>" + feature.properties.Alamat + "</td></tr>" + "</table>";
        this.bindPopup(content);
      },
      mouseout: function (e) {
        map.closePopup();
      },
    });
  },
});

//Memanggil data geojson
$.getJSON("assets/geojson/poi_transportasi.geojson", function (data) {
  markerTransportasi.addData(data);
  //map.addLayer(markerTransportasi);
  // map.fitBounds(markerTransportasi.getBounds());
});

//style geojson
var styleSawah = {
  color: "blue",
  weight: 1,
  opacity: 0.8,
};

var stylePemukiman = {
  color: "Maroon",
  weight: 1,
  opacity: 1,
};

var stylePerdag = {
  color: "black",
  weight: 1,
  opacity: 100,
};

var styleRTH = {
  color: "yellow",
  weight: 1,
  opacity: 1,
};

var styleSarkung = {
  color: "orange",
  weight: 1,
  opacity: 1,
};

var styleKebun = {
  color: "green",
  weight: 1,
  opacity: 0.8,
};

var styleJalan = {
  color: "red",
  weight: 1,
  opacity: 0.8,
  // dashArray: "5",
};
var stylebatas = {
  color: "#000000",
  dashArray: "10",
  weight: 3,
  opacity: 1,
};

//var markersBar = L.markerClusterGroup();

// memanggil geojson jquery

var layertree = {
  label: " &#x1F4C2 LEGENDA",
  selectAllCheckbox: true,
  noShow: false,
  children: [
    /* start aiports from http://www.partow.net/miscellaneous/airportdatabase/#Download */
    {
      label: " &#x1F4C2 WILAYAH KOTA",
      selectAllCheckbox: true,
      children: [
        // {
        //   label: "  Batas Administrasi",
        //   layer: new L.GeoJSON.AJAX(["assets/geojson/administrasi_ln.geojson"], { style: stylebatas }).addTo(map),
        // },
        {
          label: "  Sanan Wetan",
          layer: new L.GeoJSON.AJAX(["assets/geojson/wilayah.geojson"], {
            style: function (feature, layer) {
              kec = feature.properties.kecamatan.toString();
              if (kec === "SANANWETAN") {
                return {
                  fillColor: getColor(kec),
                  fillOpacity: 0.6,
                  color: "black",
                  dashArray: "10",
                  weight: 1,
                  opacity: 1,
                };
              } else {
                return {
                  fillColor: "white",
                  opacity: 0,
                };
              }
            },
            onEachFeature: function (feature, layer) {
              var contentKec = layer.feature.properties.kecamatan.toString();
              var contentKel = layer.feature.properties.nama_desa.toString();
              if (contentKec === "SANANWETAN") {
                layer.bindTooltip(contentKel, {
                  direction: "center",
                  permanent: true,
                  className: "styleLabelDesa",
                });
              }
            },
          }).addTo(map),
        },
        {
          label: "  Sukorejo",
          layer: new L.GeoJSON.AJAX(["assets/geojson/wilayah.geojson"], {
            style: function (feature, layer) {
              kec = feature.properties.kecamatan.toString();
              if (kec === "SUKOREJO") {
                return {
                  fillColor: getColor(kec),
                  fillOpacity: 0.6,
                  color: "black",
                  dashArray: "10",
                  weight: 1,
                  opacity: 1,
                };
              } else {
                return {
                  fillColor: "white",
                  opacity: 0,
                };
              }
            },
            onEachFeature: function (feature, layer) {
              var contentKec = layer.feature.properties.kecamatan.toString();
              var contentKel = layer.feature.properties.nama_desa.toString();
              if (contentKec === "SUKOREJO") {
                layer.bindTooltip(contentKel, {
                  direction: "center",
                  permanent: true,
                  className: "styleLabelDesa",
                });
              }
            },
          }).addTo(map),
        },
        {
          label: "  Kepanjen Kidul ",
          layer: new L.GeoJSON.AJAX(["assets/geojson/wilayah.geojson"], {
            style: function (feature, layer) {
              kec = feature.properties.kecamatan.toString();
              if (kec === "KEPANJENKIDUL") {
                return {
                  fillColor: getColor(kec),
                  fillOpacity: 0.6,
                  color: "black",
                  dashArray: "10",
                  weight: 1,
                  opacity: 1,
                };
              } else {
                return {
                  fillColor: "white",
                  opacity: 0,
                };
              }
            },
            onEachFeature: function (feature, layer) {
              var contentKec = layer.feature.properties.kecamatan.toString();
              var contentKel = layer.feature.properties.nama_desa.toString();
              if (contentKec === "KEPANJENKIDUL") {
                layer.bindTooltip(contentKel, {
                  direction: "center",
                  permanent: true,
                  className: "styleLabelDesa",
                });
              }
            },
          }).addTo(map),
        },
      ],
    },
    {
      label: " &#x1F4C2 PENGGUNAAN LAHAN",
      selectAllCheckbox: true,
      children: [
        { label: " Pemukiman", layer: new L.GeoJSON.AJAX(["assets/geojson/land_use_pemukiman.geojson"], { style: stylePemukiman }) },
        { label: " Persawahan", layer: new L.GeoJSON.AJAX(["assets/geojson/land_use_sawah.geojson"], { style: styleSawah }) },
        { label: " Ruang Terbuka Hijau", layer: new L.GeoJSON.AJAX(["assets/geojson/land_use_RTH.geojson"], { style: styleRTH }) },
        { label: " Kebun", layer: new L.GeoJSON.AJAX(["assets/geojson/land_use_kebun.geojson"], { style: styleKebun }) },
        { label: " Perdagangan & Jasa", layer: new L.GeoJSON.AJAX(["assets/geojson/land_use_perdaganganJasa.geojson"], { style: stylePerdag }) },
        { label: " Sarana Prasarana Pendukung", layer: new L.GeoJSON.AJAX(["assets/geojson/land_use_SaranaPrasaranaPendukung.geojson"], { style: styleSarkung }) },
      ],
    },
    {
      label: " &#x1F4C2 INFRASTRUKTUR",
      selectAllCheckbox: true,
      children: [
        { label: " Jaringan Jalan", layer: new L.GeoJSON.AJAX(["assets/geojson/jalan_ln.geojson"], { style: styleJalan }) },
        { label: " <img src='assets/icon/energi.png' height= '15'>Jaringan Energi", layer: markerEnergi },
        { label: " <img src='assets/icon/perkantoran.png' height= '15'> Fasilitas Perkantoran", layer: markerPerkantoran },
        { label: " <img src='assets/icon/pendidikan.png' height= '15'> Fasilitas Pendidikan", layer: markerPendidikan },
        { label: " <img src='assets/icon/kesehatan.png' height= '15'> Fasilitas Kesehatan", layer: markerKesehatan },
        { label: " <img src='assets/icon/pertahanan.png' height= '15'> Fasilitas Pertahanan & Keamanan", layer: markerPertahanan },
        { label: " <img src='assets/icon/peribadatan.png' height= '15'> Fasilitas Peribadatan", layer: markerPeribadatan },
        { label: " <img src='assets/icon/olahraga.png' height= '15'> Fasilitas Olahraga", layer: markerOlahraga },
        { label: " <img src='assets/icon/sosialbudaya.png 'height= '15'> Fasilitas Sosial Budaya", layer: markerSosialbudaya },
        { label: " <img src='assets/icon/perdagangan.png' height= '15'> Fasilitas Perdagangan", layer: markerPerdagangan },
        { label: " <img src='assets/icon/transportasi.png' height= '15'> Fasilitas Transportasi", layer: markerTransportasi },
      ],
    },
  ],
};

/* ends aiports */
// var makePopups = function (node) {
//   if (node.layer) {
//     node.layer.bindPopup(node.label);
//   }
//   if (node.children) {
//     node.children.forEach(function (element) {
//       makePopups(element);
//     });
//   }
// };
// makePopups(layertree);

ctl.setOverlayTree(layertree).collapseTree(true).expandSelected(true);

// var markers = L.markerClusterGroup();
// var tes = markerEnergi;
// console.log(tes);

// markers.addLayer(tes);
// console.log(markers);
// console.log(tes);
// map.addLayer(markers);
// map.fitBounds(markers.getBounds());

var markers = L.markerClusterGroup();
var geoJsonData = new L.GeoJSON.AJAX("assets/geojson/poi_sosialbudaya.geojson");
var geoJsonLayer = L.geoJson(geoJsonData, {
			onEachFeature: function (feature, layer) {
				layer.bindPopup(feature.properties.address);
			}
		});

markers.addLayer(geoJsonLayer);

map.addLayer(markers);
map.fitBounds(markers.getBounds());

L.control
  .scale({
    metric: true,
    imperial: false,
    maxWitdh: 200,
  })
  .addTo(map);

L.Control.Watermark = L.Control.extend({
  onAdd: function (map) {
    var img = L.DomUtil.create("img");
    img.src = "assets/img/KD.png";
    img.style.width = "50px";
    return img;
  },
  onRemove: function (map) {},
});

L.control.watermark = function (opts) {
  return new L.Control.Watermark(opts);
};

L.control
  .watermark({
    position: "bottomleft",
  })
  .addTo(map);

//
