import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export function TradeSignal() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Trade Signal</CardTitle>
        <Button variant="ghost" size="icon">
          <MoveVerticalIcon className="w-4 h-4" />
          <span className="sr-only">More options</span>
        </Button>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="asset">Asset</Label>
            <div className="flex items-center gap-2">
              <Input id="asset" placeholder="Ticker symbol" />
              <Input placeholder="Asset name" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="action">Action</Label>
            <RadioGroup id="action" defaultValue="buy" className="flex items-center gap-4">
              <Label
                htmlFor="action-buy"
                className="flex items-center gap-2 font-medium [&:has(:checked)]:text-primary"
              >
                <RadioGroupItem id="action-buy" value="buy" />
                Buy
              </Label>
              <Label
                htmlFor="action-sell"
                className="flex items-center gap-2 font-medium [&:has(:checked)]:text-red-500"
              >
                <RadioGroupItem id="action-sell" value="sell" />
                Sell
              </Label>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price-target">Price Target</Label>
            <Input id="price-target" type="number" placeholder="Enter price target" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="expiration">Expiration</Label>
            <Input id="expiration" type="date" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea id="comment" placeholder="Add your rationale" />
          </div>
          <Button type="submit" className="w-full">
            Share Signal
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          <ClockIcon className="w-4 h-4" />
          <span>Signal valid until 2023-09-30</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <CheckIcon className="w-4 h-4" />
          <span>Verified</span>
        </div>
      </CardFooter>
    </Card>
  )
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function MoveVerticalIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polyline points="8 18 12 22 16 18" />
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </svg>
  )
}
