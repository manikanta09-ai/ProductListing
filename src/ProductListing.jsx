import React, { useEffect, useState } from "react";


const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(item => item.json())
      .then(data => setProducts(data));
  }, []);

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === "" || p.category === category)
  );

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="p-4">
      <input placeholder="Search..." onChange={e => setSearch(e.target.value)} className="border p-2" />
      <select onChange={e => setCategory(e.target.value)} className="ml-2 border p-2">
        <option value="">All</option>
        {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
      </select>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {filtered.map(p => (
          <div key={p.id} className="border p-4">
            <img src={p.image} className="h-32" />
            <h2>{p.title}</h2>
            <p>${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;

