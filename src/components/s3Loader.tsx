'use client'
import {   Dispatch, SetStateAction, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { IconRefresh } from "./ui/icons";
import PdfRenderer from "./pdf_renderer";



// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const DocumentViewer=({  signedUrl, docName, type, numPages,setNumPages }: {setNumPages: Dispatch<SetStateAction<number | undefined>>,   signedUrl?:string, docName?:string, type?:string, numPages?: number} ) => {
  const [msUrl , setMsUrl ]=useState<string>()
  const [gUrl , setGUrl ]=useState<string>()
  const [name, setName]=useState<string>()
  const [isMsDoc, setIsMsDoc]=useState<boolean>()
  const [isPdf, setIsPdf]=useState<boolean>()
  


  useEffect(()=> {
  if(signedUrl) {
    setGUrl('https://docs.google.com/viewer?url=' + encodeURIComponent(signedUrl) + '&embedded=true')
  setMsUrl(  `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
    signedUrl
   )}`)
  }
  }, [signedUrl])
  useEffect(()=> {
    const msDocs= [ "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",  "application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",   "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation"]
    if(docName && type) {
      setName(docName)
      setIsMsDoc(msDocs.includes(type))
     setIsPdf(type==="application/pdf")
    }
    }, [docName, type])

  if (!type) return null
  if (!name) return null
  if (!signedUrl) return null

  if(isPdf) {return  <PdfRenderer url={signedUrl} setNumPages={setNumPages} numPages={numPages}/>}

  return (
<>


      { !isPdf && <Card className="w-full h-[85vh] ">
      <CardHeader>
        <CardTitle className="h-[90%] overflow-x-auto overflow-y-hidden flex flex-row justify-between">
          {name}
          <Button size={'sm'} variant={'outline'} >
            
            <IconRefresh className={`w-8 h-6 }`} />
            Refresh
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full h-[90%]">
      <iframe
      className="w-full h-full rounded-lg"
        src={ isMsDoc? msUrl : gUrl}
  
      />
      </CardContent>
      
    </Card>
}
</>
  );
};

