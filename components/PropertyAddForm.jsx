"use client";

//import { useState, useEffect } from "react";
import addProperty from "@/app/actions/addProperty";
const PropertyAddForm = () => {
 
  return (

      <form
        action={addProperty}
        // method="POST"
        // encType="multipart/form-data"
      >
        <h2 className="text-3xl text-center font-semibold mb-6">
          Add Property
        </h2>

        {/* Property Type */}
        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
            Property Type
          </label>
          <select
            id="type"
            name="type"
            className="border rounded w-full py-2 px-3"
            required
            //value={fields.type}
            // onChange={handleChange}
          >
            <option value="Apartment">Apartment</option>
            <option value="Condominum">Condo</option>
            <option value="House">House</option>
            <option value="Cabin Or Cottage">Cabin or Cottage</option>
            <option value="Room">Room</option>
            <option value="Studio">Studio</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Listing Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Listing Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="eg. Beautiful Apartment In Miami"
            required
            // value={fields.name}
            //  onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="border rounded w-full py-2 px-3"
            rows="4"
            placeholder="Add an optional description of your property"
            //  value={fields.description}
            //  onChange={handleChange}
          ></textarea>
        </div>

        {/* Location */}
        <div className="mb-4 bg-blue-50 p-4">
          <label
            htmlFor="location"
            className="block text-gray-700 font-bold mb-2"
          >
            Location
          </label>
          <input
            type="text"
            id="street"
            name="location.street"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Street"
            //  value={fields.location.street}
            // onChange={handleChange}
          />
          <input
            type="text"
            id="city"
            name="location.city"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="City"
            required
            //  value={fields.location.city}
            //  onChange={handleChange}
          />
          <input
            type="text"
            id="state"
            name="location.state"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="State"
            required
            // value={fields.location.state}
            // onChange={handleChange}
          />
          <input
            type="text"
            id="zipcode"
            name="location.zipcode"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Zipcode"
            //  value={fields.location.zipcode}
            //  onChange={handleChange}
          />
        </div>

        {/* Beds, Baths, Square Feet */}
        <div className="mb-4 flex flex-wrap">
          <div className="w-full sm:w-1/3 pr-2">
            <label
              htmlFor="beds"
              className="block text-gray-700 font-bold mb-2"
            >
              Beds
            </label>
            <input
              type="number"
              id="beds"
              name="beds"
              className="border rounded w-full py-2 px-3"
              required
              // value={fields.beds}
              // onChange={handleChange}
            />
          </div>
          <div className="w-full sm:w-1/3 px-2">
            <label
              htmlFor="baths"
              className="block text-gray-700 font-bold mb-2"
            >
              Baths
            </label>
            <input
              type="number"
              id="baths"
              name="baths"
              className="border rounded w-full py-2 px-3"
              required
              //  value={fields.baths}
              // onChange={handleChange}
            />
          </div>
          <div className="w-full sm:w-1/3 pl-2">
            <label
              htmlFor="square_feet"
              className="block text-gray-700 font-bold mb-2"
            >
              Square Feet
            </label>
            <input
              type="number"
              id="square_feet"
              name="square_feet"
              className="border rounded w-full py-2 px-3"
              required
              //  value={fields.square_feet}
              //  onChange={handleChange}
            />
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Amenities
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div>
              <input
                type="checkbox"
                id="amenity_wifi"
                name="amenities"
                value="Wifi"
                className="mr-2"
                // checked={fields.amenities.includes("Wifi")}
                //  onChange={handleAmenetiesChange}
              />
              <label htmlFor="amenity_wifi">Wifi</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_kitchen"
                name="amenities"
                value="Full Kitchen"
                className="mr-2"
                //    checked={fields.amenities.includes("Full Kitchen")}
                //    onChange={handleAmenetiesChange}
              />
              <label htmlFor="amenity_kitchen">Full kitchen</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_washer_dryer"
                name="amenities"
                value="Washer & Dryer"
                className="mr-2"
                //    checked={fields.amenities.includes("Washer & Dryer")}
                //    onChange={handleAmenetiesChange}
              />
              <label htmlFor="amenity_washer_dryer">Washer & Dryer</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_garage"
                name="amenities"
                value="Garage"
                className="mr-2"
                //   checked={fields.amenities.includes("Garage")}
                //    onChange={handleAmenetiesChange}
              />
              <label htmlFor="amenity_garage">Garage</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_pool"
                name="amenities"
                value="Swimming Pool"
                className="mr-2"
                //  checked={fields.amenities.includes("Swimming Pool")}
                //   onChange={handleAmenetiesChange}
              />
              <label htmlFor="amenity_pool">Swimming Pool</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_gym"
                name="amenities"
                value="Gym"
                className="mr-2"
                //   checked={fields.amenities.includes("Gym")}
                //   onChange={handleAmenetiesChange}
              />
              <label htmlFor="amenity_gym">Gym</label>
            </div>
          </div>
        </div>

        {/* Rates */}
        <div className="mb-4">
          <label htmlFor="rates" className="block text-gray-700 font-bold mb-2">
            Rates
          </label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <input
                type="number"
                id="rate_weekly"
                name="rates.weekly"
                className="border rounded w-full py-2 px-3"
                placeholder="Weekly"
                //  value={fields.rates.weekly}
                //  onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="number"
                id="rate_monthly"
                name="rates.monthly"
                className="border rounded w-full py-2 px-3"
                placeholder="Monthly"
                //  value={fields.rates.monthly}
                //  onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="number"
                id="rate_nightly"
                name="rates.nightly"
                className="border rounded w-full py-2 px-3"
                placeholder="Nightly"
                //  value={fields.rates.nightly}
                //  onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Seller Information */}
        <div className="mb-4">
          <label
            htmlFor="seller_info"
            className="block text-gray-700 font-bold mb-2"
          >
            Seller Information
          </label>
          <input
            type="text"
            id="seller_name"
            name="seller_info.name"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Seller Name"
            // value={fields.seller_info.name}
            // onChange={handleChange}
          />
          <input
            type="email"
            id="seller_email"
            name="seller_info.email"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Seller Email"
            //value={fields.seller_info.email}
            // onChange={handleChange}
          />
          <input
            type="tel"
            id="seller_phone"
            name="seller_info.phone"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Seller Phone"
            //  value={fields.seller_info.phone}
            //  onChange={handleChange}
          />
        </div>

        {/* Upload Images */}
        <div className="mb-4">
          <label
            htmlFor="images"
            className="block text-gray-700 font-bold mb-2"
          >
            Upload Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            accept="image/*"
            //  onChange={handleImageChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Add Property
        </button>
      </form>
    
  );
};

export default PropertyAddForm;
