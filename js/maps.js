ymaps.ready(init);    
    function init()Q{ 
        var myMap = new ymaps.Map("map", {
            center: [59.94, 30.32],
            zoom: 12,
            controls: ['zoomControl'],
            behaviors: ['drag']
        }); 

        var placemark1 = new ymaps.Placemark([59.95, 30.31], {
          hintContent: 'ул. Литераторов, д. 19',
          balloonContent: [
            '<div class="map__balloon">',
            'Самые вкусные бургеры у нас! Заходите по адресу: ул. Литераторов, д. 19',
            '</div>'
          ].join('')
        },
        {
          iconLayout: 'default#image',
          iconImageHref: 'img/icons/map-marker.svg',
          iconImageSize: [46, 57],
          iconImageOffset: [-23, -57]      
        });

        var placemark2 = new ymaps.Placemark([59.99, 30.32], {
          hintContent: 'Малый проспект ВО, д 64',
          balloonContent: [
            '<div class="map__balloon">',
            'Самые вкусные бургеры у нас! Заходите по адресу: Малый проспект ВО, д 64',
            '</div>'
          ].join('')
        },
        {
          iconLayout: 'default#image',
          iconImageHref: 'img/icons/map-marker.svg',
          iconImageSize: [46, 57],
          iconImageOffset: [-23, -57]      
        });

        var placemark = new ymaps.Placemark([59.92, 30.33], {
          hintContent: 'наб. реки Фонтанки, д. 56',
          balloonContent: [
            '<div class="map__balloon">',
            'Самые вкусные бургеры у нас! Заходите по адресу: наб. реки Фонтанки, д. 56',
            '</div>'
          ].join('')
        },
        {
          iconLayout: 'default#image',
          iconImageHref: 'img/icons/map-marker.svg',
          iconImageSize: [46, 57],
          iconImageOffset: [-23, -57]      
        });
        myMap.geoObjects.add(placemark);  
        myMap.geoObjects.add(placemark1); 
        myMap.geoObjects.add(placemark2); 
      }
