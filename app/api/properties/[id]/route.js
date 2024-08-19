import connectDB from "@/config/database";
import Property from "@/models/Property";
// Get /api/properties/:id
export const GET = async (request ,{params})=> {
  try {
    await connectDB();
  
    const property = await Property.findById(params.id);
   
    if(!property) return new Response('property not found',{status:404})
    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};

// If you want to handle other HTTP methods, you can add more named exports like POST, PUT, DELETE, etc.
