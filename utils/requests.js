const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchProperties() {
  // Fetch properties from API or database
  try {
    if (!apiDomain) {
      console.error("API domain is not defined");
      return [];
    }

    const res = await fetch(`${apiDomain}/properties`);
    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

async function fetchProperty(id) {
  // Fetch a single property from API or database
  try {
    if (!apiDomain) {
      console.error("API domain is not defined");
      return null;
    }

    const res = await fetch(`${apiDomain}/properties/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch property");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
}

export { fetchProperties, fetchProperty };
