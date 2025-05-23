import dbConnect from "../../utils/dbConnect";
import Ride from "../../models/Ride";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Connect to the database
      await dbConnect();

      // Fetch all rides
      const rides = await Ride.find();

      // Return the rides
      res.status(200).json({ rides });
    } catch (error) {
      console.error("Error fetching rides:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}