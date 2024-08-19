import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 24 * 60 * 60, 
  },
  callbacks: {
    async signIn({ profile }) {
      console.log("Profile received:", profile);

      // Connect to the database
      await connectDB();

      // Check if the user exists
      const userExists = await User.findOne({ email: profile.email });

      // If not, then add user to the database
      if (!userExists) {
        // Truncate user name if too long
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }

      // Return true to allow sign in
      return true;
    },
    async session({ session }) {
      console.log("Session before update:", session);

      // Get user from the db
      const user = await User.findOne({ email: session.user.email });

      // Assign the user id to the session
      session.user.id = user._id.toString();

      console.log("Session after update:", session);

      return session;
    },
  },
};

//  token refresh login
async function refreshToken(refreshToken) {
  const url = "https://oauth2.googleapis.com/token"; // Google's token endpoint
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const data = await response.json();
  return data;
}
