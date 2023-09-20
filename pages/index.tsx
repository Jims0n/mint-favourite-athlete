
import { image } from '@nextui-org/react';
import { data } from 'autoprefixer';
import React, { useState,  FormEvent, ChangeEvent, useEffect } from 'react'

// interface FormData {
//   player: string;
 
// }


export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [img, setImg] = useState("")

 
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  
 

 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
   try {
    // Send the search query to the backend API route
    const response = await fetch('/api/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchQuery),
    });

    if (response.ok) {
      const data = await response.json();
      
      //console.log('Data received:', data);
      setImg(data.image)
      // Handle the data received from the server
      
    } else {
      // Handle errors if any
      console.error('Search request failed');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black " >
      <div className="container px-4 md:px-6 " >
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center" >
          <div className="flex flex-col justify-center space-y-4 text-center" >
            <div className="space-y-2" >
              <h1
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
              >
                                Mint your Favourite Athelete
              </h1>
              <p className="max-w-[600px] text-zinc-200 md:text-xl dark:text-zinc-100 mx-auto" >
                                lfggggg.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2 mx-auto" >
              <form className="flex space-x-2 " onSubmit={handleSubmit}  >
                <input
                  className="max-w-lg flex-1 "
                  placeholder="Enter a player name"
                  type="text"
          value={searchQuery}
          
      onChange={handleInputChange}
          
                />
                <button className="bg-white text-black"  type="submit">
                                    Search
                </button>
              </form>
              <button
               type="submit"
                className="relative z-20 h-[90px] w-full rounded-[16px] border-[0.5px] border-black bg-white transition-all duration-300  ease-in-out hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:bg-opacity-100 hover:shadow-[#FFF6EA] active:translate-x-[0px]
                     active:translate-y-[0px] active:rounded-2xl active:shadow-none"
              >
                 Mint!
              </button>
            </div>
            
          </div>
          <div className=" bg-white left-4 border-[1px] border-black" 
            > 
            <img src={img} className='h-full w-full' />
            </div>
        </div>
      </div>
    </section>
    </main>
  )
}
