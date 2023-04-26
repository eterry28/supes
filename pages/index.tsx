import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  interface SuperheroInfo {
    name: string;
    images: {
      md: string;
    };
    biography: {
      fullName: string;
      firstAppearance: string;
    };
    powerstats: {
      intelligence: string;
      strength: string;
      speed: string;
      durability: string;
    };
    work: {
      occupation: string;
    }
  }

  const [superheroInfo, setSuperheroInfo] = useState<SuperheroInfo | null>(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(false);

  useEffect(()=>{
    callAPI();
  }, []); // <-- empty dependency array

  const callAPI = async () => {
    try {
      setError(false);
      let rando = Math.floor(Math.random() * 731);
      let url = `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${rando}.json`;
      console.log(url);
      const res = await fetch(url);
      if(res.status === 404){
        setError(true);
        return;
      }
      const data = await res.json();
      setSuperheroInfo(data);
      console.log(data);

    } catch (err){
      console.log(err);
    }
  };

  if(error){
    return (
      <main className="flex min-h-screen flex-col items-center p-20 bg-white">
        <h1>Please try again.</h1>
        <button onClick={callAPI} className='p-3 bg-teal-400 sm:w-1/4 rounded-md'>Find Another</button>
      </main>
    );
  }

  return (superheroInfo &&
    <main className="flex min-h-screen flex-col items-center p-20 bg-white">
      <div className="text-center text-zinc-500">
        <h1 className="text-6xl font-bold text-teal-400">Rando Supes</h1>
        <p className="text-xl mt-4">A quick and easy way to learn about random superheroes.</p>
      </div>
      <div className="border-2 border-black-500 mt-5 w-full sm:w-1/2">
        <div className="flex flex-col mb-5 text-center items-center">
            <div className="pt-5 pb-5 bg-zinc-100 font-bold w-full border-b-2">{superheroInfo.name}</div>
            <div className='flex flex-col w-full sm:flex-row sm:pl-5 sm:mt-5'>
              <div className='flex w-full sm:w-1/2 justify-center'>
                <img src={superheroInfo.images.md} alt={superheroInfo.biography.fullName} />
              </div>
              <div className='sm:w-1/2 text-left pl-5 pr-5'>
                <div className='flex flex-col pt-5 sm:flex-row'>
                  <div className='w-full sm:w-1/2'>Full Name:</div>                  
                  <div className='text-left'>{superheroInfo.biography.fullName}</div>
                </div>                
                <div className='flex flex-col pt-5 sm:flex-row'>
                  <div className='w-full sm:w-1/2'>Intelligence:</div>
                  <div className='text-left'>{superheroInfo.powerstats.intelligence} / 100</div>                  
                </div>
                <div className='flex flex-col pt-5 sm:flex-row'>
                  <div className='w-1/2'>Strength:</div>
                  <div className='text-left'>{superheroInfo.powerstats.strength} / 100</div>                  
                </div>
                <div className='flex flex-col pt-5 sm:flex-row'>
                  <div className='w-1/2'>Speed:</div>
                  <div className='text-left'>{superheroInfo.powerstats.speed} / 100</div>                  
                </div>
                <div className='flex flex-col pt-5 sm:flex-row'>
                  <div className='w-1/2'>Durability:</div>
                  <div className='text-left'>{superheroInfo.powerstats.durability} / 100</div>                  
                </div>
                <div className='flex flex-col pt-5'>
                <div className='text-left'>First appearance:</div>
                  <div className='text-left'>{superheroInfo.biography.firstAppearance}</div>
                </div>
                <div className='flex flex-col pt-5'>
                  <div className='text-left'>Occupation:</div>                  
                  <div className='text-left'>{superheroInfo.work.occupation}</div>
                </div>
                <div className='flex flex-col pt-5'>
                  <div className='text-left'>Publisher:</div>                  
                  <div className='text-left'><a className='hover:text-teal-400' href="#?{superheroInfo.biography.publisher}">Amazon Affiliate Search Link</a></div>
                </div>
              </div>
            </div>            
        </div>        
      </div>
      <div className='pt-5 w-1/2 text-right'>
        <button onClick={callAPI} className='p-3 bg-teal-400 sm:w-1/4 rounded-md'>Find Another</button>
      </div>
    </main>
  )
}
