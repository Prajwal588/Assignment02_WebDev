const express = require("express");
const Product = require("./Marketplace/productcollection"); 
const app = express();
 
app.use(express.json());



// Welcome message
app.get("/",(req,res)=>{
    try{
        res.json({message:"Welcome to the marketplace app"})
    }catch(e){
        res.json("error");
    }
   
});


// Getting all the products
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({});
        if(!products){
            res.json({message:"No products found"})
        }
        else{
          
            res.status(200).json(products);
        }
      
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Getting the product with specific id 
app.get("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Adding a product into a database
app.post("/api/products", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Making change into a database
app.put("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//Deleting the product from the database using a specific id
app.delete("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
      
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
        }
        res.status(200).json(deletedProduct);
       
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Deleting the all the products from the database
app.delete("/api/products", async (req, res) => {
    try {
        await Product.deleteMany({});
        res.status(204).json({ message: "All products have been deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// D
app.get("/api/Products", async (req, res) => {
    const { name } = req.query;
    try {
        const products = await Product.find({ name });
        if (!products || products.length === 0) {
            res.status(404).json({ error: `No products found with name "${name}"` });
        } else {
            res.json(products);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(7000, () => {
    console.log(`server running at 7000`);
  });
  