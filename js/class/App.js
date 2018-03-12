const $         = require("jquery-slim");
const Shop      = require("./Shop");
const Seller    = require("./Seller");
class App {
    constructor() {

        this.$form          = document.getElementById("form-maps");
        this.$shop          = document.getElementById("shop");
        this.$latitude      = document.getElementById("latitude");
        this.$longitude     = document.getElementById("longitude");
        this.shops = [];

        this.position = {
            lat: 0,
            lng: 0
        };

        this.map = null;
        this.appMarker = null;
    }

    initMap(idElement) {
        this.map = new google.maps.Map(document.getElementById(idElement), {
            center: {
                lat: this.position.lat,
                lng: this.position.lng
            },
            zoom: 14
        });
    }

    setPosition(lat, lng) {
        this.position.lat = lat;
        this.position.lng = lng;

        this.centerOnMapPosition();
        this.setAppMarker();
    }

    centerOnMapPosition() {
        this.map.setCenter({
            lat: this.position.lat,
            lng: this.position.lng
        });
    }

    setAppMarker() {
        const infoWindow = new google.maps.InfoWindow({

            content: "<h3> Hello Le Soler ! </h3>"
        });


        this.appMarker = new google.maps.Marker({
            position: this.position,
            map: this.map,
            title: 'Vous êtes ici !'
        });


        this.appMarker.addListener("click", () => {
            infoWindow.open(this.map, this.appMarker);
        });
    }

    addShop(shop_id) {
        const position = {
            lat: parseFloat(this.$latitude.value),
            lng: parseFloat(this.$longitude.value)
        };

        const shop = new Shop(
            this.map,
            position,
            this.$shop.value,
            this.shop_id = this.shop_id++
        );

        let content = "<h3>" + this.$shop.value + "</h3>";

        const infowindow = new google.maps.InfoWindow({
            content: content
        });

        this.shops.push(this.shop_id, this.$shop.value, this.$latitude.value, this.$longitude.value);

        this.clearForm();

    }

    clearForm(){
     this.$form.reset();
    }

    storeShops(){
        console.log(this.shops);
        const key = "shops";
        localStorage.setItem(key, JSON.stringify(this.shops));
    }

    toJSON(){
        return{
            //shop_id: this.shop_id,
            shop: this.$shop.value,
            lat: this.position.lat,
            lng: this.position.lng
        }
    }

}
    module.exports = App;