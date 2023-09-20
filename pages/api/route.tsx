
import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import axios from "axios";
import connectMongoDB from "@/libs/mongodb";
import Player from "@/models/player";
import { NextResponse, NextRequest } from "next/server";
import {  useState } from "react";



export default async function  handler(req: NextApiRequest, res: NextApiResponse) {
  

  const  method  = req.body


  await connectMongoDB();

  
  const regexQuery = new RegExp(method, 'i');
  // Search for data in MongoDB using your Mongoose model and the query
  const searchData = await Player.find({
    name: { $regex: regexQuery },
  });
  


  // Return the search results as JSON
  res.status(200).json(searchData);

    
  
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