class Product {
    constructor(title, description, price, thumbnail, code, stock) {
      this.title = title;
      this.description = description;
      this.price = price;
      this.thumbnail = thumbnail;
      this.code = code || this.generateCode();
      this.stock = stock;
    }
  
    generateCode() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const codeLength = 8;
      let code = '';
      for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
      }
      return code;
    }
  
    isCodeUnique(code, products) {
      return !products.some((product) => product.code === code);
    }
  
    async addProduct(products, title, description, price, thumbnail, code, stock) {
      code = code || this.generateCode();
  
      if (!this.isCodeUnique(code, products)) {
        throw new Error('El código proporcionado ya existe.');
      }
  
      const newProduct = new Product(title, description, price, thumbnail, code, stock);
      products.push(newProduct);
      return newProduct;
    }
  
    async deleteProduct(products, code) {
      return new Promise((resolve, reject) => {
        const index = products.findIndex((product) => product.code === code);
        if (index !== -1) {
          products.splice(index, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    }
  
    async updateProduct(products, code, title, description, price, thumbnail, stock) {
      const productToUpdate = products.find((product) => product.code === code);
      if (productToUpdate) {
        productToUpdate.title = title;
        productToUpdate.description = description;
        productToUpdate.price = price;
        productToUpdate.thumbnail = thumbnail;
        productToUpdate.stock = stock;
        return true;
      }
      return false;
    }
  
    async getAllProducts(products) {
      return products;
    }
  
    async getProductByCode(products, code) {
      return products.find((product) => product.code === code) || 'Not Found';
    }
  }
  
  (async () => {
    const products = [];
    const productInstance = new Product();
    try {
      await productInstance.addProduct(products, 'Producto 1', 'Descripción del producto 1', 20, 'imagen1.jpg', 1, 100);
      const deleteResult = await productInstance.deleteProduct(products, 1);
  
      console.log(await productInstance.getAllProducts(products));
      console.log(await productInstance.getProductByCode(products, 1));
      console.log(deleteResult);
    } catch (error) {
      console.error(error);
    }
  })();
  