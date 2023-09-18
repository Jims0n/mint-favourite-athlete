
import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import axios from "axios";
import connectMongoDB from "@/libs/mongodb";
import Player from "@/models/player";
import { NextResponse, NextRequest } from "next/server";



export async function  POST(req: NextApiRequest, res: NextApiResponse) {
  
    try {
      const query = (req.body);
      
      await connectMongoDB();
      // Search for data in MongoDB using your Mongoose model and the query
      const searchData = await Player.find({ name: query });
console.log(searchData);

      // Return the search results as JSON
      res.status(200).json(searchData);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  
  }

// export async function POST(request: NextResponse) {
//     const {
//         id,
//         name,
//         image
//       } = await request.json();
//       await connectMongoDB();
//       await Player.create({id, name, image});
//       return NextResponse.json({message: "Created"}, {status: 201})
    
// }

// Function to fetch data from the API
//  export async function GET (){
//   try {
//     const response = await axios.get(apiUrl);

    
//     await connectMongoDB();
   

//     // Insert the fetched data into the MongoDB collection
//     await Player.insertMany(response.data.players);

    
//     return NextResponse.json({message: "Created"}, {status: 201})
    
    
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// }

// async function populateCollection() {
//   try {
//     await connectMongoDB();
//     const data = await fetchData();

//     // Insert the fetched data into the MongoDB collection
//     await Player.insertMany(data.players);

//     console.log(`Inserted ${data.length} documents into the collection`);
//   } catch (error) {
//     console.error(error);
//   } finally {
//     mongoose.disconnect();
//   }
// }

// populateCollection();