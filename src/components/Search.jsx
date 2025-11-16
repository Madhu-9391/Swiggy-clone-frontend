import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = ({ restaurants }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleRestaurantClick = (name, image) => {
    navigate("/swiggy/cart", {
      state: {
        restaurantName: name,
        restaurantImage: image,
      },
    });
  };

  // filter restaurants based on search
  const filtered = restaurants.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search for restaurants..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <div className="results mt-4 grid grid-cols-2 gap-4">
        {filtered.length > 0 ? (
          filtered.map((item, index) => (
            <div
              key={index}
              onClick={() => handleRestaurantClick(item.name, item.src)}
              className="p-4 border rounded cursor-pointer hover:shadow-lg"
            >
              <img src={item.src} alt={item.name} className="h-24 w-24 object-cover" />
              <h3 className="font-bold">{item.name}</h3>
              <i className="ri-shield-star-fill">4.2 <b>.{item.time}</b></i>
              <p>{item.cuisine}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No restaurants found</p>
        )}
      </div>
    </div>
  );
};

export default Search;
