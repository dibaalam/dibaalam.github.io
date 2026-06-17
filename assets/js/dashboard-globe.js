import { scaleSequentialSqrt } from 'https://esm.sh/d3-scale';
import { interpolateYlOrRd } from 'https://esm.sh/d3-scale-chromatic';

// Grab data injected by Jekyll
const travelData = JSON.parse(document.getElementById('travel-data').textContent);
const GEOJSON_URL = 'https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson';

fetch(GEOJSON_URL)
  .then(res => res.json())
  .then(countries => {
    const visitedISOs = new Set(travelData.map(d => String(d.iso).toUpperCase().trim()));

    // Initialize the globe
    const world = new Globe(document.getElementById('globeViz'))
      .globeImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-day.jpg')
      .backgroundColor('rgba(0,0,0,0)')
      .showAtmosphere(true)
      .atmosphereColor('#a47c03')

      // Pins Configuration
      .pointsData(travelData)
      .pointLat(d => d.lat)
      .pointLng(d => d.lng)
      .pointColor(() => '#a47c03')
      .pointRadius(0.8)
      .pointAltitude(0.04)
      .pointLabel(d => `<b>${d.city}</b>`)
      
      // Regions Configuration
      .polygonsData(countries.features.filter(d => d.properties.ISO_A2 !== 'AQ'))
      .polygonAltitude(0.01)
      .polygonCapColor(d => {
        const id = d.properties.ISO_A2 || d.properties.ADM0_A3_IS || d.properties.ADMIN;
        return visitedISOs.has(id) ? 'rgba(164, 124, 3, 0.6)' : 'rgba(255, 255, 255, 0.05)';
      })
      .polygonStrokeColor(() => '#a47c03')
      
      // Interaction State
      .onPolygonHover(hoverD => world
        .polygonAltitude(d => {
          const id = d.properties.ISO_A2 || d.properties.ADM0_A3_IS || d.properties.ADMIN;
          if (d === hoverD) return 0.02;
          return visitedISOs.has(id) ? 0.02 : 0.01;
        })
        .polygonCapColor(d => {
          const id = d.properties.ISO_A2 || d.properties.ADM0_A3_IS || d.properties.ADMIN;
          if (d === hoverD) return 'steelblue';
          return visitedISOs.has(id) ? 'rgba(164, 124, 3, 0.6)' : 'rgba(255, 255, 255, 0.05)';
        })
      )
      .polygonsTransitionDuration(300);

    // Camera Controls
    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 0.2;

    // Handle viewport changes cleanly
    window.addEventListener('resize', () => {
      world.width(document.getElementById('globeViz').offsetWidth);
      world.height(document.getElementById('globeViz').offsetHeight);
    });
  });