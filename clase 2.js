class Product {
    constructor(title, description, price, thumbnail, code, stock) {
      this.title = title;
      this.description = description;
      this.price = price;
      this.thumbnail = thumbnail;
      this.code = code;
      this.stock = stock;
    }
  
    generateCode = () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const codeLength = 8;
      let code = '';
      for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
      }
      return code;
    };
  
    isCodeUnique = (code, products) => {
      return !products.some(product => product.code === code);
    };
  
    addProduct = (products, title, description, price, thumbnail, stock) => {
      let code;
      for (let i = 0; i < 10000; i++) {
        code = this.generateCode();
        let isCodeUnique = true;
        for (const product of products) {
          if (product.code === code) {
            isCodeUnique = false;
            break;
          }
        }
        if (isCodeUnique) {
          break;
        }
      }
  
      const newProduct = new Product(title, description, price, thumbnail, code, stock);
      products.push(newProduct);
      return newProduct;
    };
  
    getAllProducts = () => {
      return products;
    };
  
    getProductByCode = (code) => {
      return products.find(product => product.code === code) || 'Not Found';
    };
  }
  
  const products = [];
  const productInstance = new Product();
  productInstance.addProduct(products, 'Producto 1', 'Descripción del producto 1', 20, 'imagen1.jpg', 10);
  
  console.log(productInstance.getAllProducts());
  console.log(productInstance.getProductByCode('ABC123'));
  