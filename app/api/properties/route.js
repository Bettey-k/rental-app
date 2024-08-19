import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";
// GET api/properties
export const GET = async (request) => {
  try {
    await connectDB();
    const properties = await Property.find({});
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};
/*
export const POST = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("userID is required", { status: 401 });
    }

    const formData = await request.formData();
    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");

    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("street"),
        city: formData.get("city"),
        state: formData.get("state"),
        zipcode: formData.get("zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("weekly"),
        monthly: formData.get("monthly"),
        nightly: formData.get("nightly"),
      },
      seller_info: {
        name: formData.get("seller_name"),
        email: formData.get("seller_email"),
        phone: formData.get("seller_phone"),
      },
      owner: sessionUser.userId,
    };
    console.log("Property Data:", propertyData);

    // upload image to the cloud

    // Upload images to Cloudinary
    const imageUploadPromises = images.map(async (image) => {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);
      const imageBase64 = imageData.toString("base64");

      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "properyPulse",
        }
      );

      return result.secure_url; // Return the image URL
    });

    // Wait for all uploads to complete
    const uploadImages = await Promise.all(imageUploadPromises);

    // Add uploaded image URLs to property data
    propertyData.images = uploadImages;

    const newProperty = new Property(propertyData);
    await newProperty.save();
    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );
  } catch (error) {
    console.error("Error saving property:", error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 400,
    }); 

    
}
};
*/