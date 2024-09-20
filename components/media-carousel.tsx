/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/2WHSWXV4Cmc
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselIndicators, CarouselIndicator } from "@/components/ui/carousel"

export function media-carousel() {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Media Carousel</CardTitle>
        <CardDescription>Upload and manage your media content</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-muted rounded-lg p-4 flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Upload Media</h3>
            <div className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-muted-foreground rounded-lg p-8">
              <UploadIcon className="w-8 h-8 text-muted-foreground" />
              <p className="text-muted-foreground">Drag and drop files or click to upload</p>
              <Button size="sm">Upload</Button>
            </div>
          </div>
          <div>
            <Carousel className="rounded-lg overflow-hidden">
              <CarouselContent>
                <CarouselItem>
                  <img
                    src="/placeholder.svg"
                    alt="Carousel Image 1"
                    width={800}
                    height={450}
                    className="object-cover w-full h-[300px] md:h-[400px]"
                    style={{ aspectRatio: "800/450", objectFit: "cover" }}
                  />
                  <div className="p-4 bg-background">
                    <h4 className="text-lg font-semibold">Carousel Image 1</h4>
                    <p className="text-muted-foreground">This is the first image in the carousel.</p>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <img
                    src="/placeholder.svg"
                    alt="Carousel Image 2"
                    width={800}
                    height={450}
                    className="object-cover w-full h-[300px] md:h-[400px]"
                    style={{ aspectRatio: "800/450", objectFit: "cover" }}
                  />
                  <div className="p-4 bg-background">
                    <h4 className="text-lg font-semibold">Carousel Image 2</h4>
                    <p className="text-muted-foreground">This is the second image in the carousel.</p>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <video className="object-cover w-full h-[300px] md:h-[400px]" controls>
                    <source
                      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                      type="video/mp4"
                    />
                  </video>
                  <div className="p-4 bg-background">
                    <h4 className="text-lg font-semibold">Carousel Video</h4>
                    <p className="text-muted-foreground">This is a video in the carousel.</p>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious>
                <Button size="icon" variant="ghost">
                  <ChevronLeftIcon className="w-6 h-6" />
                  <span className="sr-only">Previous</span>
                </Button>
              </CarouselPrevious>
              <CarouselNext>
                <Button size="icon" variant="ghost">
                  <ChevronRightIcon className="w-6 h-6" />
                  <span className="sr-only">Next</span>
                </Button>
              </CarouselNext>
              <div className="mt-4 flex justify-center gap-2">
                <div />
                <div />
                <div />
              </div>
            </Carousel>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}


function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}


function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}
