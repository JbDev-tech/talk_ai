import React from 'react'
import Chat from '../components/Chat';
import { redis } from '@/lib/redis';
import { ragChat } from '@/lib/rag-chat';
import { toNamespace } from '@/lib/namespace';

interface PageProps {
    params: Promise<{
        link?: string | string[];
    }>;
}

function reconstructUrl({url} : {url : string[]}){
    const decodedComponents = url.map((component) => decodeURIComponent(component))
    return decodedComponents.join('/')
}

const page = async({params}: PageProps) => {

   const awaitedparams = await params
   if(!awaitedparams?.link){
    return <div>Erreur : Aucun lien fourni</div>
   }

   const linkArray = Array.isArray(awaitedparams.link) ? awaitedparams.link : [awaitedparams.link]

   const decodedLink = reconstructUrl({ url: linkArray }).replace(
  /^(https?):\/(?!\/)/,
  "$1://"
);

   const sessionId = crypto.randomUUID()

   const isAlreadyIndexed = await redis.sismember("indexed-urls",decodedLink)

   if(!isAlreadyIndexed){
    console.log("Indexation en cours....")
    await ragChat.context.add({
        type: "html",
        source: decodedLink,
        config:{chunkOverlap: 100 , chunkSize:1000},
        options: { namespace: toNamespace(decodedLink) }
    })
    console.log("Indexation terminée");
    await redis.sadd("indexed-urls",decodedLink)

   }

  return (
    <div> 
        <Chat
            decodedLink={decodedLink}
            sessionId={sessionId}
            initialMessages={[]}
        >

        </Chat>
    </div>
  )
}

export default page