var app = new Vue({
    el: "#app",
    data: {
        products: [
            { id: 1, title: "GAMLIN", short_text: "Orange Early-Season Sweet Round", image: "gamlin.jpg", desc: "HR: CTV; Xcc IR: HLB (under monitored conditions)",
              tree:[
                "Medium-sized, vigorous tree with dense canopy.",
                "High-yielding with early and uniform fruit setting.",
                "Adapted for warm climates with mild winters."
              ],
              cycle:[
                "Fall",
                "Early Winter"
              ],
              fruit:[
                "Medium-sized fruit with smooth skin.",
                "Very juicy with mild sweetness.",
                "Excellent for both fresh consumption and juice.",
                "Average fruit size: 160–180 grams."
              ],
              color: "Bright Orange"
            },
            { id: 2, title: "MORO", short_text: "Orange Pigmented Blood Type", image: "Moro.jpg", desc: "HR: CTV IR: Cold damage, Alternaria",
              tree:[
                "Moderately vigorous with open canopy.",
                "Performs well in Mediterranean climates.",
                "Requires cool nights to enhance pigmentation."
              ],
              cycle:[
                "Winter",
                "Early Spring"
              ],
              fruit:[
                "Distinctive deep red flesh with aromatic flavor.",
                "High anthocyanin content.",
                "Medium-sized fruit with tender texture.",
                "Average fruit size: 150–170 grams."
              ],
              color: "Deep Orange Skin / Red Flesh"
            },
            { id: 3, title: "SANGUINELLI", short_text: "Late-Season Blood Orange", image: "sangvinelo.jpg", desc: "HR: CTV IR: Low temp-induced stress",
              tree:[
                "Compact tree with balanced growth.",
                "Late ripening; ideal for extended harvest.",
              ],
              cycle:[
                "Late Winter",
                "Spring"
              ],
              fruit:[
                "Blood orange with reddish streaks in pulp.",
                "Sweet-tart balance with floral notes.",
                "Thin peel, easy to segment.",
                "Average fruit size: 140–160 grams."
              ],
              color: "Orange Skin / Streaked Red Flesh" 
            },
            { id: 4, title: "VERNA", short_text: "Juicy Late-Season Orange", image: "Verna.jpg", desc: "HR: CTV; Xcc IR: Drought and salinity",
              tree:[
                "Large, vigorous tree with excellent regrowth.",
                "Late season productivity with prolonged harvest window.",
              ],
              cycle:[
                "Spring",
                "Early Summer"
              ],
              fruit:[
                "Large, juicy fruit with low seed count.",
                "High juice yield and long shelf life.",
                "Suitable for fresh market and juice.",
                "Average fruit size: 180–220 grams."
              ],
              color: "Bright Yellow-Orange" 
            },
            { id: 5, title: "CITRANGE", short_text: "Cold-Tolerant Mild Orange", image: "zitrang.jpg", desc: "HR: Cold stress, Root rot IR: Xcc, Soil salinity",
              tree:[
                "Hybrid tree (Citrus sinensis × Poncirus trifoliata)",
                "Cold-hardy rootstock with moderate vigor.",
                "Suitable for marginal growing zones."
              ],
              cycle:[
                "Spring",
                "Winter"
              ],
              fruit:[
                "Medium-sized fruit with slightly bitter-sweet taste.",
                "Used in processing or marmalade.",
                "High adaptability in suboptimal soils.",
                "Average fruit size: 130–150 grams."
              ],
              color: "Light Orange"
            }
        ],
        btnVisible: 0,
        product: {},
        cart: [],

    },
    mounted:function() {
        this.getProduct();
        this.checkInCart();
        this.cart = this.getCart();
    },
    methods: {
        addToCart: function(id) {
          var cart = [];
          if (window.localStorage.getItem("cart")) {
            cart = window.localStorage.getItem("cart").split(",");
          }
          if (cart.indexOf(String(id)) == -1) {
            cart.push(id);
            window.localStorage.setItem("cart", cart.join());
            this.btnVisible = 1;
          }
        },
        getProduct: function() {
          if (window.location.hash) {
            var id = window.location.hash.replace("#", "");
            if (this.products.length > 0) {
              for (let i in this.products) {
                if (this.products[i].id == id) {
                  this.product = this.products[i];
                }
              }
            }
          }
        },
        checkInCart: function() {
          let cart = window.localStorage.getItem("cart")
            ? window.localStorage.getItem("cart").split(",")
            : [];
          this.btnVisible = cart.includes(String(this.product.id)) ? 1 : 0;
        },
        getCart: function() {
          let storedCart = window.localStorage.getItem("cart")
            ? window.localStorage.getItem("cart").split(",")
            : [];
          let cart = [];
          storedCart.forEach(id => {
            let product = this.products.find(item => item.id == id);
            if (product) {
              cart.push(product);
            }
          });
          return cart;
        },
        removeFromCart: function(index) {
          let stored = window.localStorage.getItem("cart");
          if (!stored) return;
          let storedCart = stored.split(",");
          let product = this.cart[index];
          let idStr = String(product.id);
          let newCart = storedCart.filter(item => item !== idStr);
          window.localStorage.setItem("cart", newCart.join(","));
          this.cart.splice(index, 1);
        },
        downloadCartPdf: function() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
          
            doc.setFontSize(16);
            doc.text("Order basket", 10, 10);
          
            let y = 20;
          
            this.cart.forEach((item, index) => {
              doc.setFontSize(12);
              doc.text(`${index + 1}. ${item.title}`, 10, y);
              doc.text(`Description: ${item.short_text}`, 10, y + 6);
              doc.text(`Color: ${item.color}`, 10, y + 12);
              y += 28;
          
              if (y > 270) {
                doc.addPage();
                y = 20;
              }
            });
          
            doc.save("order_basket.pdf");
          }
      }
});

