class Food {

  constructor() {

      this.foodStock = 0;
      this.image = loadImage("images/Milk.png");

  }

  getFoodStock() {

      var getStockRef = database.ref("foodStock");
      getStockRef.on("value");

  }

  update(stock) {

      database.ref("/").update({

          foodStock : stock

      });

  }

  deductFood() {

      if(this.foodStock > 0) {

          this.foodStock -= 1;

      }

  }

  display() {

      var x = 80, y = 100;

      imageMode(CENTER);
      // image(this.image, 120, 220, 70, 70);

      if(this.foodStock != 0) {

          for(var i = 0; i < this.foodStock; i++) {
              
              if(i % 20 && x > 300) {

                  x = 80;
                  y += 100;

              }

              image(this.image, x, y, 70, 70);
              x += 30;

          }

      }

  }

}