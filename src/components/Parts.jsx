import React from 'react';
import { useNavigate } from 'react-router-dom';

const Parts = () => {
  const navigate = useNavigate();

  const handleRestaurantClick = (name, image) => {
    navigate('/swiggy/cart', {
      state: {
        restaurantName: name,
        restaurantImage: image,
      },
    });
  };

  return (
    <div className="parts">
      <h2>Top Restaurant Chains in Kavali</h2>
      <div className="part1">
        <div className="images">
          <div
            className="img1 images1"
            onClick={() => handleRestaurantClick("The Belgian Waffle Co.", "/images/img1.png")}
          >
            <img className="img" src="/images/img1.png" alt="img1" />
            <h3>The Belgian Waffle Co.</h3>
            <i className="ri-shield-star-fill">4.2 <b>.40-45 mins</b></i>
            <p>Waffle, dessert, ice cream, starters...</p>
          </div>

          <div
            className="img2 images1"
            onClick={() => handleRestaurantClick("The MM Garib", "/images/img2.png")}
          >
            <img className="img" src="/images/img2.png" alt="img2" />
            <h3>The MM Garib</h3>
            <i className="ri-shield-star-fill">4.7 <b>.30-50 mins</b></i>
            <p>Chinese, Indo, Indian, American...</p>
          </div>

          <div
            className="img3 images1"
            onClick={() => handleRestaurantClick("Dolphin", "/images/img3.png")}
          >
            <img className="img" src="/images/img3.png" alt="img3" />
            <h3>Dolphin</h3>
            <i className="ri-shield-star-fill">4.5 <b>.30-45 mins</b></i>
            <p>Burger, Pizzas, Starters...</p>
          </div>

          <div
            className="img4 images1"
            onClick={() => handleRestaurantClick("Durga Mess", "/images/img4.png")}
          >
            <img className="img" src="/images/img4.png" alt="img4" />
            <h3>Durga Mess</h3>
            <i className="ri-shield-star-fill">4.2 <b>.30-40 mins</b></i>
            <p>Wafer, Biryani, Ice creams...</p>
          </div>
        </div>
      </div>

      <div className="part2">
        <h2>Restaurants with Online Food Delivery in Kavali</h2>
        <div className="buttons">
          <button>Filter <i className="ri-equalizer-2-line"></i></button>
          <button>Sort By <i className="ri-arrow-down-s-line"></i></button>
          <button>Fast Delivery</button>
          <button>New On Swiggy</button>
          <button>Rating 4.0+</button>
          <button>Pure Veg</button>
          <button>Offers</button>
          <button>Rs. 300–600</button>
          <button>Less than Rs. 300</button>
        </div>

        <div className="images2">
          {[
            { src: "/images/p2img.png", name: "Durga Mess", time: "30-40 mins" },
            { src: "/images/p2img2.png", name: "Garib", time: "35-40 mins" },
            { src: "/images/p2img3.png", name: "Dolphin", time: "20-40 mins" },
            { src: "/images/p2img4.png", name: "Manju Cafe", time: "30-40 mins" },
          ].map((item, index) => (
            <div
              className={`img2${index + 1} images21`}
              key={index}
              onClick={() => handleRestaurantClick(item.name, item.src)}
              style={{ cursor: 'pointer' }}
            >
              <img className="p2img" src={item.src} alt={`p2img${index + 1}`} />
              <h3>{item.name}</h3>
              <i className="ri-shield-star-fill">4.2 <b>.{item.time}</b></i>
              <p>Wafer, Biryani, Ice creams...</p>
            </div>
          ))}
        </div>
      </div>

      <div className="part3">
        <h2>Best Places to Eat Across Cities</h2>
        <div className="buttons3">
          {[
            "Bangalore", "Chennai", "Hyderabad", "Delhi", "Pune", "Vizag",
            "Nellore", "Kavali", "Ongole", "Tirupati", "Kadapa"
          ].map((city, i) => (
            <button key={i}>Best Restaurants in {city}</button>
          ))}
          <button>Show More <i className="ri-arrow-down-s-line"></i></button>
        </div>

        <h2>Best Cuisines Near Me</h2>
        <div className="bestcuisines">
          {[
            "Chinese", "S-Indian", "Indian", "Kerala", "Korean", "N-Indian",
            "Seafood", "Punjabi", "Italian", "Andhra", "Bengali"
          ].map((cuisine, i) => (
            <button key={i}>{cuisine} Restaurant Near Me</button>
          ))}
          <button>Show More <i className="ri-arrow-down-s-line"></i></button>
        </div>

        <h2>Explore Every Restaurant Near Me</h2>
        <div className="buttons32">
          <button>Explore Restaurants Near Me</button>
          <button>Explore Top Rated Restaurants Near Me</button>
        </div>
      </div>

      <div className="part4">
        <div className="download">
          <h1>For better experience, download the Swiggy app now</h1>
        </div>
        <div className="downloadon">
          <img id="playstore" src="/images/playstore.png" height="70px" width="200px" alt="playstore" />
          <img src="/images/appstore.png" height="70px" width="200px" alt="appstore" />
        </div>
      </div>
    </div>
  );
};

export default Parts;
